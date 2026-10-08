"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Voices", href: "/voices" },
  { label: "Trainings", href: "/trainings" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // Monitor scroll position to apply dynamic glassmorphism shifts
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[100] px-4 pt-4 sm:px-6 sm:pt-6 transition-all duration-500">
        <div className="mx-auto max-w-[1400px]">
          <nav
            className={`relative flex items-center justify-between rounded-full border transition-all duration-500 px-4 py-2.5 sm:px-6 sm:py-3 ${
              scrolled
                ? "border-white/10 bg-[#050308]/85 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(199,3,228,0.15)] backdrop-blur-2xl"
                : "border-white/[0.07] bg-[#050308]/40 backdrop-blur-md"
            }`}
          >
            {/* Ambient Background Glow behind Header */}
            <div className="pointer-events-none absolute -inset-px -z-10 rounded-full bg-gradient-to-r from-[#460583]/20 via-[#c703e4]/10 to-[#f5d061]/15 opacity-50 blur-xl" />

            {/* BRAND LOGO */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#07020e] p-1 shadow-[0_0_15px_rgba(245,208,97,0.15)] transition-all duration-500 group-hover:border-[#f5d061]/60 group-hover:shadow-[0_0_25px_rgba(245,208,97,0.3)]">
                <Image
                  src="/images/logo.png"
                  alt="Salt and Light Logo"
                  width={36}
                  height={36}
                  className="object-contain p-0.5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <span className="font-display text-sm font-extrabold tracking-tight text-white sm:text-base">
                  SALT <span className="text-[#f5d061]">&</span> LIGHT
                  <span className="ml-1 text-xs text-zinc-500">'26</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                  MIV Word House
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION LINKS */}
            <div
              className="hidden items-center gap-1 rounded-full border border-white/[0.05] bg-white/[0.02] p-1.5 md:flex"
              onMouseLeave={() => setHoveredPath(null)}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isHovered = hoveredPath === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredPath(link.href)}
                    className="relative px-5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-300"
                  >
                    {/* Hover Sliding Pill Effect */}
                    {isHovered && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 rounded-full bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Active Route Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="navActive"
                        className="absolute inset-0 rounded-full border border-[#f5d061]/40 bg-[#460583]/30 shadow-[0_0_15px_rgba(199,3,228,0.25)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive
                          ? "text-[#f5d061] [text-shadow:0_0_10px_rgba(245,208,97,0.4)]"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* REGISTER CTA & MOBILE TOGGLE */}
            <div className="flex items-center gap-3">
              <Link
                href="/register"
                className="group relative hidden overflow-hidden rounded-full border border-[#f5d061]/50 bg-gradient-to-r from-[#f5d061] to-[#e2b842] px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#050308] shadow-[0_0_20px_rgba(245,208,97,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(245,208,97,0.45)] sm:block"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Register
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                aria-label={open ? "Close Menu" : "Open Menu"}
                onClick={() => setOpen(!open)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors duration-300 hover:border-[#f5d061]/50 md:hidden"
              >
                <div className="flex w-4 flex-col gap-1.5">
                  <span
                    className={`h-0.5 w-full bg-current transition-all duration-300 ${
                      open ? "translate-y-[5px] rotate-45 text-[#f5d061]" : ""
                    }`}
                  />
                  <span
                    className={`h-0.5 w-full bg-current transition-all duration-300 ${
                      open ? "-translate-y-[3px] -rotate-45 text-[#f5d061]" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* FULL-SCREEN OVERLAY MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] flex flex-col justify-between bg-[#050308]/98 px-6 pb-12 pt-32 backdrop-blur-3xl md:hidden"
          >
            {/* Atmospheric Background Ambient Blurs */}
            <div className="pointer-events-none absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-[#460583]/25 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-10 right-0 h-64 w-64 rounded-full bg-[#c703e4]/15 blur-[100px]" />

            <div className="relative z-10 flex flex-col space-y-2">
              <span className="eyebrow mb-6 text-zinc-600">Menu Navigation</span>

              {[
                { label: "Home", href: "/" },
                ...navLinks,
                { label: "Register", href: "/register" },
              ].map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.06 * index, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center justify-between border-b border-white/[0.05] py-4 font-display text-3xl font-extrabold tracking-tight transition-colors ${
                        isActive
                          ? "text-[#f5d061]"
                          : "text-zinc-300 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-zinc-600">
                          0{index + 1}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      <span className="text-sm opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 text-[#f5d061]">
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Footer Meta */}
            <div className="relative z-10 border-t border-white/10 pt-6">
              <p className="text-xs text-zinc-500">
                Salt & Light 2026 · Samonda, Ibadan
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-[#f5d061]">
                MIV Word House
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
