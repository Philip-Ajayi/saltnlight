export const easeLuxury = [0.22, 1, 0.36, 1] as const;
export const motionDurations = { instant: 0.2, fast: 0.4, standard: 0.7, slow: 1.1, cinematic: 1.6 };
export const reveal = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: motionDurations.standard, ease: easeLuxury } } };
export const fade = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: motionDurations.standard, ease: "easeOut" } } };
export const scaleReveal = { hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1, transition: { duration: motionDurations.slow, ease: easeLuxury } } };
export const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
