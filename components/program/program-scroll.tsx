"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProgramTrack } from "@/lib/constants";
import { ProgramCard } from "./program-card";

gsap.registerPlugin(ScrollTrigger);
interface ProgramScrollProps { tracks: ProgramTrack[]; }
export function ProgramScroll({ tracks }: ProgramScrollProps) {
  const sectionRef = useRef<HTMLElement>(null); const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const section = sectionRef.current; const track = trackRef.current; if (!section || !track) return; const mm = gsap.matchMedia(); mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => { const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80); gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance() + window.innerHeight * 0.8}`, pin: true, scrub: 1, invalidateOnRefresh: true } }); }); return () => mm.revert(); }, []);
  return <section ref={sectionRef} className="relative overflow-hidden py-16 md:min-h-screen md:py-0"><div ref={trackRef} className="flex gap-4 px-[var(--page-gutter)] md:min-h-screen md:w-max md:items-center">{tracks.map((track, index) => <ProgramCard key={track.id} track={track} index={index} active={index === 0} />)}<div className="hidden w-[30vw] shrink-0 items-center justify-center md:flex"><p className="max-w-xs font-editorial text-4xl italic text-zinc-700">The shift begins when preparation meets opportunity.</p></div></div></section>;
}
