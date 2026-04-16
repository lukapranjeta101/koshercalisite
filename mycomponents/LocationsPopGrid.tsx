"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type LocationItem = {
  src: string;
  title: string;
  hours: string;
  line1: string;
  line2: string;
};

type LocationsPopGridProps = {
  locations: LocationItem[];
};

export default function LocationsPopGrid({ locations }: LocationsPopGridProps) {
  return (
    <div className="relative mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-7 lg:grid-cols-3">
      {locations.map((location, index) => (
        <motion.article
          key={location.src}
          initial={{ opacity: 0, scale: 0.86, y: 42 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.58,
            delay: index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`group relative h-[320px] overflow-hidden rounded-2xl border border-white/30 bg-zinc-200 shadow-[0_18px_50px_rgba(0,0,0,0.55)] sm:h-[460px] sm:rounded-3xl ${
            index === 0 ? "hero-float-a" : index === 1 ? "hero-float-b" : "hero-float-c"
          }`}
        >
          <Image
            src={location.src}
            alt={location.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

          <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
            <h3 className="text-2xl font-semibold tracking-[0.08em] sm:text-3xl">{location.title}</h3>
            <p className="mt-1.5 text-[11px] tracking-[0.14em] text-zinc-200 sm:mt-2 sm:text-xs sm:tracking-[0.16em]">
              {location.hours}
            </p>
            <p className="mt-2 text-xs tracking-[0.02em] text-zinc-100 sm:mt-3 sm:text-sm">{location.line1}</p>
            <p className="text-xs tracking-[0.02em] text-zinc-100 sm:text-sm">{location.line2}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
