import localFont from "next/font/local";

/**
 * Self-hosted, latin subset, instanced down from the Google Fonts variable
 * files (see `fonts/README.md`). Bricolage carries every word on the page, so
 * it is the one preload. Caveat is only Gabriel's handwriting, which writes
 * itself in after the text lands, so it can arrive a beat later.
 */
export const bricolage = localFont({
  src: "./fonts/bricolage.woff2",
  weight: "300 700",
  display: "swap",
  variable: "--font-bricolage",
  declarations: [{ prop: "font-stretch", value: "90% 100%" }],
});

export const caveat = localFont({
  src: "./fonts/caveat.woff2",
  weight: "560",
  display: "swap",
  preload: false,
  variable: "--font-caveat",
});
