import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { trainingPrograms } from "@/lib/trainings";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface DynamicTrainingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return trainingPrograms.map((p) => ({
    slug: p.slug,
  }));
}

export default async function TrainingDetailPage({
  params,
}: DynamicTrainingPageProps) {
  const { slug } = await params;
  const program = trainingPrograms.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050308] pt-28 pb-24">
      {/* HEADER SECTION */}
      <section className="relative border-b border-white/10 bg-[#07020e] py-16">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 bg-[#460583]/20 blur-3xl" />

        <div className="section-shell relative z-10">
          <Link
            href="/trainings"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#f5d061] transition-colors"
          >
            ← Back to all programs
          </Link>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <div className="relative h-10 w-32 overflow-hidden rounded bg-white/5 p-1">
                  <Image
                    src={program.logo}
                    alt={program.institution}
                    fill
                    className="object-contain p-1"
                    unoptimized
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#f5d061]">
                  {program.institution}
                </span>
              </div>

              <h1 className="mt-6 font-display text-4xl font-extrabold text-white sm:text-6xl">
                {program.title}
              </h1>

              {program.certificatesCount && (
                <p className="mt-3 text-sm font-semibold text-[#c703e4]">
                  {program.certificatesCount}
                </p>
              )}

              <p className="mt-6 text-sm leading-7 text-zinc-300 sm:text-base">
                {program.summary}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="shrink-0 rounded-2xl border border-white/10 bg-[#0c0418] p-8 text-center shadow-2xl lg:w-80">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Tuition Fee
              </span>
              <div className="mt-2 font-display text-4xl font-extrabold text-[#f5d061]">
                {program.price}
              </div>
              {program.priceNote && (
                <p className="mt-2 text-xs text-zinc-400">{program.priceNote}</p>
              )}

              <div className="mt-6">
                <MagneticButton href="/register" variant="primary">
                  Enroll Now →
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM & FEATURES BREAKDOWN */}
      <section className="section-space">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Left Column: Curriculum Modules & Features */}
            <div className="space-y-10">
              {program.certificationTracks && (
                <div className="rounded-2xl border border-white/10 bg-[#07020e] p-8">
                  <h3 className="font-display text-2xl font-bold text-white">
                    Certification Tracks Included
                  </h3>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {program.certificationTracks.map((track) => (
                      <div
                        key={track}
                        className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-zinc-200"
                      >
                        <span className="text-[#f5d061]">✓</span>
                        <span>{track}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-white/10 bg-[#07020e] p-8">
                <h3 className="font-display text-2xl font-bold text-white">
                  Training Features & Modules
                </h3>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {program.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-xs leading-6 text-zinc-300"
                    >
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#f5d061]/20 text-[10px] text-[#f5d061]">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {program.idealFor && (
                <div className="rounded-2xl border border-white/10 bg-[#07020e] p-8">
                  <h3 className="font-display text-2xl font-bold text-white">
                    Ideal Participants
                  </h3>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {program.idealFor.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Perks, Bonus, Volunteer info */}
            <div className="space-y-8">
              {program.perks && (
                <div className="rounded-2xl border border-[#c703e4]/30 bg-[#460583]/10 p-8 backdrop-blur-md">
                  <span className="eyebrow text-[#c703e4]">Participant Perks</span>
                  <h4 className="mt-2 font-display text-xl font-bold text-white">
                    Every Participant Enjoys:
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {program.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-xs text-zinc-300">
                        <span className="text-[#f5d061]">★</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {program.bonus && (
                <div className="rounded-2xl border border-[#f5d061]/30 bg-[#f5d061]/5 p-8">
                  <span className="eyebrow text-[#f5d061]">Additional Bonus</span>
                  <p className="mt-3 font-display text-lg font-bold text-white">
                    {program.bonus}
                  </p>
                </div>
              )}

              {program.volunteerOpportunities && (
                <div className="rounded-2xl border border-white/10 bg-[#07020e] p-8">
                  <span className="eyebrow text-zinc-500">Volunteer Opportunities</span>
                  <p className="mt-3 text-xs leading-6 text-zinc-300">
                    {program.volunteerOpportunities}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
