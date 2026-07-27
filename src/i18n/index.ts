import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // Default to English if no locale is provided
  const currentLocale = (await requestLocale) ?? "en-US";
  const messages = await import(`./locales/${currentLocale}.json`);

  return {
    locale: currentLocale,
    messages: messages.default,
  };
});
