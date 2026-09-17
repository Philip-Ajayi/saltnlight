"use client";

import { useState } from "react";

export function LocationCard() {
  const [copied, setCopied] = useState(false);
  const address = "MIV Word House, Samonda, Ibadan, Oyo State, Nigeria";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="surface-obsidian relative overflow-hidden rounded-2xl border border-white/10 p-8">
      {/* Decorative Glow */}
      <div className="absolute right-0 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#460583]/20 blur-[60px]" />

      <div className="relative z-10 flex flex-col justify-between gap-8">
        <div>
          <div className="flex items-center justify-between">
            <span className="eyebrow text-[#f5d061]">The Convocation Hub</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
              Venue Desk Active
            </span>
          </div>

          <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            SAMONDA, IBADAN
          </h3>
          <p className="font-editorial text-2xl italic text-zinc-400">Oyo State, Nigeria</p>
        </div>

        {/* Address Card */}
        <div className="rounded-xl border border-white/5 bg-black/40 p-5 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Physical Address</p>
              <p className="mt-1 text-sm text-zinc-200 leading-relaxed">{address}</p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 text-xs font-bold uppercase tracking-wider text-[#f5d061] hover:underline"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Direct Contact Channels */}
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="tel:+2347066060640"
            className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-[#c703e4]/30 hover:bg-[#460583]/10"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Direct Helpline</p>
              <p className="mt-0.5 text-sm font-semibold text-white">+234 706 606 0640</p>
            </div>
            <span className="text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-white">
              →
            </span>
          </a>

          <a
            href="mailto:info@mivwordhouse.org"
            className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-[#c703e4]/30 hover:bg-[#460583]/10"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Official Email</p>
              <p className="mt-0.5 text-sm font-semibold text-white">contact@mivwordhouse.org</p>
            </div>
            <span className="text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-white">
              →
            </span>
          </a>
        </div>

        {/* Map Action Button */}
        <a
          href="https://www.google.com/maps/search/?api=1&query=Samonda%20Ibadan%20Nigeria"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full text-center"
        >
          Open Navigation Map ↗
        </a>
      </div>
    </div>
  );
}