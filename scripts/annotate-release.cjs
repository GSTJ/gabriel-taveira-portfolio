const { execFileSync } = require("node:child_process");

// Convert only a lightweight release tag. The ref update has an atomic lease,
// and the annotation points directly at the same commit as the original ref.
function validateRelease(release, tag) {
  if (release.draft || release.tag_name !== tag || !release.body?.trim()) {
    throw new Error("Expected a published release with notes");
  }
}

function validateAnnotation(annotation, original, release, tag) {
  if (
    annotation.object?.sha !== original.sha ||
    annotation.object?.type !== "commit" ||
    annotation.message !== release.body ||
    annotation.tag !== tag
  ) {
    throw new Error("Annotation did not preserve the release");
  }
}

async function annotateRelease(api, repository, version) {
  if (!/^\d+\.\d+\.\d+$/.test(version))
    throw new Error("Invalid release version");
  const tag = `v${version}`;
  const root = `repos/${repository}`;
  let release;
  try {
    release = await api(`${root}/releases/tags/${tag}`);
  } catch (error) {
    if (error.status === 404) return "No published release yet";
    throw error;
  }
  validateRelease(release, tag);
  const refPath = `${root}/git/ref/tags/${tag}`;
  const originalRef = await api(refPath);
  const original = originalRef.object;
  if (!/^[a-f0-9]{40}$/.test(original.sha))
    throw new Error("Invalid tag object");
  if (original.type === "tag") {
    const existing = await api(`${root}/git/tags/${original.sha}`);
    if (
      existing.tag !== tag ||
      existing.object.type !== "commit" ||
      existing.message !== release.body
    ) {
      throw new Error(
        "Existing annotation differs from the release; refusing to replace it",
      );
    }
    return "Release tag already annotated";
  }
  if (original.type !== "commit")
    throw new Error("Release tag must point at a commit");
  const annotation = await api(`${root}/git/tags`, {
    tag,
    message: release.body,
    object: original.sha,
    type: "commit",
    tagger: {
      name: "Gabriel Taveira",
      email: "gabrielstaveira@gmail.com",
      date: new Date().toISOString(),
    },
  });
  validateAnnotation(annotation, original, release, tag);
  const freshRelease = await api(`${root}/releases/tags/${tag}`);
  if (
    freshRelease.body !== release.body ||
    freshRelease.draft ||
    freshRelease.tag_name !== tag
  ) {
    throw new Error("Release changed while annotating");
  }
  const { node_id: repositoryId } = await api(root);
  await api("graphql", {
    query:
      "mutation($input: UpdateRefsInput!) { updateRefs(input: $input) { clientMutationId } }",
    variables: {
      input: {
        repositoryId,
        refUpdates: [
          {
            name: `refs/tags/${tag}`,
            beforeOid: original.sha,
            afterOid: annotation.sha,
            force: true,
          },
        ],
      },
    },
  });
  const finalRef = await api(refPath);
  const final = finalRef.object;
  if (final.type !== "tag" || final.sha !== annotation.sha)
    throw new Error("Published annotation verification failed");
  return `Annotated ${tag}, preserved commit ${original.sha}`;
}

const api = (endpoint, body) => {
  try {
    const output = execFileSync(
      "gh",
      ["api", endpoint, ...(body ? ["--method", "POST", "--input", "-"] : [])],
      {
        input: body ? JSON.stringify(body) : undefined,
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      },
    );
    const result = JSON.parse(output);
    if (result.errors) throw new Error("GitHub rejected the atomic ref update");
    return result;
  } catch (error) {
    if (/HTTP 404/.test(error.stderr?.toString() ?? "")) error.status = 404;
    throw error;
  }
};

async function main() {
  console.log(
    await annotateRelease(
      api,
      process.env.GITHUB_REPOSITORY,
      require("../package.json").version,
    ),
  );
}

module.exports = { annotateRelease };
if (require.main === module)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
