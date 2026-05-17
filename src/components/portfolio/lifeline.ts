/**
 * Single source of truth for time-relative facts in the portfolio.
 * Everything that ages (years in industry, age at first tinker, awards
 * window) lives here so the site stays accurate without manual edits.
 */

export const CAREER_START_YEAR = 2017;
export const BIRTH_YEAR = 2000;
export const FIRST_TINKER_AGE = 8;
export const AWARDS_RANGE = "2019 → 2020" as const;

const now = () => new Date();

export function yearsInIndustry(today = now()): number {
  return today.getFullYear() - CAREER_START_YEAR;
}

export function yearsTinkering(today = now()): number {
  return today.getFullYear() - BIRTH_YEAR - FIRST_TINKER_AGE;
}

export function careerStartYear(): number {
  return CAREER_START_YEAR;
}

/** Formatted "Month YYYY" in a given locale, used by the Now-playing eyebrow. */
export function currentMonthLabel(locale: string, today = now()): string {
  return today.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });
}
