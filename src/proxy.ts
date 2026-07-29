import createMiddleware from "next-intl/middleware";

import { routing } from "./utils/routing";

/**
 * Locale routing, nothing else. This was `src/middleware.ts` until Next 16.2
 * deprecated that filename and started warning on every build. Next reads both
 * names for now and hard-errors if it finds both, so only one of them ever
 * exists. `next-intl/middleware` keeps its own module path; the file convention
 * is the only thing that changed.
 */
export default createMiddleware(routing);

export const config = {
  // Skip all paths that should not be internationalized.
  //
  // This has to stay a plain string literal. Next reads `config` statically at
  // build time and only understands a small set of node types; a
  // String.raw`...` tag fails the build with
  // `Unsupported node type "TaggedTemplateExpression" at "config.matcher[0]"`.
  // magic-oxlint-config's next preset turns `unicorn/prefer-string-raw` off for
  // `proxy.{js,ts}` alongside `middleware.{js,ts}`, so the disable directive
  // that used to sit here stays gone across the rename.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
