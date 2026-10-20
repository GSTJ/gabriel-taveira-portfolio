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

import { cn } from "@/utils/cn";

import styles from "./projects.module.css";

type MagicModal = {
  magicModal: typeof magicModal;
  MagicModalPortal: typeof MagicModalPortal;
};
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
    title: string;
    body: string;
    yes: string;
    no: string;
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
  hide: (choice: Choice) => void;
} | null>(null);

const Sheet = ({
  copy,
  hide,
}: {
  copy: ModalDemoCopy["modal"];
  hide: (choice: Choice) => void;
}) => {
  return (
    <section className={styles.sheet}>
      <h2 className="t-title">{copy.title}</h2>
      <p className="t-small">{copy.body}</p>
      <div className={styles.sheetRow}>
        <button
          className="btn btn-ghost btn-small"
          type="button"
          onClick={() => hide({ liked: false })}
        >
          {copy.no}
        </button>
        <button
          className="btn btn-small"
          type="button"
          onClick={() => hide({ liked: true })}
        >
          {copy.yes}
        </button>
      </div>
    </section>
  );
};

const HelloModal = () => {
  const demo = use(Demo);
  return demo ? <Sheet {...demo} /> : null;
};

/**
 * Runs the real magic-modal inside a sandbox frame: its own portal, backdrop,
 * focus trap and animations, mounted in the example's stage (the portal is
 * `position: absolute`), so the modal opens inside the example and never over
 * the page. The readout prints exactly what `await magicModal.show()`
 * resolved with, so Escape and a backdrop press show their own reasons.
 * `children` is the example's source, rendered on the server.
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
      hide: (choice: Choice) => handle.current?.hide(choice),
    }),
    [copy.modal],
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
    return () => {
      live = false;
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
        {pkg ? (
          <Demo value={demo}>
            <div className={styles.modalHost}>
              <pkg.MagicModalPortal />
            </div>
          </Demo>
        ) : null}
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
