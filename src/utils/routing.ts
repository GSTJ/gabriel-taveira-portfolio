export const routing = {
  // A list of all locales that are supported
  locales: ["en-US", "pt-BR"],

  localeDetection: true,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en-US",

  localePrefix: "always",
} as const;
