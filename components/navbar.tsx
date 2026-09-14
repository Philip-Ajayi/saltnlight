"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "About", href: "/about" },
  { label: "Ministries", href: "#ministries" },
  { label: "Sermons", href: "#sermons" },
  { label: "Events", href: "#events" },
  { label: "Live", href: "/radio" },
  { label: "Give", href: "#give" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="fixed left-1/2 top-5 z-50 w-[min(94vw,1380px)] -translate-x-1/2"><nav className="glass flex h-[68px] items-center justify-between rounded-full px-5 md:px-7">
      <Link href="/" onClick={() => setOpen(false)} className="font-display text-lg font-extrabold tracking-[-0.06em]">MIV<span className="text-white/30">.</span></Link>
      <div className="hidden items-center gap-7 lg:flex">{links.map((link) => <Link key={link.label} href={link.href} className="meta text-white/55 transition hover:text-white">{link.label}</Link>)}</div>
      <div className="hidden lg:block"><Link href="#visit" className="meta flex items-center gap-2 rounded-full bg-white px-5 py-3 text-black transition hover:bg-white/90">Join Us<ArrowUpRight size={14} /></Link></div>
      <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 lg:hidden">{open ? <X size={19} /> : <Menu size={19} />}</button>
    </nav></header>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#08030f] px-6 pt-32"><div className="mx-auto flex h-full max-w-5xl flex-col"><div className="flex-1">{links.map((link, index) => <motion.div key={link.label} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.6 }}><Link href={link.href} onClick={() => setOpen(false)} className="font-display block border-b border-white/10 py-4 text-5xl font-bold tracking-[-0.05em] sm:text-7xl">{link.label}</Link></motion.div>)}</div><div className="pb-10"><p className="meta text-white/30">SAMONDA · IBADAN · NIGERIA</p></div></div></motion.div>}</AnimatePresence>
  </>;
}
