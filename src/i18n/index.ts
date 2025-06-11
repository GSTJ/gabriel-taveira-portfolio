import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  // Default to English if no locale is provided
  const currentLocale = locale ?? "en-US";

  return {
    locale: currentLocale,
    messages: (await import(`./locales/${currentLocale}.json`)).default,
  };
});
