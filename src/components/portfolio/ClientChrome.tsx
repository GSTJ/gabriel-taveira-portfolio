"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  useConsoleBanner,
  useKeyboardEffects,
  useLiveClock,
  useScrollSpy,
  type ToastPayload,
} from "./hooks";
import { Nav } from "./Nav";
import { SystemAudit } from "./SystemAudit";
import { Toast } from "./Toast";

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
export function ClientChrome() {
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

  const handleNav = useCallback((id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  }, []);

  return (
    <>
      <Nav active={active} onNav={handleNav} />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      {audit && <SystemAudit onClose={() => setAudit(false)} />}
    </>
  );
}
