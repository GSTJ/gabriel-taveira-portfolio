"use client";

import { Fragment, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { WORK, type WorkItem } from "./data";
import { Flourish } from "./Flourishes";
import { Mark } from "./Mark";
import { ArrowUpRight, Eyebrow, richTags, Tag } from "./Shared";

function HighlightedEyebrow({ text }: { text: string }) {
  const parts = text.split(" · ");
  const lastIdx = parts.length - 1;
  return (
    <span className="ws-eyebrow">
      {parts.map((part, i) => {
        const isDate = i === lastIdx;
        return (
          <Fragment key={i}>
            {i > 0 && (
              <span
                className={
                  "ws-eyebrow-sep" + (isDate ? " ws-eyebrow-sep-date" : "")
                }
              >
                {" · "}
              </span>
            )}
            <span
              className={
                "ws-eyebrow-token" + (isDate ? " ws-eyebrow-token-date" : "")
              }
            >
              {part}
            </span>
          </Fragment>
        );
      })}
    </span>
  );
}

function WorkTile({ item }: { item: WorkItem }) {
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
      <h3 className="ws-work-cell-title">{t("title")}</h3>
      <p className="ws-work-cell-blurb">
        {t.rich("blurb", {
          mark: (chunks: ReactNode) => <Mark>{chunks}</Mark>,
        })}
      </p>
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
}

export function WorkGrid() {
  const t = useTranslations("work");
  return (
    <section className="ws-section" id="work">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">
          {t.rich("title", richTags)}
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
}
