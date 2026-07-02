import { getTranslations } from "next-intl/server";
import { MEDIUM, SPACE_CAST, SPACE_CAST_PLAYLIST, SPACE_SQUAD } from "./data";
import { ArrowUpRight, Eyebrow, richTags } from "./Shared";

/* Sunburst — 48 cognac rays behind the Space Cast poster. Static; the
   warmth does the work. */
function Sunburst() {
  return (
    <svg className="ws-pubs-sunburst" viewBox="-100 -100 200 200" aria-hidden>
      <g>
        {Array.from({ length: 48 }, (_, i) => (
          <polygon
            key={i}
            points="0,0 -2.6,-100 2.6,-100"
            transform={`rotate(${i * 7.5})`}
            fill="#a4581d"
          />
        ))}
      </g>
    </svg>
  );
}

export async function Publications() {
  const t = await getTranslations("publications");
  return (
    <section className="ws-section" id="publications">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">{t.rich("title", richTags)}</h2>
      </div>

      <div className="ws-pubs-grid">
        <article className="ws-pubs-feature">
          <Sunburst />
          <span className="ws-pubs-onair">
            <span className="ws-pubs-onair-dot" />
            {t("onAir")}
          </span>
          <h3 className="ws-pubs-feature-title">
            {t.rich("featureTitle", richTags)}
          </h3>
          <p className="ws-pubs-feature-sub">{t("featureSub")}</p>
          <div className="ws-pubs-feature-cta">
            <a
              className="ws-btn ws-btn-primary"
              href={SPACE_CAST}
              target="_blank"
              rel="noreferrer"
            >
              {t("watchShow")}
            </a>
            <a
              className="ws-btn ws-btn-ghost"
              href={SPACE_CAST_PLAYLIST}
              target="_blank"
              rel="noreferrer"
            >
              {t("playlist")}
            </a>
          </div>
        </article>

        <div className="ws-pubs-side">
          <a
            className="ws-pubs-card"
            href={MEDIUM}
            target="_blank"
            rel="noreferrer"
          >
            <Eyebrow>{t("mediumEyebrow")}</Eyebrow>
            <h4>{t("mediumHandle")}</h4>
            <p>{t("mediumBody")}</p>
            <ArrowUpRight size={16} />
          </a>
          <a
            className="ws-pubs-card"
            href={SPACE_SQUAD}
            target="_blank"
            rel="noreferrer"
          >
            <Eyebrow>{t("ambassadorEyebrow")}</Eyebrow>
            <h4>{t("ambassadorTitle")}</h4>
            <p>{t("ambassadorBody")}</p>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
