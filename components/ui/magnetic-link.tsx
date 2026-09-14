"use client";

import Link, { type LinkProps } from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = LinkProps & { children: React.ReactNode; className?: string };
export default function MagneticLink({ children, className, ...props }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (event: React.MouseEvent<HTMLAnchorElement>) => { if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return; const rect = ref.current.getBoundingClientRect(); const x = event.clientX - rect.left - rect.width / 2; const y = event.clientY - rect.top - rect.height / 2; ref.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`; };
  const leave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return <Link ref={ref} {...props} onMouseMove={move} onMouseLeave={leave} className={cn("inline-flex transition-transform duration-300", className)}>{children}</Link>;
}
