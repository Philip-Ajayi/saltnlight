"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Mountain } from "@/lib/constants";
import { MountainNode } from "./mountain-node";

interface MountainOrbitProps { mountains: Mountain[]; }
export function MountainOrbit({ mountains }: MountainOrbitProps) {
  const [active, setActive] = useState(0); const current = mountains[active];
  return <div className="relative mx-auto mt-10 min-h-[700px] max-w-[1200px] px-5">
    <div className="absolute left-1/2 top-1/2 hidden h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.045] md:block"><div className="absolute inset-10 rounded-full border border-[#c703e4]/[.08]" /><div className="absolute inset-28 rounded-full border border-white/[.035]" /><div className="absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c703e4]/20 to-transparent" /><div className="absolute left-1/2 top-1/2 h-[80%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#c703e4]/20 to-transparent" />{mountains.map((mountain, index) => <MountainNode key={mountain.id} mountain={mountain} active={active === index} index={index} onSelect={() => setActive(index)} />)}<div className="absolute left-1/2 top-1/2 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#460583]/10 shadow-[0_0_100px_rgba(70,5,131,.15)]"><div className="text-center"><span className="eyebrow text-zinc-600">The centre</span><h3 className="mt-3 font-display text-3xl font-extrabold tracking-[-.05em]">{current.name}</h3></div></div></div>
    <div className="flex flex-col gap-2 md:hidden">{mountains.map((mountain, index) => <button type="button" key={mountain.id} onClick={() => setActive(index)} className={`group flex min-h-20 items-center justify-between border px-5 text-left transition-all ${active === index ? "border-[#f5d061]/30 bg-[#f5d061]/[.035]" : "border-white/[.06] bg-white/[.015]"}`}><div className="flex items-center gap-4"><span className="font-display text-xs font-bold text-zinc-700">0{index + 1}</span><span className={`font-display text-lg font-bold tracking-[-.03em] ${active ? "text-white" : "text-zinc-500"}`}>{mountain.name}</span></div><span className={`h-2 w-2 rounded-full ${active === index ? "bg-[#f5d061]" : "bg-zinc-700"}`} /></button>)}</div>
    <AnimatePresence mode="wait"><motion.div key={current.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }} className="absolute bottom-8 left-1/2 w-[min(90%,520px)] -translate-x-1/2 text-center md:bottom-3"><p className="text-sm leading-6 text-zinc-500">{current.description}</p></motion.div></AnimatePresence>
  </div>;
}
