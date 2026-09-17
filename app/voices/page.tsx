"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/section-heading";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { VoicesInteractiveGrid } from "@/components/voices/voices-interactive-grid";
import { ministers } from "@/lib/constants";

const VoicesHeroScene = dynamic(
  () =>
    import("@/components/voices/voices-hero-scene").then(
      (mod) => mod.VoicesHeroScene
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(70,5,131,.2),transparent_50%)]" />
    ),
  }
);

export default function VoicesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050308]">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[75svh] items-center overflow-hidden border-b border-white/[.04]">
        <VoicesHeroScene />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(5,3,8,.85)_90%)]" />

        <div className="section-shell relative z-10 py-32">
          <span className="eyebrow text-zinc-500">Salt & Light '26</span>
          <h1 className="mt-6 font-display text-[clamp(3.5rem,8vw,8.5rem)] font-extrabold leading-[.85] tracking-[-.065em]">
            VOICES OF <br />
            <span className="text-gradient-gold">CONVICTION.</span>
          </h1>
          <p className="mt-8 max-w-xl font-editorial text-3xl italic text-zinc-400 sm:text-4xl">
            People carrying perspective, authority, and substance for world dominance.
          </p>
        </div>
      </section>

      {/* VOICES DIRECTORY SECTION */}
      <section className="section-space relative bg-[#050308]">
        <div className="section-shell">
          <SectionHeading
            eyebrow="The Ministers"
            number="01"
            title="Voices positioned for impact."
          />
          <div className="mt-14">
            <VoicesInteractiveGrid ministers={ministers} />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative overflow-hidden border-t border-white/[.05] bg-[#07020e] py-28">
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#460583]/20 blur-[130px]" />
        <div className="section-shell relative z-10 text-center">
          <span className="eyebrow text-zinc-500">Convocation 2026</span>
          <h2 className="mt-6 font-display text-5xl font-extrabold tracking-[-.055em] sm:text-7xl">
            Hear Them Live in Ibadan.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-zinc-400">
            Join thousands of leaders, builders, and emerging voices at Samonda, Ibadan for Salt & Light '26.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/#register" variant="primary">
              Reserve Your Place →
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}