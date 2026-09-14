"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/#experience" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Voices", href: "/#voices" },
];
const menuItems = ["ABOUT", "EXPERIENCE", "SCHEDULE", "MINISTERS", "EXHIBITION", "GALLERY", "VENUE"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="fixed left-0 right-0 top-0 z-[100] px-4 pt-4 sm:px-6"><nav className="mx-auto flex max-w-[1600px] items-center justify-between rounded-full border border-white/[.07] bg-[#050308]/65 px-4 py-3 backdrop-blur-2xl sm:px-5">
      <Link href="/" className="font-display text-sm font-extrabold tracking-[-.04em]" onClick={() => setOpen(false)}>SALT <span className="text-[#f5d061]">&</span> LIGHT<span className="ml-1 text-zinc-600">'26</span></Link>
      <div className="hidden items-center gap-7 md:flex">{links.map((link) => <Link key={link.href} href={link.href} className="text-[10px] font-bold uppercase tracking-[.14em] text-zinc-500 transition-colors hover:text-white">{link.label}</Link>)}</div>
      <div className="flex items-center gap-2"><Link href="/#register" className="hidden rounded-full bg-[#f5d061] px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#08050a] transition-transform hover:-translate-y-0.5 sm:block">Register →</Link><button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/[.08] text-zinc-300 md:hidden"><span className="flex w-4 flex-col gap-1"><span className={`h-px bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} /><span className={`h-px bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} /></span></button></div>
    </nav></header>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-[#050308]/96 backdrop-blur-2xl"><div className="flex min-h-full flex-col justify-center px-7 pb-12 pt-28 sm:px-12"><span className="eyebrow mb-8 text-zinc-600">Explore</span><div className="space-y-1">{menuItems.map((item, index) => <motion.div key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * index, duration: 0.6 }}><Link href={item === "ABOUT" ? "/about" : `/#${item.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setOpen(false)} className="block font-display text-[clamp(2.8rem,11vw,7rem)] font-extrabold leading-[.88] tracking-[-.06em] text-zinc-300 transition-colors hover:text-white"><span className="mr-4 inline-block align-middle font-interface text-[10px] font-bold tracking-[.12em] text-zinc-700">0{index + 1}</span>{item}</Link></motion.div>)}</div><div className="mt-12"><Link href="/#register" onClick={() => setOpen(false)} className="inline-flex min-h-14 items-center bg-[#f5d061] px-7 text-xs font-extrabold uppercase tracking-[.14em] text-black">Register →</Link></div></div></motion.div>}</AnimatePresence>
  </>;
}
