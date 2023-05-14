import { WorkExperience } from "@/components/WorkExperience";
import { getWorkExperiences } from "@/consts/workExperiences";

export const WorkExperiences = async () => {
  const workExperiences = await getWorkExperiences();

  return (
    <div className="flex flex-col gap-12">
      {workExperiences.map((workExperience) => (
        // @ts-ignore-line Server Component
        <WorkExperience key={workExperience.companyName} {...workExperience} />
      ))}
    </div>
  );
};
