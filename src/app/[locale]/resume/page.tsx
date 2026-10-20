import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { yearsInIndustry } from "@/components/portfolio/lifeline";
import {
  CURRICULUM_PDF,
  EMAIL_ADDR,
  GITHUB,
  LINKEDIN,
  SKILLS,
} from "@/components/portfolio/profile";
import { AWARDS, TALKS } from "@/components/portfolio/sections/notes/data";
import { WORK, workOrgs } from "@/components/portfolio/sections/work/data";
import { JsonLd } from "@/components/portfolio/structured-data";
import { pageMetadata } from "@/utils/metadata";
import { SITE_URL } from "@/utils/site";

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

/** Plain text for the blurbs, which carry `<mark>` highlights on the page. */
const plain = { mark: (chunks: React.ReactNode) => chunks };

/**
 * The single-column, light, print-first resume. `/curriculum.pdf` is printed
 * from this page, so it has to stay readable as text: system fonts, no
 * backgrounds, no columns an ATS would read out of order.
 */
const ResumePage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resume");
  const tWork = await getTranslations("work.items");
  const independent = (await getTranslations("work"))("independent");
  const tTalks = await getTranslations("notes.talks.items");
  const tAwards = await getTranslations("notes.awards");
  const years = yearsInIndustry();

  return (
    <main className="resume">
      <JsonLd
        locale={locale}
        path="/resume"
        type="ProfilePage"
        name={t("title")}
      />
      <header className="resume-head">
        <h1>Gabriel Taveira</h1>
        <p className="resume-role">{t("role")}</p>
        <p className="resume-contact">
          {t("location")} · <a href={`mailto:${EMAIL_ADDR}`}>{EMAIL_ADDR}</a> ·{" "}
          <a href={`${SITE_URL}/${locale}`}>gabrieltaveira.dev</a> ·{" "}
          <a href={LINKEDIN}>linkedin.com/in/gabrieltaveira</a> ·{" "}
          <a href={GITHUB}>github.com/GSTJ</a>
        </p>
        <p className="resume-screen-only">
          <a href={`/${locale}`}>← {t("backToSite")}</a> ·{" "}
          <a href={CURRICULUM_PDF}>{t("download")}</a>
        </p>
      </header>

      <section>
        <h2>{t("summaryTitle")}</h2>
        <p>{t("summary", { years })}</p>
      </section>

      <section>
        <h2>{t("skillsTitle")}</h2>
        <p>{SKILLS.join(" · ")}</p>
      </section>

      <section>
        <h2>{t("experienceTitle")}</h2>
        {WORK.map((w) => {
          const date = `${w.start} - ${w.end === "now" ? t("present") : w.end}`;
          return (
            <article key={w.id} className="resume-job">
              <h3>
                {tWork(`${w.id}.title`)}
                <span className="resume-date">{date}</span>
              </h3>
              <p className="resume-company">
                {workOrgs(w, independent).join(" · ")}
              </p>
              <p>{tWork.rich(`${w.id}.blurb`, plain)}</p>
            </article>
          );
        })}
      </section>

      <section>
        <h2>{t("talksTitle")}</h2>
        <ul>
          {TALKS.map((talk) => (
            <li key={talk.id}>
              <strong>{tTalks(`${talk.id}.title`)}</strong>,{" "}
              {tTalks(`${talk.id}.venue`)}, {tTalks(`${talk.id}.city`)} (
              {talk.date})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t("awardsTitle")}</h2>
        <ul>
          {AWARDS.map((a) => (
            <li key={a.id}>
              <strong>{tAwards(`items.${a.id}`)}</strong>,{" "}
              {tAwards(`positions.${a.position}`)} ({a.year})
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ResumePage;
