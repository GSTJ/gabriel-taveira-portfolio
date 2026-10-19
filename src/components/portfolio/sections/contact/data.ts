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

/**
 * The situations the section routes, in the order most visitors need them.
 * `mail` rows open a draft with a subject and questions from the locale; the
 * rest go to a channel. The last row carries two quiet links.
 */
export const ROUTES = [
  { id: "project", mail: true },
  { id: "hello", channel: "linkedin" },
  { id: "code", channel: "github" },
  { id: "security", mail: true },
  { id: "talk", mail: true },
  { id: "reading", channels: ["medium", "spaceCast"] },
] as const satisfies readonly {
  id: string;
  mail?: true;
  channel?: Channel["id"];
  channels?: readonly Channel["id"][];
}[];
