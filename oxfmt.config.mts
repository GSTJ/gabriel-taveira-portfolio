// release-please owns CHANGELOG.md and rewrites it on every release in its own
// markdown style, so formatting it here would fail `oxfmt --check` on the
// release PR forever. magic-oxfmt-config 1.1.0 ignores `**/CHANGELOG.md`
// itself, so the local re-declaration this file used to carry is gone.
export { next as default } from "magic-oxfmt-config";
