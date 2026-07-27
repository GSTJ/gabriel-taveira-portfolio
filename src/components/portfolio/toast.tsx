"use client";

import { useEffect } from "react";

export function Toast({
  message,
  sub,
  onClose,
}: {
  message: string;
  sub?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4200);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="ws-toast">
      <div className="ws-toast-glow" />
      <div className="ws-toast-icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="ws-toast-body">
        <div className="ws-toast-title">{message}</div>
        {sub && <div className="ws-toast-sub">{sub}</div>}
      </div>
      <button
        className="ws-toast-close"
        onClick={onClose}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
