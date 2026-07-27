import { next } from "magic-oxfmt-config";

export default {
  ...next,
  ignorePatterns: [
    ...next.ignorePatterns,
    // release-please owns CHANGELOG.md and rewrites it on every release in its
    // own markdown style (`*` bullets, a blank line under each heading).
    // Formatting it here would make `oxfmt --check` fail on the release PR,
    // every release, forever.
    "CHANGELOG.md",
  ],
};
