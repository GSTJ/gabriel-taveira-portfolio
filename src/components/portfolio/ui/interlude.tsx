import type { CSSProperties } from "react";

import { getTranslations } from "next-intl/server";

import { reveal, scrub } from "./motion";

/** LinkedIn recommendations he received, quoted verbatim in English. */
const QUOTES = {
  patrick: "https://www.linkedin.com/in/patrickcason/",
  brandon: "https://www.linkedin.com/in/brandonmckay-yvr/",
} as const;

/** A word carries `w`, its place in reading order from 0 to 1. Spaces don't. */
type Token = { text: string; w?: number };

/** The quote cut into words, in three runs: before, the marked phrase, after. */
const inkRuns = (text: string, mark: string) => {
  const at = text.indexOf(mark);
  if (at === -1) throw new Error(`Quote mark "${mark}" is not in its text`);
  const runs = [text.slice(0, at), mark, text.slice(at + mark.length)].map(
    (run) => run.split(/(\s+)/).filter(Boolean),
  );
  const count = runs.flat().filter((token) => token.trim()).length;
  let index = 0;
  return runs.map((run) =>
    run.map((token): Token =>
      token.trim() ? { text: token, w: index++ / count } : { text: token },
    ),
  );
};

/** Spaces stay plain text, so the line breaks where the sentence does. */
const words = (run: Token[]) =>
  run.map(({ text, w }) =>
    w === undefined ? (
      text
    ) : (
      <span key={w} className="ink-w" style={{ "--w": w } as CSSProperties}>
        {text}
      </span>
    ),
  );

/**
 * A quiet quote between two sections, the way curvinha.app breathes between
 * chapters. Its words ink in reading order as it scrolls by and a highlighter
 * runs under the marked phrase (ui.css). Screen readers get the sentence once,
 * whole; the word-by-word copy is hidden from them.
 */
export const Interlude = async ({ id }: { id: keyof typeof QUOTES }) => {
  const t = await getTranslations(`quotes.${id}`);
  const tCommon = await getTranslations("quotes");
  const text = t("text");
  const [before = [], marked = [], after = []] = inkRuns(text, t("mark"));

  return (
    <figure className="interlude wrap" {...reveal()}>
      <blockquote className="interlude-text" {...scrub("ink")}>
        <p>
          <span className="visually-hidden">{text}</span>
          <span aria-hidden="true">
            {words(before)}
            <span
              className="ink-mark"
              style={
                {
                  "--ws": marked[0]?.w,
                  "--we": marked.at(-1)?.w,
                } as CSSProperties
              }
            >
              {words(marked)}
            </span>
            {words(after)}
          </span>
        </p>
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
