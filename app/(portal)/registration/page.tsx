"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CERTIFICATED_TRAINING_TRACKS, REFERRAL_SOURCES } from "@/lib/register-data";
import { getPusherClient } from "@/lib/pusher-client";

interface UserRecord {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  location: string;
  uniqueId: string;
  accommodation: string;
  certificatedTraining?: string;
  isAttended: boolean;
  attendedAt?: string;
}

interface DeskNotification {
  _id: string;
  userId: string;
  name: string;
  email: string;
  whatsapp: string;
  uniqueId: string;
  accommodation: string;
  createdAt: string;
}

interface CheckinModalData {
  name: string;
  uniqueId: string;
  accommodation: string;
  message?: string;
}

export default function RegistrationPortalPage() {
  const [activeTab, setActiveTab] = useState<"search" | "register">("search");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttended, setFilterAttended] = useState(false);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [attendedCount, setAttendedCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Notifications Queue
  const [notifications, setNotifications] = useState<DeskNotification[]>([]);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  // Success Confirmation Modal
  const [modalData, setModalData] = useState<CheckinModalData | null>(null);

  // Form State for Manual Register
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
    location: "",
    referralSource: "WhatsApp",
    isMember: false,
    certificatedTraining: "None",
    needsAccommodation: false,
  });
  const [registering, setRegistering] = useState(false);
  const [formError, setFormError] = useState("");

  // Fetch Users & Stats
  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (filterAttended) params.append("filter", "attended");

      const res = await fetch(`/api/registration?${params.toString()}`);
      const data = await res.json();
      setUsers(data.users || []);
      setTotalCount(data.totalCount || 0);
      setAttendedCount(data.attendedCount || 0);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterAttended]);

  // Load Pending Notifications from DB
  const loadNotifications = async () => {
    try {
      const res = await fetch("/api/registration/notifications");
      const data = await res.json();
      if (data.notifications) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    loadNotifications();

    // Setup Pusher real-time listener for checkin requests
    const pusher = getPusherClient();
    const channel = pusher.subscribe("registration-desk");

    channel.bind("checkin-request", (data: DeskNotification) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("registration-desk");
    };
  }, []);

  // Clock in a participant
  const handleClockIn = async (userId: string, uniqueId: string) => {
    try {
      const res = await fetch("/api/registration/clock-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, uniqueId }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Clock-in failed");
        return;
      }

      // Show detail modal
      setModalData({
        name: data.user.name,
        uniqueId: data.user.uniqueId,
        accommodation: data.user.accommodation,
        message: "Clock-In Verified! Pass tag ready for issuance.",
      });

      // Remove from notifications if present
      setNotifications((prev) => prev.filter((n) => n.userId !== userId && n.uniqueId !== uniqueId));
      loadUsers();
    } catch {
      alert("Error clocking participant in.");
    }
  };

  // Manual Desk Registration Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setRegistering(true);

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Failed to register person");
        setRegistering(false);
        return;
      }

      // Show success modal
      setModalData({
        name: data.user.name,
        uniqueId: data.user.uniqueId,
        accommodation: data.user.accommodation,
        message: "New participant registered & clocked in automatically!",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        whatsapp: "",
        location: "",
        referralSource: "WhatsApp",
        isMember: false,
        certificatedTraining: "None",
        needsAccommodation: false,
      });

      setActiveTab("search");
      loadUsers();
    } catch {
      setFormError("Server connection error");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050308] pb-24 pt-32 text-zinc-200">
      <div className="section-shell">
        {/* TOP HEADER & COUNTERS */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <span className="eyebrow text-[#f5d061]">Salt & Light '26 · Desk Ops</span>
            <h1 className="mt-2 font-display text-4xl font-extrabold text-white sm:text-5xl">
              Registration Portal
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Clock-in attendees, issue registration passcodes, and register walk-ins.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* STATS METRIC */}
            <div className="rounded-2xl border border-white/10 bg-[#08050c] p-4 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Attended / Clocked-In
              </span>
              <div className="font-display text-2xl font-extrabold text-[#f5d061]">
                {attendedCount}{" "}
                <span className="text-sm font-semibold text-zinc-500">
                  / {totalCount}
                </span>
              </div>
            </div>

            {/* NOTIFICATION BELL DRAWER BUTTON */}
            <button
              onClick={() => setShowNotificationDrawer(true)}
              className="relative flex items-center gap-2 rounded-2xl border border-[#c703e4]/30 bg-[#460583]/20 px-5 py-4 font-display text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(199,3,228,0.2)] transition-all hover:border-[#c703e4]"
            >
              <span>Verify Queue</span>
              {notifications.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f5d061] text-[10px] font-extrabold text-black">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-8 flex gap-3 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("search")}
            className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "search"
                ? "border border-[#f5d061]/50 bg-[#f5d061] text-black shadow-[0_0_20px_rgba(245,208,97,0.3)]"
                : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
            }`}
          >
            Find & Clock In
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "register"
                ? "border border-[#f5d061]/50 bg-[#f5d061] text-black shadow-[0_0_20px_rgba(245,208,97,0.3)]"
                : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
            }`}
          >
            + Register Walk-In Person
          </button>
        </div>

        {/* TAB 1: FUZZY SEARCH & PARTICIPANT LIST */}
        {activeTab === "search" && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Fuzzy search by Name, Email, or SLT Code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm text-white placeholder-zinc-600 transition-colors focus:border-[#f5d061] focus:outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-3.5 text-xs text-zinc-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button
                onClick={() => setFilterAttended(!filterAttended)}
                className={`rounded-2xl border px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  filterAttended
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {filterAttended ? "Showing: Only Attended" : "Filter: All Participants"}
              </button>
            </div>

            {/* RESULTS LIST */}
            {loading ? (
              <div className="flex h-48 items-center justify-center">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#f5d061] border-t-transparent" />
              </div>
            ) : users.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-[#08050c] p-12 text-center text-zinc-500">
                No matching participants found.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#08050c]">
                <table className="w-full text-left text-sm text-zinc-300">
                  <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    <tr>
                      <th className="px-6 py-4">Participant</th>
                      <th className="px-6 py-4">Pass Code</th>
                      <th className="px-6 py-4">Accommodation</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4 text-right">Action / Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((u) => {
                      const needsAcc = (u.accommodation || "").toLowerCase().trim() === "yes";
                      return (
                        <tr key={u._id} className="transition-colors hover:bg-white/[0.02]">
                          <td className="px-6 py-4">
                            <div className="font-bold text-white">
                              {u.firstName} {u.lastName}
                            </div>
                            <div className="text-xs text-zinc-500">{u.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded bg-[#460583]/50 px-2.5 py-1 font-mono text-xs font-bold text-[#f5d061]">
                              {u.uniqueId}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${
                                needsAcc
                                  ? "border border-amber-500/50 bg-amber-500/20 text-amber-300"
                                  : "border border-zinc-700 bg-zinc-800 text-zinc-400"
                              }`}
                            >
                              {needsAcc ? "YES" : "NO"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-zinc-400">
                            <div>{u.whatsapp}</div>
                            <div className="text-[10px] text-zinc-500">{u.location || "N/A"}</div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {u.isAttended ? (
                              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
                                <span>✓</span> Clocked In
                              </div>
                            ) : (
                              <button
                                onClick={() => handleClockIn(u._id, u.uniqueId)}
                                className="rounded-full border border-[#f5d061]/50 bg-gradient-to-r from-[#f5d061] to-[#e2b842] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_15px_rgba(245,208,97,0.2)] transition-transform hover:scale-105"
                              >
                                Clock In →
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REGISTER WALK-IN FORM */}
        {activeTab === "register" && (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-[#08050c] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <h3 className="font-display text-2xl font-bold text-white">
              Register & Clock In Participant
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Participant will automatically be marked present upon registration.
            </p>

            {formError && (
              <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                {formError}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Location (City / State)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ibadan, Oyo State"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Certificated Training Track
                  </label>
                  <select
                    value={formData.certificatedTraining}
                    onChange={(e) => setFormData({ ...formData, certificatedTraining: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-[#0e0616] px-4 py-2.5 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  >
                    {CERTIFICATED_TRAINING_TRACKS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    How Did You Hear About Us?
                  </label>
                  <select
                    value={formData.referralSource}
                    onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-[#0e0616] px-4 py-2.5 text-sm text-white focus:border-[#f5d061] focus:outline-none"
                  >
                    {REFERRAL_SOURCES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <label className="flex items-center gap-3 text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={formData.isMember}
                    onChange={(e) => setFormData({ ...formData, isMember: e.target.checked })}
                    className="h-4 w-4 rounded accent-[#f5d061]"
                  />
                  <span>Are you a member of MIV Word House?</span>
                </label>

                <label className="flex items-center gap-3 text-xs font-semibold text-amber-300">
                  <input
                    type="checkbox"
                    checked={formData.needsAccommodation}
                    onChange={(e) => setFormData({ ...formData, needsAccommodation: e.target.checked })}
                    className="h-4 w-4 rounded accent-[#f5d061]"
                  />
                  <span>Do you require Accommodation?</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={registering}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#f5d061]/50 bg-gradient-to-r from-[#f5d061] to-[#e2b842] py-3 text-xs font-extrabold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(245,208,97,0.3)] transition-transform hover:scale-[1.02] disabled:opacity-50"
              >
                {registering ? "Registering..." : "Register & Complete Clock-In →"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* NOTIFICATIONS DRAWER (Live Verification Queue from Layout Circle) */}
      <AnimatePresence>
        {showNotificationDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[290] flex justify-end bg-black/70 backdrop-blur-sm"
            onClick={() => setShowNotificationDrawer(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#08050c] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Check-In Queue
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Participants who verified at the entrance
                  </p>
                </div>
                <button
                  onClick={() => setShowNotificationDrawer(false)}
                  className="rounded-full border border-white/10 p-2 text-zinc-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className="pt-20 text-center text-xs text-zinc-500">
                    No pending check-in requests.
                  </div>
                ) : (
                  notifications.map((n) => {
                    const needsAcc = (n.accommodation || "").toLowerCase().trim() === "yes";
                    return (
                      <div
                        key={n._id}
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-[#f5d061]/40"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-white">{n.name}</h4>
                            <p className="text-xs text-zinc-400">{n.email}</p>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#f5d061]">
                            {n.uniqueId}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                              needsAcc
                                ? "bg-amber-500/20 text-amber-300"
                                : "bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            Accommodation: {needsAcc ? "YES" : "NO"}
                          </span>

                          <button
                            onClick={() => handleClockIn(n.userId, n.uniqueId)}
                            className="rounded-full bg-[#f5d061] px-3.5 py-1 text-[11px] font-extrabold uppercase text-black hover:bg-[#e2b842]"
                          >
                            Clock In →
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAIL MODAL (Required: Name, SLT Code, BOLD Accommodation Status) */}
      <AnimatePresence>
        {modalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[350] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
            onClick={() => setModalData(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-[#08050c] p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(245,208,97,0.2)]"
            >
              <button
                onClick={() => setModalData(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:text-white"
              >
                ×
              </button>

              <span className="eyebrow text-emerald-400">✓ Check-In Success</span>

              <h2 className="mt-4 font-display text-3xl font-extrabold text-white">
                {modalData.name}
              </h2>

              {/* SLT PASS CODE */}
              <div className="mx-auto mt-4 inline-block rounded-xl border border-[#f5d061]/40 bg-[#f5d061]/10 px-6 py-2.5 font-mono text-2xl font-black tracking-widest text-[#f5d061] shadow-[0_0_20px_rgba(245,208,97,0.15)]">
                {modalData.uniqueId}
              </div>

              {/* BOLD ACCOMMODATION STATUS */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-5">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Accommodation Requirement
                </span>
                <div
                  className={`mt-2 font-display text-3xl font-black uppercase tracking-wider ${
                    (modalData.accommodation || "").toLowerCase().trim() === "yes"
                      ? "text-amber-400 [text-shadow:0_0_20px_rgba(251,191,36,0.5)]"
                      : "text-zinc-500"
                  }`}
                >
                  {(modalData.accommodation || "").toLowerCase().trim() === "yes"
                    ? "ACCOMMODATION: YES"
                    : "ACCOMMODATION: NO"}
                </div>
              </div>

              {modalData.message && (
                <p className="mt-4 text-xs text-zinc-400">{modalData.message}</p>
              )}

              <button
                onClick={() => setModalData(null)}
                className="mt-6 w-full rounded-xl border border-[#f5d061]/50 bg-gradient-to-r from-[#f5d061] to-[#e2b842] py-3 text-xs font-extrabold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(245,208,97,0.25)] hover:scale-[1.01]"
              >
                Done / Next Participant
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
