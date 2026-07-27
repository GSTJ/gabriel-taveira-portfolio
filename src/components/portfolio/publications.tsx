import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { MEDIUM, SPACE_CAST, SPACE_CAST_PLAYLIST, SPACE_SQUAD } from "./data";
import { Marginalia } from "./marginalia";
import { ArrowUpRight, Eyebrow, richTags } from "./shared";

/**
 * The on-air waveform. Tapered envelope — middle bars peak taller than the
 * edges, mimicking the energy curve of a spoken phrase. Each bar also gets a
 * deterministic phase and duration jitter so they don't sweep in a single wave.
 *
 * Nothing here depends on props or state, so it is computed once at module load
 * instead of on every render.
 */
const BAR_COUNT = 22;

const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const position = i / (BAR_COUNT - 1);
  const envelope = Math.sin(position * Math.PI);
  const jitter = ((i * 9301 + 49_297) % 233) / 233;
  const peak = 6 + envelope * 14 + jitter * 6;
  const base = 2 + jitter * 2;

  return {
    id: `bar-${i}`,
    style: {
      ["--bar-base" as string]: `${base.toFixed(1)}px`,
      ["--bar-peak" as string]: `${peak.toFixed(1)}px`,
      animationDelay: `${((i * 53) % 900) - 200}ms`,
      animationDuration: `${800 + ((i * 137) % 600)}ms`,
    },
  };
});

export const Publications = async () => {
  const t = await getTranslations("publications");
  const tMarg = await getTranslations("marginalia");
  return (
    <section className="ws-section" id="publications">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
      </div>

      <div className="ws-pubs-grid">
        <article className="ws-pubs-feature">
          <div className="ws-pubs-feature-glow" />
          <div className="ws-pubs-feature-meta">
            <span className="ws-chip ws-chip-ember">
              <span className="ws-chip-dot" />
              {t("onAir")}
            </span>
            <div className="ws-pubs-bars" aria-hidden="true">
              {BARS.map((bar) => (
                <span key={bar.id} className="ws-pubs-bar" style={bar.style} />
              ))}
            </div>
          </div>
          <h3 className="ws-pubs-feature-title">
            <Balancer>
              {t.rich("featureTitle", richTags)}
              <Marginalia tilt={5}>{tMarg("spaceCastSeason")}</Marginalia>
            </Balancer>
          </h3>
          <p className="ws-pubs-feature-sub">{t("featureSub")}</p>
          <div className="ws-pubs-feature-cta">
            <a
              className="ws-btn ws-btn-primary"
              href={SPACE_CAST}
              target="_blank"
              rel="noreferrer"
            >
              {t("watchShow")} <ArrowUpRight size={14} />
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
};
