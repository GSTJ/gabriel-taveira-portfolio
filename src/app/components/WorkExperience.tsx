import { WorkExperienceData } from "@/consts/workExperiences";

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
    <div className="flex">
      <p className="font-medium flex-shrink-0 text-right mr-4">
        {startDate}
        <br />/ {endDate ? endDate : "Now"}
      </p>
      <div className="whitespace-nowrap">
        <div className="flex justify-between mb-5 flex-col gap-4 md:flex-row md:gap-0">
          <div>
            <div className="flex">
              <p className="font-semibold mr-1">{companyName}</p>
              <p className="text-gray-400">
                {subCompanyName ? `/ ${subCompanyName}` : ""}
              </p>
            </div>
            <p>{jobTitle}</p>
          </div>
          <div className="flex items-end gap-2 flex-wrap">
            {jobType && (
              <div className="bg-zinc-900 h-9 pl-4 pr-4 flex w-fit items-center text-gray-500">
                {jobType}
              </div>
            )}
            <div className="bg-zinc-900 h-9 pl-4 pr-4 flex items-center text-gray-300 whitespace-nowrap">
              {technologies?.join(" / ")}
            </div>
          </div>
        </div>
        <p className="text-gray-400 whitespace-pre-line">{jobDescription}</p>
      </div>
    </div>
  );
};

export default WorkExperience;
