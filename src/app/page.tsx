import { AwardsIllustration } from "@/components/illustrations/AwardsIllustration";
import { Section } from "@/components/Section";
import {
  Awards,
  Hero,
  Publications,
  Socials,
  Summary,
  WorkExperiences,
} from "@/components/sections";
import { WorkLocation } from "@/components/WorkLocation";

export default () => (
  <main className="flex flex-col items-center px-10 pt-20 pb-10 md:p-24">
    <div className="flex flex-col items-center max-w-6xl">
      <div className="absolute top-8 left-12">
        <WorkLocation />
      </div>

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

      <Section.Root className="pt-28 md:pt-32 w-full">
        <div className="flex flex-col items-center">
          <AwardsIllustration />
          <Section.Header
            step="Step 4"
            title="Awards"
            subtitle="Some of the competitions I’ve participated in over the time"
          />
        </div>
        <Awards />
      </Section.Root>

      <Section.Root id="socials">
        <Section.Header
          step="Final Step"
          title="Socials"
          subtitle="Get to know more about my work and shoot me a message"
        />
        <Socials />
      </Section.Root>
    </div>
  </main>
);
