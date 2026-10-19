import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { reveal } from "../../ui/motion";
import { NPM_READ_TO, PEGADA, READ_ON, SECURITY_PRS, type RowId } from "./data";
import { formatters, since, year } from "./format";
import {
  CodePushPanel,
  CurvinhaPanel,
  MagicModalPanel,
  MagicToastPanel,
  ObservabilityPanel,
  PegadaPanel,
  SafeJsxPanel,
  SecurityPanel,
} from "./panels";
import { ProjectIndex } from "./project-index";

import styles from "./projects.module.css";

const PANELS = {
  curvinha: <CurvinhaPanel />,
  pegada: <PegadaPanel />,
  magicModal: <MagicModalPanel />,
  safeJsx: <SafeJsxPanel />,
  codePush: <CodePushPanel />,
  magicToast: <MagicToastPanel />,
  observability: <ObservabilityPanel />,
  security: <SecurityPanel />,
} satisfies Record<RowId, unknown>;

/**
 * The projects as an index you can scan in seconds: what it is, my role, the
 * year, and one dated number per row. Picking a row puts its proof on the
 * stage (see panels.tsx).
 */
export const ProjectsSection = async () => {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const { day, rating, installs } = formatters(locale);

  const numbers: Record<RowId, string> = {
    curvinha: t("items.curvinha.number", {
      date: day(since("curvinha"), "short"),
    }),
    pegada: t("items.pegada.number", {
      rating: rating.format(PEGADA.rating),
      count: PEGADA.ratings,
    }),
    magicModal: t("items.magicModal.number", {
      count: installs("magicModal"),
    }),
    safeJsx: t("items.safeJsx.number", { count: installs("safeJsx") }),
    codePush: t("items.codePush.number", { count: installs("codePush") }),
    magicToast: t("items.magicToast.number", {
      count: installs("magicToast"),
    }),
    observability: t("items.observability.number", {
      count: installs("observability"),
    }),
    security: t("items.security.number", { count: SECURITY_PRS.length }),
  };

  const head = (id: RowId) => (
    <>
      <span className={styles.rowName}>{t(`items.${id}.title`)}</span>
      <span className={cn("t-meta", styles.rowMeta)}>
        {[
          t(`items.${id}.kind`),
          t(`items.${id}.role`),
          id === "security" ? "" : year(since(id)),
        ]
          .filter(Boolean)
          .join(" · ")}
      </span>
      <span className={cn("num", styles.rowNumber)}>{numbers[id]}</span>
      <svg
        className={styles.rowMark}
        viewBox="0 0 16 16"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </>
  );

  const heads = {
    curvinha: head("curvinha"),
    pegada: head("pegada"),
    magicModal: head("magicModal"),
    safeJsx: head("safeJsx"),
    codePush: head("codePush"),
    magicToast: head("magicToast"),
    observability: head("observability"),
    security: head("security"),
  };

  return (
    <section
      id="projects"
      className="section wrap"
      aria-labelledby="projects-title"
    >
      <div className="section-head" {...reveal()}>
        <h2 id="projects-title" className="t-h2">
          {t("title")}
        </h2>
        <p>{t("sub")}</p>
      </div>

      <div {...reveal()}>
        <ProjectIndex heads={heads} panels={PANELS} />
        <p className={cn("t-meta", styles.sources)}>
          {t("sources", {
            npmDate: day(NPM_READ_TO),
            readDate: day(READ_ON),
          })}
        </p>
      </div>
    </section>
  );
};
