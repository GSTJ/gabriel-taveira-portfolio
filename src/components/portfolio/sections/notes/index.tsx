import type { ReactNode } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../../lifeline";
import { ArrowUpRight } from "../../ui/icons";
import { Annotated, Marginalia } from "../../ui/marginalia";
import { reveal } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import {
  ARTICLES,
  AWARDS,
  CURVINHA_NOW,
  EPISODES,
  NOW_UPDATED,
  RECORD_READ,
  SHIPPED,
  SPACE_CAST_LINKS,
  SPACE_CAST_TOTAL,
  TALKS,
} from "./data";
import { RecordPreview } from "./record-preview";

import styles from "./notes.module.css";

type T = Awaited<ReturnType<typeof getTranslations<"notes">>>;

type Kind = "talk" | "episode" | "article" | "release" | "hackathon";

const KINDS: readonly Kind[] = [
  "talk",
  "episode",
  "article",
  "release",
  "hackathon",
];

const COUNTS: Record<Kind, number> = {
  talk: TALKS.length,
  episode: EPISODES.length,
  article: ARTICLES.length,
  release: SHIPPED.length,
  hackathon: AWARDS.length,
};

const TOTAL = Object.values(COUNTS).reduce((sum, n) => sum + n, 0);

const YEARS = [
  ...TALKS.map((talk) => Number(talk.date)),
  ...EPISODES.map((ep) => Number(ep.date.slice(0, 4))),
  ...ARTICLES.map((article) => Number(article.date.slice(0, 4))),
  ...SHIPPED.map((item) => Number(item.date.slice(0, 4))),
  ...AWARDS.map((award) => award.year),
];

const HOURS = Math.round(
  EPISODES.reduce((sum, ep) => sum + ep.minutes, 0) / 60,
);

const formatDate = (
  iso: string,
  locale: string,
  options: Intl.DateTimeFormatOptions,
) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale, {
    ...options,
    timeZone: "UTC",
  });

const external = (href: string, label: ReactNode) => (
  <a className="link-arrow" href={href}>
    {label}
    <ArrowUpRight />
  </a>
);

/** One line of the record: year, kind, then `What` and `Meta` as children. */
const Row = ({
  kind,
  year,
  label,
  thumb,
  children,
}: {
  kind: Kind | "show";
  year: string | number;
  label: string;
  thumb?: string;
  children: ReactNode;
}) => (
  <li className={styles.row} data-kind={kind} data-thumb={thumb}>
    <span className={cn("t-meta num", styles.year)}>{year}</span>
    <span className={cn("t-meta", styles.kind)}>{label}</span>
    {children}
  </li>
);

const What = ({ children }: { children: ReactNode }) => (
  <div className={styles.what}>{children}</div>
);

const Meta = ({ children }: { children: ReactNode }) => (
  <div className={cn("t-small", styles.meta)}>{children}</div>
);

const curvinhaTag = (note: string) => (chunks: ReactNode) => (
  <>
    <a className={styles.curvinha} href={CURVINHA_NOW}>
      <PenUnderline delay={240}>{chunks}</PenUnderline>
    </a>
    <Marginalia note={note} delay={700} />
  </>
);

const libraryTag = (href: string) => (chunks: ReactNode) => (
  <a className="t-mono" href={href}>
    {chunks}
  </a>
);

const Letter = ({ t, locale }: { t: T; locale: string }) => (
  <section className={styles.letter} aria-labelledby="notes-now">
    <div className={styles.letterHead} {...reveal()}>
      <h3 id="notes-now" className="t-title">
        {t("now.title")}
      </h3>
      <p className="t-meta">
        {t("now.updated", { date: currentMonthLabel(locale, NOW_UPDATED) })}
      </p>
    </div>
    <p className="t-lede" {...reveal(1)}>
      {t("now.letter.consulting")}
    </p>
    <Annotated as="p" className="t-lede" {...reveal(2)}>
      {t.rich("now.letter.building", {
        link: curvinhaTag(t("now.letter.note")),
      })}
    </Annotated>
    <p className="t-lede" {...reveal(3)}>
      {t("now.letter.rest")}
    </p>
  </section>
);

