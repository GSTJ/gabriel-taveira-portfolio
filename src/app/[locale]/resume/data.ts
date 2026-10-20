import type { WorkItem } from "@/components/portfolio/sections/work/data";

import { AWARDS, TALKS } from "@/components/portfolio/sections/notes/data";

/**
 * Each job as an ATS reads it: the title and months exactly as his LinkedIn
 * shows them (read 2026-10-20), so a recruiter or background check finds the
 * same thing in both places. Keep each title's role word bare ("Engineer",
 * not "Engineer,"): parsers match it as a whole word.
 */
export const RESUME_JOBS: Record<
  WorkItem["id"],
  { title: string; start?: string; end?: string }
> = {
  consulting: { title: "Fractional CTO & Engineering Consultant" },
  coinbase: {
    title: "Senior Software Engineer",
    start: "2024-03",
    end: "2025-12",
  },
  ateam: { title: "Lead Mobile Engineer", start: "2023-09", end: "2025-02" },
  meta: { title: "Senior Software Engineer", start: "2022-10", end: "2023-12" },
  xteam: {
    title: "Senior Software Engineer",
    start: "2022-04",
    end: "2023-09",
  },
  ze: { title: "Software Engineer III", start: "2020-09", end: "2022-04" },
  alfred: { title: "Mobile Engineer", start: "2019-10", end: "2020-09" },
  micro: { title: "Software Engineer", start: "2017-04", end: "2019-10" },
};

/** Talks he gave (Space Squad was a mentoring program) and hackathon wins. */
export const RESUME_TALKS = TALKS.filter((talk) => talk.id !== "spaceSquad");
export const RESUME_AWARDS = AWARDS.filter((a) => a.position === "first");
