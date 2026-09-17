"use client";

import React, { useState } from "react";
import { INITIAL_EXHIBITORS, type Exhibitor } from "@/lib/exhibition-data";

export function ExhibitorDirectory() {
  const [search, setSearch] = useState("");
  const [filterMountain, setFilterMountain] = useState("All");

  const filtered = INITIAL_EXHIBITORS.filter((exhibitor) => {
    const matchesSearch =
      exhibitor.name.toLowerCase().includes(search.toLowerCase()) ||
      exhibitor.category.toLowerCase().includes(search.toLowerCase());
    const matchesMountain =
      filterMountain === "All" || exhibitor.mountain === filterMountain;
    return matchesSearch && matchesMountain;
  });

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search exhibitors by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-white/10 bg-[#08050c] px-4 py-3 text-sm text-white focus:border-[#f5d061] focus:outline-none"
        />

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["All", "Marketplace", "Arts & Culture", "Church Ministry", "Media"].map(
            (m) => (
              <button
                key={m}
                type="button"
                onClick={() => setFilterMountain(m)}
                className={`whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  filterMountain === m
                    ? "bg-[#f5d061] text-black"
                    : "border border-white/10 bg-[#08050c] text-zinc-400 hover:text-white"
                }`}
              >
                {m}
              </button>
            )
          )}
        </div>
      </div>

      {/* Grid of Exhibitors */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((exhibitor) => (
          <div
            key={exhibitor.id}
            className="group relative border border-white/[.08] bg-[#08050c] p-6 transition-all duration-500 hover:border-[#c703e4]/40 hover:bg-[#0e0616]"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="eyebrow text-[#f5d061]">Booth {exhibitor.boothCode}</span>
                <h4 className="mt-2 font-display text-2xl font-bold text-white group-hover:text-[#f5d061] transition-colors">
                  {exhibitor.name}
                </h4>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 border border-white/10 px-2 py-1">
                {exhibitor.mountain}
              </span>
            </div>

            <p className="mt-4 text-xs font-semibold text-zinc-300">{exhibitor.tagline}</p>
            <p className="mt-2 text-xs text-zinc-500 leading-relaxed line-clamp-3">
              {exhibitor.description}
            </p>

            <div className="mt-6 border-t border-white/10 pt-4">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 block mb-2">
                Featured Products & Offerings
              </span>
              <div className="flex flex-wrap gap-1.5">
                {exhibitor.products.map((p, idx) => (
                  <span
                    key={idx}
                    className="bg-white/[.04] text-zinc-400 text-[10px] px-2 py-0.5 border border-white/5"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}