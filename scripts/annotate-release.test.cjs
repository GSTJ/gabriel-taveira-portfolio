const { test } = require("node:test");
const assert = require("node:assert/strict");
const { annotateRelease } = require("./annotate-release.cjs");

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
    if (endpoint === "graphql") {
      const [update] = body.variables.input.refUpdates;
      assert.equal(update.name, "refs/tags/v1.3.2");
      assert.equal(update.beforeOid, commit);
      assert.equal(update.afterOid, tagSha);
      assert.equal(body.variables.input.repositoryId, "repo-id");
      if (options.race) throw new Error("lease rejected");
      updates++;
      ref = { sha: tagSha, type: "tag" };
      if (options.postRace) ref = { sha: commit, type: "commit" };
      return {};
    }
    assert.equal(endpoint, "repos/GSTJ/test");
    return { node_id: "repo-id" };
  };
  return { api, updates: () => updates, target: () => annotation?.object.sha };
}
test("annotates with exact release notes and preserves commit; rerun writes nothing", async () => {
  const f = fixture();
  assert.match(
    await annotateRelease(f.api, "GSTJ/test", "1.3.2"),
    /preserved commit/,
  );
  assert.equal(f.target(), commit);
  assert.equal(
    await annotateRelease(f.api, "GSTJ/test", "1.3.2"),
    "Release tag already annotated",
  );
  assert.equal(f.updates(), 1);
});
test("missing release is a no-op", async () => {
  const f = fixture({ missing: true });
  assert.equal(
    await annotateRelease(f.api, "GSTJ/test", "1.3.2"),
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
    await assert.rejects(annotateRelease(f.api, "GSTJ/test", "1.3.2"));
    assert.equal(f.updates(), options.postRace ? 1 : 0);
  });
}
test("rejects an existing annotation with different notes", async () => {
  const f = fixture();
  await annotateRelease(f.api, "GSTJ/test", "1.3.2");
  const api = (endpoint, body) =>
    endpoint.endsWith(`/git/tags/${tagSha}`)
      ? Promise.resolve({
          tag: "v1.3.2",
          object: { type: "commit", sha: commit },
          message: "other notes",
        })
      : f.api(endpoint, body);
  await assert.rejects(
    annotateRelease(api, "GSTJ/test", "1.3.2"),
    /Existing annotation differs/,
  );
  assert.equal(f.updates(), 1);
});
test("rejects invalid versions before API access", async () => {
  await assert.rejects(
    annotateRelease(() => assert.fail("API called"), "GSTJ/test", "../bad"),
  );
});
