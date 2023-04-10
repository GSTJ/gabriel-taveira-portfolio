import { Publications } from "@/components/sections/Publications";
import { Hero } from "@/components/sections/Hero";
import { WorkExperiences } from "@/components/sections/WorkExperiences";
import { Summary } from "@/components/sections/Summary";
import { Socials } from "@/components/sections/Socials";
import { Section } from "@/components/Section";
import { Awards } from "@/components/sections/Awards";
import { AwardsIllustration } from "@/components/illustrations/AwardsIllustration";
import { LocationIcon } from "@/components/illustrations/LocationIcon";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-10 pt-20 pb-10 md:p-24">
      <div className="flex flex-col items-center max-w-6xl">
        <div className="absolute top-8 left-12 flex text-sm items-center fill-zinc-900 dark:fill-zinc-100">
          <LocationIcon className="mt-1 mr-1" width={22} height={22} />
          Remote
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
}
