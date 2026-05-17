import { getLocale, getTranslations } from "next-intl/server";
import { NOW } from "./data";
import { currentMonthLabel } from "./lifeline";
import { Eyebrow, richTags } from "./Shared";

export async function NowPlaying() {
  const t = await getTranslations("now");
  const tItems = await getTranslations("now.items");
  const locale = await getLocale();
  const monthLabel = currentMonthLabel(locale);

  return (
    <section className="ws-section ws-now-section" id="about">
      <div className="ws-section-head">
        <Eyebrow>{t("eyebrow", { date: monthLabel })}</Eyebrow>
        <h2 className="ws-section-title">
          {t.rich("title", richTags)}
        </h2>
      </div>
      <ul className="ws-now-list">
        {NOW.map((n) => (
          <li key={n.id} className="ws-now-row">
            <span className={`ws-chip ws-chip-${n.tone}`}>
              <span className="ws-chip-dot" />
              {tItems(`${n.id}.chip`)}
            </span>
            <div className="ws-now-row-main">
              <h3 className="ws-now-row-title">{tItems(`${n.id}.title`)}</h3>
              <p className="ws-now-row-body">{tItems(`${n.id}.body`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
