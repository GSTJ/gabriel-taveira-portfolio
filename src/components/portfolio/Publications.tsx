import { getTranslations } from "next-intl/server";
import { MEDIUM, SPACE_CAST, SPACE_CAST_PLAYLIST, SPACE_SQUAD } from "./data";
import { Marginalia } from "./Marginalia";
import { ArrowUpRight, Eyebrow, richTags } from "./Shared";

export async function Publications() {
  const t = await getTranslations("publications");
  const tMarg = await getTranslations("marginalia");
  return (
    <section className="ws-section" id="publications">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">
          {t.rich("title", richTags)}
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
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="ws-pubs-bar"
                  style={{ animationDelay: `${(i % 6) * 90}ms` }}
                />
              ))}
            </div>
          </div>
          <h3 className="ws-pubs-feature-title">
            {t.rich("featureTitle", richTags)}
            <Marginalia tilt={5}>{tMarg("spaceCastSeason")}</Marginalia>
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
}
