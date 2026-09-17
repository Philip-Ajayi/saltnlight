"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Attendance",
    question: "Is registration required to attend Salt & Light '26?",
    answer:
      "Yes. While attendance for the main sessions is free of charge, seat reservation and pass generation are mandatory to ensure venue capacity management and access to certificated tracks.",
  },
  {
    category: "Exhibition",
    question: "How can my organisation book an exhibition booth?",
    answer:
      "Select 'Exhibition / Booth' in the contact form above, or contact our exhibition desk directly. Booths are curated for alignment with mountain spheres.",
  },
  {
    category: "Logistics",
    question: "Are there recommended hotel accommodations in Samonda?",
    answer:
      "Yes. We have partnered with verified hotels around Samonda and Bodija in Ibadan with negotiated delegate rates. Reach out via the form for our delegate accommodation guide.",
  },
  {
    category: "Volunteering",
    question: "How can I join the Salt & Light workforce?",
    answer:
      "Volunteers serve across media, protocol, logistics, medical, and hospitality teams. Submit an inquiry under 'Volunteer Workforce' to receive the onboarding schedule.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-xl border border-white/5 bg-[#08050c] transition-colors hover:border-white/10"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <div className="space-y-1">
                <span className="eyebrow text-[#f5d061]">{faq.category}</span>
                <h4 className="font-display text-lg font-bold text-white sm:text-xl">
                  {faq.question}
                </h4>
              </div>

              <span
                className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-transform duration-300 ${
                  isOpen ? "rotate-45 border-[#f5d061] text-[#f5d061]" : ""
                }`}
              >
                +
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="border-t border-white/5 px-6 pb-6 pt-4 text-sm leading-relaxed text-zinc-400">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}