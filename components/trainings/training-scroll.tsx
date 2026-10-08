"use client";

import { useRef } from "react";
import type { TrainingProgram } from "@/lib/trainings";
import { TrainingCard } from "./training-card";

interface TrainingScrollProps {
  programs: TrainingProgram[];
}

export function TrainingScroll({ programs }: TrainingScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -480 : 480;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Navigation Controls */}
      <div className="mb-6 flex items-center justify-end gap-3 px-6 sm:px-12">
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white backdrop-blur-md transition-all hover:border-[#f5d061] hover:bg-[#f5d061]/10 hover:text-[#f5d061]"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white backdrop-blur-md transition-all hover:border-[#f5d061] hover:bg-[#f5d061]/10 hover:text-[#f5d061]"
        >
          →
        </button>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={containerRef}
        className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth px-6 pb-8 sm:px-12"
      >
        {programs.map((program, index) => (
          <TrainingCard key={program.id} program={program} index={index} />
        ))}
      </div>
    </div>
  );
}