const Record = ({ t, locale }: { t: T; locale: string }) => {
  const monthYear = (iso: string) =>
    formatDate(iso, locale, { month: "short", year: "numeric" });
  const day = (iso: string) =>
    formatDate(iso, locale, { day: "numeric", month: "short" });
  const first = EPISODES.at(-1)?.date ?? "";
  const last = EPISODES[0]?.date ?? "";

  return (
    <section
      className={styles.record}
      aria-labelledby="notes-record"
      {...reveal()}
    >
      <div className={styles.recordHead}>
        <h3 id="notes-record" className="t-title">
          {t("record.title")}
        </h3>
        <p className="t-meta">
          {t("record.summary", {
            count: TOTAL,
            from: Math.min(...YEARS),
            to: Math.max(...YEARS),
          })}{" "}
          {t("talks.sub")}
        </p>
      </div>

      <fieldset className={styles.filters}>
        <legend className="visually-hidden">{t("record.legend")}</legend>
        {(["all", ...KINDS] as const).map((filter) => (
          <label key={filter} className={styles.chip}>
            <input
              type="radio"
              name="notes-filter"
              id={`notes-filter-${filter}`}
              value={filter}
              defaultChecked={filter === "all"}
            />
            {t(`record.filters.${filter}`)}
            <span className={cn("num", styles.count)}>
              {filter === "all" ? TOTAL : COUNTS[filter]}
            </span>
          </label>
        ))}
      </fieldset>

      <RecordPreview>
        <ol className={styles.rows}>
          {SHIPPED.map((item) => (
            <Row
              key={item.id}
              kind="release"
              year={item.date.slice(0, 4)}
              label={t("record.kinds.release")}
            >
              <What>
                <a className={cn("t-mono", styles.pkg)} href={item.href}>
                  {item.name}
                  <span className={styles.version}>@{item.version}</span>
                </a>
              </What>
              <Meta>
                <p>{t(`shipped.items.${item.id}`)}</p>
                <time className="num" dateTime={item.date}>
                  {day(item.date)}
                </time>
              </Meta>
            </Row>
          ))}

          {TALKS.filter((talk) => talk.date === "2024").map((talk) => (
            <TalkRow key={talk.id} t={t} talk={talk} />
          ))}

          <Row kind="show" year="2023" label={t("record.kinds.show")}>
            <What>
              <span className={styles.title}>{t("record.show.title")}</span>
            </What>

            <Meta>
              <p>
                {t("record.show.meta", {
                  hosted: EPISODES.length,
                  total: SPACE_CAST_TOTAL,
                  from: monthYear(first),
                  to: monthYear(last),
                  hours: HOURS,
                })}
              </p>
              <p className={styles.links}>
                <label htmlFor="notes-filter-episode" className={styles.seeAll}>
                  {t("record.show.seeAll", { hosted: EPISODES.length })}
                </label>
                {external(SPACE_CAST_LINKS.playlist, t("record.show.youtube"))}
                {external(SPACE_CAST_LINKS.spotify, t("record.show.spotify"))}
              </p>
            </Meta>
          </Row>

          {EPISODES.map((ep) => (
            <Row
              key={ep.id}
              kind="episode"
              year={ep.date.slice(0, 4)}
              label={t("record.kinds.episode", { n: ep.n })}
              thumb={`/notes/space-cast/${ep.id}.webp`}
            >
              <What>
                <a
                  className={styles.title}
                  href={`https://www.youtube.com/watch?v=${ep.id}`}
                  lang="pt-BR"
                >
                  {ep.title}
                </a>
              </What>
              <Meta>
                <p>
                  <time className="num" dateTime={ep.date}>
                    {day(ep.date)}
                  </time>{" "}
                  · {t("record.episodeMeta", { minutes: ep.minutes })}
                </p>
              </Meta>
            </Row>
          ))}

          {TALKS.filter((talk) => talk.date !== "2024").map((talk) => (
            <TalkRow key={talk.id} t={t} talk={talk} />
          ))}

          {ARTICLES.map((article) => (
            <Row
              key={article.id}
              kind="article"
              year={article.date.slice(0, 4)}
              label={t("record.kinds.article")}
            >
              <What>
                <a
                  className={styles.title}
                  href={article.href}
                  lang={article.lang === "PT" ? "pt-BR" : "en"}
                >
                  {article.title}
                </a>
              </What>
              <Meta>
                <p>
                  {article.publication} ·{" "}
                  <time className="num" dateTime={article.date}>
                    {day(article.date)}
                  </time>{" "}
                  ·{" "}
                  <abbr title={article.lang === "PT" ? "Português" : "English"}>
                    {article.lang}
                  </abbr>
                </p>
                {article.became ? (
                  <p>
                    {t.rich("record.became", {
                      name: article.became.name,
                      stars: article.became.stars.toLocaleString(locale),
                      link: libraryTag(article.became.href),
                    })}
                  </p>
                ) : null}
              </Meta>
            </Row>
          ))}

          {AWARDS.map((award) => (
            <Row
              key={award.id}
              kind="hackathon"
              year={award.year}
              label={t("record.kinds.hackathon")}
            >
              <What>
                <span className={styles.title}>
                  {t(`awards.items.${award.id}`)}
                </span>
              </What>
              <Meta>{t(`awards.positions.${award.position}`)}</Meta>
            </Row>
          ))}
        </ol>
      </RecordPreview>

      <p className="t-meta">
        {t("record.source", {
          date: formatDate(RECORD_READ, locale, {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        })}
      </p>
    </section>
  );
};

const TalkRow = ({ t, talk }: { t: T; talk: (typeof TALKS)[number] }) => (
  <Row kind="talk" year={talk.date} label={t("record.kinds.talk")}>
    <What>
      <span className={styles.title}>{t(`talks.items.${talk.id}.title`)}</span>
    </What>
    <Meta>
      <p>
        {t(`talks.items.${talk.id}.venue`)} · {t(`talks.items.${talk.id}.city`)}{" "}
        ·{" "}
        <abbr title={talk.lang === "PT" ? "Português" : "English"}>
          {talk.lang}
        </abbr>
      </p>
      <p>{t(`talks.items.${talk.id}.description`)}</p>
      <p>{external(talk.href, t(`talks.items.${talk.id}.link`))}</p>
    </Meta>
  </Row>
);

/** Now as a short letter, then every public thing on one filterable record. */
export const NotesSection = async () => {
  const t = await getTranslations("notes");
  const locale = await getLocale();

  return (
    <section id="notes" className="section wrap" aria-labelledby="notes-title">
      <div className="section-head" {...reveal()}>
        <h2 id="notes-title" className="t-h2">
          {t("title")}
        </h2>
      </div>

      <div className={styles.layout}>
        <Letter t={t} locale={locale} />
        <Record t={t} locale={locale} />
      </div>
    </section>
  );
};
