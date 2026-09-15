"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-10-12T17:30:00+01:00").getTime();

function getRemaining() {
  const distance = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

interface CountdownTimerProps {
  compact?: boolean;
}

export function CountdownTimer({ compact = false }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    setMounted(true);
    const interval = window.setInterval(() => setTime(getRemaining()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const units = [
    ["DAYS", time.days],
    ["HRS", time.hours],
    ["MIN", time.minutes],
    ["SEC", time.seconds],
  ] as const;

  return (
    <div
      className={`flex items-center justify-center ${
        compact ? "gap-3 sm:gap-5" : "gap-5 sm:gap-8"
      }`}
      aria-label="Countdown to Salt and Light 2026"
    >
      {units.map(([label, value], index) => (
        <div key={label} className="flex items-center gap-3 sm:gap-5">
          <div className="text-center">
            <div
              className={`font-display font-bold tracking-[-.05em] text-white ${
                compact ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl"
              }`}
            >
              {/* Show placeholder during SSR to match server and client initial render */}
              {mounted ? pad(Number(value)) : "--"}
            </div>
            <div className="mt-1 text-[7px] font-bold tracking-[.16em] text-zinc-600">
              {label}
            </div>
          </div>
          {index < units.length - 1 && (
            <span className="font-display text-sm text-zinc-700">:</span>
          )}
        </div>
      ))}
    </div>
  );
}