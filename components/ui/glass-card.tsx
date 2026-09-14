import type { HTMLAttributes } from "react";
interface GlassCardProps extends HTMLAttributes<HTMLDivElement> { children: React.ReactNode; variant?: "obsidian" | "crystal"; }
export function GlassCard({ children, variant = "crystal", className = "", ...props }: GlassCardProps) { return <div className={`${variant === "crystal" ? "surface-crystal" : "surface-obsidian"} ${className}`} {...props}>{children}</div>; }
