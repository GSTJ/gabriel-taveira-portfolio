const { test } = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { annotateRelease, pushAnnotation } = require("./annotate-release.cjs");

const commit = "a".repeat(40);
const tagSha = "b".repeat(40);
function fixture(options = {}) {
  let ref = { sha: commit, type: "commit" };
  let annotation;
  let updates = 0;
  const release = {
    tag_name: "v1.3.2",
    body: "Release notes\nwith details",
    draft: false,
    ...options.release,
  };
  const api = (endpoint, body) => {
    if (endpoint.endsWith("releases/tags/v1.3.2")) {
      if (options.missing)
        throw Object.assign(new Error("missing"), { status: 404 });
      if (options.denied)
        throw Object.assign(new Error("denied"), { status: 403 });
      return {
        ...release,
        ...(annotation && options.notesChanged ? { body: "new notes" } : {}),
      };
    }
    if (endpoint.includes("/git/ref/")) return { object: options.ref ?? ref };
    if (endpoint.endsWith("/git/tags") && body) {
      annotation = {
        ...body,
        sha: tagSha,
        object: {
          sha: options.wrongCommit ? "c".repeat(40) : body.object,
          type: "commit",
        },
      };
      return annotation;
    }
    if (endpoint.endsWith(`/git/tags/${tagSha}`)) return annotation;
    assert.equal(endpoint, "repos/GSTJ/test");
    return { node_id: "repo-id" };
  };
  const updateTag = (_repository, tag, original, annotation) => {
    assert.equal(tag, "v1.3.2");
    assert.equal(original.sha, commit);
    assert.equal(annotation.sha, tagSha);
    if (options.race) throw new Error("lease rejected");
    updates++;
    ref = options.postRace
      ? { sha: commit, type: "commit" }
      : { sha: tagSha, type: "tag" };
  };
  return {
    api,
    updateTag,
    updates: () => updates,
    target: () => annotation?.object.sha,
  };
}
test("annotates with exact release notes and preserves commit; rerun writes nothing", async () => {
  const f = fixture();
  assert.match(
    await annotateRelease(f.api, "GSTJ/test", "1.3.2", f.updateTag),
    /preserved commit/,
  );
  assert.equal(f.target(), commit);
  assert.equal(
    await annotateRelease(f.api, "GSTJ/test", "1.3.2", f.updateTag),
    "Release tag already annotated",
  );
  assert.equal(f.updates(), 1);
});
test("missing release is a no-op", async () => {
  const f = fixture({ missing: true });
  assert.equal(
    await annotateRelease(f.api, "GSTJ/test", "1.3.2", f.updateTag),
    "No published release yet",
  );
  assert.equal(f.updates(), 0);
});
for (const [name, options] of Object.entries({
  denied: { denied: true },
  draft: { release: { draft: true } },
  emptyNotes: { release: { body: "" } },
  wrongTag: { release: { tag_name: "v9.0.0" } },
  wrongCommit: { wrongCommit: true },
  movedRef: { race: true },
  changedNotes: { notesChanged: true },
  postRace: { postRace: true },
  invalidSha: { ref: { sha: "invalid", type: "commit" } },
  tree: { ref: { sha: commit, type: "tree" } },
})) {
  test(`refuses ${name}`, async () => {
    const f = fixture(options);
    await assert.rejects(
      annotateRelease(f.api, "GSTJ/test", "1.3.2", f.updateTag),
    );
    assert.equal(f.updates(), options.postRace ? 1 : 0);
  });
}
test("rejects an existing annotation with different notes", async () => {
  const f = fixture();
  await annotateRelease(f.api, "GSTJ/test", "1.3.2", f.updateTag);
  const api = (endpoint, body) =>
    endpoint.endsWith(`/git/tags/${tagSha}`)
      ? Promise.resolve({
          tag: "v1.3.2",
          object: { type: "commit", sha: commit },
          message: "other notes",
        })
      : f.api(endpoint, body);
  await assert.rejects(
    annotateRelease(api, "GSTJ/test", "1.3.2", f.updateTag),
    /Existing annotation differs/,
  );
  assert.equal(f.updates(), 1);
});
test("rejects invalid versions before API access", async () => {
  await assert.rejects(
    annotateRelease(() => assert.fail("API called"), "GSTJ/test", "../bad"),
  );
});

// Exercise real Git transport, including the annotated object rejected by
// GraphQL and a remote update that races the final push.
for (const race of [false, true]) {
  test(`Git transport ${race ? "rejects a concurrent update" : "publishes an annotation without moving the commit"}`, () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "release-remote-"));
    const git = (args, input) =>
      execFileSync("git", ["-C", dir, ...args], {
        input,
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      }).trim();
    try {
      git(["init", "--bare", "--quiet"]);
      const tree = git(["hash-object", "-t", "tree", "-w", "--stdin"], "");
      const makeCommit = (message) =>
        git(
          ["hash-object", "-t", "commit", "-w", "--stdin"],
          `tree ${tree}\nauthor Gabriel Taveira <gabrielstaveira@gmail.com> 1700000000 +0000\ncommitter Gabriel Taveira <gabrielstaveira@gmail.com> 1700000000 +0000\n\n${message}\n`,
        );
      const first = makeCommit("first");
      const second = makeCommit("second");
      git(["update-ref", "refs/tags/v1.3.2", first]);
      const message = "Exact release notes\nsecond line";
      const object = `object ${first}\ntype commit\ntag v1.3.2\ntagger Gabriel Taveira <gabrielstaveira@gmail.com> 1700000000 +0000\n\n${message}`;
      const sha = git(["hash-object", "-t", "tag", "--stdin"], object);
      const annotation = {
        sha,
        message,
        tagger: {
          name: "Gabriel Taveira",
          email: "gabrielstaveira@gmail.com",
          date: "2023-11-14T22:13:20Z",
        },
      };
      const action = () =>
        pushAnnotation(
          "GSTJ/test",
          "v1.3.2",
          { sha: first, type: "commit" },
          annotation,
          {
            remote: `file://${dir}`,
            ...(race
              ? {
                  beforePush: () =>
                    git(["update-ref", "refs/tags/v1.3.2", second]),
                }
              : {}),
          },
        );
      if (race) {
        assert.throws(action, /stale info/);
        assert.equal(git(["rev-parse", "refs/tags/v1.3.2"]), second);
      } else {
        action();
        assert.equal(git(["cat-file", "-t", "refs/tags/v1.3.2"]), "tag");
        assert.equal(git(["rev-parse", "refs/tags/v1.3.2^{}"]), first);
        assert.equal(git(["cat-file", "-p", "refs/tags/v1.3.2"]), object);
      }
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
}
