"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/section-label";
import { expressions } from "@/lib/constants";

export default function ExpressionHubs() {
  return <section className="section-space"><div className="page-container"><SectionLabel>NINE EXPRESSIONS</SectionLabel><div className="mt-7 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><h2 className="section-heading">ONE HOUSE.<br /><span className="text-white/45">NINE EXPRESSIONS.</span></h2><p className="body-copy max-w-md">Different pathways. One family. Every expression exists to help people encounter God, develop their gifts and become useful in their generation.</p></div><div className="mt-16 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">{expressions.map((expression, index) => <motion.div key={expression.title} whileHover={{ backgroundColor: "rgba(255,255,255,.035)" }} className="group relative min-h-64 border-b border-r border-white/10 p-7 md:p-9"><div className="flex items-start justify-between"><span className="font-display text-5xl font-bold tracking-[-0.06em] text-white/15">{String(index + 1).padStart(2, "0")}</span><span className="text-xl text-white/20 transition group-hover:translate-x-1 group-hover:text-white/70">↗</span></div><div className="absolute bottom-7 left-7 right-7 md:bottom-9 md:left-9 md:right-9"><h3 className="font-display text-2xl font-bold tracking-[-0.04em]">{expression.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/35">{expression.description}</p></div></motion.div>)}</div></div></section>;
}
