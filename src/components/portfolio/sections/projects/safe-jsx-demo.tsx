"use client";

import { useState } from "react";

import { cn } from "@/utils/cn";

import styles from "./projects.module.css";

export type SafeJsxCopy = {
  codeLabel: string;
  countLabel: string;
  fix: string;
  inbox: string;
  stray: string;
  strayLabel: string;
  badgeLabel: string;
  nothing: string;
};

/** The rule's own name and message, verbatim from eslint-plugin-safe-jsx. */
const RULE = "safe-jsx/jsx-explicit-boolean";
const MESSAGE =
  "Please ensure a boolean conversion before using the && operator with JSX";

/**
 * What `{count && <Badge />}` really renders. With `count` at 0, React prints
 * the 0. The switch applies the rule's autofix, `Boolean(count)`, and the
 * stray 0 is gone.
 */
export const SafeJsxDemo = ({ copy }: { copy: SafeJsxCopy }) => {
  const [count, setCount] = useState(0);
  const [fixed, setFixed] = useState(false);
  const leaks = count === 0 && !fixed;

  let rendered = <span className="visually-hidden">{copy.nothing}</span>;
  if (count) {
    rendered = (
      <span className={cn("num", styles.badge)} aria-label={copy.badgeLabel}>
        {count}
      </span>
    );
  } else if (leaks) {
    rendered = (
      <>
        <span className={styles.stray} aria-label={copy.strayLabel}>
          0
          <svg viewBox="0 0 40 34" aria-hidden="true" focusable="false">
            <path
              pathLength={1}
              d="M27 5C17 1 5 6 4 16s10 15 20 13 14-9 11-17c-2-5-7-7-11-7"
            />
          </svg>
        </span>
        <span className={cn("t-hand", styles.strayNote)} aria-hidden="true">
          {copy.stray}
        </span>
      </>
    );
  }

  return (
    <>
      <pre className={styles.code} aria-label={copy.codeLabel}>
        <code>
          <span className={styles.k}>{"<Row"}</span>
          {' label="Inbox"'}
          <span className={styles.k}>{">"}</span>
          {"\n  {"}
          {fixed ? (
            <span className={styles.fixed}>Boolean(count)</span>
          ) : (
            <span className={styles.squiggle}>count</span>
          )}
          {" && "}
          <span className={styles.k}>{"<Badge"}</span>
          {" n={count} "}
          <span className={styles.k}>{"/>"}</span>
          {"}\n"}
          <span className={styles.k}>{"</Row>"}</span>
        </code>
      </pre>

      <div className={styles.lintControls}>
        <span aria-hidden="true">count</span>
        <fieldset className={styles.seg}>
          <legend className="visually-hidden">{copy.countLabel}</legend>
          {[0, 3].map((n) => (
            <button
              key={n}
              type="button"
              className="num"
              aria-pressed={count === n}
              onClick={() => setCount(n)}
            >
              {n}
            </button>
          ))}
        </fieldset>
        <label className={styles.switch}>
          <input
            type="checkbox"
            role="switch"
            aria-checked={fixed}
            checked={fixed}
            onChange={(e) => setFixed(e.target.checked)}
          />
          {copy.fix}
        </label>
      </div>

      <div className={styles.render} aria-live="polite">
        <span className={styles.renderLabel}>{copy.inbox}</span>
        {rendered}
      </div>

      <p
        className={cn("t-meta", styles.lintMsg)}
        data-hidden={fixed || undefined}
      >
        <code className={styles.rule}>{RULE}</code> {MESSAGE}
      </p>
    </>
  );
};
