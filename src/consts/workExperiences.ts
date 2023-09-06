import { useTranslations } from "next-intl";

export interface WorkExperienceData {
  startDate: string;
  endDate?: string;
  companyName: string;
  subCompanyName?: string;
  jobTitle: string;
  jobDescription: string;
  technologies?: string[];
  jobType?: string;
}

export const useWorkExperiences = () => {
  const t = useTranslations();

  return [
    {
      startDate: "2022",
      companyName: t("workExperience.companyNames.xteam"),
      subCompanyName: t("workExperience.subCompanyNames.groundswellCalifornia"),
      jobTitle: t("workExperience.seniorSoftwareEngineer"),
      technologies: ["React", "React Native", "Node.JS"],
      jobDescription: t("workExperience.jobDescriptions.xteamDescription"),
    },
    {
      startDate: "2022",
      companyName: t("workExperience.companyNames.kustomer"),
      jobTitle: t("workExperience.seniorSoftwareEngineer"),
      jobType: t("workExperience.jobTypes.contractor"),
      technologies: ["React", "Node.JS"],
      jobDescription: t("workExperience.jobDescriptions.kustomerDescription"),
    },
    {
      startDate: "2022",
      endDate: "2023",
      companyName: t("workExperience.companyNames.meta"),
      subCompanyName: t("workExperience.subCompanyNames.kustomerNewYork"),
      jobTitle: t("workExperience.seniorSoftwareEngineer"),
      jobType: t("workExperience.jobTypes.contractor"),
      technologies: ["React", "Node.JS"],
      jobDescription: t("workExperience.jobDescriptions.metaDescription"),
    },

    {
      startDate: "2020",
      endDate: "2022",
      companyName: t("workExperience.companyNames.zeDelivery"),
      subCompanyName: t("workExperience.subCompanyNames.anheuserBuschInbev"),
      jobTitle: t("workExperience.frontendEngineerIII"),
      technologies: ["React", "React Native", "Node.JS"],
      jobDescription: t("workExperience.jobDescriptions.zeDeliveryDescription"),
    },
    {
      startDate: "2019",
      endDate: "2020",
      companyName: t("workExperience.companyNames.alfredDelivery"),
      jobTitle: t("workExperience.softwareEngineer"),
      technologies: ["React Native", "Node.JS"],
      jobDescription: t(
        "workExperience.jobDescriptions.alfredDeliveryDescription"
      ),
    },
    {
      startDate: "2015",
      endDate: "2019",
      companyName: t("workExperience.companyNames.microImportGroup"),
      jobTitle: t("workExperience.fullStackDeveloper"),
      technologies: ["React", "Node.JS", "PHP"],
      jobDescription: t(
        "workExperience.jobDescriptions.microImportGroupDescription"
      ),
    },
  ] as WorkExperienceData[];
};
