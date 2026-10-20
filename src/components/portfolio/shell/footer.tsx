import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import { currentMonthLabel } from "../lifeline";
import { NOW_UPDATED } from "../sections/notes/data";

import styles from "./shell.module.css";

export const Footer = async () => {
  const t = await getTranslations("common.footer");
  const locale = await getLocale();

  return (
    <footer className={styles.footer}>
      <div className={cn("wrap", styles.footerRow)}>
        <p>{t("meta")}</p>
        <p className={styles.footerTag}>
          {t("updated", { date: currentMonthLabel(locale, NOW_UPDATED) })}
        </p>
      </div>
    </footer>
  );
};
