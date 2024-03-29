import { WorkExperience } from "@/components/WorkExperience";

import { useWorkExperiences } from "@/consts/workExperiences";

export const WorkExperiences = () => {
  const workExperiences = useWorkExperiences();

  return (
    <div className="flex flex-col gap-12">
      {workExperiences.map((workExperience) => (
        // @ts-ignore-line Server Component
        <WorkExperience key={workExperience.companyName} {...workExperience} />
      ))}
    </div>
  );
};
