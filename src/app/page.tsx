import { Publications } from "@/components/sections/Publications";
import { Hero } from "@/components/sections/Hero";
import { WorkExperiences } from "@/components/sections/WorkExperiences";
import { Summary } from "@/components/sections/Summary";
import { Socials } from "@/components/sections/Socials";
import { Section } from "@/components/Section";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <div className="flex flex-col items-center max-w-6xl">
        <Hero />

        <Section.Root>
          <Section.Header step="Step 1" title="Summary of Qualifications" />
          <Summary />
        </Section.Root>

        <Section.Root>
          <Section.Header
            step="Step 2"
            title="Professional Experience"
            subtitle="A showcase of the companies I’ve worked for and some of the projects
          that came from it"
          />
          <WorkExperiences />
        </Section.Root>

        <Section.Root>
          <Section.Header step="Step 3" title="Publications & Media" />
          <Publications />
        </Section.Root>

        <Section.Root id="socials">
          <Section.Header
            step="Final Step"
            title="Contact me"
            subtitle="Get to know more about my work and shoot me a message"
          />
          {/* @ts-ignore */}
          <Socials />
        </Section.Root>
      </div>
    </main>
  );
}
