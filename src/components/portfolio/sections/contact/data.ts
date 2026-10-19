import {
  EMAIL,
  EMAIL_ADDR,
  GITHUB,
  LINKEDIN,
  MEDIUM,
  SPACE_CAST,
} from "../../profile";

export { EMAIL, EMAIL_ADDR };

export type Channel = {
  id: "linkedin" | "github" | "email" | "medium" | "spaceCast";
  handle: string;
  url: string;
};

/** Also listed on /links and in llms.txt. */
export const CHANNELS: readonly Channel[] = [
  { id: "linkedin", handle: "/in/gabrieltaveira", url: LINKEDIN },
  { id: "github", handle: "@GSTJ", url: GITHUB },
  { id: "email", handle: EMAIL_ADDR, url: EMAIL },
  { id: "medium", handle: "@gabrieltaveira", url: MEDIUM },
  { id: "spaceCast", handle: "Rocketseat / YouTube", url: SPACE_CAST },
] as const;
