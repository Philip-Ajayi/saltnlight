"use client";

import { motion } from "framer-motion";
import type { ProgramTrack } from "@/lib/constants";

interface ProgramCardProps {
  track: ProgramTrack;
  index: number;
  active?: boolean;
}

export function ProgramCard({ track, index, active = false }: ProgramCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={`relative min-h-[520px] w-[min(82vw,520px)] shrink-0 overflow-hidden border p-7 transition-colors duration-700 sm:p-10 ${
        active ? "border-[#c703e4]/25 bg-[#0e0616]" : "border-white/[.06] bg-[#08050c]"
      }`}
    >
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#460583]/10 blur-[100px]" />

      <div className="relative flex h-full flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <span className="font-display text-5xl font-extrabold tracking-[-.06em] text-zinc-800">
            0{index + 1}
          </span>
          <span className="eyebrow text-zinc-600">{track.time}</span>
        </div>

        {/* Content Body */}
        <div className="my-6">
          <p className="eyebrow text-[#f5d061]">{track.date}</p>
          <h3 className="mt-3 max-w-md font-display text-3xl font-extrabold leading-[.95] tracking-[-.055em] sm:text-4xl">
            {track.title}
          </h3>

          <div className="mt-5 space-y-3 text-xs leading-5 text-zinc-400 sm:text-sm">
            {/* Optional Lead Paragraph */}
            {track.lead && <p className="font-medium text-zinc-300">{track.lead}</p>}

            {/* Optional Bullet Points */}
            {track.bullets && (
              <ul className="list-inside list-disc space-y-1 text-zinc-400">
                {track.bullets.map((bullet, i) => {
                  // Basic bold formatting if standard **text** pattern is used
                  const parts = bullet.split(/(\*\*.*?\*\*)/g);
                  return (
                    <li key={i}>
                      {parts.map((part, pIdx) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={pIdx} className="font-semibold text-zinc-200">
                            {part.slice(2, -2)}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Fallback Standard Description */}
            {track.description && <p>{track.description}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/[.05] pt-5">
          <span className="text-[9px] font-bold uppercase tracking-[.16em] text-zinc-700">
            Salt & Light '26
          </span>
          <span className="text-zinc-600">↗</span>
        </div>
      </div>
    </motion.article>
  );
}