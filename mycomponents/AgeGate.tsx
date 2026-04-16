"use client";

import { useState } from "react";

const STORAGE_KEY = "cali-kosher-age-verified";

export default function AgeGate() {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem(STORAGE_KEY) !== "true";
    } catch {
      return true;
    }
  });
  const [blocked, setBlocked] = useState(false);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setOpen(false);
  };

  const decline = () => {
    setBlocked(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-black p-7 text-white">
        <p className="text-xs font-semibold tracking-[0.16em] text-zinc-300">AGE VERIFICATION</p>
        <h2 className="mt-3 text-2xl font-semibold">Are you 21 or older?</h2>
        {!blocked ? (
          <>
            <p className="mt-3 text-sm text-zinc-300">
              You must be at least 21 years old to enter this website.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={accept}
                className="h-11 rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                I&apos;m 21+
              </button>
              <button
                type="button"
                onClick={decline}
                className="h-11 rounded-xl border border-white/25 bg-white/10 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm text-zinc-300">
              Sorry, you must be 21+ to view this content.
            </p>
            <a
              href="https://www.google.com"
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Leave site
            </a>
          </>
        )}
      </div>
    </div>
  );
}
