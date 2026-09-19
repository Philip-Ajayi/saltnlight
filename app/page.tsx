"use client";

import dynamic from "next/dynamic";
import { HeroContent } from "@/components/hero/hero-content";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { SectionHeading } from "@/components/ui/section-heading";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MinisterGrid } from "@/components/ministers/minister-grid";
import {
  mountains,
  programTracks,
  ministers,
  archiveImages,
} from "@/lib/constants";

const HeroScene = dynamic(
  () => import("@/components/hero/hero-scene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(70,5,131,.25),transparent_45%)]" />
    ),
  }
);

const MountainOrbit = dynamic(
  () =>
    import("@/components/mountains/mountain-orbit").then(
      (mod) => mod.MountainOrbit
    ),
  { ssr: false }
);

const ProgramScroll = dynamic(
  () =>
    import("@/components/program/program-scroll").then(
      (mod) => mod.ProgramScroll
    ),
  { ssr: false }
);

const ArchiveWall = dynamic(
  () =>
    import("@/components/gallery/archive-wall").then((mod) => mod.ArchiveWall),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="relative overflow-clip bg-[#050308]">
      {/* HERO SECTION */}
      <section
        id="home"
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      >
        <HeroScene />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(5,3,8,.12)_42%,rgba(5,3,8,.82)_100%)]" />
        <div className="relative z-10 w-full">
          <HeroContent />
        </div>
        <div className="absolute bottom-7 left-0 right-0 z-20 flex justify-center px-6">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-zinc-500">
            <span className="h-px w-8 bg-zinc-700" />
            Scroll to enter
            <span className="h-px w-8 bg-zinc-700" />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section-space relative overflow-hidden">
        <div className="section-shell">
          <div className="grid items-end gap-10 lg:grid-cols-[.65fr_1.35fr]">
            <SectionHeading
              eyebrow="The Convocation"
              number="01"
              title="A gathering for people who intend to shape what comes next."
            />
            <div className="max-w-4xl lg:pb-2">
              <p className="font-editorial text-4xl italic leading-[.98] text-zinc-200 sm:text-5xl lg:text-6xl">
                Influence is not merely a position.
                <br />
                <span className="text-zinc-500">It is a responsibility.</span>
              </p>
              <p className="mt-8 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                Salt & Light '26 is a convocation of and for influence on world
                mountains — bringing together leaders, builders, creatives,
                ministers and emerging voices for encounter, equipping and
                action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MOUNTAINS / EXPERIENCE */}
      <section
        id="experience"
        className="relative min-h-[900px] overflow-hidden border-y border-white/[.04] bg-[#07020e]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(70,5,131,.24),transparent_42%)]" />
        <div className="section-shell relative z-10 pt-24">
          <SectionHeading
            eyebrow="The Seven Mountains"
            number="02"
            title="Where will your influence land?"
          />
        </div>
        <MountainOrbit mountains={mountains} />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#07020e] to-transparent" />
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="relative bg-[#050308]">
        <div className="section-shell pt-28">
          <SectionHeading
            eyebrow="The Journey"
            number="03"
            title="Five movements. One call."
          />
        </div>
        <ProgramScroll tracks={programTracks} />
      </section>

      {/* VOICES / MINISTERS */}
      <section id="voices" className="section-space relative bg-[#07020e]">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Voices"
            number="04"
            title="People carrying something worth hearing."
          />
          <div className="mt-16">
            <MinisterGrid ministers={ministers} />
          </div>
        </div>
      </section>

      {/* ARCHIVE / GALLERY */}
      <section id="gallery" className="section-space relative overflow-hidden">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="The Archive"
              number="05"
              title="Moments that became markers."
            />
            <p className="max-w-sm text-sm leading-6 text-zinc-500">
              A visual record of the people, encounters and movements that have
              shaped the Salt & Light story.
            </p>
          </div>
          <ArchiveWall images={archiveImages} />
        </div>
      </section>

      {/* EXHIBITION */}
      <section id="exhibition" className="relative bg-[#07020e]">
        <div className="grid lg:grid-cols-2">
          <div className="group relative min-h-[620px] overflow-hidden border-b border-white/[.05] p-8 sm:p-12 lg:border-b-0 lg:border-r lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(70,5,131,.28),transparent_55%)] transition-transform duration-[1.5s] group-hover:scale-110" />
            <div className="relative flex min-h-[520px] flex-col justify-between">
              <span className="eyebrow text-zinc-500">Volunteer</span>
              <div>
                <p className="font-editorial text-4xl italic text-zinc-400">
                  Serve the
                </p>
                <h2 className="mt-1 font-display text-6xl font-extrabold tracking-[-.055em] sm:text-8xl">
                  VISION.
                </h2>
                <p className="mt-6 max-w-md text-sm leading-6 text-zinc-500">
                  There is a place for your hands, your skill and your capacity
                  in the work.
                </p>
                <div className="mt-8">
                  <MagneticButton href="/register" variant="secondary">
                    Join the workforce →
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative min-h-[620px] overflow-hidden p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(199,3,228,.13),transparent_55%)] transition-transform duration-[1.5s] group-hover:scale-110" />
            <div className="relative flex min-h-[520px] flex-col justify-between">
              <span className="eyebrow text-zinc-500">Exhibition Hub</span>
              <div>
                <p className="font-editorial text-4xl italic text-zinc-400">
                  Build on the
                </p>
                <h2 className="mt-1 font-display text-6xl font-extrabold tracking-[-.055em] sm:text-8xl">
                  MOUNTAIN.
                </h2>
                <p className="mt-6 max-w-md text-sm leading-6 text-zinc-500">
                  Bring your organisation, product or expression into a
                  marketplace designed for meaningful connection.
                </p>
                <div className="mt-8">
                  <MagneticButton href="#register" variant="primary">
                    Book your booth →
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section id="venue" className="section-space relative overflow-hidden">
        <div className="section-shell">
          <div className="relative overflow-hidden border border-white/[.06] bg-[#08050c] p-7 sm:p-12 lg:p-16">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#460583]/10 blur-[120px]" />
            <div className="relative grid gap-16 lg:grid-cols-[1fr_.65fr]">
              <div>
                <span className="eyebrow text-zinc-500">The Destination</span>
                <h2 className="mt-8 font-display text-[clamp(4rem,10vw,9rem)] font-extrabold leading-[.82] tracking-[-.065em]">
                  SAMONDA
                </h2>
                <p className="mt-5 font-editorial text-4xl italic text-zinc-500">
                  Ibadan, Nigeria
                </p>
              </div>
              <div className="self-end">
                <div className="border-l border-[#f5d061]/30 pl-6">
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-[#f5d061]">
                    Venue
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    Samonda, Ibadan
                    <br />
                    Oyo State, Nigeria
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton
                    href="https://www.google.com/maps/search/?api=1&query=Samonda%20Ibadan%20Nigeria"
                    variant="secondary"
                    external
                  >
                    Get directions →
                  </MagneticButton>
                  <MagneticButton href="tel:+2348133027209" variant="secondary">
                    Call →
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTER */}
      <section
        id="register"
        className="relative flex min-h-[80vh] items-center justify-center overflow-hidden border-t border-white/[.04] bg-[#050308]"
      >
        <div className="absolute h-[600px] w-[600px] rounded-full bg-[#460583]/20 blur-[140px]" />
        <div className="relative z-10 px-6 text-center">
          <span className="eyebrow text-zinc-500">The next movement</span>
          <h2 className="mt-8 font-display text-[clamp(4rem,10vw,9rem)] font-extrabold leading-[.8] tracking-[-.07em]">
            RESERVE
            <br />
            <span className="text-gradient-gold">YOUR PLACE.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-zinc-500">
            October 12 — 16 · Samonda, Ibadan.
            <br />
            Come ready for encounter. Leave equipped for influence.
          </p>
          <div className="mt-10">
            <MagneticButton href="/register" variant="primary">
              Register for Salt & Light '26 →
            </MagneticButton>
          </div>
          <div className="mx-auto mt-12 w-fit">
            <CountdownTimer />
          </div>
        </div>
      </section>
    </main>
  );
}
