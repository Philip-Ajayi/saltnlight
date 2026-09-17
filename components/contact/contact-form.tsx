"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const inquiryTypes = [
  { id: "general", label: "General Inquiry" },
  { id: "exhibition", label: "Exhibition / Booth" },
  { id: "volunteer", label: "Volunteer Workforce" },
  { id: "media", label: "Speaking & Media" },
  { id: "logistics", label: "Accommodation" },
];

const spheresOfInfluence = [
  "Governance",
  "Marketplace & Business",
  "Media & Communication",
  "Education",
  "Arts & Culture",
  "Family",
  "Church Ministry",
  "Other / Unspecified",
];

export function ContactForm() {
  const [activeType, setActiveType] = useState("general");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    sphere: spheresOfInfluence[0],
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          activeType,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      sphere: spheresOfInfluence[0],
      message: "",
    });
  };

  return (
    <div className="surface-crystal relative overflow-hidden rounded-2xl p-6 sm:p-10 lg:p-12">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c703e4]/10 blur-[80px]" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="relative z-10 space-y-8"
          >
            {/* Category Selector */}
            <div>
              <label className="eyebrow block mb-4 text-zinc-400">
                01 / Select Inquiry Type
              </label>
              <div className="flex flex-wrap gap-2">
                {inquiryTypes.map((type) => {
                  const isSelected = activeType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setActiveType(type.id)}
                      className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        isSelected
                          ? "border border-[#f5d061] bg-[#f5d061] text-[#050308] shadow-[0_0_20px_rgba(245,208,97,0.25)]"
                          : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-6">
              <label className="eyebrow block text-zinc-400">
                02 / Your Details
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-400">Full Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David King"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-[#f5d061] focus:ring-1 focus:ring-[#f5d061]"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-400">Email Address *</span>
                  <input
                    type="email"
                    required
                    placeholder="david@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-[#f5d061] focus:ring-1 focus:ring-[#f5d061]"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-400">Phone / WhatsApp</span>
                  <input
                    type="tel"
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-[#f5d061] focus:ring-1 focus:ring-[#f5d061]"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-400">Primary Mountain of Influence</span>
                  <select
                    value={formData.sphere}
                    onChange={(e) => setFormData({ ...formData, sphere: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition-all focus:border-[#f5d061] focus:ring-1 focus:ring-[#f5d061]"
                  >
                    {spheresOfInfluence.map((sphere) => (
                      <option key={sphere} value={sphere} className="bg-[#0c0418] text-white">
                        {sphere}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-400">Message / Request Details *</span>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us how we can assist or support your participation..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-none rounded-lg border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-[#f5d061] focus:ring-1 focus:ring-[#f5d061]"
                />
              </div>
            </div>

            {/* Error Message Feedback */}
            {errorMessage && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-400">
                {errorMessage}
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    Transmitting...
                  </span>
                ) : (
                  "Send Transmission →"
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 py-12 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#f5d061]/40 bg-[#f5d061]/10 text-2xl text-[#f5d061]">
              ✓
            </div>
            <h3 className="mt-6 font-display text-3xl font-bold tracking-tight text-white">
              Transmission Received
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400 leading-relaxed">
              Thank you, <span className="text-white font-medium">{formData.fullName}</span>. Your inquiry regarding{" "}
              <span className="text-[#f5d061]">
                {inquiryTypes.find((t) => t.id === activeType)?.label}
              </span>{" "}
              has been logged. Our secretariat will contact you shortly.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary mt-8"
            >
              Send Another Inquiry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}