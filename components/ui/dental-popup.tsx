"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function DentalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Automatically trigger the popup shortly after the user arrives on the page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/2348133027209?text=${encodeURIComponent(
    "Hi, Im interested in AFAED service."
  )}`;

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col items-end">
      <AnimatePresence mode="wait">
        {/* MINIMIZED COLLAPSED TAB */}
        {isMinimized ? (
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setIsMinimized(false)}
            className="group flex items-center gap-3 rounded-full border border-[#f5d061]/40 bg-[#07020e]/95 px-5 py-3 shadow-[0_0_30px_rgba(245,208,97,0.2)] backdrop-blur-xl transition-all hover:scale-105"
            aria-label="Open Dental Promo Flier"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5d061] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#f5d061]" />
            </span>
            <span className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-white">
              Dental Promo · #5,000 <span className="text-[#f5d061]">↗</span>
            </span>
          </motion.button>
        ) : (
          /* FULL EXPANDED POPUP / FLIER CARD */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-white/10 bg-[#08050c] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(199,3,228,0.2)] backdrop-blur-2xl"
          >
            {/* Header controls: Minimize & Close */}
            <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-xs text-zinc-400 backdrop-blur-md transition-colors hover:text-white"
                aria-label="Minimize flier"
                title="Minimize"
              >
                –
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-xs text-zinc-400 backdrop-blur-md transition-colors hover:text-white"
                aria-label="Close flier"
                title="Close"
              >
                ×
              </button>
            </div>

            {/* Clickable Flier Area leading to WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050308]">
                <Image
                  src="/popup/medical.jpeg"
                  alt="AFAED Essential Dental Treatment Flier"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="380px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08050c] via-transparent to-transparent opacity-80" />
              </div>

              {/* Promotional Highlights Overlay / Footer */}
              <div className="p-5 text-left">
                <span className="eyebrow text-[#f5d061]">AFAED Medical Service</span>
                <h3 className="mt-1 font-display text-lg font-extrabold tracking-tight text-white">
                  Essential Dental Treatment
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Get professional care for just <span className="font-bold text-[#f5d061]">#5,000</span> per procedure.
                </p>

                <div className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#f5d061]/50 bg-gradient-to-r from-[#f5d061] to-[#e2b842] py-2.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#050308] shadow-[0_0_20px_rgba(245,208,97,0.3)] transition-transform group-hover:scale-[1.02]">
                  <span>Book via WhatsApp</span>
                  <span>→</span>
                </div>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
