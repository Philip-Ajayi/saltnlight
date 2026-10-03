"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RegistrationFormData } from "@/lib/register-data";
import { SocialBadgeGenerator } from "./social-badge-generator";

interface SuccessModalProps {
  isOpen: boolean;
  data: RegistrationFormData | null;
  onClose: () => void;
}

export function RegisterSuccessModal({ isOpen, data, onClose }: SuccessModalProps) {
  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 backdrop-blur-xl bg-[#050308]/90 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="surface-crystal max-w-xl w-full p-6 sm:p-8 border border-[#c703e4]/30 relative my-8 rounded-2xl"
        >
          {/* Top Right Close / Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cancel and Close Modal"
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Success Header */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f5d061]/15 border border-[#f5d061]/40 mb-3 mx-auto">
            <svg className="w-6 h-6 text-[#f5d061]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-center tracking-tight">
            REGISTRATION <span className="text-gradient-gold">CONFIRMED!</span>
          </h3>

          <p className="mt-1 text-center text-xs text-zinc-300">
            Welcome, <strong className="text-white">{data.firstName} {data.lastName}</strong>! Your spot is reserved.
          </p>

          {/* Social Badge Generator */}
          <div className="mt-5">
            <SocialBadgeGenerator initialName={`${data.firstName} ${data.lastName}`} />
          </div>

          {/* Bottom Cancel / Close Button */}
          <div className="mt-5">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-xs font-bold text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-all"
            >
              Cancel / Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}