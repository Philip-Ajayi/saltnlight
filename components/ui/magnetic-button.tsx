"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function MagneticButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const move = (event: React.MouseEvent<HTMLButtonElement>) => { if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return; const rect = ref.current.getBoundingClientRect(); const x = event.clientX - rect.left - rect.width / 2; const y = event.clientY - rect.top - rect.height / 2; ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`; };
  const leave = () => { if (ref.current) ref.current.style.transform = "translate(0, 0)"; };
  return <button ref={ref} onClick={onClick} onMouseMove={move} onMouseLeave={leave} className={cn("transition-transform duration-300 ease-out", className)}>{children}</button>;
}
