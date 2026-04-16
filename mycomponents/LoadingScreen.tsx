"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

type LoadingScreenProps = {
  onComplete: () => void;
};

const DURATION_MS = 2700;

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const onCompleteRef = useRef(onComplete);
  const doneRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const doneTimer = window.setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onCompleteRef.current();
      }
    }, DURATION_MS + 400);

    return () => window.clearTimeout(doneTimer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[var(--bg)]"
      style={
        {
          "--bg": "#0a0a0a",
          "--text": "#f5f5f5",
          "--muted": "#888888",
          "--stroke": "#1f1f1f",
        } as React.CSSProperties
      }
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="/logo.webp"
            alt="Cali Kosher"
            width={420}
            height={300}
            priority
            className="h-auto w-[120px] object-contain md:w-[160px] lg:w-[200px]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
