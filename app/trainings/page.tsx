"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TrainingScroll } from "@/components/trainings/training-scroll";
import { trainingPrograms } from "@/lib/trainings";

export default function TrainingsPage() {
  return (
    <main className="min-h-screen bg-[#050308] pt-28 pb-24 overflow-x-hidden">
      {/* HERO / HEAD SECTION */}
      <section className="relative overflow-hidden py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(70,5,131,0.35),transparent_70%)] blur-3xl" />

        <div className="section-shell relative z-10">
          <span className="eyebrow text-[#f5d061]">Salt & Light '26 · Certificated Track</span>
          <h1 className="mt-6 font-display text-[clamp(3.2rem,8vw,8rem)] font-extrabold leading-[0.88] tracking-tight text-white">
            CERTIFICATED <br />
            <span className="text-gradient-gold">TRAINING PROGRAMS.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Equipping professionals, leaders, and ministers with globally recognized credentials and market-ready intelligence. Select a training program below to view details and register.
          </p>

          {/* Institutional Partner Logos */}
          <div className="mt-12 flex flex-wrap items-center gap-8 border-y border-white/[0.08] py-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Certifying Partners:
            </span>
            <div className="flex items-center gap-6">
              <div className="relative h-10 w-36 overflow-hidden rounded bg-white/5 p-1">
                <Image
                  src="https://mytsmedu.com/wp-content/uploads/2022/04/TSM-Edu-Logo-1-420x105.png"
                  alt="Transatlantic School of Management"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="relative h-10 w-24 overflow-hidden rounded bg-white/5 p-1">
                <Image
                  src="https://menofissacharvision.com/assets/MIVlogo.svg"
                  alt="MIV School of Missions"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLICKABLE INTERACTIVE SCROLL SECTION */}
      <section className="relative my-8 border-y border-white/[0.05] bg-[#07020e] py-12">
        <div className="section-shell mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Explore Programs"
            number="01"
            title="Interactive Training Track"
          />
          <p className="text-xs text-zinc-500 max-w-xs">
            Swipe or use controls to browse through all available certificated courses. Click any card for comprehensive details.
          </p>
        </div>

        <TrainingScroll programs={trainingPrograms} />
      </section>

      {/* ITEMIZED GRID VIEW */}
      <section className="section-space">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Full Overview"
            number="02"
            title="Detailed Training Roster"
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {trainingPrograms.map((program) => (
              <div
                key={program.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#07020e]/80 p-8 transition-all hover:border-[#f5d061]/50 hover:bg-[#0c0418]"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5d061]">
                        {program.institution}
                      </span>
                      <h3 className="mt-2 font-display text-2xl font-extrabold text-white group-hover:text-[#f5d061] sm:text-3xl">
                        {program.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-display text-lg font-bold text-white">
                      {program.price}
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-6 text-zinc-400">
                    {program.summary}
                  </p>

                  {/* Modules or Tracks summary */}
                  <div className="mt-6 border-t border-white/5 pt-4">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Program Highlights:
                    </span>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {program.features.slice(0, 6).map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-zinc-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#f5d061]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  {program.bonus ? (
                    <span className="text-[10px] font-semibold text-[#c703e4]">
                      Bonus: {program.bonus}
                    </span>
                  ) : (
                    <span className="text-[10px] text-zinc-500">
                      Salt & Light '26 Convocation Track
                    </span>
                  )}

                  <Link
                    href={`/trainings/${program.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#f5d061] hover:underline"
                  >
                    View Curriculum →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTER CTA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#030206] py-20">
        <div className="section-shell text-center">
          <span className="eyebrow text-zinc-500">Ready to build capacity?</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-6xl">
            RESERVE YOUR TRAINING SPOT.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xs text-zinc-400 sm:text-sm">
            All certificated programs run during Salt & Light '26 (October 13 – 16) at Samonda, Ibadan.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton href="/register" variant="primary">
              Register for Salt & Light '26 →
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
