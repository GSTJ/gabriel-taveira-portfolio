import { Provider as BalancerProvider } from "react-wrap-balancer";
import { Awards } from "./awards";
import { ClientChrome } from "./client-chrome";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { NowPlaying } from "./now-playing";
import { Publications } from "./publications";
import { TalksList } from "./talks-list";
import { WorkGrid } from "./work-grid";
import { WritingList } from "./writing-list";

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
