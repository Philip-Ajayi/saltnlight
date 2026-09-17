"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXHIBITION_TIERS, type Booth } from "@/lib/exhibition-data";
import { mountainMatrix } from "@/lib/constants";

interface ExhibitorFormProps {
  selectedBooth: Booth | null;
  onClearBooth: () => void;
}

export function ExhibitorForm({ selectedBooth, onClearBooth }: ExhibitorFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTier, setSelectedTier] = useState<string>(
    selectedBooth?.tier.toLowerCase() || "standard"
  );

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    mountain: "Marketplace",
    category: "",
    website: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="surface-crystal p-8 sm:p-12 text-center border border-[#f5d061]/30"
      >
        <span className="text-4xl">✨</span>
        <h3 className="mt-4 font-display text-3xl font-extrabold text-white">Application Received</h3>
        <p className="mt-3 text-sm text-zinc-300 max-w-lg mx-auto">
          Thank you for applying to exhibit at <span className="text-[#f5d061]">Salt & Light '26</span>.
          Our trade steering committee will review your application and space assignment (
          {selectedBooth ? selectedBooth.code : "Unassigned Tier Preference"}) within 48 hours.
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              onClearBooth();
            }}
            className="btn-secondary"
          >
            Submit Another Application
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="surface-obsidian p-6 sm:p-10 border border-white/[.08]">
      {/* Progress Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
        <div>
          <span className="eyebrow text-[#f5d061]">Exhibitor Registration</span>
          <h3 className="font-display text-2xl font-bold mt-1">Book Your Expression</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-zinc-500">
          <span className={step >= 1 ? "text-[#f5d061]" : ""}>01 Tier & Booth</span>
          <span>→</span>
          <span className={step >= 2 ? "text-[#f5d061]" : ""}>02 Business Info</span>
          <span>→</span>
          <span className={step === 3 ? "text-[#f5d061]" : ""}>03 Review</span>
        </div>
      </div>

      {selectedBooth && (
        <div className="mb-8 flex items-center justify-between border border-[#c703e4]/40 bg-[#c703e4]/10 p-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#c703e4]">3D Floorplan Selection</span>
            <p className="text-sm font-bold text-white">
              Booth {selectedBooth.code} ({selectedBooth.tier}) — {selectedBooth.price}
            </p>
          </div>
          <button
            type="button"
            onClick={onClearBooth}
            className="text-xs text-zinc-400 hover:text-white underline"
          >
            Change Booth
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Select Space Tier</h4>
              <div className="grid gap-4 md:grid-cols-3">
                {EXHIBITION_TIERS.map((tier) => (
                  <label
                    key={tier.id}
                    className={`cursor-pointer p-5 border transition-all ${
                      selectedTier === tier.id
                        ? "border-[#f5d061] bg-[#f5d061]/5"
                        : "border-white/10 bg-[#08050c] hover:border-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="tier"
                      value={tier.id}
                      checked={selectedTier === tier.id}
                      onChange={() => setSelectedTier(tier.id)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-white">{tier.name}</span>
                      <span className="text-xs font-extrabold text-[#f5d061]">{tier.price}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">{tier.size}</p>
                    <ul className="mt-4 space-y-1.5 text-xs text-zinc-500">
                      {tier.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-[#f5d061]">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </label>
                ))}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-primary"
                >
                  Continue to Details →
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase font-bold text-zinc-400 mb-2">
                    Organization / Brand Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Kingdom Builders Publishing"
                    className="w-full bg-[#08050c] border border-white/10 px-4 py-3 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-zinc-400 mb-2">
                    Primary Contact Person *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full bg-[#08050c] border border-white/10 px-4 py-3 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase font-bold text-zinc-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contact@brand.com"
                    className="w-full bg-[#08050c] border border-white/10 px-4 py-3 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-zinc-400 mb-2">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+234..."
                    className="w-full bg-[#08050c] border border-white/10 px-4 py-3 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase font-bold text-zinc-400 mb-2">
                    Primary Mountain Alignment
                  </label>
                  <select
                    name="mountain"
                    value={formData.mountain}
                    onChange={handleInputChange}
                    className="w-full bg-[#08050c] border border-white/10 px-4 py-3 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  >
                    {mountainMatrix.map((m) => (
                      <option key={m.id} value={m.name} className="bg-[#050308]">
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-zinc-400 mb-2">
                    Website or Social Handle
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full bg-[#08050c] border border-white/10 px-4 py-3 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-zinc-400 mb-2">
                  Exhibition Summary & Products Offered
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Briefly describe what you will present or sell at your booth..."
                  className="w-full bg-[#08050c] border border-white/10 px-4 py-3 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                />
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-primary"
                >
                  Review Application →
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <div className="border border-white/10 bg-[#08050c] p-6 space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-zinc-400">Organization:</span>
                  <span className="font-bold text-white">{formData.companyName || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-zinc-400">Contact:</span>
                  <span className="text-white">{formData.contactPerson} ({formData.email})</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-zinc-400">Mountain Domain:</span>
                  <span className="text-[#f5d061]">{formData.mountain}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-zinc-400">Selected Space:</span>
                  <span className="font-bold text-white">
                    {selectedBooth ? `Booth ${selectedBooth.code}` : `${selectedTier.toUpperCase()} Tier`}
                  </span>
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-secondary"
                >
                  ← Edit Details
                </button>
                <button type="submit" className="btn-primary">
                  Confirm & Submit Application
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}