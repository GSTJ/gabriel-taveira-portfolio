import { Provider as BalancerProvider } from "react-wrap-balancer";
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
 *
 * `<BalancerProvider>` from react-wrap-balancer wraps the tree so any
 * `<Balancer>` used inside a heading shares a single inline script for
 * line-balancing measurements.
 */
export function Portfolio() {
  return (
    <BalancerProvider>
      <ClientChrome />
      <Hero />
      <WorkGrid />
      <Publications />
      <TalksList />
      <Awards />
      <WritingList />
      <NowPlaying />
      <Contact />
    </BalancerProvider>
  );
}
