"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LatestDropShowcase() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 96%", "end 55%"],
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const spread = isMobile ? 108 : 220;
  const sideY = isMobile ? 12 : 28;

  const centerScale = useTransform(scrollYProgress, [0, 1], [isMobile ? 1.08 : 1.18, 1]);
  const centerY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -10 : -24]);

  const leftX = useTransform(scrollYProgress, [0, 1], [0, -spread]);
  const leftY = useTransform(scrollYProgress, [0, 1], [0, sideY]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0.7, 0.9, 1]);
  const leftScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const rightX = useTransform(scrollYProgress, [0, 1], [0, spread]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, sideY]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0.7, 0.9, 1]);
  const rightScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <div ref={sectionRef} className="mt-8 flex flex-col items-center gap-2 pb-4 sm:mt-10 sm:gap-1 sm:pb-0">
      <div className="relative mx-auto h-[430px] w-full max-w-[980px] sm:h-[500px]">
        <motion.article
          className="absolute left-1/2 top-0 z-0 w-[42%] max-w-[280px] -translate-x-1/2 sm:w-[44%] sm:max-w-[300px]"
          style={{ x: leftX, y: leftY, opacity: leftOpacity, scale: leftScale }}
        >
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/one.png"
              alt="Latest drop one"
              width={700}
              height={700}
              className="aspect-square w-full object-contain"
            />
          </div>
          <div className="pt-2 text-center sm:pt-3">
            <p className="text-[10px] tracking-[0.12em] text-zinc-300 sm:text-xs sm:tracking-[0.14em]">FLOWER</p>
            <p className="mt-1 text-sm font-semibold sm:text-lg">Diamond Dust</p>
          </div>
        </motion.article>

        <motion.article
          className="absolute left-1/2 top-0 z-10 w-[48%] max-w-[296px] -translate-x-1/2 sm:max-w-[320px]"
          style={{ y: centerY, scale: centerScale }}
        >
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/two.png"
              alt="Latest drop two"
              width={700}
              height={700}
              className="aspect-square w-full object-contain"
            />
          </div>
          <div className="pt-2 text-center sm:pt-3">
            <p className="text-[10px] tracking-[0.12em] text-zinc-300 sm:text-xs sm:tracking-[0.14em]">PREROLL</p>
            <p className="mt-1 text-sm font-semibold sm:text-lg">Velvet Pack 2x</p>
          </div>
        </motion.article>

        <motion.article
          className="absolute left-1/2 top-0 z-0 w-[42%] max-w-[280px] -translate-x-1/2 sm:w-[44%] sm:max-w-[300px]"
          style={{ x: rightX, y: rightY, opacity: rightOpacity, scale: rightScale }}
        >
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/three.png"
              alt="Latest drop three"
              width={700}
              height={700}
              className="aspect-square w-full object-contain"
            />
          </div>
          <div className="pt-2 text-center sm:pt-3">
            <p className="text-[10px] tracking-[0.12em] text-zinc-300 sm:text-xs sm:tracking-[0.14em]">CART</p>
            <p className="mt-1 text-sm font-semibold sm:text-lg">Lemon Ice Live</p>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
