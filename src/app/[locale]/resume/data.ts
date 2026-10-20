import type { WorkItem } from "@/components/portfolio/sections/work/data";

import { AWARDS, TALKS } from "@/components/portfolio/sections/notes/data";

/**
 * Each job as an ATS reads it: the title, and the months where a source has
 * them ("YYYY-MM"). Without months the row falls back to `WORK`'s years.
 * Titles come from his earlier site's work history; Coinbase's months from
 * the placement (Mar 2024) and the contract's planned end (Dec 2025). Alfred
 * stays at the official title; being the only engineer goes in its bullet.
 * Keep each title's role word bare ("Engineer", not "Engineer,"): parsers
 * match it as a whole word.
 */
export const RESUME_JOBS: Record<
  WorkItem["id"],
  { title: string; start?: string; end?: string }
> = {
  consulting: { title: "Fractional CTO & Engineering Consultant" },
  coinbase: {
    title: "App Infrastructure Engineer",
    start: "2024-03",
    end: "2025-12",
  },
  ateam: { title: "Lead Software Engineer" },
  meta: { title: "Senior Software Engineer (Contract)" },
  xteam: { title: "Senior Software Engineer" },
  ze: { title: "Frontend Engineer III" },
  alfred: { title: "Software Engineer" },
  micro: { title: "Full Stack Developer" },
};

/** Talks he gave (Space Squad was a mentoring program) and hackathon wins. */
export const RESUME_TALKS = TALKS.filter((talk) => talk.id !== "spaceSquad");
export const RESUME_AWARDS = AWARDS.filter((a) => a.position === "first");
