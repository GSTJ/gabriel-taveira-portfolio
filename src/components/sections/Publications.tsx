import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";

export const Publications = () => {
  const t = useTranslations();

  return (
    <div className="text-black/80 dark:text-zinc-500 break-all whitespace-pre-line gap-2 flex flex-col">
      <div className="lg:flex gap-1">
        <p>{t("publications.spaceCastHost")}</p>
        <Link
          target="_blank"
          className="text-blue-400"
          href={t("publications.spaceCastLink")}
        >
          {t("publications.spaceCastLink")}
        </Link>
      </div>
      <div className="lg:flex gap-1">
        <p>{t("publications.mediumArticles")}</p>
        <Link
          target="_blank"
          className="text-blue-400"
          href={t("publications.mediumLink")}
        >
          {t("publications.mediumLink")}
        </Link>
      </div>
      <div className="lg:flex gap-1">
        <p>{t("publications.spaceSquadAmbassador")}</p>
        <Link
          target="_blank"
          className="text-blue-400"
          href={t("publications.spaceSquadAmbassadorLink")}
        >
          {t("publications.spaceSquadAmbassadorLink")}
        </Link>
      </div>
      <p className="break-normal">{t("publications.eventsInfo")}</p>
    </div>
  );
};
