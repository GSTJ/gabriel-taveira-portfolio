import { Section } from "@/components/section";
import { Socials } from "@/components/sections";

export default () => (
  <main className="flex flex-col items-center p-10 pb-20 pt-0 md:p-24">
    <div className="flex flex-col items-center max-w-6xl">
      <Section.Root>
        <Section.Header step="Redes Sociais" title="Gabriel Taveira" />
        <Socials />
      </Section.Root>
    </div>
  </main>
);
