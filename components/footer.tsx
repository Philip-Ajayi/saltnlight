"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaSpotify,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const navigationLinks = [
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Voices", href: "/voices" },
  { label: "Register", href: "/register" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/mivwordhouse",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/mivwordhouse",
    icon: FaFacebookF,
  },
  {
    name: "Threads",
    href: "https://threads.net/@mivwordhouse",
    icon: FaThreads,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@mivwordhouse",
    icon: FaTiktok,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@mivwordhouse",
    icon: FaYoutube,
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/user/mivwordhouse",
    icon: FaSpotify,
  },
  {
    name: "Telegram",
    href: "https://t.me/mivwordhouse",
    icon: FaTelegram,
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[.05] bg-[#030206] text-zinc-400">
      {/* Glow Atmospheric Elements */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[55rem] -translate-x-1/2 rounded-full bg-[#460583]/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-20 right-10 h-64 w-64 rounded-full bg-[#c703e4]/10 blur-[100px]" />

      <div className="section-shell relative z-10">
        {/* Main Footer Content */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_.8fr_1fr] lg:gap-16 lg:py-24">
          {/* Column 1: Brand & Logo */}
          <div className="flex flex-col items-start justify-between">
            <div>
              <Link href="/" className="inline-block transition-opacity hover:opacity-90">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-[#07020e] p-1.5 shadow-[0_0_20px_rgba(245,208,97,0.1)]">
                    <Image
                      src="/images/logo.png"
                      alt="Salt and Light Logo"
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                      priority
                    />
                  </div>
                  <div>
                    <span className="font-display text-xl font-extrabold tracking-[-.04em] text-white">
                      SALT <span className="text-[#f5d061]">&</span> LIGHT
                    </span>
                    <span className="ml-1.5 text-xs font-bold text-zinc-600">'26</span>
                    <p className="text-[10px] font-bold uppercase tracking-[.14em] text-zinc-500">
                      MIV Word House
                    </p>
                  </div>
                </div>
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-6 text-zinc-500">
                A convocation of and for influence on world mountains. Equipping leaders, builders,
                and emerging voices for domain dominance.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col justify-start">
            <span className="eyebrow mb-6 text-[#f5d061]">Navigation</span>
            <nav className="flex flex-col gap-3.5">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between text-xs font-bold uppercase tracking-[.14em] text-zinc-400 transition-colors hover:text-white"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 text-[#f5d061]">
                    →
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Social Media Reach */}
          <div className="flex flex-col justify-start">
            <span className="eyebrow mb-2 text-[#f5d061]">Connect</span>
            <p className="mb-6 font-display text-lg font-bold tracking-tight text-white">
              @mivwordhouse
            </p>

            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                    className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/[.08] bg-[#07020e]/80 text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#f5d061]/50 hover:bg-[#460583]/20 hover:text-[#f5d061] hover:shadow-[0_0_20px_rgba(245,208,97,0.15)]"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>

            <div className="mt-8 rounded-xl border border-white/[.04] bg-white/[.015] p-4 backdrop-blur-sm">
              <span className="eyebrow block text-zinc-500">Convocation Venue</span>
              <p className="mt-1 text-xs text-zinc-400">
                Samonda, Ibadan, Oyo State, Nigeria
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[.04] py-8 text-[10px] font-bold uppercase tracking-[.14em] text-zinc-600 sm:flex-row">
          <div>
            © {new Date().getFullYear()} MIV Word House. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Authority · Encounter · Equipping · Influence</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-[#f5d061]"
              aria-label="Back to top"
            >
              <span>Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}