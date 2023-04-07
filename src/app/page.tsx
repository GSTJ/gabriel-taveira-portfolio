import { Poppins } from "next/font/google";
import WorkExperience from "@/components/WorkExperience";
import workExperiences from "@/consts/workExperiences";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function Home() {
  return (
    <main className={`flex flex-col items-center p-24 ${poppins.className}`}>
      <div className="flex flex-col items-center  max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-1">Professional Experience</h2>
          <p className="text-sm text-gray-400 max-w-md">
            A showcase of the companies I’ve worked for and some of the projects
            that came from it
          </p>
        </div>
        <div className="flex flex-col gap-10">
          {workExperiences.map((workExperience) => {
            return (
              <WorkExperience
                key={workExperience.companyName}
                {...workExperience}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
