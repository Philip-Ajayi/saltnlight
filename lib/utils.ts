import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function clamp(value: number, min: number, max: number) { return Math.min(Math.max(value, min), max); }
export function lerp(start: number, end: number, amount: number) { return start + (end - start) * amount; }
export function formatIndex(index: number) { return String(index + 1).padStart(2, "0"); }
export function prefersReducedMotion() { if (typeof window === "undefined") return false; return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
