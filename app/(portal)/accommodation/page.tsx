"use client";

import { useState, useEffect, useCallback } from "react";

interface AccommodationUser {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  location: string;
  uniqueId: string;
  status: string;
  isMember: boolean;
  isAttended: boolean;
  gender: string;
}

export default function AccommodationPortalPage() {
  const [users, setUsers] = useState<AccommodationUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filters
  const [memberFilter, setMemberFilter] = useState<"all" | "member" | "non-member">("all");
  const [attendanceFilter, setAttendanceFilter] = useState<"all" | "attended" | "not-attended">("all");

  // Gemini AI Gender Classification state
  const [genderFilter, setGenderFilter] = useState<"all" | "Male" | "Female" | "Unsure">("all");
  const [genderMap, setGenderMap] = useState<Record<string, "Male" | "Female" | "Unsure">>({});
  const [classifying, setClassifying] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (memberFilter !== "all") params.append("member", memberFilter);
      if (attendanceFilter !== "all") params.append("attendance", attendanceFilter);

      const res = await fetch(`/api/accommodation?${params.toString()}`);
      const data = await res.json();
      setUsers(data.users || []);
      setTotalCount(data.totalCount || 0);
      setFilteredCount(data.filteredCount || 0);
    } catch (err) {
      console.error("Failed to load accommodation data", err);
    } finally {
      setLoading(false);
    }
  }, [memberFilter, attendanceFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Run Gemini AI Gender Classifier on currently filtered names
  const handleRunGeminiClassifier = async () => {
    if (users.length === 0) return;
    setClassifying(true);

    try {
      const payload = users.map((u) => ({ id: u._id, name: u.name }));
      const res = await fetch("/api/accommodation/genderize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names: payload }),
      });
      const data = await res.json();

      if (data.classifications) {
        setGenderMap(data.classifications);
      }
    } catch (err) {
      console.error("Gemini classification failed", err);
      alert("Failed to run Gemini AI classifier. Check your connection or API key.");
    } finally {
      setClassifying(false);
    }
  };

  // Filtered by Gemini Gender
  const displayedUsers = users.filter((u) => {
    if (genderFilter === "all") return true;
    const predicted = genderMap[u._id] || (u.gender ? (u.gender as "Male" | "Female" | "Unsure") : "Unsure");
    return predicted === genderFilter;
  });

  const maleCount = users.filter((u) => (genderMap[u._id] || u.gender) === "Male").length;
  const femaleCount = users.filter((u) => (genderMap[u._id] || u.gender) === "Female").length;
  const unsureCount = users.filter((u) => (genderMap[u._id] || u.gender) === "Unsure").length;

  return (
    <main className="min-h-screen bg-[#050308] pb-24 pt-32 text-zinc-200">
      <div className="section-shell">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <span className="eyebrow text-[#f5d061]">Salt & Light '26 · Hospitality</span>
            <h1 className="mt-2 font-display text-4xl font-extrabold text-white sm:text-5xl">
              Accommodation Hub
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Manage lodging requests, room allocations, and AI-assisted gender separation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-[#08050c] p-4 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Total Needing Bedspace
              </span>
              <div className="font-display text-2xl font-extrabold text-[#f5d061]">
                {totalCount}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#08050c] p-4 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Filtered Total
              </span>
              <div className="font-display text-2xl font-extrabold text-white">
                {filteredCount}
              </div>
            </div>
          </div>
        </div>

        {/* PRIMARY FILTERS: MEMBERSHIP & ATTENDANCE */}
        <div className="mt-8 grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-[#08050c] p-6 lg:grid-cols-2">
          {/* Membership Filter */}
          <div>
            <span className="eyebrow text-zinc-400">1. Filter by Membership</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: "All Participants", val: "all" },
                { label: "MIV Members", val: "member" },
                { label: "Non-Members / First-Timers", val: "non-member" },
              ].map((tab) => (
                <button
                  key={tab.val}
                  onClick={() => setMemberFilter(tab.val as "all" | "member" | "non-member")}
                  className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    memberFilter === tab.val
                      ? "border border-[#f5d061]/50 bg-[#f5d061] text-black"
                      : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Attendance Filter */}
          <div>
            <span className="eyebrow text-zinc-400">2. Filter by Attendance</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: "All Requested", val: "all" },
                { label: "Clocked-In (Arrived)", val: "attended" },
                { label: "Not Yet Clocked-In", val: "not-attended" },
              ].map((tab) => (
                <button
                  key={tab.val}
                  onClick={() => setAttendanceFilter(tab.val as "all" | "attended" | "not-attended")}
                  className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    attendanceFilter === tab.val
                      ? "border border-emerald-500/50 bg-emerald-500 text-black"
                      : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STANDALONE GEMINI AI GENDER CLASSIFIER */}
        <div className="mt-8 rounded-2xl border border-[#c703e4]/30 bg-gradient-to-br from-[#0c0418] to-[#07020e] p-6 shadow-[0_0_40px_rgba(199,3,228,0.1)]">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="eyebrow text-[#c703e4]">Standalone AI Classifier</span>
              <h3 className="font-display text-xl font-bold text-white">
                Gemini Gender Categorizer
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Gender was omitted during registration. Gemini analyzes full names to separate Male, Female, and Unsure.
              </p>
            </div>

            <button
              onClick={handleRunGeminiClassifier}
              disabled={classifying || users.length === 0}
              className="flex items-center gap-2 rounded-xl border border-[#c703e4]/50 bg-gradient-to-r from-[#460583] to-[#c703e4] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(199,3,228,0.3)] transition-transform hover:scale-105 disabled:opacity-50"
            >
              {classifying ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Gemini Parsing Names...</span>
                </>
              ) : (
                <>
                  <span>✦ Run Gemini Classifier</span>
                </>
              )}
            </button>
          </div>

          {/* Gender Filter Buttons */}
          <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-4">
            <button
              onClick={() => setGenderFilter("all")}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                genderFilter === "all"
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
              }`}
            >
              Show All ({users.length})
            </button>

            <button
              onClick={() => setGenderFilter("Male")}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                genderFilter === "Male"
                  ? "bg-sky-500 text-black shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                  : "border border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20"
              }`}
            >
              Male ({maleCount})
            </button>

            <button
              onClick={() => setGenderFilter("Female")}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                genderFilter === "Female"
                  ? "bg-fuchsia-500 text-black shadow-[0_0_15px_rgba(217,70,239,0.4)]"
                  : "border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/20"
              }`}
            >
              Female ({femaleCount})
            </button>

            <button
              onClick={() => setGenderFilter("Unsure")}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                genderFilter === "Unsure"
                  ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
              }`}
            >
              Unsure / Ambiguous ({unsureCount})
            </button>
          </div>
        </div>

        {/* RESULTS TABLE */}
        <div className="mt-8">
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#f5d061] border-t-transparent" />
            </div>
          ) : displayedUsers.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-[#08050c] p-12 text-center text-zinc-500">
              No people requiring accommodation match this filter combination.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#08050c]">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  <tr>
                    <th className="px-6 py-4">Participant Name</th>
                    <th className="px-6 py-4">Pass ID</th>
                    <th className="px-6 py-4">Membership</th>
                    <th className="px-6 py-4">Attendance</th>
                    <th className="px-6 py-4">Gemini AI Gender</th>
                    <th className="px-6 py-4">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {displayedUsers.map((u) => {
                    const aiGender =
                      genderMap[u._id] || (u.gender ? (u.gender as "Male" | "Female" | "Unsure") : "Unsure");

                    return (
                      <tr key={u._id} className="transition-colors hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">
                          <div>{u.name}</div>
                          <div className="text-xs text-zinc-500">{u.email}</div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="font-mono text-xs font-bold text-[#f5d061]">
                            {u.uniqueId}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase ${
                              u.isMember
                                ? "bg-[#460583]/40 text-[#f5d061]"
                                : "bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            {u.isMember ? "Member" : "First-Timer"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                              u.isAttended
                                ? "bg-emerald-500/20 text-emerald-300"
                                : "bg-rose-500/10 text-rose-300"
                            }`}
                          >
                            {u.isAttended ? "Clocked In" : "Not Arrived"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                              aiGender === "Male"
                                ? "border border-sky-500/40 bg-sky-500/20 text-sky-300"
                                : aiGender === "Female"
                                ? "border border-fuchsia-500/40 bg-fuchsia-500/20 text-fuchsia-300"
                                : "border border-amber-500/40 bg-amber-500/20 text-amber-300"
                            }`}
                          >
                            <span>●</span> {aiGender}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <a
                            href={`https://wa.me/${u.whatsapp.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline"
                          >
                            <span>{u.whatsapp}</span>
                            <span>↗</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
