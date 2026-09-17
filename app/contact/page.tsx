"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { LocationCard } from "@/components/contact/location-card";
import { FAQAccordion } from "@/components/contact/faq-accordion";

const ContactHeroScene = dynamic(
  () =>
    import("@/components/contact/contact-hero-scene").then(
      (mod) => mod.ContactHeroScene
    ),
  { ssr: false }
);

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-clip bg-[#050308] pt-32 pb-24">
      {/* Dynamic 3D Atmospheric Background */}
      <div className="absolute inset-0 h-[80vh] overflow-hidden pointer-events-none">
        <ContactHeroScene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050308]/80 to-[#050308]" />
      </div>

      {/* HEADER SECTION */}
      <section className="section-shell relative z-10 pt-12">
        <div className="max-w-4xl">
          <span className="eyebrow text-zinc-500">Initiate Dialogue</span>
          <h1 className="mt-6 font-display text-[clamp(3.5rem,8.5vw,7.5rem)] font-extrabold leading-[0.88] tracking-[-0.06em]">
            CONNECT WITH <br />
            <span className="text-gradient-gold">THE SECRETARIAT.</span>
          </h1>
          <p className="mt-8 max-w-2xl font-editorial text-2xl italic leading-relaxed text-zinc-400 sm:text-3xl">
            Whether preparing your delegation, securing an exhibition booth, or inquiring about logistics—we are here to serve your journey.
          </p>
        </div>
      </section>

      {/* FORM & LOCATION GRID */}
      <section className="section-shell relative z-10 mt-16 sm:mt-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          {/* Main Interactive Form */}
          <ContactForm />

          {/* Location & Quick Contact Card */}
          <div className="space-y-8">
            <LocationCard />

            <div className="surface-obsidian rounded-2xl p-6 border border-white/5">
              <span className="eyebrow text-zinc-500 block mb-2">Convocation Dates</span>
              <p className="font-display text-xl font-bold text-white">October 12 — 16, 2026</p>
              <p className="mt-1 text-xs text-zinc-400">Samonda, Ibadan, Oyo State, Nigeria</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section-shell relative z-10 mt-32">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          <SectionHeading
            eyebrow="Clarifications"
            number="06"
            title="Frequently Asked Questions."
          />
          <FAQAccordion />
        </div>
      </section>
    </main>
  );
}