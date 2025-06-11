import { WorkExperience } from "@/components/work-experience";

import { useWorkExperiences } from "@/consts/work-experiences";

export const WorkExperiences = () => {
  const workExperiences = useWorkExperiences();

  return (
    <div className="flex flex-col gap-12">
      {workExperiences.map((workExperience) => (
        <WorkExperience key={workExperience.companyName} {...workExperience} />
      ))}
    </div>
  );
};
