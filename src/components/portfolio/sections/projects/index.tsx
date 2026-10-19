import { getTranslations } from "next-intl/server";

import { ArrowUpRight } from "../../ui/icons";
import { reveal } from "../../ui/motion";
import { PROJECTS } from "./data";

import styles from "./projects.module.css";

/** Placeholder: every project with its real link, as a plain list. */
export const ProjectsSection = async () => {
  const t = await getTranslations("projects");

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
      <ul className={styles.list}>
        {PROJECTS.map((project, index) => (
          <li key={project.id} className={styles.item} {...reveal(index)}>
            <h3 className="t-title">{t(`items.${project.id}.title`)}</h3>
            {project.id === "curvinha" ? (
              <p className="t-meta">{t("items.curvinha.role")}</p>
            ) : null}
            <p className="t-body">{t(`items.${project.id}.body`)}</p>
            <a className="link-arrow t-small" href={project.href}>
              {project.id === "curvinha"
                ? t("items.curvinha.cta")
                : t("source")}
              <ArrowUpRight />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
