import WorkExperience from "@/components/WorkExperience";
import workExperiences from "@/consts/workExperiences";

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
        <p className="text-rose-500 uppercase text-sm mb-4 font-semibold">
          Step {step}
        </p>
      )}
      <h2 className="text-4xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-zinc-500 max-w-md">{subtitle}</p>
    </div>
  );
};

const SummarySection = () => {
  return (
    <ul className="text-zinc-500 text-left mb-16 list-disc gap-4 flex flex-col">
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
    <div className="flex flex-col gap-12">
      {workExperiences.map((workExperience) => (
        <WorkExperience key={workExperience.companyName} {...workExperience} />
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <div className="flex flex-col items-center max-w-6xl">
        <div className="flex w-full justify-center">
          <div className="lg:mx-0 lg:py-32 max-w-2xl text-center items-center flex flex-col">
            <h1 className="text-3xl md:text-5xl flex gap-4 flex-wrap text-zinc-500 justify-center">
              Hi, welcome! I’m{" "}
              <p className="font-bold text-7xl text-zinc-50">Gabriel Taveira</p>
            </h1>
            <p className="mt-6 leading-8 text-gray-300">
              I’m an experienced developer with a strong background in
              programming and leadership, seeking a challenging role as a
              Staff/Lead to drive innovation, mentorship, and project success.
            </p>
            <div className="mt-10 flex gap-x-6 lg:justify-start">
              <a
                target="_blank"
                href="https://linktr.ee/gabrielstaveira"
                className="flex flex-1 justify-center md:flex-initial bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact me
              </a>
            </div>
          </div>
        </div>
        <SectionHeader step={1} title="Summary of Qualifications" />
        <SummarySection />
        <SectionHeader
          step={2}
          title="Professional Experience"
          subtitle="A showcase of the companies I’ve worked for and some of the projects
          that came from it"
        />
        <WorkExperiencesSection />
        <SectionHeader step={3} title="Publications & Media" />
        <p className="text-zinc-500 whitespace-pre-line">
          Host at the Space Cast Podcast:{" "}
          <a
            target="_blank"
            className="text-blue-300"
            href="https://www.youtube.com/@spacesquad-rocketseat"
          >
            https://www.youtube.com/@spacesquad-rocketseat
          </a>
          {"\n"} Medium articles on programming:{" "}
          <a
            target="_blank"
            className="text-blue-300"
            href="https://medium.com/@gabrieltaveira"
          >
            https://medium.com/@gabrieltaveira
          </a>
          {"\n"} Awari Career Development Mentor:{" "}
          <a
            target="_blank"
            className="text-blue-300"
            href="https://app.awari.com.br/mentores/gabriel-taveira"
          >
            https://app.awari.com.br/mentores/gabriel-taveira
          </a>
          {"\n"} Space Squad Ambassador:{" "}
          <a
            target="_blank"
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
          step={4}
          title="Contact me"
          subtitle="Let’s connect so we can work together!"
        />
        <a
          target="_blank"
          href="https://linktr.ee/gabrielstaveira"
          className="flex py-6 w-full justify-center bg-zinc-900 rounded-xl md:px-12 md:w-auto"
        >
          https://linktr.ee/gabrielstaveira
        </a>
      </div>
    </main>
  );
}
