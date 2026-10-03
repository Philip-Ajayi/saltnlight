"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RegistrationFormData,
  REFERRAL_OPTIONS,
  CERTIFICATED_TRAININGS,
  VOLUNTEER_UNITS,
  VOLUNTEER_WHATSAPP_GROUP_URL,
} from "@/lib/register-data";
import { RegisterSuccessModal } from "./register-success-modal";

export function RegisterForm() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    whatsappNumber: "",
    referralSources: [],
    isMember: false,
    certificatedTraining: "NONE",
    isVolunteer: false,
    volunteerUnits: [],
    needsAccommodation: false,
    hasConsented: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegistrationFormData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleReferralToggle = (option: string) => {
    setFormData((prev) => {
      const exists = prev.referralSources.includes(option);
      return {
        ...prev,
        referralSources: exists
          ? prev.referralSources.filter((item) => item !== option)
          : [...prev.referralSources, option],
      };
    });
  };

  const handleVolunteerUnitToggle = (unitId: string) => {
    setFormData((prev) => {
      const exists = prev.volunteerUnits.includes(unitId);
      return {
        ...prev,
        volunteerUnits: exists
          ? prev.volunteerUnits.filter((u) => u !== unitId)
          : [...prev.volunteerUnits, unitId],
      };
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email address is required";
    }
    if (!formData.location.trim()) newErrors.location = "Location/City is required";
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp phone number is required";
    }
    if (formData.referralSources.length === 0) {
      newErrors.referralSources = "Select at least one referral channel";
    }
    if (formData.isVolunteer && formData.volunteerUnits.length === 0) {
      newErrors.volunteerUnits = "Please select at least one unit you wish to serve in";
    }
    if (!formData.hasConsented) {
      newErrors.hasConsented = "You must agree to the privacy notice before submitting";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setErrors((prev) => ({
        ...prev,
        submit: "Please resolve the highlighted validation errors above before proceeding.",
      }));
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors({ submit: result.error || "Registration failed. Please try again later." });
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmittedData({ ...formData, uniqueId: result.uniqueId } as any);
      setShowModal(true);

      if (formData.isVolunteer) {
        setTimeout(() => {
          window.open(VOLUNTEER_WHATSAPP_GROUP_URL, "_blank", "noopener,noreferrer");
        }, 1800);
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrors({ submit: "Network error occurred. Check your internet connection and retry." });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* SUBMISSION ERROR NOTIFICATION BANNER */}
        <AnimatePresence>
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 border border-red-500/50 bg-red-500/10 rounded-xl flex items-start gap-3 text-red-300 text-xs sm:text-sm"
            >
              <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <strong className="block font-semibold text-red-200">Registration Error</strong>
                <span>{errors.submit}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PERSONAL DETAILS SECTION */}
        <div className="surface-obsidian p-6 sm:p-10 border border-white/[0.06]">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-xs font-bold text-[#f5d061]">01</span>
            <span className="eyebrow text-zinc-400">Personal Information</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="e.g. Samuel"
                className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#f5d061] focus:outline-none transition-colors"
              />
              {errors.firstName && <p className="mt-1 text-[11px] text-red-400">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="e.g. Adebayo"
                className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#f5d061] focus:outline-none transition-colors"
              />
              {errors.lastName && <p className="mt-1 text-[11px] text-red-400">{errors.lastName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="samuel@example.com"
                className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#f5d061] focus:outline-none transition-colors"
              />
              {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="+234 800 000 0000"
                className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#f5d061] focus:outline-none transition-colors"
              />
              {errors.whatsappNumber && (
                <p className="mt-1 text-[11px] text-red-400">{errors.whatsappNumber}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Location / City & Country *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Ibadan, Oyo State, Nigeria"
                className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#f5d061] focus:outline-none transition-colors"
              />
              {errors.location && <p className="mt-1 text-[11px] text-red-400">{errors.location}</p>}
            </div>
          </div>
        </div>

        {/* HOW DID YOU HEAR ABOUT US */}
        <div className="surface-obsidian p-6 sm:p-10 border border-white/[0.06]">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-xs font-bold text-[#f5d061]">02</span>
            <span className="eyebrow text-zinc-400">How did you hear about us? *</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {REFERRAL_OPTIONS.map((option) => {
              const isChecked = formData.referralSources.includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleReferralToggle(option)}
                  className={`flex items-center gap-3 p-3.5 text-left border text-xs font-medium transition-all ${
                    isChecked
                      ? "border-[#f5d061] bg-[#f5d061]/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                      isChecked ? "border-[#f5d061] bg-[#f5d061]" : "border-zinc-600"
                    }`}
                  >
                    {isChecked && (
                      <svg className="w-3 h-3 text-black stroke-current" viewBox="0 0 24 24" fill="none">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
          {errors.referralSources && (
            <p className="mt-2 text-[11px] text-red-400">{errors.referralSources}</p>
          )}
        </div>

        {/* MEMBERSHIP & CERTIFICATED TRAINING */}
        <div className="surface-obsidian p-6 sm:p-10 border border-white/[0.06] space-y-8">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-bold text-[#f5d061]">03</span>
            <span className="eyebrow text-zinc-400">Membership & Track Selection</span>
          </div>

          <label className="flex items-start gap-4 p-4 border border-white/10 bg-white/[0.02] cursor-pointer hover:border-[#c703e4]/40 transition-colors">
            <input
              type="checkbox"
              checked={formData.isMember}
              onChange={(e) => setFormData({ ...formData, isMember: e.target.checked })}
              className="mt-1 h-4 w-4 accent-[#c703e4] rounded"
            />
            <div>
              <span className="text-sm font-bold text-white block">I am an existing MIV Word House Member</span>
              <span className="text-xs text-zinc-500">
                Tick if you currently attend MIV Word House or affiliated sub-ministries[cite: 1, 2].
              </span>
            </div>
          </label>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Certificated Training Interest (Optional)
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              {CERTIFICATED_TRAININGS.map((track) => {
                const isSelected = formData.certificatedTraining === track.id;
                return (
                  <button
                    type="button"
                    key={track.id}
                    onClick={() => setFormData({ ...formData, certificatedTraining: track.id as any })}
                    className={`p-4 border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? "border-[#c703e4] bg-[#460583]/20 text-white"
                        : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20"
                    }`}
                  >
                    <span className="font-display font-bold text-sm text-white mb-1">{track.label}</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      {track.id === "NONE" ? "General Convocation" : "Certificated Track"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex items-start gap-4 p-4 border border-white/10 bg-white/[0.02] cursor-pointer hover:border-[#f5d061]/40 transition-colors">
            <input
              type="checkbox"
              checked={formData.needsAccommodation}
              onChange={(e) => setFormData({ ...formData, needsAccommodation: e.target.checked })}
              className="mt-1 h-4 w-4 accent-[#f5d061] rounded"
            />
            <div>
              <span className="text-sm font-bold text-white block">I need accommodation arrangements</span>
              <span className="text-xs text-zinc-500">
                Check this if you are traveling to Samonda, Ibadan from afar and need lodging support[cite: 1, 2].
              </span>
            </div>
          </label>
        </div>

        {/* VOLUNTEER SECTION */}
        <div className="surface-obsidian p-6 sm:p-10 border border-white/[0.06]">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-xs font-bold text-[#f5d061]">04</span>
            <span className="eyebrow text-zinc-400">Workforce / Volunteering</span>
          </div>

          <label className="flex items-start gap-4 p-5 border border-[#c703e4]/30 bg-[#460583]/10 cursor-pointer hover:border-[#c703e4] transition-colors">
            <input
              type="checkbox"
              checked={formData.isVolunteer}
              onChange={(e) => setFormData({ ...formData, isVolunteer: e.target.checked })}
              className="mt-1 h-5 w-5 accent-[#c703e4] rounded"
            />
            <div>
              <span className="text-base font-bold text-white block">
                I want to volunteer as a Workforce Member
              </span>
              <span className="text-xs text-zinc-400">
                You will be automatically routed to the Salt & Light '26 workforce WhatsApp group upon submission.
              </span>
            </div>
          </label>

          <AnimatePresence>
            {formData.isVolunteer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-white/10 space-y-4"
              >
                <span className="block text-xs font-bold uppercase tracking-wider text-[#f5d061]">
                  Select Volunteer Units *
                </span>

                <div className="grid gap-3 sm:grid-cols-2">
                  {VOLUNTEER_UNITS.map((unit) => {
                    const isSelected = formData.volunteerUnits.includes(unit.id);
                    return (
                      <button
                        type="button"
                        key={unit.id}
                        onClick={() => handleVolunteerUnitToggle(unit.id)}
                        className={`p-3.5 border text-left transition-all ${
                          isSelected
                            ? "border-[#f5d061] bg-[#f5d061]/10 text-white"
                            : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white">{unit.label}</span>
                          <span
                            className={`w-3.5 h-3.5 rounded-full border ${
                              isSelected ? "bg-[#f5d061] border-[#f5d061]" : "border-zinc-600"
                            }`}
                          />
                        </div>
                        <span className="text-[10px] text-zinc-500 mt-1 block">
                          {unit.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.volunteerUnits && (
                  <p className="text-[11px] text-red-400">{errors.volunteerUnits}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CONSENT CLAUSE */}
        <div className="surface-obsidian p-6 sm:p-8 border border-white/[0.06] space-y-4">
          <span className="eyebrow text-zinc-500">Privacy Notice & Terms</span>
          <p className="text-xs text-zinc-400 leading-relaxed">
            By submitting this form, you grant Salt & Light '26 and MIV Word House permission to collect and store your contact information for event management[cite: 1, 2].
          </p>

          <label className="flex items-start gap-3 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasConsented}
              onChange={(e) => setFormData({ ...formData, hasConsented: e.target.checked })}
              className="mt-0.5 h-4 w-4 accent-[#f5d061]"
            />
            <span className="text-xs font-semibold text-zinc-300">
              I have read, understood, and agree to the consent clause and privacy notice. *
            </span>
          </label>
          {errors.hasConsented && <p className="text-[11px] text-red-400">{errors.hasConsented}</p>}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-5 text-sm tracking-widest font-extrabold flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                PROCESSING REGISTRATION...
              </span>
            ) : (
              <>COMPLETE REGISTRATION →</>
            )}
          </button>
        </div>
      </form>

      <RegisterSuccessModal
        isOpen={showModal}
        data={submittedData}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
