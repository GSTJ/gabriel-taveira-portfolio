import { getTranslations } from "next-intl/server";

import { reveal } from "./motion";

/** LinkedIn recommendations he received, quoted verbatim in English. */
const QUOTES = {
  patrick: "https://www.linkedin.com/in/patrickcason/",
  brandon: "https://www.linkedin.com/in/brandonmckay-yvr/",
} as const;

/** A quiet quote between two sections, the way curvinha.app breathes between chapters. */
export const Interlude = async ({ id }: { id: keyof typeof QUOTES }) => {
  const t = await getTranslations(`quotes.${id}`);
  const tCommon = await getTranslations("quotes");

  return (
    <figure className="interlude wrap" {...reveal()}>
      <blockquote className="interlude-text">
        <p>{t("text")}</p>
      </blockquote>
      <figcaption className="t-meta">
        <a href={QUOTES[id]} rel="noopener">
          {t("name")}
        </a>
        , {t("role")}
        {tCommon.has("translated") ? <> · {tCommon("translated")}</> : null}
      </figcaption>
    </figure>
  );
};
