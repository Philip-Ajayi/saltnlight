"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { TrainingProgram } from "@/lib/trainings";

interface TrainingCardProps {
  program: TrainingProgram;
  index: number;
}

export function TrainingCard({ program, index }: TrainingCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-h-[580px] w-[min(88vw,480px)] shrink-0 flex-col justify-between overflow-hidden border border-white/[0.08] bg-[#08050c] p-7 sm:p-9 transition-all duration-500 hover:border-[#f5d061]/40 hover:bg-[#0c0616] hover:shadow-[0_0_40px_rgba(245,208,97,0.08)]"
    >
      {/* Glow highlight */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-[#460583]/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header / Institution logo */}
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
          <span className="font-display text-3xl font-extrabold text-zinc-700 transition-colors group-hover:text-[#f5d061]">
            0{index + 1}
          </span>
          {program.badge && (
            <span className="rounded-full border border-[#f5d061]/30 bg-[#f5d061]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#f5d061]">
              {program.badge}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="relative h-10 w-28 shrink-0 overflow-hidden rounded bg-white/5 p-1 backdrop-blur-sm">
            <Image
              src={program.logo}
              alt={program.institution}
              fill
              className="object-contain p-1"
              unoptimized
            />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
            {program.institution}
          </p>
        </div>

        <h3 className="mt-6 font-display text-3xl font-extrabold leading-tight text-white transition-colors group-hover:text-[#f5d061] sm:text-4xl">
          {program.title}
        </h3>

        {program.certificatesCount && (
          <p className="mt-2 text-xs font-semibold text-[#c703e4]">
            {program.certificatesCount}
          </p>
        )}

        <p className="mt-4 text-xs leading-6 text-zinc-400 line-clamp-3">
          {program.summary}
        </p>

        {/* Highlight Perks Preview */}
        {program.certificationTracks ? (
          <div className="mt-5 space-y-1.5 border-l border-[#f5d061]/30 pl-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Certificated Tracks:
            </p>
            {program.certificationTracks.slice(0, 3).map((track) => (
              <p key={track} className="text-xs font-medium text-zinc-300">
                • {track}
              </p>
            ))}
          </div>
        ) : (
          program.features && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {program.features.slice(0, 4).map((feat) => (
                <span
                  key={feat}
                  className="rounded border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-zinc-400"
                >
                  {feat}
                </span>
              ))}
              {program.features.length > 4 && (
                <span className="px-1 text-[10px] text-zinc-500">
                  +{program.features.length - 4} more
                </span>
              )}
            </div>
          )
        )}
      </div>

      {/* Pricing Footer & Action */}
      <div className="mt-8 border-t border-white/[0.06] pt-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500">
              Training Fee
            </span>
            <span className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              {program.price}
            </span>
            {program.priceNote && (
              <span className="block text-[10px] text-zinc-400">
                {program.priceNote}
              </span>
            )}
          </div>

          <Link
            href={`/trainings/${program.slug}`}
            className="group/btn inline-flex items-center gap-2 rounded-full border border-[#f5d061]/40 bg-[#f5d061]/10 px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-widest text-[#f5d061] transition-all hover:bg-[#f5d061] hover:text-[#050308]"
          >
            <span>Details</span>
            <span className="transition-transform group-hover/btn:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
