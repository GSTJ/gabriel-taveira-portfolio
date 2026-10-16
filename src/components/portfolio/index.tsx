import { Provider as BalancerProvider } from "react-wrap-balancer";

import { Awards } from "./awards";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Nav } from "./nav";
import { NowPlaying } from "./now-playing";
import { Publications } from "./publications";
import { Engagement, Services } from "./services";
import { TalksList } from "./talks-list";
import { WorkGrid } from "./work-grid";
import { WritingList } from "./writing-list";

/**
 * Server component that composes the page, so the full copy is in the
 * initial HTML for SEO. Only the nav (scroll spy) and the contact form ship
 * client JS.
 *
 * `<BalancerProvider>` shares one inline script across every `<Balancer>`
 * heading.
 */
export const Portfolio = () => (
  <BalancerProvider>
    <Nav />
    <main className="gt-page">
      <Hero />
      <Services />
      <Engagement />
      <WorkGrid />
      <Publications />
      <TalksList />
      <Awards />
      <WritingList />
      <NowPlaying />
    </main>
    <Contact />
  </BalancerProvider>
);
