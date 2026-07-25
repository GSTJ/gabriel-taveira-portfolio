import Balancer from "react-wrap-balancer";
import { getTranslations } from "next-intl/server";
import { AWARDS } from "./data";
import { Eyebrow, richTags } from "./Shared";

export async function Awards() {
  const t = await getTranslations("awards");
  return (
    <section className="ws-section" id="awards">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">
          <Balancer>{t.rich("title", richTags)}</Balancer>
        </h2>
        <p className="ws-section-sub">{t("sub")}</p>
      </div>
      <ul className="ws-awards-list">
        {AWARDS.map((a) => (
          <li
            key={a.id}
            className={"ws-awards-row ws-awards-trophy-" + a.trophy}
          >
            <span className="ws-awards-year">{a.year}</span>
            <span className="ws-awards-position">
              {t(`positions.${a.position}`)}
            </span>
            <span className="ws-awards-title">{t(`items.${a.id}`)}</span>
            <svg
              className="ws-awards-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="miter"
              strokeMiterlimit="2"
              aria-hidden="false"
              role="img"
            >
              <title>Hackathon trophy</title>
              {/* simplified for 20px — fewer accents, slightly thicker primary */}
              <path
                d="M6.2 2.3 C 9 1.9, 15.2 1.9, 17.9 2.2 L 17.7 9.1 C 17.8 12.7, 14.9 15.4, 12.05 15.35 C 9.05 15.4, 6.25 12.6, 6.35 9.05 Z"
                strokeWidth="1.9"
              />
              <path
                d="M6.25 4.1 C 4.7 3.95, 3.05 4.6, 3.15 6.4 C 3.25 8.25, 4.85 9.15, 6.55 9.05"
                strokeWidth="1.7"
              />
              <path
                d="M17.85 4.1 C 19.4 3.9, 21 4.65, 20.85 6.45 C 20.7 8.25, 19.15 9.2, 17.5 9.0"
                strokeWidth="1.7"
              />
              <path d="M10.1 15.2 C 10 16.4, 10.05 17.2, 10.15 17.6 C 9.4 18.4, 8.55 19.4, 8.4 21.7" strokeWidth="1.7" />
              <path d="M14 15.25 C 14.1 16.4, 14 17.2, 13.9 17.7 C 14.7 18.5, 15.55 19.5, 15.65 21.65" strokeWidth="1.7" />
              <path d="M5.4 21.85 C 9 22.2, 15 22.15, 18.65 21.8" strokeWidth="2.2" />
            </svg>
          </li>
        ))}
      </ul>
    </section>
  );
}
