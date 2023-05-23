// import the original type declarations
import "i18next";

// import the custom resources for "en-us"
import enUS from "../i18n/locales/en-US";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      "en-us": typeof enUS;
    };
  }
}
