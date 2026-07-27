import createMiddleware from "next-intl/middleware";

import { routing } from "./utils/routing";

export default createMiddleware(routing);

export const config = {
  // Skip all paths that should not be internationalized.
  //
  // This has to stay a plain string literal. Next reads `config` statically at
  // build time and only understands a small set of node types; a
  // String.raw`...` tag fails the build with
  // `Unsupported node type "TaggedTemplateExpression" at "config.matcher[0]"`.
  // eslint-disable-next-line unicorn/prefer-string-raw -- see above
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
