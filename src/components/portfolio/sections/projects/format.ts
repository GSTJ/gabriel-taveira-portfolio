import { PROJECTS, type ProjectId } from "./data";

export const project = (id: ProjectId) => PROJECTS.find((p) => p.id === id);
export const since = (id: ProjectId) => project(id)?.since ?? "";
export const year = (iso: string) => iso.slice(0, 4);

/** Every number and date on the section, in the page's locale. */
export const formatters = (locale: string) => {
  const fmt = new Intl.NumberFormat(locale);
  const kb = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const rating = new Intl.NumberFormat(locale, { minimumFractionDigits: 1 });
  const day = (iso: string, month: "long" | "short" = "long") =>
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month,
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`));
  const monthDay = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`));
  const installs = (id: ProjectId) => fmt.format(project(id)?.installs ?? 0);
  return { fmt, kb, rating, day, monthDay, installs };
};
