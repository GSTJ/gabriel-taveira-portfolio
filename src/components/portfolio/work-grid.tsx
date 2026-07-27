"use client";

import {
  Fragment,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

import { WORK, type WorkItem } from "./data";
import { Flourish } from "./flourishes";
import { Mark } from "./mark";
import { ArrowUpRight, Eyebrow, richTags, Tag } from "./shared";

/**
 * Splits an eyebrow like "COINBASE · G2I · 2024 → 25" into its tokens, keeping
 * the separator with the token that follows it. The trailing token is the date
 * range and gets its own styling.
 *
 * `id` exists because the token text alone isn't guaranteed unique within one
 * eyebrow, and a bare array index is not a stable key.
 */
const eyebrowTokens = (text: string) => {
  const parts = text.split(" · ");
  return parts.map((part, index) => ({
    id: `${text}#${index}`,
    part,
    isDate: index === parts.length - 1,
    isFirst: index === 0,
  }));
};

const HighlightedEyebrow = ({ text }: { text: string }) => (
  <span className="ws-eyebrow">
    {eyebrowTokens(text).map(({ id, part, isDate, isFirst }) => (
      <Fragment key={id}>
        {!isFirst && (
          <span
            className={`ws-eyebrow-sep${isDate ? " ws-eyebrow-sep-date" : ""}`}
          >
            {" · "}
          </span>
        )}
        <span
          className={`ws-eyebrow-token${isDate ? " ws-eyebrow-token-date" : ""}`}
        >
          {part}
        </span>
      </Fragment>
    ))}
  </span>
);

/**
 * `<mark>` chunks in the blurb translation render through the `<Mark>` sweep.
 * Module scope so it isn't a component declared during render.
 */
const blurbTags = { mark: (chunks: ReactNode) => <Mark>{chunks}</Mark> };

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
      className={`ws-work-cell ws-work-tone-${item.tone}${
        hover ? " is-hover" : ""
      }`}
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
