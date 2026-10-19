import { getTranslations } from "next-intl/server";

import { cn } from "@/utils/cn";

import styles from "./shell.module.css";

export const Footer = async () => {
  const t = await getTranslations("common.footer");

  return (
    <footer className={styles.footer}>
      <div className={cn("wrap", styles.footerRow)}>
        <p>{t("meta")}</p>
        <p className={styles.footerTag}>{t("tag")}</p>
        <p className={cn("t-hand", styles.signoff)}>{t("madeWith")}</p>
      </div>
    </footer>
  );
};
