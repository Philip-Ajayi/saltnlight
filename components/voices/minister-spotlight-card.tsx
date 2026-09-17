"use client";

import { motion } from "framer-motion";
import type { Minister } from "@/lib/constants";

interface MinisterSpotlightCardProps {
  minister: Minister;
  index: number;
  onSelect: (minister: Minister) => void;
}

export function MinisterSpotlightCard({
  minister,
  index,
  onSelect,
}: MinisterSpotlightCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
      onClick={() => onSelect(minister)}
      className="group relative cursor-pointer overflow-hidden border border-white/[.06] bg-[#07020e] p-6 transition-all duration-700 hover:border-[#c703e4]/40 hover:bg-[#0c0418]"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#460583]/20 blur-3xl transition-all duration-700 group-hover:bg-[#c703e4]/30" />

      <div className="relative flex flex-col justify-between gap-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <span className="font-display text-xs font-bold tracking-[.18em] text-zinc-600 group-hover:text-[#f5d061]">
            0{index + 1}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-xs text-zinc-400 transition-all duration-500 group-hover:border-[#f5d061] group-hover:bg-[#f5d061] group-hover:text-black">
            ↗
          </span>
        </div>

        {/* Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/[.05] bg-[#0b0610]">
          <div
            className="h-full w-full bg-cover bg-center grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
            style={{ backgroundImage: `url("${minister.image}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07020e] via-transparent to-transparent opacity-80" />
        </div>

        {/* Bio Content */}
        <div>
          <span className="eyebrow text-zinc-500 group-hover:text-zinc-400">
            {minister.organization}
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-[-.04em] text-white transition-colors duration-300 group-hover:text-[#f5d061]">
            {minister.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[.14em] text-zinc-400">
            {minister.role}
          </p>
          <p className="mt-4 line-clamp-3 text-xs leading-6 text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
            {minister.bio}
          </p>
        </div>
      </div>
    </motion.article>
  );
}