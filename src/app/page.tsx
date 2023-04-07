import { Poppins } from "next/font/google";
import WorkExperience from "@/components/WorkExperience";
import workExperiences from "@/consts/workExperiences";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  step?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  step,
}) => {
  return (
    <div className="text-center mt-16 mb-10">
      {Boolean(step) && (
        <p className="text-red-500 uppercase text-sm mb-2">Step {step}</p>
      )}
      <h2 className="text-4xl font-bold mb-1">{title}</h2>
      <p className="text-sm text-gray-400 max-w-md">{subtitle}</p>
    </div>
  );
};

const SummarySection = () => {
  return (
    <ul className="text-gray-400 text-left mb-16 list-disc gap-4 flex flex-col">
      <li>
        Over 7 years of professional experience in the software development
        industry, working with projects of varying sizes, from startups to tech
        giants.
      </li>
      <li>
        Proven expertise in React Native, JavaScript, and various programming
        languages.
      </li>
      <li>
        Strong focus on user experience, design systems, and unit, integration,
        and E2E testing.
      </li>
      <li>
        Excellent communication and leadership skills, with experience in public
        speaking, content creation, and mentoring.
      </li>
      <li>
        Dual Brazilian and Italian citizenship, open to national and
        international opportunities.
      </li>
    </ul>
  );
};

const WorkExperiencesSection = () => {
  return (
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
  );
};

export default function Home() {
  return (
    <main className={`flex flex-col items-center p-24 ${poppins.className}`}>
      <div className="flex flex-col items-center max-w-6xl">
        <h1 className="text-7xl font-bold flex gap-4 mb-10 flex-wrap justify-center">
          <p>Gabriel</p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">
            Taveira
          </p>
        </h1>
        <SectionHeader
          step={1}
          title="Objective"
          subtitle="Let’s get to know each other!"
        />
        <p className="text-gray-400">
          I’m an experienced developer with a strong background in programming
          and leadership, seeking a challenging role as a Staff/Lead to drive
          innovation, mentorship, and project success.
        </p>

        <SectionHeader step={2} title="Summary of Qualifications" />
        <SummarySection />
        <SectionHeader
          step={3}
          title="Professional Experience"
          subtitle="A showcase of the companies I’ve worked for and some of the projects
          that came from it"
        />
        <WorkExperiencesSection />
        <SectionHeader step={4} title="Publications & Media" />
        <p className="text-gray-400 whitespace-pre-line">
          Host at the Space Cast Podcast:{" "}
          <a
            className="text-blue-300"
            href="https://www.youtube.com/@spacesquad-rocketseat"
          >
            https://www.youtube.com/@spacesquad-rocketseat
          </a>
          {"\n"} Medium articles on programming:{" "}
          <a
            className="text-blue-300"
            href="https://medium.com/@gabrieltaveira"
          >
            https://medium.com/@gabrieltaveira
          </a>
          {"\n"} Awari Career Development Mentor:{" "}
          <a
            className="text-blue-300"
            href="https://app.awari.com.br/mentores/gabriel-taveira"
          >
            https://app.awari.com.br/mentores/gabriel-taveira
          </a>
          {"\n"} Space Squad Ambassador:{" "}
          <a
            className="text-blue-300"
            href="https://www.rocketseat.com.br/space-squad"
          >
            https://www.rocketseat.com.br/space-squad
          </a>
          {"\n\n"}I’ve also given talks at large events about Technology and
          Leadership such as Assemble (3 day immersion focusing on forming Tech
          Leads) and The Developer Conference on Design Systems.
        </p>
        <SectionHeader
          step={5}
          title="Contact me"
          subtitle="Let’s connect so we can work together!"
        />
        <a
          href="https://linktr.ee/gabrielstaveira"
          className="flex p-12 pt-6 pb-6 bg-zinc-900 rounded-xl"
        >
          https://linktr.ee/gabrielstaveira
        </a>
      </div>
    </main>
  );
}
