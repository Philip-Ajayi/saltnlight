"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { FaFileExcel, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaCopy } from "react-icons/fa";

interface Participant {
  id: string;
  uniqueId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  registeredAt: string;
}

interface TrainingTrack {
  id: string;
  title: string;
  count: number;
  participants: Participant[];
}

export default function CertificatedTrainingPage() {
  const [tracks, setTracks] = useState<TrainingTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedTrack, setCopiedTrack] = useState<string | null>(null);

  const fetchTrainings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/certificated-training");
      if (!response.ok) throw new Error("Could not load training delegates.");
      const data = await response.json();
      setTracks(data.tracks || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  // Filter participants in real time based on user input
  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) return tracks;
    const query = searchQuery.toLowerCase().trim();

    return tracks.map((track) => {
      const matchedParticipants = track.participants.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.email.toLowerCase().includes(query) ||
          p.phone.toLowerCase().includes(query) ||
          p.uniqueId.toLowerCase().includes(query)
      );
      return {
        ...track,
        participants: matchedParticipants,
      };
    });
  }, [tracks, searchQuery]);

  const totalRegisteredCount = useMemo(() => {
    return tracks.reduce((sum, t) => sum + t.count, 0);
  }, [tracks]);

  // Copy email list to clipboard
  const handleCopyEmails = (participants: Participant[], trackId: string) => {
    const emailList = participants
      .map((p) => p.email)
      .filter((email) => email && email !== "N/A")
      .join(", ");

    if (!emailList) return;
    navigator.clipboard.writeText(emailList);
    setCopiedTrack(trackId);
    setTimeout(() => setCopiedTrack(null), 2000);
  };

  // Direct Excel download handler
  const handleExport = (trackId: string) => {
    window.location.href = `/api/certificated-training?export=${encodeURIComponent(
      trackId
    )}`;
  };

  return (
    <main className="min-h-screen bg-[#050308] text-zinc-100 pt-32 pb-24 selection:bg-[#c703e4]/30 selection:text-white">
      {/* BACKGROUND ATMOSPHERICS */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-[#460583]/15 blur-[140px]" />
        <div className="absolute top-1/3 right-10 h-72 w-72 rounded-full bg-[#c703e4]/10 blur-[120px]" />
      </div>

      <div className="section-shell">
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="eyebrow text-[#f5d061]">Salt & Light '26 Management</span>
              <span className="h-px w-8 bg-zinc-700" />
            </div>
            <h1 className="mt-3 font-display text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-white">
              CERTIFICATED <span className="text-gradient-gold">TRAININGS</span>
            </h1>
            <p className="mt-2 text-sm text-zinc-400 max-w-xl">
              Directory of all registered delegates for specialized certificate tracks.
              Export to Excel individually or download all delegates at once.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleExport("ALL")}
              disabled={loading || totalRegisteredCount === 0}
              className="btn-primary flex items-center gap-2.5 px-6 py-3 text-xs disabled:opacity-50"
            >
              <FaFileExcel className="h-4 w-4 text-emerald-950" />
              <span>Export All to Excel</span>
            </button>

            <button
              onClick={fetchTrainings}
              disabled={loading}
              className="btn-secondary px-5 py-3 text-xs"
            >
              {loading ? "Refreshing..." : "↻ Refresh"}
            </button>
          </div>
        </div>

        {/* SEARCH & SUMMARY STATS BAR */}
        <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto] items-center">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search delegate by Name, Email, or WhatsApp Number..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm text-white placeholder-zinc-500 backdrop-blur-md focus:border-[#f5d061] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-[#07020e]/80 px-6 py-3">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                Total Enrolled
              </span>
              <span className="font-display text-xl font-bold text-[#f5d061]">
                {totalRegisteredCount} Delegates
              </span>
            </div>
          </div>
        </div>

        {/* ERROR NOTIFICATION */}
        {error && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            <p className="font-semibold">{error}</p>
            <button
              onClick={fetchTrainings}
              className="mt-2 text-xs underline text-red-200"
            >
              Try again
            </button>
          </div>
        )}

        {/* LOADING SKELETON */}
        {loading && (
          <div className="mt-12 space-y-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="animate-pulse rounded-2xl border border-white/[0.06] bg-[#08050c] p-8 h-64"
              />
            ))}
          </div>
        )}

        {/* TRACK CARDS & PARTICIPANT LISTS */}
        {!loading && (
          <div className="mt-12 space-y-12">
            {filteredTracks.map((track, trackIndex) => {
              const hasParticipants = track.participants.length > 0;

              return (
                <section
                  key={track.id}
                  className="surface-obsidian rounded-2xl border border-white/[0.08] overflow-hidden backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                >
                  {/* TRACK HEADER */}
                  <div className="flex flex-col gap-4 border-b border-white/[0.06] bg-[#07020e]/90 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-xs font-bold text-[#f5d061]">
                          0{trackIndex + 1}
                        </span>
                        <span className="eyebrow text-zinc-500 tracking-wider">
                          Training Track
                        </span>
                      </div>
                      <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
                        {track.title}
                      </h2>
                      <p className="mt-1 text-xs text-zinc-400">
                        {track.count} participant{track.count === 1 ? "" : "s"} registered
                      </p>
                    </div>

                    {/* ACTIONS FOR THIS SPECIFIC TRACK */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCopyEmails(track.participants, track.id)}
                        disabled={!hasParticipants}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:border-[#c703e4] hover:text-white disabled:opacity-40"
                      >
                        <FaCopy className="h-3.5 w-3.5 text-[#c703e4]" />
                        <span>
                          {copiedTrack === track.id ? "Copied!" : "Copy Emails"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleExport(track.id)}
                        disabled={!hasParticipants}
                        className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-400 transition-all hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-40"
                      >
                        <FaFileExcel className="h-4 w-4" />
                        <span>Print as Excel</span>
                      </button>
                    </div>
                  </div>

                  {/* PARTICIPANTS TABLE */}
                  {hasParticipants ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-zinc-300">
                        <thead className="border-b border-white/[0.06] bg-black/40 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                          <tr>
                            <th className="px-6 py-4 w-16">S/N</th>
                            <th className="px-6 py-4">Participant Name</th>
                            <th className="px-6 py-4">Email Address</th>
                            <th className="px-6 py-4">Phone Number (WhatsApp)</th>
                            <th className="px-6 py-4 text-right">Pass ID</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                          {track.participants.map((person, idx) => {
                            const cleanPhone = person.phone.replace(/[^0-9+]/g, "");
                            const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}`;

                            return (
                              <tr
                                key={person.id}
                                className="transition-colors hover:bg-white/[0.02]"
                              >
                                <td className="px-6 py-4 font-mono text-xs text-zinc-600">
                                  {String(idx + 1).padStart(2, "0")}
                                </td>

                                {/* PARTICIPANT NAME */}
                                <td className="px-6 py-4 font-semibold text-white">
                                  <div className="flex items-center gap-2">
                                    <span>{person.name}</span>
                                    {person.location && person.location !== "N/A" && (
                                      <span className="text-[10px] text-zinc-500 font-normal">
                                        ({person.location})
                                      </span>
                                    )}
                                  </div>
                                </td>

                                {/* EMAIL */}
                                <td className="px-6 py-4 text-zinc-400">
                                  {person.email !== "N/A" ? (
                                    <a
                                      href={`mailto:${person.email}`}
                                      className="inline-flex items-center gap-2 transition-colors hover:text-[#f5d061]"
                                    >
                                      <FaEnvelope className="h-3 w-3 text-zinc-600" />
                                      <span>{person.email}</span>
                                    </a>
                                  ) : (
                                    <span className="text-zinc-600">N/A</span>
                                  )}
                                </td>

                                {/* PHONE NUMBER */}
                                <td className="px-6 py-4">
                                  {person.phone !== "N/A" ? (
                                    <div className="flex items-center gap-3">
                                      <a
                                        href={`tel:${person.phone}`}
                                        className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-white"
                                      >
                                        <FaPhoneAlt className="h-3 w-3 text-zinc-600" />
                                        <span>{person.phone}</span>
                                      </a>

                                      <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Chat on WhatsApp"
                                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                                      >
                                        <FaWhatsapp className="h-3.5 w-3.5" />
                                      </a>
                                    </div>
                                  ) : (
                                    <span className="text-zinc-600 font-mono text-xs">
                                      N/A
                                    </span>
                                  )}
                                </td>

                                {/* PASS ID */}
                                <td className="px-6 py-4 text-right">
                                  <span className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs font-bold text-[#f5d061]">
                                    {person.uniqueId}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-zinc-500 text-sm">
                      {searchQuery
                        ? `No participants found in ${track.title} matching "${searchQuery}".`
                        : `No delegates have registered for ${track.title} yet.`}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
