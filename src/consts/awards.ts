import { useTranslations } from "next-intl";

export enum Trophy {
  Gold = "gold",
  Silver = "silver",
  Bronze = "bronze",
}

export interface AwardsData {
  title: string;
  trophy: Trophy;
  year: number;
  position: string;
}

export const useAwards = () => {
  const t = useTranslations();

  return [
    {
      title: t("awards.awardTitles.globalLegalHackathonSP"),
      year: 2020,
      position: t("awards.firstPlace"),
      trophy: Trophy.Gold,
    },
    {
      title: t("awards.awardTitles.maoNaCevada"),
      trophy: Trophy.Gold,
      position: t("awards.firstPlace"),
      year: 2019,
    },
    {
      title: t("awards.awardTitles.hackRibeirao"),
      trophy: Trophy.Silver,
      position: t("awards.secondPlace"),
      year: 2019,
    },
    {
      title: t("awards.awardTitles.jovemInovadorTrophy"),
      trophy: Trophy.Silver,
      position: t("awards.secondPlace"),
      year: 2019,
    },
    {
      title: t("awards.awardTitles.nasaSpaceAppsChallengeRP"),
      trophy: Trophy.Bronze,
      position: t("awards.finalist"),
      year: 2019,
    },
  ] as AwardsData[];
};
