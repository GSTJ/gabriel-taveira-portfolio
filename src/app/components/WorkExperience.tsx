import type { WorkExperienceData } from "@/consts/workExperiences";

const WorkExperience: React.FC<WorkExperienceData> = ({
  startDate,
  endDate,
  companyName,
  subCompanyName,
  jobTitle,
  jobDescription,
  technologies,
  jobType,
}) => {
  return (
    <div className="whitespace-nowrap">
      <div className="flex justify-between mb-5 flex-col gap-4 md:flex-row md:gap-0">
        <div className="flex flex-col">
          <div className="font-medium self-end md:self-auto md:text-right mr-4 md:absolute md:-translate-x-16 mb-2 md:mb-0 flex gap-2 md:block px-2 py-1 border border-zinc-800 w-min text-sm md:text-base md:border-none md:p-0">
            <p>{startDate}</p>
            <p className="text-zinc-500">/ {endDate ? endDate : "Now"}</p>
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
        <div className="flex items-end gap-2 flex-wrap text-xs md:ml-5">
          {jobType && (
            <div className="bg-zinc-900 h-9 pl-4 pr-4 flex w-fit items-center text-zinc-500">
              {jobType}
            </div>
          )}
          <div className="bg-zinc-900 h-9 pl-4 pr-4 flex items-center text-zinc-300 whitespace-nowrap">
            {technologies?.join(" / ")}
          </div>
        </div>
      </div>
      <p className="text-zinc-500 whitespace-pre-line text-sm">
        {jobDescription}
      </p>
    </div>
  );
};

export default WorkExperience;
