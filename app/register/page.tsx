import type { Metadata } from "next";
import { RegisterForm } from "@/components/register/register-form";
import { Register3DBackground } from "@/components/ui/register-3d-bg";

export const metadata: Metadata = {
  title: "Register | Salt & Light '26",
  description:
    "Register to participate or volunteer in Salt & Light '26 — October 12–16 at Samonda, Ibadan.",
};

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-[#050308] overflow-hidden pt-32 pb-24">
      {/* Dynamic 3D Scene Layer */}
      <Register3DBackground />

      {/* Atmospheric Glow Overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#460583]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-shell relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="eyebrow text-zinc-500">Official Portal</span>
          <h1 className="mt-6 font-display text-[clamp(2.8rem,7vw,6.5rem)] font-extrabold leading-[0.88] tracking-[-0.06em]">
            JOIN THE <br />
            <span className="text-gradient-gold">CONVOCATION.</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-sm leading-relaxed text-zinc-400">
            Salt & Light '26 · October 12 — 16 · Samonda, Ibadan.
            <br />
            Reserve your place or register to serve as part of the workforce.
          </p>
        </div>

        {/* Interactive Registration Form */}
        <RegisterForm />
      </div>
    </main>
  );
}