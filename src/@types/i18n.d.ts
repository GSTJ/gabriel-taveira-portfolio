// import the custom resources for "en-us"
type Messages = typeof import("../i18n/locales/en-US").default;

declare interface IntlMessages extends Messages {}
