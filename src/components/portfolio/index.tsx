import { getTranslations } from "next-intl/server";

import { ContactSection } from "./sections/contact";
import { HeroSection } from "./sections/hero";
import { NotesSection } from "./sections/notes";
import { ProjectsSection } from "./sections/projects";
import { ServicesSection } from "./sections/services";
import { WorkSection } from "./sections/work";
import { Footer } from "./shell/footer";
import { Nav } from "./shell/nav";
import { Interlude } from "./ui/interlude";

/**
 * The home page, in reading order: who he is and the offer, what he made,
 * the teams he led, what you can hire him for, his public work, the ask.
 * Every section is a server component, so all copy is in the first HTML.
 * Section ids are stable: nav links, llms.txt and the section agents use them.
 */
export const Portfolio = async () => {
  const t = await getTranslations("nav");

  return (
    <>
      <a className="skip-link" href="#main">
        {t("skip")}
      </a>
      <Nav />
      <main id="main">
        <HeroSection />
        <ProjectsSection />
        <WorkSection />
        <Interlude id="patrick" />
        <ServicesSection />
        <Interlude id="brandon" />
        <NotesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};
