import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { bricolageText } from "@/app/fonts";
import { yearsInIndustry } from "@/components/portfolio/lifeline";
import {
  CURRICULUM_PDF,
  EMAIL_ADDR,
  GITHUB,
  LINKEDIN,
  SKILL_GROUPS,
} from "@/components/portfolio/profile";
import { AWARDS, NOW, TALKS } from "@/components/portfolio/sections/notes/data";
import {
  NPM_SINCE,
  PEGADA_FACTS,
} from "@/components/portfolio/sections/projects/data";
import { getNpmLedger } from "@/components/portfolio/sections/projects/npm";
import { WORK, workOrgs } from "@/components/portfolio/sections/work/data";
import { JsonLd } from "@/components/portfolio/structured-data";
import { cn } from "@/utils/cn";
import { pageMetadata } from "@/utils/metadata";
import { SITE_URL } from "@/utils/site";

import { RESUME_JOBS } from "./data";

import "./resume.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resume" });
  return pageMetadata({
    locale,
    path: "/resume",
    title: t("title"),
    description: t("summary", { years: yearsInIndustry() }),
  });
}

const CURVINHA = "https://curvinha.app";
const PEGADA = "https://github.com/GSTJ/pegada";

/**
 * The title with its dates on the right, the organization under it, then the
 * bullets: the order ATS parsers expect. URLs are written out as text.
 */
const Entry = ({
  title,
  org,
  href,
  date,
  children,
}: {
  title: string;
  org: string;
  href?: string;
  date: string;
  children?: React.ReactNode;
}) => (
  <article className="resume-entry">
    <h3>
      <span>{title}</span>
      <span className="resume-date">{date}</span>
    </h3>
    <p className="resume-org">
      {org}
      {href ? (
        <>
          {" · "}
          <a href={href}>{href.replace(/^https:\/\/(www\.)?/, "")}</a>
        </>
      ) : null}
    </p>
    {children}
  </article>
);

/**
 * The single-column, light, print-first resume. `/curriculum.pdf` is printed
 * from this page, so it stays readable as text: static fonts, no
 * backgrounds, no columns or tables an ATS would read out of order, and
 * every link written out as its URL.
 */
const ResumePage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resume");
  const independent = (await getTranslations("work"))("independent");
  const tTalks = await getTranslations("notes.talks.items");
  const tAwards = await getTranslations("notes.awards");
  const years = yearsInIndustry();
  const npm = await getNpmLedger();

  const month = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const when = (ym: string | number) =>
    typeof ym === "number" ? `${ym}` : month.format(new Date(`${ym}-01`));
  const range = (start: string | number, end: string | number | "now") =>
    end === "now"
      ? t("rangeOpen", { start: when(start) })
      : t("range", { start: when(start), end: when(end) });
  const curvinhaSince = when(NOW[0]?.store?.since.slice(0, 7) ?? 2026);

  return (
    <main className={cn("resume", bricolageText.variable)}>
      <JsonLd
        locale={locale}
        path="/resume"
        type="ProfilePage"
        name={t("title")}
      />
      <div className="resume-sheet">
        <header className="resume-head">
          <h1>Gabriel Taveira</h1>
          <p className="resume-role">{t("role")}</p>
          <p className="resume-location">{t("location")}</p>
          {/* Pipes, not the site's middle dot: parsers split contact fields
              on them, and read "a·b" as one token. */}
          <p className="resume-contact">
            <a href={`mailto:${EMAIL_ADDR}`}>{EMAIL_ADDR}</a> |{" "}
            <a href={`${SITE_URL}/${locale}`}>gabrieltaveira.dev</a> |{" "}
            <a href={LINKEDIN}>linkedin.com/in/gabrieltaveira</a> |{" "}
            <a href={GITHUB}>github.com/GSTJ</a>
          </p>
          <p className="resume-screen-only">
            <a href={`/${locale}`}>{t("backToSite")}</a> ·{" "}
            <a href={CURRICULUM_PDF}>{t("download")}</a>
          </p>
        </header>

        <section>
          <h2>{t("summaryTitle")}</h2>
          <p>{t("summary", { years })}</p>
        </section>

        <section>
          <h2>{t("experienceTitle")}</h2>
          {WORK.map((w) => {
            const job = RESUME_JOBS[w.id];
            const bullets = t.raw(`jobs.${w.id}`) as string[];
            return (
              <Entry
                key={w.id}
                title={job.title}
                org={workOrgs(w, independent).join(" · ")}
                date={range(job.start ?? w.start, job.end ?? w.end)}
              >
                <ul>
                  {bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Entry>
            );
          })}
        </section>

        <section>
          <h2>{t("projectsTitle")}</h2>
          <Entry
            title="Curvinha"
            org={t("founder")}
            href={CURVINHA}
            date={range(2026, "now")}
          >
            <p>{t("projects.curvinha", { since: curvinhaSince })}</p>
          </Entry>
          <Entry
            title="Pegada"
            org={t("founder")}
            href={PEGADA}
            date={range(2023, "now")}
          >
            <p>
              {t("projects.pegada", { rank: PEGADA_FACTS.productHunt.rank })}
            </p>
          </Entry>
          <Entry
            title={t("projects.openSource")}
            org={t("projects.maintainer")}
            href={GITHUB}
            date={range(Number(NPM_SINCE.slice(0, 4)), "now")}
          >
            <p>
              {t("projects.openSourceBody", {
                downloads: Math.floor(npm.total / 1000),
                stars: npm.stars,
              })}
            </p>
          </Entry>
        </section>

        <section>
          <h2>{t("skillsTitle")}</h2>
          <ul className="resume-skills">
            {(Object.keys(SKILL_GROUPS) as (keyof typeof SKILL_GROUPS)[]).map(
              (group) => (
                <li key={group}>
                  <strong>{t(`skills.${group}`)}:</strong>{" "}
                  {SKILL_GROUPS[group].join(", ")}
                </li>
              ),
            )}
            <li>
              <strong>{t("skills.languages")}:</strong>{" "}
              {t("skills.languagesList")}
            </li>
          </ul>
        </section>

        <section>
          <h2>{t("talksTitle")}</h2>
          <ul className="resume-list">
            {TALKS.map((talk) => (
              <li key={talk.id}>
                <span>
                  <strong>{tTalks(`${talk.id}.title`)}</strong>,{" "}
                  {tTalks(`${talk.id}.venue`)}, {tTalks(`${talk.id}.city`)}
                </span>
                <span className="resume-date">{talk.date}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t("awardsTitle")}</h2>
          <ul className="resume-list">
            {AWARDS.map((a) => (
              <li key={a.id}>
                <span>
                  <strong>{tAwards(`items.${a.id}`)}</strong>,{" "}
                  {tAwards(`positions.${a.position}`)}
                </span>
                <span className="resume-date">{a.year}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t("educationTitle")}</h2>
          <Entry
            title={t("education.program")}
            org={t("education.school")}
            date={t("education.date")}
          />
        </section>
      </div>
    </main>
  );
};

export default ResumePage;
