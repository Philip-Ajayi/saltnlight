"use client";

import { motion } from "framer-motion";
import type { Mountain } from "@/lib/constants";

interface MountainNodeProps { mountain: Mountain; active: boolean; index: number; onSelect: () => void; }
export function MountainNode({ mountain, active, index, onSelect }: MountainNodeProps) {
  return <motion.button type="button" onClick={onSelect} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className={`group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 text-left ${active ? "z-20" : "z-10"}`} style={mountain.position} aria-label={`Explore ${mountain.name}`}>
    <span className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-700 ${active ? "border-[#f5d061]/70 bg-[#f5d061]/10 shadow-[0_0_45px_rgba(245,208,97,.15)]" : "border-white/10 bg-[#07020e]/70 group-hover:border-[#c703e4]/40"}`}><span className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${active ? "scale-150 bg-[#f5d061] shadow-[0_0_15px_#f5d061]" : "bg-zinc-600 group-hover:bg-[#c703e4]"}`} /></span>
    <span className="hidden min-w-max sm:block"><span className={`block text-[9px] font-extrabold uppercase tracking-[.15em] transition-colors ${active ? "text-white" : "text-zinc-600"}`}>0{index + 1}</span><span className={`mt-1 block text-[10px] font-bold uppercase tracking-[.1em] transition-colors ${active ? "text-[#f5d061]" : "text-zinc-500"}`}>{mountain.name}</span></span>
  </motion.button>;
}
