"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RegistrationFormData, VOLUNTEER_WHATSAPP_GROUP_URL } from "@/lib/register-data";

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
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 backdrop-blur-xl bg-[#050308]/90">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="surface-crystal max-w-lg w-full p-8 sm:p-10 border border-[#c703e4]/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-40 w-40 bg-[#f5d061]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#f5d061]/15 border border-[#f5d061]/40 mb-6 mx-auto">
            <svg
              className="w-7 h-7 text-[#f5d061]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="font-display text-3xl font-extrabold text-center tracking-tight">
            REGISTRATION <span className="text-gradient-gold">CONFIRMED!</span>
          </h3>

          <p className="mt-3 text-center text-xs text-zinc-300 leading-relaxed">
            Welcome, <strong className="text-white">{data.firstName} {data.lastName}</strong>! You have been successfully reserved for Salt & Light '26.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-500">Email:</span>
              <span className="text-zinc-200 font-medium">{data.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Location:</span>
              <span className="text-zinc-200 font-medium">{data.location}</span>
            </div>
            {data.certificatedTraining && data.certificatedTraining !== "NONE" && (
              <div className="flex justify-between">
                <span className="text-zinc-500">Selected Training:</span>
                <span className="text-[#f5d061] font-bold">{data.certificatedTraining}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-zinc-500">Accommodation Needed:</span>
              <span className="text-zinc-200 font-medium">{data.needsAccommodation ? "Yes" : "No"}</span>
            </div>
          </div>

          {data.isVolunteer ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-5 border border-[#c703e4]/40 bg-[#460583]/20 rounded-xl text-center"
            >
              <span className="eyebrow text-[#f5d061] block mb-1">Workforce Action Required</span>
              <h4 className="font-display text-lg font-bold text-white mb-2">
                Join the Volunteer WhatsApp Group
              </h4>
              <p className="text-[11px] text-zinc-400 mb-4 leading-relaxed">
                As a registered volunteer assigned to <strong className="text-zinc-200">{data.volunteerUnits.join(", ") || "Workforce"}</strong>, please join our official coordination room below.
              </p>
              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="btn-primary w-full py-3 text-xs tracking-wider font-extrabold flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                JOIN WORKFORCE WHATSAPP GROUP →
              </button>
            </motion.div>
          ) : (
            <div className="mt-8">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary w-full py-3 text-xs font-bold"
              >
                RETURN TO HOME
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}