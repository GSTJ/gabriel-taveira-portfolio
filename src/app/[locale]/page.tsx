import { AwardsIllustration } from "@/components/illustrations/awards-illustration";
import LanguageSelect from "@/components/language-select";
import { Section } from "@/components/section";
import {
  Awards,
  Hero,
  Publications,
  Socials,
  Summary,
  WorkExperiences,
} from "@/components/sections";
import { ThemeToggle } from "@/components/theme-toggle";

import { useTranslations } from "next-intl";

export default () => {
  const t = useTranslations();

  return (
    <main className="flex flex-col items-center px-10 pb-10 pt-12 md:p-24 md:pt-12">
      <div className="flex flex-col items-center max-w-6xl">
        <div className="flex flex-1 w-full justify-between">
          <LanguageSelect />
          <ThemeToggle />
        </div>

        <Hero />

        <Section.Root>
          <Section.Header
            step={t("sections.step1")}
            title={t("sections.summaryOfQualifications")}
          />
          <Summary />
        </Section.Root>

        <Section.Root>
          <Section.Header
            step={t("sections.step2")}
            title={t("sections.professionalExperience")}
            subtitle={t("sections.professionalExperienceSubtitle")}
          />
          <WorkExperiences />
        </Section.Root>

        <Section.Root>
          <Section.Header
            step={t("sections.step3")}
            title={t("sections.publicationsAndMedia")}
          />
          <Publications />
        </Section.Root>

        <Section.Root className="pt-28 md:pt-32 w-full">
          <div className="flex flex-col items-center">
            <AwardsIllustration />
            <Section.Header
              step={t("sections.step4")}
              title={t("sections.awards")}
              subtitle={t("sections.awardsSubtitle")}
            />
          </div>
          <Awards />
        </Section.Root>

        <Section.Root id="socials">
          <Section.Header
            step={t("sections.finalStep")}
            title={t("sections.socials")}
            subtitle={t("sections.socialsSubtitle")}
          />
          <Socials />
        </Section.Root>

        <p className="mt-8 mb-2 tracking-[.05rem]">
          {t("footer.madeWithLove")}
        </p>
        <a
          href="https://github.com/GSTJ/gabriel-taveira-portfolio"
          target="blank"
          className="tracking-[.05rem] underline"
        >
          {t("footer.checkOutOnGithub")}
        </a>
      </div>
    </main>
  );
};
