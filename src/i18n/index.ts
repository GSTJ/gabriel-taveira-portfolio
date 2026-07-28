import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "../utils/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  /**
   * `requested` comes off the URL. Nothing upstream of here guarantees it is
   * one of ours: the middleware matcher skips any path containing a dot, so
   * `/evil.json` reaches this config un-normalised, and the value is then
   * interpolated into an `import()`. Webpack's context module and the
   * `notFound()` in `[locale]/layout.tsx` both happen to block that today,
   * which makes this safe by accident rather than by construction. Falling
   * back to the default locale is what next-intl asks for.
   */
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = await import(`./locales/${locale}.json`);

  return {
    locale,
    messages: messages.default,
  };
});
