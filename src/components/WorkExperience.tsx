import type { WorkExperienceData } from "@/consts/workExperiences";

import { useTranslations } from "next-intl";

export const WorkExperience = ({
  startDate,
  endDate,
  companyName,
  subCompanyName,
  jobTitle,
  jobDescription,
  technologies,
  jobType,
}: WorkExperienceData) => {
  const t = useTranslations();

  return (
    <div className="whitespace-nowrap">
      <div className="flex justify-between mb-5 flex-col gap-4 md:flex-row md:gap-0">
        <div className="flex flex-col">
          <div className="font-medium md:self-auto md:text-right mr-4 md:absolute md:-translate-x-16 mb-2 md:mb-0 flex gap-2 md:block px-2 py-1 border border-black/10 dark:border-zinc-900 w-min text-sm md:text-base md:border-none md:p-0">
            <p>{endDate ? endDate : t("workExperience.now")}</p>
            <p className="text-zinc-500">/ {startDate}</p>
          </div>
          <div>
            <div className="flex">
              <p className="font-semibold mr-1">{companyName}</p>
              <p className="text-zinc-500">
                {subCompanyName ? `/ ${subCompanyName}` : ""}
              </p>
            </div>
            <p>{jobTitle}</p>
          </div>
        </div>
        <div className="flex items-end gap-2 flex-wrap text-sm md:text-xs md:ml-5">
          {jobType && (
            <div className="bg-black/5 dark:bg-zinc-900 font-medium h-9 pl-4 pr-4 flex w-fit items-center text-zinc-800 dark:text-zinc-500">
              {jobType}
            </div>
          )}
          <div className="bg-black/10 dark:bg-zinc-900 font-medium h-9 pl-4 pr-4 flex items-center text-zinc-800 dark:text-zinc-300 whitespace-nowrap">
            {technologies?.join(" / ")}
          </div>
        </div>
      </div>
      <p className="text-black/80 dark:text-zinc-500 whitespace-pre-line text-sm">
        {/* Implement ** as bold inside jobDescription */}
        {jobDescription.split("**").map((text, index) => {
          return index % 2 === 0 ? (
            <span key={index}>{text}</span>
          ) : (
            <strong key={index}>{text}</strong>
          );
        })}
      </p>
    </div>
  );
};
