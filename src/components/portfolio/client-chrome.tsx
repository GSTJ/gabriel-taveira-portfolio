"use client";

import { scrollToSection, useScrollSpy } from "./hooks";
import { Nav } from "./nav";

/** The sticky nav with scroll-spy active-link tracking. */
export const ClientChrome = () => {
  const active = useScrollSpy();
  return <Nav active={active} onNav={scrollToSection} />;
};
