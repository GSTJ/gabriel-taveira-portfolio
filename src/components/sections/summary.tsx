import { useTranslations } from "next-intl";

export const Summary = () => {
  const t = useTranslations();

  return (
    <ul className="text-black/80 dark:text-zinc-500 text-left mb-16 list-disc gap-4 flex flex-col">
      <li>{t("summary.point1")}</li>
      <li>{t("summary.point2")}</li>
      <li>{t("summary.point3")}</li>
      <li>{t("summary.point4")}</li>
      <li>{t("summary.point5")}</li>
    </ul>
  );
};
