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

/** Drops the inline `<em>`, `<strong>` and `<mark>` tags the copy uses. */
const plain = (s: string) => s.replaceAll(/<\/?[a-z]+>/g, "");

export function GET() {
  const years = yearsInIndustry();
  const fill = (s: string) => plain(s).replaceAll("{years}", String(years));

  const body = [
    "# Gabriel Taveira",
    "",
    `> ${fill(en.resume.summary)}`,
    "",
    `- Role: ${en.resume.role}`,
    `- Location: ${en.resume.location}`,
    `- Availability: ${en.hero.availability}, consulting engagements`,
    `- Email: ${CHANNELS.find((c) => c.id === "email")?.handle}`,
    "",
    "## Services",
    "",
    ...SERVICES.map((s) => {
      const item = en.services.items[s.id];
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
      return `- **${item.title}** (${w.eyebrow}): ${plain(item.blurb)}`;
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
