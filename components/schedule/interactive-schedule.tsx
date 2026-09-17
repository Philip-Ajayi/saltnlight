"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SCHEDULE_DAYS,
  SCHEDULE_SESSIONS,
  COMMON_VENUE,
  ScheduleSession,
} from "@/lib/schedule-data";

export function InteractiveSchedule() {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeModalSession, setActiveModalSession] =
    useState<ScheduleSession | null>(null);

  // Filter logic
  const filteredSessions = useMemo(() => {
    return SCHEDULE_SESSIONS.filter((session) => {
      const matchesDay =
        selectedDay === "all" || session.date === selectedDay;
      const matchesPeriod =
        selectedPeriod === "all" || session.period === selectedPeriod;
      const matchesSearch =
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.timeSlot.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDay && matchesPeriod && matchesSearch;
    });
  }, [selectedDay, selectedPeriod, searchQuery]);

  // Grouping by Date for Matrix/Timeline view
  const groupedByDay = useMemo(() => {
    const groups: { [key: string]: ScheduleSession[] } = {};
    filteredSessions.forEach((session) => {
      if (!groups[session.date]) groups[session.date] = [];
      groups[session.date].push(session);
    });
    return groups;
  }, [filteredSessions]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative z-10 w-full py-12">
      {/* FILTER CONTROLS BAR */}
      <div className="section-shell">
        <div className="surface-crystal rounded-2xl border border-white/[.08] p-4 sm:p-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Day Selector Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSelectedDay("all")}
                className={`rounded-full px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.14em] transition-all duration-300 ${
                  selectedDay === "all"
                    ? "bg-[#f5d061] text-black shadow-[0_0_20px_rgba(245,208,97,.25)]"
                    : "border border-white/10 bg-white/[.03] text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                All Days (Oct 12–16)
              </button>

              {SCHEDULE_DAYS.map((d) => (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => setSelectedDay(d.date)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[.14em] transition-all duration-300 ${
                    selectedDay === d.date
                      ? "bg-[#f5d061] text-black shadow-[0_0_20px_rgba(245,208,97,.25)]"
                      : "border border-white/10 bg-white/[.03] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span>{d.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[8px] ${
                      selectedDay === d.date
                        ? "bg-black/20 text-black"
                        : "bg-white/10 text-zinc-500"
                    }`}
                  >
                    {d.day.slice(0, 3)}
                  </span>
                </button>
              ))}
            </div>

            {/* Time Period Filter & Search */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center rounded-full border border-white/10 bg-black/40 p-1">
                {[
                  { id: "all", label: "All Times" },
                  { id: "morning", label: "Morning" },
                  { id: "afternoon", label: "Afternoon" },
                  { id: "evening", label: "Evening" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPeriod(p.id)}
                    className={`rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] transition-all ${
                      selectedPeriod === p.id
                        ? "bg-[#c703e4] text-white shadow-[0_0_15px_rgba(199,3,228,.4)]"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search session or time..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 pl-9 text-xs text-white placeholder-zinc-600 focus:border-[#f5d061] focus:outline-none sm:w-56"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-600">
                  🔍
                </span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMMON VENUE BANNER */}
      <div className="section-shell mt-6">
        <div className="flex flex-col justify-between gap-2 border-b border-white/[.06] pb-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="inline-block h-2 w-2 rounded-full bg-[#f5d061] animate-pulse" />
            <span className="font-bold text-zinc-300">Venue for all sessions:</span>
            <span className="text-zinc-400">{COMMON_VENUE}</span>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[.15em] text-zinc-500">
            Showing {filteredSessions.length} session
            {filteredSessions.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      {/* SCHEDULE DISPLAY GRID */}
      <div className="section-shell mt-8 space-y-12">
        <AnimatePresence mode="wait">
          {Object.keys(groupedByDay).length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="surface-obsidian rounded-2xl border border-white/[.05] py-20 text-center"
            >
              <p className="font-editorial text-3xl italic text-zinc-500">
                No sessions found matching your criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDay("all");
                  setSelectedPeriod("all");
                  setSearchQuery("");
                }}
                className="mt-6 btn-secondary rounded-full"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            Object.entries(groupedByDay).map(([date, sessions]) => {
              const dayMeta = SCHEDULE_DAYS.find((d) => d.date === date);

              return (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {/* Day Header */}
                  <div className="sticky top-20 z-20 mb-6 flex items-baseline gap-4 rounded-xl border border-white/[.08] bg-[#050308]/90 p-4 backdrop-blur-md">
                    <h3 className="font-display text-2xl font-extrabold tracking-[-.04em] text-white sm:text-3xl">
                      {dayMeta?.label}{" "}
                      <span className="font-editorial text-xl italic font-normal text-[#f5d061]">
                        — {dayMeta?.day}
                      </span>
                    </h3>
                    <span className="eyebrow text-zinc-500">
                      OCTOBER 2026
                    </span>
                  </div>

                  {/* Sessions List */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sessions.map((session) => {
                      const isBookmarked = bookmarkedIds.includes(session.id);

                      return (
                        <motion.article
                          key={session.id}
                          layout
                          whileHover={{ y: -4 }}
                          onClick={() => setActiveModalSession(session)}
                          className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-white/[.06] bg-[#08050c] p-6 transition-colors duration-500 hover:border-[#c703e4]/40 hover:bg-[#0e0616]"
                        >
                          {/* Ambient glow accent on hover */}
                          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#460583]/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

                          <div>
                            {/* Top row: Time tag & bookmark */}
                            <div className="flex items-center justify-between border-b border-white/[.05] pb-3">
                              <span className="font-display text-xs font-extrabold tracking-[.1em] text-[#f5d061]">
                                {session.timeSlot}
                              </span>

                              <button
                                type="button"
                                onClick={(e) => toggleBookmark(session.id, e)}
                                title={
                                  isBookmarked
                                    ? "Remove bookmark"
                                    : "Bookmark session"
                                }
                                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs transition-colors ${
                                  isBookmarked
                                    ? "border-[#f5d061] bg-[#f5d061] text-black"
                                    : "border-white/10 text-zinc-500 hover:border-white/30 hover:text-white"
                                }`}
                              >
                                {isBookmarked ? "★" : "☆"}
                              </button>
                            </div>

                            {/* Session Title (No subtitle) */}
                            <h4 className="mt-4 font-display text-2xl font-bold leading-snug tracking-[-.03em] text-white transition-colors group-hover:text-white">
                              {session.title}
                            </h4>

                            {/* Description */}
                            <p className="mt-3 text-xs leading-5 text-zinc-400 line-clamp-3">
                              {session.description}
                            </p>
                          </div>

                          {/* Footer Info */}
                          <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/[.04] text-[10px] font-bold uppercase tracking-[.12em] text-zinc-500">
                            <span>{session.period}</span>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* SESSION DETAIL MODAL */}
      <AnimatePresence>
        {activeModalSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalSession(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#08050c] p-7 sm:p-10 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveModalSession(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:text-white"
              >
                ✕
              </button>

              <div className="eyebrow text-[#f5d061]">
                {activeModalSession.dayLabel} ({activeModalSession.dayOfWeek})
              </div>

              <h3 className="mt-3 font-display text-4xl font-extrabold tracking-[-.04em] text-white">
                {activeModalSession.title}
              </h3>

              <div className="mt-6 space-y-4 rounded-xl border border-white/[.06] bg-white/[.02] p-4 text-xs">
                <div className="flex justify-between border-b border-white/[.05] pb-2">
                  <span className="text-zinc-500">Time:</span>
                  <span className="font-bold text-[#f5d061]">
                    {activeModalSession.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/[.05] pb-2">
                  <span className="text-zinc-500">Venue:</span>
                  <span className="font-medium text-zinc-200">
                    {activeModalSession.venue}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Category:</span>
                  <span className="font-bold uppercase tracking-wider text-[#c703e4]">
                    {activeModalSession.period} session
                  </span>
                </div>
              </div>

              <p className="mt-6 text-sm leading-6 text-zinc-300">
                {activeModalSession.description}
              </p>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(activeModalSession.id, e)}
                  className="btn-secondary flex-1 rounded-lg py-3 text-center"
                >
                  {bookmarkedIds.includes(activeModalSession.id)
                    ? "★ Bookmarked"
                    : "☆ Add to My Schedule"}
                </button>
                <a
                  href="/#register"
                  className="btn-primary flex-1 rounded-lg py-3 text-center"
                >
                  Reserve Seat →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}