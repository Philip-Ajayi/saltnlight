"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExhibitorForm } from "@/components/exhibition/exhibitor-form";
import { ExhibitorDirectory } from "@/components/exhibition/exhibitor-directory";
import { EXHIBITION_TIERS, type Booth } from "@/lib/exhibition-data";

// Dynamically import 3D floorplan with SSR disabled to ensure Three.js context hydration
const BoothMap3D = dynamic(
  () =>
    import("@/components/exhibition/booth-map-3d").then(
      (mod) => mod.BoothMap3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[580px] w-full items-center justify-center border border-white/10 bg-[#050308] text-xs font-bold uppercase tracking-widest text-zinc-600">
        Initializing 3D Exhibition Floorplan...
      </div>
    ),
  }
);

export default function ExhibitionPage() {
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);

  const scrollToRegistration = () => {
    const el = document.getElementById("exhibitor-apply");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050308] pt-28">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pb-16 pt-12 border-b border-white/[.05]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(70,5,131,.35),transparent_70%)]" />
        <div className="section-shell relative z-10">
          <span className="eyebrow text-zinc-500">Marketplace & Kingdom Commerce</span>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,8vw,7.5rem)] font-extrabold leading-[.85] tracking-[-.06em]">
            THE EXHIBITIONS
            <br />
            <span className="text-gradient-gold">HUB '26.</span>
          </h1>
          <p className="mt-8 max-w-2xl font-editorial text-2xl italic text-zinc-400 sm:text-3xl">
            Where visionaries, enterprise leaders, publishers, and creators display expressions shaping world mountains.
          </p>
        </div>
      </section>

      {/* 3D INTERACTIVE FLOORPLAN SECTION */}
      <section className="section-space relative border-b border-white/[.05]">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Floorplan Navigation"
            number="01"
            title="Explore and reserve your exhibition booth."
          />
          <div className="mt-12">
            <BoothMap3D
              selectedBooth={selectedBooth}
              onSelectBooth={(booth) => {
                setSelectedBooth(booth);
                scrollToRegistration();
              }}
            />
          </div>
        </div>
      </section>

      {/* TIERS & PRICING SPECIFICATION */}
      <section className="section-space relative bg-[#07020e] border-b border-white/[.05]">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Package Tiers"
            number="02"
            title="Tailored space for every scale of expression."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {EXHIBITION_TIERS.map((tier) => (
              <div
                key={tier.id}
                className="group relative border border-white/[.08] bg-[#08050c] p-8 flex flex-col justify-between transition-all hover:border-[#f5d061]/50"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5d061]">
                    {tier.size}
                  </span>
                  <h3 className="font-display text-3xl font-extrabold text-white mt-2">
                    {tier.name}
                  </h3>
                  <div className="mt-4 font-display text-3xl font-extrabold text-gradient-gold">
                    {tier.price}
                  </div>
                  <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
                    {tier.recommendedFor}
                  </p>

                  <ul className="mt-8 space-y-3 border-t border-white/10 pt-6 text-xs text-zinc-300">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#f5d061]">✦</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <button
                    type="button"
                    onClick={scrollToRegistration}
                    className="w-full btn-secondary text-center"
                  >
                    Select {tier.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXHIBITOR REGISTRATION FORM */}
      <section id="exhibitor-apply" className="section-space relative border-b border-white/[.05]">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Application"
            number="03"
            title="Reserve your booth or exhibit space."
          />
          <div className="mt-12">
            <ExhibitorForm
              selectedBooth={selectedBooth}
              onClearBooth={() => setSelectedBooth(null)}
            />
          </div>
        </div>
      </section>

      {/* DIRECTORY OF REGISTERED EXHIBITORS */}
      <section className="section-space relative bg-[#07020e]">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Directory"
            number="04"
            title="Confirmed exhibitors & partner hubs."
          />
          <div className="mt-12">
            <ExhibitorDirectory />
          </div>
        </div>
      </section>
    </main>
  );
}
