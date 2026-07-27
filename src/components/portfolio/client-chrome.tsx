"use client";

import { useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import {
  scrollToSection,
  useConsoleBanner,
  useKeyboardEffects,
  useLiveClock,
  useScrollSpy,
  type ToastPayload,
} from "./hooks";
import { Nav } from "./nav";
import { SystemAudit } from "./system-audit";
import { Toast } from "./toast";

/**
 * Hosts every piece of interactivity that wraps the page:
 *   • the sticky pill <Nav> with scroll-spy active-link tracking
 *   • the live BRT clock written into #ws-clock
 *   • the console banner
 *   • the keyboard easter eggs (/ , gt , Konami)
 *   • the toast and system-audit overlays they spawn
 *
 * Section content is rendered by server components in the parent so
 * the long-form copy ships as static HTML for SEO. This component only
 * adds chrome and behavior.
 */
export const ClientChrome = () => {
  const tToast = useTranslations("toast");
  const [toast, setToast] = useState<ToastPayload | null>(null);
  const [audit, setAudit] = useState(false);
  const active = useScrollSpy();

  useLiveClock();
  useConsoleBanner();

  const keyboardConfig = useMemo(
    () => ({
      onKonami: (): ToastPayload => ({
        message: tToast("konami"),
        sub: tToast("konamiSub"),
      }),
      onAudit: () => setAudit(true),
    }),
    [tToast],
  );
  useKeyboardEffects(keyboardConfig, setToast);

  return (
    <>
      <Nav active={active} onNav={scrollToSection} />
      {toast !== null && <Toast {...toast} onClose={() => setToast(null)} />}
      {Boolean(audit) && <SystemAudit onClose={() => setAudit(false)} />}
    </>
  );
};
