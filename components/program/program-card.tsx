"use client";

import { motion } from "framer-motion";
import type { ProgramTrack } from "@/lib/constants";

interface ProgramCardProps { track: ProgramTrack; index: number; active?: boolean; }
export function ProgramCard({ track, index, active = false }: ProgramCardProps) {
  return <motion.article whileHover={{ y: -6 }} className={`relative min-h-[500px] w-[min(82vw,520px)] shrink-0 overflow-hidden border p-7 transition-colors duration-700 sm:p-10 ${active ? "border-[#c703e4]/25 bg-[#0e0616]" : "border-white/[.06] bg-[#08050c]"}`}><div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#460583]/10 blur-[100px]" /><div className="relative flex h-full flex-col justify-between"><div className="flex items-start justify-between"><span className="font-display text-5xl font-extrabold tracking-[-.06em] text-zinc-800">0{index + 1}</span><span className="eyebrow text-zinc-600">{track.time}</span></div><div><p className="eyebrow text-[#f5d061]">{track.date}</p><h3 className="mt-5 max-w-md font-display text-4xl font-extrabold leading-[.9] tracking-[-.055em] sm:text-5xl">{track.title}</h3><p className="mt-6 max-w-sm text-sm leading-6 text-zinc-500">{track.description}</p></div><div className="flex items-center justify-between border-t border-white/[.05] pt-5"><span className="text-[9px] font-bold uppercase tracking-[.16em] text-zinc-700">Salt & Light '26</span><span className="text-zinc-600">↗</span></div></div></motion.article>;
}
