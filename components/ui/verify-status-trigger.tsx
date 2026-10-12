"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface VerificationResult {
  found: boolean;
  attended?: boolean;
  name?: string;
  uniqueId?: string;
  message?: string;
}

export function VerifyStatusTrigger() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/verify-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        found: false,
        message: "Failed to connect to verification server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setResult(null);
  };

  return (
    <>
      {/* FLOATING CIRCLE ON LAYOUT (Bottom Left to preserve dental popup on Bottom Right) */}
      <div className="fixed bottom-6 left-6 z-[200]">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            setOpen(true);
            handleReset();
          }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-[#f5d061]/50 bg-[#07020e]/90 p-1 shadow-[0_0_25px_rgba(245,208,97,0.25)] backdrop-blur-xl transition-all"
          aria-label="Verify Registration Pass"
          title="Verify your pass & check in"
        >
          {/* Ambient Glow Ping */}
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#f5d061]/20" />
          
          <div className="flex flex-col items-center justify-center text-center">
            <svg
              className="h-5 w-5 text-[#f5d061] transition-transform duration-300 group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="mt-0.5 text-[8px] font-extrabold uppercase tracking-widest text-zinc-300">
              Pass
            </span>
          </div>
        </motion.button>
      </div>

      {/* VERIFICATION MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#08050c] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(70,5,131,0.35)] sm:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:text-white"
              >
                ×
              </button>

              <div className="text-center">
                <span className="eyebrow text-[#f5d061]">Salt & Light '26</span>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-white">
                  Verify Pass & Check-In
                </h3>
                <p className="mt-2 text-xs leading-5 text-zinc-400">
                  Enter the email address you registered with to check your status
                  or alert the registration desk.
                </p>
              </div>

              {!result ? (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. yourname@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-[#f5d061] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#f5d061]/50 bg-gradient-to-r from-[#f5d061] to-[#e2b842] py-3 text-xs font-extrabold uppercase tracking-widest text-[#050308] shadow-[0_0_20px_rgba(245,208,97,0.25)] transition-transform hover:scale-[1.02] disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#050308] border-t-transparent" />
                    ) : (
                      "Verify Registration →"
                    )}
                  </button>
                </form>
              ) : (
                <div className="mt-6">
                  {/* CASE 1: NOT REGISTERED */}
                  {!result.found && (
                    <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-5 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                        !
                      </div>
                      <h4 className="mt-3 font-display text-lg font-bold text-white">
                        Record Not Found
                      </h4>
                      <p className="mt-2 text-xs leading-5 text-zinc-300">
                        {result.message}
                      </p>
                      <Link
                        href="/register"
                        onClick={() => setOpen(false)}
                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#f5d061]/50 bg-[#f5d061] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black"
                      >
                        Register Now →
                      </Link>
                    </div>
                  )}

                  {/* CASE 2: REGISTERED & NOT MARKED ATTENDED */}
                  {result.found && !result.attended && (
                    <div className="rounded-xl border border-[#f5d061]/40 bg-[#f5d061]/10 p-5 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#f5d061]/20 text-[#f5d061]">
                        ✓
                      </div>
                      <span className="mt-2 inline-block rounded-full bg-[#460583]/60 px-3 py-1 font-mono text-xs font-bold tracking-wider text-[#f5d061]">
                        {result.uniqueId}
                      </span>
                      <h4 className="mt-2 font-display text-xl font-bold text-white">
                        {result.name}
                      </h4>
                      <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3">
                        <p className="text-xs font-medium text-emerald-400">
                          {result.message}
                        </p>
                        <p className="mt-1 text-[11px] text-zinc-400">
                          We have alerted the registration team. Please step up to the desk to claim your pass!
                        </p>
                      </div>
                    </div>
                  )}

                  {/* CASE 3: REGISTERED & ALREADY CLOCKED IN */}
                  {result.found && result.attended && (
                    <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-5 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                        ✓✓
                      </div>
                      <span className="mt-2 inline-block rounded-full bg-cyan-950/80 px-3 py-1 font-mono text-xs font-bold tracking-wider text-cyan-300">
                        {result.uniqueId}
                      </span>
                      <h4 className="mt-2 font-display text-xl font-bold text-white">
                        {result.name}
                      </h4>
                      <div className="mt-3 rounded-lg border border-cyan-500/20 bg-black/40 p-3">
                        <p className="text-xs font-semibold text-cyan-300">
                          Already Clocked In
                        </p>
                        <p className="mt-1 text-[11px] text-zinc-300">
                          {result.message}
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-5 w-full rounded-xl border border-white/10 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    Check Another Email
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}