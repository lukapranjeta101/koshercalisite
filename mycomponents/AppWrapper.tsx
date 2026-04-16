"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

type AppWrapperProps = {
  children: React.ReactNode;
};

const INTRO_DONE_KEY = "cali-kosher-intro-done";
const AGE_VERIFIED_KEY = "cali-kosher-age-verified";

export default function AppWrapper({ children }: AppWrapperProps) {
  const [hasSessionCheck, setHasSessionCheck] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isDenied, setIsDenied] = useState(false);

  useEffect(() => {
    try {
      const done =
        window.localStorage.getItem(INTRO_DONE_KEY) === "true" ||
        window.localStorage.getItem(AGE_VERIFIED_KEY) === "true";

      if (done) {
        setIntroDone(true);
        setIsAgeVerified(true);
        setIsLoading(false);
      } else {
        setIntroDone(false);
        setIsAgeVerified(false);
        setIsLoading(true);
      }
    } catch {
      setIntroDone(false);
      setIsAgeVerified(false);
      setIsLoading(true);
    } finally {
      setHasSessionCheck(true);
    }
  }, []);

  const acceptAge = () => {
    try {
      window.localStorage.setItem(AGE_VERIFIED_KEY, "true");
      window.localStorage.setItem(INTRO_DONE_KEY, "true");
    } catch {}
    setIsAgeVerified(true);
    setIntroDone(true);
    setIsDenied(false);
  };

  const declineAge = () => {
    setIsDenied(true);
  };

  const showAgeGate = hasSessionCheck && !introDone && !isLoading && !isAgeVerified;

  if (!hasSessionCheck) {
    return (
      <div
        style={{
          opacity: 0,
          transition: "opacity 0.5s ease-out",
        }}
      >
        {children}
      </div>
    );
  }

  if (showAgeGate) {
    return (
      <>
        <div
          style={{
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.5s ease-out",
          }}
        >
          {children}
        </div>

        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 p-6">
          <div className="w-full max-w-md rounded-2xl border border-white/20 bg-black p-7 text-white">
            <p className="text-xs font-semibold tracking-[0.16em] text-zinc-300">AGE VERIFICATION</p>
            <h2 className="mt-3 text-2xl font-semibold">Are you 21 or older?</h2>
            {!isDenied ? (
              <>
                <p className="mt-3 text-sm text-zinc-300">
                  You must be at least 21 years old to enter this website.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={acceptAge}
                    className="h-11 rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-zinc-200"
                  >
                    I&apos;m 21+
                  </button>
                  <button
                    type="button"
                    onClick={declineAge}
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
      </>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen
            key="loading"
            onComplete={() => {
              setIsLoading(false);
            }}
          />
        ) : null}
      </AnimatePresence>

      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}
      >
        {children}
      </div>
    </>
  );
}
