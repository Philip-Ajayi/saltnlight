import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { InteractiveSchedule } from "@/components/schedule/interactive-schedule";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Schedule3DWrapper } from "@/components/schedule/schedule-3d-wrapper";

export const metadata: Metadata = {
  title: "Schedule | Salt & Light '26",
  description:
    "Interactive schedule and session timetable for Salt & Light '26 (October 12 – 16, Samonda, Ibadan).",
};

export default function SchedulePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050308] pt-28 pb-20">
      {/* 3D BACKGROUND SCENE */}
      <Schedule3DWrapper />

      {/* HEADER HERO */}
      <section className="relative z-10">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Timetable & Movements"
              title="Oct 12 — Oct 16"
            />
            <p className="max-w-md text-sm leading-6 text-zinc-400">
              Five days of continuous encounter, training, and strategic
              alignment. Explore all session times and plan your convocation
              experience.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SCHEDULE MATRIX */}
      <InteractiveSchedule />

      {/* BOTTOM REGISTRATION CTA */}
      <section className="relative z-10 mt-20 border-t border-white/[.05] pt-16">
        <div className="section-shell text-center">
          <span className="eyebrow text-zinc-500">
            Samonda, Ibadan · October 12–16
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold sm:text-6xl">
            READY TO JOIN THE <span className="text-gradient-gold">CONVOCATION?</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <MagneticButton href="/#register" variant="primary">
              Reserve Your Place →
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}