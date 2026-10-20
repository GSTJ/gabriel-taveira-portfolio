"use client";

import type { MagicModalPortal, magicModal, ModalHandle } from "magic-modal";

import {
  createContext,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/utils/cn";

import styles from "./projects.module.css";

type MagicModal = {
  magicModal: typeof magicModal;
  MagicModalPortal: typeof MagicModalPortal;
};
/** What each answer resolves with. The close button resolves with no data. */
type Choice = { liked: boolean };

export type ModalDemoCopy = {
  label: string;
  run: string;
  idle: string;
  loading: string;
  pending: string;
  resolved: string;
  failed: string;
  hint: string;
  console: string;
  modal: {
    label: string;
    title: ReactNode;
    body: string;
    yes: string;
    no: string;
    close: string;
    returns: string;
    dismiss: string;
  };
};

type Status = "idle" | "loading" | "open" | "done" | "error";

let loading: Promise<MagicModal> | undefined;
/** The package's web entry, fetched once, the first time someone reaches for the button. */
const load = () => {
  loading ??= import("magic-modal").catch((error: unknown) => {
    loading = undefined;
    throw error;
  });
  return loading;
};
const preload = () => void load().catch(() => undefined);

/** `{ reason: "INTENTIONAL_HIDE", data: { liked: true } }`, as a dev would log it. */
const format = (value: unknown) =>
  JSON.stringify(value, null, 1)
    .replaceAll(/\n\s*/g, " ")
    .replaceAll(/"(\w+)":/g, "$1:");

/** Context crosses the portal, so the modal gets its copy and its close. */
const Demo = createContext<{
  copy: ModalDemoCopy["modal"];
  label: string;
  hide: (choice?: Choice) => void;
} | null>(null);

const ANSWERS = [
  { key: "yes", choice: { liked: true } },
  { key: "no", choice: { liked: false } },
] as const;

/**
 * The example modal: its label, a toy question, and two answers that each
 * show what they hand back to the await. Nothing in it is sent anywhere.
 */
const Sheet = ({
  copy,
  label,
  hide,
}: {
  copy: ModalDemoCopy["modal"];
  label: string;
  hide: (choice?: Choice) => void;
}) => {
  return (
    <section className={styles.sheet}>
      <div className={styles.sheetTop}>
        <span className={styles.sbChip}>{label}</span>
        <button
          className={cn("icon-btn", styles.sheetClose)}
          type="button"
          aria-label={copy.close}
          onClick={() => hide()}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>
      <h2 className={cn("t-h2", styles.sheetTitle)}>{copy.title}</h2>
      <p className={styles.sheetBody}>{copy.body}</p>
      <div className={styles.answers}>
        {ANSWERS.map(({ key, choice }) => (
          <button
            key={key}
            className={styles.answer}
            type="button"
            onClick={() => hide(choice)}
          >
            <span className={styles.answerLabel}>{copy[key]}</span>
            <span className={cn("t-mono", styles.answerCode)}>
              <span className="visually-hidden">{copy.returns} </span>
              {format(choice)}
            </span>
          </button>
        ))}
      </div>
      <p className={cn("t-meta", styles.sheetFoot)}>{copy.dismiss}</p>
    </section>
  );
};

const HelloModal = () => {
  const demo = use(Demo);
  return demo ? <Sheet {...demo} /> : null;
};

/**
 * Runs the real magic-modal over the whole page: its own portal, backdrop,
 * focus trap and animations, in a fixed layer on `body` (the portal is
 * `position: absolute`, so the layer gives it the viewport). The page stops
 * scrolling while it is open. The readout prints exactly what
 * `await magicModal.show()` resolved with, so Escape, a backdrop press and
 * the close button show their own reasons. `children` is the example's
 * source, rendered on the server.
 */
export const ModalDemo = ({
  copy,
  file,
  children,
}: {
  copy: ModalDemoCopy;
  file: string;
  children: ReactNode;
}) => {
  const [pkg, setPkg] = useState<MagicModal>();
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState("");
  const busy = status === "loading" || status === "open";
  const handle = useRef<ModalHandle<Choice>>(undefined);
  const demo = useMemo(
    () => ({
      copy: copy.modal,
      label: copy.label,
      hide: (choice?: Choice) => handle.current?.hide(choice),
    }),
    [copy.modal, copy.label],
  );

  const run = async () => {
    if (busy) return;
    setResult("");
    setStatus("loading");
    try {
      setPkg(await load());
      setStatus("open");
    } catch {
      setStatus("error");
    }
  };

  // Runs after the portal below has mounted, so `show` has a stack to push on.
  useEffect(() => {
    if (status !== "open" || !pkg) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let live = true;
    const root = document.documentElement.style;
    root.overflow = "hidden";
    root.scrollbarGutter = "stable";
    handle.current = pkg.magicModal.show<Choice>(HelloModal, {
      accessibilityLabel: copy.modal.label,
      backdropColor: "var(--scrim)",
      animationInTiming: still ? 1 : 240,
      animationOutTiming: still ? 1 : 160,
    });
    void handle.current.then((value) => {
      if (!live) return;
      setResult(format(value));
      setStatus("done");
    });
    // Resolving moves `status` on, and this cleanup gives the page its scroll back.
    return () => {
      live = false;
      root.overflow = "";
      root.scrollbarGutter = "";
    };
  }, [status, pkg, copy.modal.label]);

  const line = {
    idle: copy.idle,
    loading: copy.loading,
    open: copy.pending,
    done: copy.resolved,
    error: copy.failed,
  }[status];

  return (
    <div className={styles.sandbox}>
      <div className={styles.sbBar}>
        <span className={styles.sbChip}>{copy.label}</span>
        <span className={cn("t-mono", styles.sbFile)}>{file}</span>
      </div>
      {children}
      <div className={styles.sbStage}>
        <button
          className="btn btn-small"
          type="button"
          onPointerEnter={preload}
          onFocus={preload}
          onClick={run}
          aria-disabled={busy || undefined}
        >
          {copy.run}
        </button>
        <span className={cn("t-meta", styles.sbHint)}>{copy.hint}</span>
        {pkg
          ? createPortal(
              <Demo value={demo}>
                <div className={styles.modalLayer}>
                  <pkg.MagicModalPortal />
                </div>
              </Demo>,
              document.body,
            )
          : null}
      </div>
      <div className={cn("t-mono", styles.readout)}>
        <span className={styles.readoutLabel}>{copy.console}</span>
        <div className={styles.readoutLines} aria-live="polite">
          <span className={cn(status === "open" && styles.pending)}>
            {line}
          </span>
          {result ? <output>{result}</output> : null}
        </div>
      </div>
    </div>
  );
};
