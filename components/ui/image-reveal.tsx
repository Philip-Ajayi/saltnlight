"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ImageReveal({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <motion.div initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className={className}><Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" /></motion.div>;
}
