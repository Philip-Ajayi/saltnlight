"use client";

import { motion } from "framer-motion";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function HeroContent() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center px-5 text-center sm:px-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.45, duration: 0.8 }} className="eyebrow mb-8 text-zinc-400">
        OCT 12 — 16 <span className="mx-2 text-[#f5d061]">·</span> SAMONDA, IBADAN
      </motion.div>
      <div className="overflow-hidden"><motion.h1 initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 1.55, duration: 1.05, ease: [0.22, 1, 0.36, 1] }} className="font-display text-[clamp(4rem,8.5vw,9.25rem)] font-extrabold leading-[.82] tracking-[-.065em]">SALT</motion.h1></div>
      <motion.div initial={{ opacity: 0, scale: 0.75, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 1.82, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="my-1 font-editorial text-4xl italic leading-none text-[#f5d061] sm:text-5xl lg:text-6xl">&</motion.div>
      <div className="overflow-hidden"><motion.h1 initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 2, duration: 1.05, ease: [0.22, 1, 0.36, 1] }} className="font-display text-[clamp(4rem,8.5vw,9.25rem)] font-extrabold leading-[.82] tracking-[-.065em]">LIGHT</motion.h1></div>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.35, duration: 0.8 }} className="mt-8 max-w-xl text-[10px] font-bold uppercase leading-5 tracking-[.18em] text-zinc-400 sm:text-xs">A convocation of and for<br className="sm:hidden" /> influence on world mountains</motion.p>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.65, duration: 0.75 }} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <MagneticButton href="/register" variant="primary">Reserve your place →</MagneticButton>
        <MagneticButton href="/register" variant="secondary">Join our Workforce</MagneticButton>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1, duration: 1 }} className="mt-10"><CountdownTimer compact /></motion.div>
    </div>
  );
}
