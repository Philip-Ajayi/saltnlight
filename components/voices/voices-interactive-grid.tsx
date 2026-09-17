"use client";

import { useState } from "react";
import type { Minister } from "@/lib/constants";
import { MinisterSpotlightCard } from "./minister-spotlight-card";
import { SpeakerModal } from "@/components/ministers/speaker-modal";

interface VoicesInteractiveGridProps {
  ministers: Minister[];
}

export function VoicesInteractiveGrid({ ministers }: VoicesInteractiveGridProps) {
  const [selectedMinister, setSelectedMinister] = useState<Minister | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMinisters = ministers.filter(
    (minister) =>
      minister.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      minister.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      minister.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Interactive Controls */}
      <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/[.06] pb-8 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.15em] text-zinc-500">
            Showing {filteredMinisters.length} Ministers & Voices
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search voice by name or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-white/10 bg-[#08050c] px-4 py-3 text-xs text-white placeholder-zinc-600 transition-all focus:border-[#c703e4] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid Display */}
      {filteredMinisters.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMinisters.map((minister, index) => (
            <MinisterSpotlightCard
              key={minister.id}
              minister={minister}
              index={index}
              onSelect={setSelectedMinister}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="font-editorial text-2xl italic text-zinc-500">
            No voices matched your query.
          </p>
        </div>
      )}

      {/* Speaker Detail Modal */}
      <SpeakerModal
        minister={selectedMinister}
        onClose={() => setSelectedMinister(null)}
      />
    </div>
  );
}