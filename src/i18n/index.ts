import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // Default to English if no locale is provided
  const currentLocale = (await requestLocale) ?? "en-US";

  return {
    locale: currentLocale,
    messages: (await import(`./locales/${currentLocale}.json`)).default,
  };
});
