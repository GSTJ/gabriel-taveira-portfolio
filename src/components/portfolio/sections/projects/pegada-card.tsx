"use client";

import { useId, type ReactNode } from "react";

import Image from "next/image";

import { cn } from "@/utils/cn";

import { ArrowUpRight } from "../../ui/icons";
import {
  PEGADA_SHIPPED,
  PEGADA_STEPS,
  type PegadaShippedId,
  type PegadaStep,
} from "./data";
import { TourScreen, TourSteps, useTour, type TourStep } from "./tour";

import styles from "./projects.module.css";

export type PegadaCopy = {
  title: string;
  role: string;
  body: string;
  stepsLabel: string;
  hint: string;
  steps: Record<PegadaStep, TourStep & { alt: string }>;
  luaAlt: string;
  caption: string;
  shipped: {
    title: string;
    items: Record<
      PegadaShippedId,
      { title: string; detail: string; date: string }
    >;
  };
  readOn: string;
};

/**
 * Pegada in three real screens (deck, match, chat) on Lua's photo. The steps
 * drive the phone, and a swipe on the phone turns it too. `facts` are the
 * sourced receipts (commits, Product Hunt, GitHub), rich text from the
 * server; the band at the foot is what he shipped in it lately.
 */
export const PegadaCard = ({
  copy,
  links,
  facts,
}: {
  copy: PegadaCopy;
  links: { appStore: string; googlePlay: string; github: string };
  facts: { commits: ReactNode; productHunt: ReactNode; github: ReactNode };
}) => {
  const id = useId();
  const tour = useTour(PEGADA_STEPS.length);

  return (
    <article
      className={cn(styles.card, styles.pegada)}
      aria-labelledby={`${id}-title`}
      data-playing={tour.playing ? "" : undefined}
    >
      <div className={styles.pgCopy}>
        <div className={styles.pgHead}>
          <h3 id={`${id}-title`} className={cn("t-h1", styles.cvTitle)}>
            {copy.title}
          </h3>
          <p className={cn("t-small", styles.cvRole)}>{copy.role}</p>
          <p className={styles.cvBody}>{copy.body}</p>
        </div>

        <TourSteps
          tour={tour}
          id={id}
          label={copy.stepsLabel}
          order={PEGADA_STEPS}
          steps={copy.steps}
        />

        <div className={styles.pgFoot}>
          <ul className={styles.pgLinks}>
            <li>
              <a className="link-arrow" href={links.appStore}>
                App Store
                <ArrowUpRight />
              </a>
            </li>
            <li>
              <a className="link-arrow" href={links.googlePlay}>
                Google Play
                <ArrowUpRight />
              </a>
            </li>
            <li>
              <a className="link-arrow" href={links.github}>
                GitHub
                <ArrowUpRight />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <figure className={styles.pgStage}>
        <div className={styles.pgPhoto}>
          <Image
            src="/projects/pegada/lua.webp"
            fill
            sizes="(width < 760px) 66vw, 300px"
            alt={copy.luaAlt}
          />
        </div>
        <TourScreen
          tour={tour}
          id={id}
          count={PEGADA_STEPS.length}
          className={styles.pgScreen}
          render={(i) => {
            const name = PEGADA_STEPS[i] ?? "deck";
            return (
              <Image
                src={`/projects/pegada/${name}.webp`}
                width={450}
                height={980}
                sizes="(width < 760px) 46vw, 220px"
                alt={copy.steps[name].alt}
              />
            );
          }}
        />
        <figcaption className={cn("t-meta", styles.pgCaption)}>
          {copy.caption} <span className={styles.pgHint}>{copy.hint}</span>
        </figcaption>
      </figure>

      <ul className={styles.pgFacts}>
        <li>{facts.commits}</li>
        <li>{facts.productHunt}</li>
        <li>{facts.github}</li>
      </ul>

      <section className={styles.pgShipped} aria-labelledby={`${id}-shipped`}>
        <h4 id={`${id}-shipped`} className={styles.pgShippedTitle}>
          {copy.shipped.title}
        </h4>
        <ol className={styles.prs}>
          {PEGADA_SHIPPED.map((pr) => (
            <li key={pr.id} className={styles.pr}>
              <a className={styles.prLink} href={pr.href}>
                <span className="t-mono">#{pr.number}</span>
                <span className={styles.prTitle}>
                  {copy.shipped.items[pr.id].title}
                </span>
              </a>
              <span className={cn("t-small", styles.prDetail)}>
                {copy.shipped.items[pr.id].detail}
              </span>
              <span className="t-meta">{copy.shipped.items[pr.id].date}</span>
            </li>
          ))}
        </ol>
        <p className="t-meta">{copy.readOn}</p>
      </section>
    </article>
  );
};
