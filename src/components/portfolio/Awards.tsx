import { getTranslations } from "next-intl/server";
import { AWARDS } from "./data";
import { Eyebrow, Pennant, richTags } from "./Shared";

export async function Awards() {
  const t = await getTranslations("awards");
  return (
    <section className="ws-section" id="awards">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="ws-section-title">{t.rich("title", richTags)}</h2>
        <p className="ws-section-sub">{t("sub")}</p>
      </div>
      <ul className="ws-awards-list">
        {AWARDS.map((a) => (
          <li
            key={a.id}
            className={"ws-awards-row ws-awards-trophy-" + a.trophy}
          >
            <span className="ws-awards-pennants" aria-hidden>
              <Pennant />
              {a.position === "first" && <Pennant width={40} />}
            </span>
            <span className="ws-awards-title">{t(`items.${a.id}`)}</span>
            <span className="ws-awards-position">
              {t(`positions.${a.position}`)}
            </span>
            <span className="ws-awards-year">{a.year}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
