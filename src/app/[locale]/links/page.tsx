import { Section } from "@/components/Section";
import { Socials } from "@/components/sections";

export default () => (
  <main className="flex flex-col items-center p-10 py-20 md:p-24">
    <div className="flex flex-col items-center max-w-6xl">
      <Section.Root>
        <Section.Header
          className="mt-0"
          step="Redes Sociais"
          title="Gabriel Taveira"
        />
        <Socials />
      </Section.Root>
    </div>
  </main>
);
