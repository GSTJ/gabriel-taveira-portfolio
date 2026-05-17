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
          {t.rich("title", richTags)}
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
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </li>
        ))}
      </ul>
    </section>
  );
}
