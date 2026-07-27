import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { MEDIUM, SPACE_CAST, SPACE_CAST_PLAYLIST, SPACE_SQUAD } from "./data";
import { Marginalia } from "./marginalia";
import { ArrowUpRight, Eyebrow, richTags } from "./shared";

/**
 * The decorative soundwave under the podcast feature. Tapered envelope, so the
 * middle bars peak taller than the edges the way a spoken phrase does, plus a
 * deterministic phase and duration jitter so they don't sweep as one wave.
 *
 * Everything here is a pure function of the bar's position, so it is computed
 * once at module load rather than on every render.
 */
const SOUNDWAVE_BAR_COUNT = 22;

const SOUNDWAVE_BARS = Array.from(
  { length: SOUNDWAVE_BAR_COUNT },
  (_, index) => {
    const position = index / (SOUNDWAVE_BAR_COUNT - 1);
    const envelope = Math.sin(position * Math.PI);
    const jitter = ((index * 9301 + 49297) % 233) / 233;

    return {
      id: `bar-${index}`,
      style: {
        ["--bar-base" as string]: `${(2 + jitter * 2).toFixed(1)}px`,
        ["--bar-peak" as string]: `${(6 + envelope * 14 + jitter * 6).toFixed(1)}px`,
        animationDelay: `${((index * 53) % 900) - 200}ms`,
        animationDuration: `${800 + ((index * 137) % 600)}ms`,
      },
    };
  },
);

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
              {SOUNDWAVE_BARS.map((bar) => (
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
