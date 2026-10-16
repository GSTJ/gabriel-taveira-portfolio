import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { MEDIUM, SPACE_CAST, SPACE_CAST_PLAYLIST, SPACE_SQUAD } from "./data";
import { Marginalia } from "./marginalia";
import { ArrowUpRight, Led, richTags } from "./shared";

/**
 * The podcast sits on a graphite face, the dark front a Braun radio puts
 * behind its dial, with the "on air" light lit. Medium and Space Squad are
 * plain rows beside it.
 */
export const Publications = async () => {
  const t = await getTranslations("publications");
  const tMarg = await getTranslations("marginalia");

  return (
    <section className="gt-section" id="publications">
      <header className="gt-section-head">
        <h2 className="gt-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
      </header>

      <div className="gt-media">
        <article className="gt-face gt-media-feature">
          <p className="gt-face-indicator">
            <Led on />
            <span className="gt-sr-only">{t("onAir")}</span>
          </p>
          <h3 className="gt-media-feature-title">
            <Balancer>{t.rich("featureTitle", richTags)}</Balancer>
            <Marginalia tilt={5}>{tMarg("spaceCastSeason")}</Marginalia>
          </h3>
          <p className="gt-media-feature-sub">{t("featureSub")}</p>
          <div className="gt-keys">
            <a
              className="gt-key"
              href={SPACE_CAST}
              target="_blank"
              rel="noreferrer"
            >
              {t("watchShow")}
              <ArrowUpRight size={14} />
            </a>
            <a
              className="gt-key gt-key-dark"
              href={SPACE_CAST_PLAYLIST}
              target="_blank"
              rel="noreferrer"
            >
              {t("playlist")}
            </a>
          </div>
        </article>

        <ul className="gt-media-list">
          <li>
            <a href={MEDIUM} target="_blank" rel="noreferrer">
              <span className="gt-media-name">{t("mediumHandle")}</span>
              <span className="gt-media-body">{t("mediumBody")}</span>
              <ArrowUpRight size={16} />
            </a>
          </li>
          <li>
            <a href={SPACE_SQUAD} target="_blank" rel="noreferrer">
              <span className="gt-media-name">{t("ambassadorTitle")}</span>
              <span className="gt-media-body">{t("ambassadorBody")}</span>
              <ArrowUpRight size={16} />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
