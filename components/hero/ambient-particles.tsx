"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  size: 1 + (index % 3),
  delay: (index % 6) * 0.7,
}));

export function AmbientParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span key={particle.id} className="absolute rounded-full bg-[#f5d061]" style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }} animate={{ opacity: [0.05, 0.4, 0.05], y: [0, -15, 0] }} transition={{ duration: 5 + particle.id % 4, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}
