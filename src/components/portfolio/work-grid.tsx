"use client";

import {
  Fragment,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

import { cn } from "@/utils/cn";

import { WORK, type WorkItem } from "./data";
import { Flourish } from "./flourishes";
import { Mark } from "./mark";
import { ArrowUpRight, Eyebrow, richTags, Tag } from "./shared";

/**
 * A work tile carries the accent of its item's tone, and lifts while the
 * pointer is inside it.
 */
const workCell = cva("ws-work-cell", {
  variants: {
    tone: {
      ember: "ws-work-tone-ember",
      coral: "ws-work-tone-coral",
      brass: "ws-work-tone-brass",
      teal: "ws-work-tone-teal",
    },
    hover: { true: "is-hover", false: "" },
  },
});

/**
 * The render callback for the `<mark>` tag used inside work blurbs. Defined at
 * module scope so it is one stable component, not a new one per render.
 */
const blurbTags = {
  mark: (chunks: ReactNode) => <Mark>{chunks}</Mark>,
};

/**
 * Eyebrows are dot-separated ("COINBASE · G2I · 2024 → 25") and the last token
 * is always the date, which gets its own styling. Tokens repeat across items,
 * so the key pairs the position with the text rather than using either alone.
 */
const eyebrowTokens = (text: string) => {
  const parts = text.split(" · ");
  return parts.map((part, index) => ({
    key: `${index}-${part}`,
    part,
    first: index === 0,
    isDate: index === parts.length - 1,
  }));
};

const HighlightedEyebrow = ({ text }: { text: string }) => (
  <span className="ws-eyebrow">
    {eyebrowTokens(text).map((token) => (
      <Fragment key={token.key}>
        {!token.first && (
          <span
            className={cn(
              "ws-eyebrow-sep",
              token.isDate && "ws-eyebrow-sep-date",
            )}
          >
            {" · "}
          </span>
        )}
        <span
          className={cn(
            "ws-eyebrow-token",
            token.isDate && "ws-eyebrow-token-date",
          )}
        >
          {token.part}
        </span>
      </Fragment>
    ))}
  </span>
);

const WorkTile = ({ item }: { item: WorkItem }) => {
  const t = useTranslations(`work.items.${item.id}`);
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [hover, setHover] = useState(false);
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setCoords({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <a
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className={workCell({ tone: item.tone, hover })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMouseMove}
      style={
        {
          "--mx": `${coords.x}%`,
          "--my": `${coords.y}%`,
        } as CSSProperties
      }
    >
      <div className="ws-work-cell-glow" />
      <div className="ws-work-cell-flourish">
        <Flourish kind={item.flourish} hover={hover} />
      </div>
      <div className="ws-work-cell-top">
        <HighlightedEyebrow text={item.eyebrow} />
      </div>
      <h3 className="ws-work-cell-title">
        <Balancer>{t("title")}</Balancer>
      </h3>
      <p className="ws-work-cell-blurb">{t.rich("blurb", blurbTags)}</p>
      <div className="ws-work-cell-foot">
        <div className="ws-work-cell-tags">
          {item.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <span className="ws-work-cell-cta">
          {t("cta")} <ArrowUpRight size={14} />
        </span>
      </div>
    </a>
  );
};

export const WorkGrid = () => {
  const t = useTranslations("work");
  return (
    <section className="ws-section" id="work">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="ws-section-sub">{t("sub")}</p>
      </div>
      <div className="ws-work-grid">
        {WORK.map((w) => (
          <WorkTile key={w.id} item={w} />
        ))}
      </div>
    </section>
  );
};
