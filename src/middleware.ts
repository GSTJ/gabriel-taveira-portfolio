import createMiddleware from "next-intl/middleware";
import { routing } from "./utils/routing";

export default createMiddleware(routing);

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
