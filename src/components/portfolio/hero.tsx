import { getTranslations } from "next-intl/server";

import { CURRICULUM_PDF, LINKEDIN } from "./data";
import { yearsInIndustry, yearsTinkering } from "./lifeline";
import { Marginalia } from "./marginalia";
import { ArrowRight, ArrowUpRight, Led, richTags } from "./shared";

/**
 * The first viewport: the name set like a model designation on the left, and
 * a device plate on the right carrying the spec table and the availability
 * light. The green key is the only colored control on the page.
 */
export const Hero = async () => {
  const t = await getTranslations("hero");
  const tMarg = await getTranslations("marginalia");
  const years = yearsInIndustry();

  const specs = [
    { id: "years", value: `${years}+` },
    { id: "reports", value: "56", note: tMarg("yesReally") },
    { id: "platforms", value: "iOS · Android" },
    { id: "stack", value: "React Native · Expo" },
    { id: "since", value: t("spec.sinceValue") },
    { id: "base", value: t("spec.baseValue") },
  ] as const;

  return (
    <section className="gt-hero" id="top">
      <div className="gt-hero-copy">
        <h1 className="gt-hero-name">
          {t("name")} <span>{t("surname")}</span>
        </h1>
        <p className="gt-hero-role">{t("role")}</p>
        <p className="gt-hero-intro">
          {t.rich("intro", { ...richTags, years })}
        </p>
        <p className="gt-hero-aside">
          {t("intro2", { tinkering: yearsTinkering() })}
        </p>
        <div className="gt-keys">
          <a className="gt-key gt-key-go" href="#contact">
            {t("startProject")}
            <ArrowRight />
          </a>
          <a
            className="gt-key"
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
          >
            {t("viewLinkedIn")}
            <ArrowUpRight size={14} />
          </a>
          <a
            className="gt-key gt-key-flat"
            href={CURRICULUM_PDF}
            target="_blank"
            rel="noreferrer"
          >
            {t("downloadPdf")}
          </a>
        </div>
      </div>

      <aside className="gt-plate" aria-label={t("plateLabel")}>
        <div className="gt-plate-top">
          <div className="gt-grille" aria-hidden />
          <p className="gt-plate-status">
            <Led on />
            {t("availability")}
          </p>
        </div>
        <dl className="gt-spec">
          {specs.map((s) => (
            <div key={s.id} className="gt-spec-row">
              <dt>{t(`spec.${s.id}`)}</dt>
              <dd>
                {s.value}
                {"note" in s ? (
                  <Marginalia tilt={-5}>{s.note}</Marginalia>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
        <p className="gt-plate-type">{t("plateType", { years })}</p>
      </aside>
    </section>
  );
};
