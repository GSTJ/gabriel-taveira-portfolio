import { getTranslations } from "next-intl/server";

import {
  AWARDS,
  CHANNELS,
  SERVICES,
  SKILLS,
  TALKS,
  WORK,
} from "@/components/portfolio/data";
import { yearsInIndustry } from "@/components/portfolio/lifeline";
import en from "@/i18n/locales/en-US.json";
import { SITE_URL } from "@/utils/site";

/**
 * https://llmstxt.org: a markdown summary for LLMs and AI search, built from
 * the same copy and data as the page so it can't drift from it.
 *
 * It lives at the root, outside `[locale]`. The proxy matcher skips any path
 * with a dot, so without this route `/llms.txt` falls into the locale segment
 * and 404s as an HTML page.
 */

/**
 * Rich-text copy rendered to plain text by next-intl's own message parser,
 * with each inline tag reduced to its children. A regex that strips `<...>`
 * would be the fragile version of this, and CodeQL rightly flags it.
 */
const plainTags = {
  em: (chunks: string) => chunks,
  strong: (chunks: string) => chunks,
  mark: (chunks: string) => chunks,
};

export async function GET() {
  const t = await getTranslations({ locale: "en-US" });
  const years = yearsInIndustry();
  const plain = (key: Parameters<typeof t.markup>[0]) =>
    t.markup(key, { ...plainTags, years });

  const body = [
    "# Gabriel Taveira",
    "",
    `> ${plain("resume.summary")}`,
    "",
    `- Role: ${en.resume.role}`,
    `- Location: ${en.resume.location}`,
    `- Availability: ${en.hero.availability}, consulting engagements`,
    `- Email: ${CHANNELS.find((c) => c.id === "email")?.handle}`,
    "",
    "## Services",
    "",
    ...SERVICES.map((id) => {
      const item = en.services.items[id];
      return `- **${item.title}**: ${item.body}`;
    }),
    "",
    "## Skills",
    "",
    SKILLS.join(", "),
    "",
    "## Experience",
    "",
    ...WORK.map((w) => {
      const item = en.work.items[w.id];
      const end = w.end === "now" ? "present" : w.end;
      return `- **${item.title}** (${w.orgs.join(", ")}, ${w.start} to ${end}): ${plain(`work.items.${w.id}.blurb`)}`;
    }),
    "",
    "## Talks",
    "",
    ...TALKS.map((t) => {
      const item = en.talks.items[t.id];
      return `- **${item.title}** (${item.venue}, ${t.date}): ${item.description}`;
    }),
    "",
    "## Awards",
    "",
    ...AWARDS.map(
      (a) =>
        `- ${en.awards.items[a.id]}, ${en.awards.positions[a.position]} (${a.year})`,
    ),
    "",
    "## Links",
    "",
    `- [Portfolio](${SITE_URL}/en-US)`,
    `- [Resume](${SITE_URL}/en-US/resume)`,
    `- [Resume PDF](${SITE_URL}/curriculum.pdf)`,
    ...CHANNELS.filter((c) => c.id !== "email").map(
      (c) => `- [${en.contact.channels[c.id]}](${c.url})`,
    ),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
