import { getTranslations } from "next-intl/server";

import { yearsInIndustry } from "@/components/portfolio/lifeline";
import { SKILLS, SPACE_CAST } from "@/components/portfolio/profile";
import { CHANNELS } from "@/components/portfolio/sections/contact/data";
import { AWARDS, NOW, TALKS } from "@/components/portfolio/sections/notes/data";
import { PROJECTS } from "@/components/portfolio/sections/projects/data";
import { SERVICES } from "@/components/portfolio/sections/services/data";
import { WORK, workDates } from "@/components/portfolio/sections/work/data";
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
  strong: (chunks: string) => chunks,
  mark: (chunks: string) => chunks,
  note: (chunks: string) => chunks,
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
    `- Email: ${CHANNELS.find((c) => c.id === "email")?.handle}`,
    "",
    "## Services",
    "",
    ...SERVICES.map((s) => {
      const item = en.services.items[s.id];
      return `- **${item.title}**: ${item.body}`;
    }),
    "",
    "## Projects",
    "",
    ...PROJECTS.map((p) => {
      const item = en.projects.items[p.id];
      return `- [${item.title}](${p.href}): ${item.body}`;
    }),
    "",
    "## Now",
    "",
    ...NOW.map((n) => {
      const item = en.notes.now.items[n.id];
      const title = n.href ? `[${item.title}](${n.href})` : item.title;
      return `- ${item.chip}: ${title}. ${item.body}`;
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
      const when = workDates(w, en.work.present);
      return `- **${item.title}** (${w.orgs.join(" · ")}, ${when}): ${plain(`work.items.${w.id}.blurb`)}`;
    }),
    "",
    "## Talks",
    "",
    ...TALKS.map((t) => {
      const item = en.notes.talks.items[t.id];
      return `- **${item.title}** (${item.venue}, ${t.date}): ${item.description}`;
    }),
    "",
    "## Media",
    "",
    `- Hosted [Space Cast](${SPACE_CAST}), Rocketseat's podcast on YouTube: 37 of its 40 episodes, January to October 2023, when the show ended.`,
    "",
    "## Awards",
    "",
    ...AWARDS.map(
      (a) =>
        `- ${en.notes.awards.items[a.id]}, ${en.notes.awards.positions[a.position]} (${a.year})`,
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
