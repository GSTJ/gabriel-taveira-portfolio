import type { ReactNode } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../../lifeline";
import { ArrowUpRight } from "../../ui/icons";
import { Marginalia } from "../../ui/marginalia";
import { enter } from "../../ui/motion";
import { PenUnderline } from "../../ui/pen-underline";
import { HERO_LINKS } from "./data";
import { getNpmTotal, npmSource } from "./npm";

import styles from "./hero.module.css";

/** Rich-text renderers for the title, at module scope so each is one stable function. */
const titleTags = {
  me: (chunks: ReactNode) => <span className={styles.me}>{chunks}</span>,
  pen: (chunks: ReactNode) => <PenUnderline delay={720}>{chunks}</PenUnderline>,
};

const num = (chunks: ReactNode) => <span className="num">{chunks}</span>;

const total = (chunks: ReactNode) => (
  <strong className={cn("num", styles.anchor)}>{chunks}</strong>
);

const linkTo = (url: string) => (chunks: ReactNode) => (
  <a href={url}>{chunks}</a>
);

/** "yes, really" written right after the 56, once the row has landed. */
const noteBox = (note: string) => (
  <span className={styles.noteBox}>{note}</span>
);

const noteTag = (note: string) => (chunks: ReactNode) => (
  <Marginalia note={noteBox(note)} placement="inline" delay={1200}>
    <strong className={styles.anchor}>{chunks}</strong>
  </Marginalia>
);

/** Points down: the link jumps to the proof further down the page. */
const ArrowDown = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 3v10M4 9l4 4 4-4" />
  </svg>
);

const Jump = ({ href, children }: { href: string; children: ReactNode }) => (
  <a className={cn("link-arrow", styles.jump)} href={href}>
    {children}
    <ArrowDown />
  </a>
);

/**
 * Name, offer, proof. The letter says who he is and what he's hired for; the
 * ledger beside it backs that up with three dated receipts, each one linking
 * down to where the page proves it in full.
 */
export const HeroSection = async () => {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const npm = await getNpmTotal();

  const fmt = new Intl.NumberFormat(locale);
  const day = (iso: string, year = false) =>
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      ...(year ? { year: "numeric" } : {}),
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`));

  return (
    <section
      id="hero"
      className={cn("wrap", styles.hero)}
      aria-labelledby="hero-title"
    >
      <p className={cn("t-meta", styles.letterhead)} {...enter()}>
        <span className={styles.status}>{t("status")}</span>
        <span>{t("place", { month: currentMonthLabel(locale) })}</span>
      </p>

      {/* No entrance: the headline is readable on first paint (LCP). The pen
          underline inside it still draws itself in. */}
      <h1 id="hero-title" className={cn("t-display", styles.title)}>
        {t.rich("title", titleTags)}
      </h1>

      <div className={styles.grid}>
        <div className={styles.letter}>
          {/* Two short paragraphs, so neither out-sizes the h1 as LCP at 390. */}
          <p className="t-lede" {...enter(160)}>
            {t("lede")}
          </p>
          <p className="t-lede" {...enter(200)}>
            {t("started")}
          </p>
          <div className={styles.actions} {...enter(240)}>
            <a className="btn" href="#contact">
              {t("cta.getInTouch")}
            </a>
            <a className="btn btn-ghost" href={HERO_LINKS.pdf}>
              {t("cta.downloadPdf")}
            </a>
            <a
              className={cn("link-arrow", styles.plain)}
              href={HERO_LINKS.linkedin}
            >
              {t("cta.linkedIn")}
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <ul className={styles.ledger} aria-label={t("proof.label")}>
          <li className={styles.row} {...enter(320)}>
            <div className={styles.rowHead}>
              <p className="t-meta">
                {t("proof.coinbase.org")} ·{" "}
                <span className="num">{t("proof.coinbase.dates")}</span>
              </p>
              <Jump href="#work">{t("proof.coinbase.link")}</Jump>
            </div>
            <p className={styles.rowBody}>{t("proof.coinbase.body")}</p>
          </li>
          <li className={styles.row} {...enter(400)}>
            <div className={styles.rowHead}>
              <p className="t-meta">{t("proof.teams.org")}</p>
              <Jump href="#work">{t("proof.teams.link")}</Jump>
            </div>
            <p className={styles.rowBody}>
              {t.rich("proof.teams.body", {
                num,
                note: noteTag(t("notes.yesReally")),
              })}
            </p>
          </li>
          <li className={styles.row} {...enter(480)}>
            <div className={styles.rowHead}>
              <p className="t-meta">
                {t("proof.npm.org")} ·{" "}
                <span className="num">
                  {t("proof.npm.dates", {
                    start: day(npm.start),
                    end: day(npm.end, true),
                  })}
                </span>
              </p>
              <Jump href="#projects">{t("proof.npm.link")}</Jump>
            </div>
            <p className={styles.rowBody}>
              {t.rich("proof.npm.body", {
                total: fmt.format(npm.total),
                num: total,
                src: linkTo(npmSource(npm)),
              })}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
