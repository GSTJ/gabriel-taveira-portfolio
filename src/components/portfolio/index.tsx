import { Awards } from "./Awards";
import { ClientChrome } from "./ClientChrome";
import { Contact } from "./Contact";
import { Hero } from "./Hero";
import { NowPlaying } from "./NowPlaying";
import { Publications } from "./Publications";
import { TalksList } from "./TalksList";
import { WorkGrid } from "./WorkGrid";
import { WritingList } from "./WritingList";

/**
 * Server component that composes the page. Each section that doesn't need
 * browser-only behavior is itself a server component, so the full editorial
 * copy is in the initial HTML for SEO. `ClientChrome` injects the sticky
 * Nav and the global keyboard/easter-egg behavior.
 */
export function Portfolio() {
  return (
    <>
      <ClientChrome />
      <Hero />
      <WorkGrid />
      <Publications />
      <TalksList />
      <Awards />
      <WritingList />
      <NowPlaying />
      <Contact />
    </>
  );
}
