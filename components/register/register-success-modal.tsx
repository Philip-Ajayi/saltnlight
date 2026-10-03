"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RegistrationFormData, VOLUNTEER_WHATSAPP_GROUP_URL } from "@/lib/register-data";
import { SocialBadgeGenerator } from "./social-badge-generator";

interface SuccessModalProps {
  isOpen: boolean;
  data: RegistrationFormData | null;
  onClose: () => void;
}

export function RegisterSuccessModal({ isOpen, data, onClose }: SuccessModalProps) {
  if (!isOpen || !data) return null;

  const handleWhatsAppRedirect = () => {
    window.open(VOLUNTEER_WHATSAPP_GROUP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 backdrop-blur-xl bg-[#050308]/90 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="surface-crystal max-w-xl w-full p-6 sm:p-8 border border-[#c703e4]/30 relative my-8"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f5d061]/15 border border-[#f5d061]/40 mb-4 mx-auto">
            <svg className="w-6 h-6 text-[#f5d061]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-center tracking-tight">
            REGISTRATION <span className="text-gradient-gold">CONFIRMED!</span>
          </h3>

          <p className="mt-2 text-center text-xs text-zinc-300">
            Welcome, <strong className="text-white">{data.firstName} {data.lastName}</strong>! You have been reserved for Salt & Light '26[cite: 1, 2].
          </p>

          {/* Social Media Badge Generator Integration */}
          <div className="mt-6">
            <SocialBadgeGenerator initialName={`${data.firstName} ${data.lastName}`} />
          </div>

          {data.isVolunteer ? (
            <div className="mt-6 p-4 border border-[#c703e4]/40 bg-[#460583]/20 rounded-xl text-center">
              <span className="eyebrow text-[#f5d061] block mb-1">Workforce Action Required</span>
              <h4 className="font-display text-base font-bold text-white mb-2">
                Join the Volunteer WhatsApp Group
              </h4>
              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2"
              >
                JOIN WORKFORCE WHATSAPP GROUP →
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <button type="button" onClick={onClose} className="btn-secondary w-full py-3 text-xs font-bold">
                CLOSE & RETURN HOME
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
