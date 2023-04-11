import { WorkExperience } from "@/components/WorkExperience";
import workExperiences from "@/consts/workExperiences";

export const WorkExperiences = () => {
  return (
    <div className="flex flex-col gap-12">
      {workExperiences.map((workExperience) => (
        <WorkExperience key={workExperience.companyName} {...workExperience} />
      ))}
    </div>
  );
};
