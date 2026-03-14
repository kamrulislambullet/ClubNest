import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import axios from "axios";
import { NavLink } from "react-router";
import {
  Users,
  CalendarDays,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Sparkles,
  MapPin,
} from "lucide-react";

export const MemberDashboard = () => {
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState({});
  const [myClubs, setMyClubs] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const api = axios.create({
          baseURL: import.meta.env.VITE_API_URL,
          headers: { Authorization: `Bearer ${token}` },
        });

        const [summaryRes, clubsRes, paymentsRes] = await Promise.all([
          api.get(`/api/member/summary?email=${user.email}`),
          api.get(`/api/member/clubs?email=${user.email}`),
          api.get(`/api/member/payments?email=${user.email}`),
        ]);

        setSummary(summaryRes.data);
        setMyClubs(clubsRes.data);
        setPayments(paymentsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const statusStyle = (status) => {
    if (status === "Paid")
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (status === "Free")
      return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    return "text-white/35 bg-white/[0.05] border-white/10";
  };

  /* ── Skeleton ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#060810] text-white px-4 sm:px-8 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[520px] h-[420px] rounded-full bg-linear-to-bl from-blue-600 to-violet-700 opacity-[0.06] blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-linear-to-tr from-cyan-500 to-blue-600 opacity-[0.05] blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto space-y-8">
          {/* Header skeleton */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="h-2.5 w-32 bg-white/6 rounded-full animate-pulse" />
              <div className="h-8 w-64 bg-white/6 rounded-xl animate-pulse" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/6 animate-pulse shrink-0" />
          </div>

          {/* Stat cards skeleton */}
          <div className="grid grid-cols-2 gap-4">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="bg-white/3 border border-white/6 rounded-2xl p-5 space-y-4 animate-pulse"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/6" />
                  <div className="w-4 h-4 rounded bg-white/4" />
                </div>
                <div className="h-10 w-16 bg-white/6rounded-lg" />
                <div className="h-2.5 w-24 bg-white/4 rounded-full" />
              </div>
            ))}
          </div>

          {/* CTA skeleton */}
          <div className="h-16 rounded-2xl bg-white/3 border border-white/6 animate-pulse" />

          {/* Clubs skeleton */}
          <div className="space-y-4">
            <div className="h-2.5 w-20 bg-white/6 rounded-full animate-pulse" />
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white/3 border border-white/6 rounded-2xl p-4 space-y-3 animate-pulse"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/6" />
                  <div className="h-3 w-3/4 bg-white/6 rounded-full" />
                  <div className="h-2.5 w-1/2 bg-white/4 rounded-full" />
                  <div className="flex justify-between">
                    <div className="h-4 w-14 bg-white/5 rounded-full" />
                    <div className="h-4 w-16 bg-white/4 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table skeleton */}
          <div className="space-y-4">
            <div className="h-2.5 w-28 bg-white/6 rounded-full animate-pulse" />
            <div className="bg-white/3 border border-white/6 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-4 px-5 py-3 border-b border-white/6 bg-white/2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-2 w-12 bg-white/6 rounded-full animate-pulse"
                  />
                ))}
              </div>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 items-center px-5 py-4 border-b border-white/4 last:border-0"
                >
                  <div className="h-3 w-12 bg-white/6 rounded-full animate-pulse" />
                  <div className="h-3 w-20 bg-white/4 rounded-full animate-pulse" />
                  <div className="h-3 w-16 bg-white/4 rounded-full animate-pulse" />
                  <div className="h-5 w-14 bg-white/5 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main UI ── */
  return (
    <div className="min-h-screen bg-[#060810] text-white px-4 sm:px-8 py-8 space-y-8 relative overflow-hidden">
      {/* ── Aurora bg ── */}
      <div className="absolute top-0 right-0 w-[520px] h-[420px] rounded-full bg-linear-to-bl from-blue-600 to-violet-700 opacity-[0.06] blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-linear-to-tr from-cyan-500 to-blue-600 opacity-[0.05] blur-[100px] pointer-events-none" />

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-linear(rgba(255,255,255,0.018) 1px, transparent 1px), linear-linear(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 space-y-8 max-w-[1440px] mx-auto">
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-400 mb-2">
              Member Dashboard
            </p>
            <h1 className="text-[34px] sm:text-[42px] font-light font-serif leading-tight text-[#f0f4ff]">
              Welcome back,{" "}
              <em className="italic text-[#93b4ff]">
                {user?.displayName?.split(" ")[0] || "Member"}
              </em>
            </h1>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group bg-white/3 border border-white/8 rounded-2xl p-5 overflow-hidden hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(79,127,255,0.08)] transition-all duration-300">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/8 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start justify-between mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                <Users size={17} className="text-blue-400" />
              </div>
              <ArrowUpRight
                size={14}
                className="text-white/15 group-hover:text-blue-400 transition-colors duration-200"
              />
            </div>
            <p className="text-[40px] font-light text-white leading-none mb-1.5">
              {summary.clubsJoined ?? 0}
            </p>
            <p className="text-[11.5px] text-white/35 tracking-wide">
              Clubs Joined
            </p>
          </div>

          <div className="relative group bg-white/3 border border-white/8 rounded-2xl p-5 overflow-hidden hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)] transition-all duration-300">
            <div className="absolute top-0 right-0 w-28 h-28 bg-violet-500/8 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start justify-between mb-5">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                <CalendarDays size={17} className="text-violet-400" />
              </div>
              <ArrowUpRight
                size={14}
                className="text-white/15 group-hover:text-violet-400 transition-colors duration-200"
              />
            </div>
            <p className="text-[40px] font-light text-white leading-none mb-1.5">
              {summary.eventsRegistered ?? 0}
            </p>
            <p className="text-[11.5px] text-white/35 tracking-wide">
              Events Registered
            </p>
          </div>
        </div>

        {/* ── Upcoming events CTA ── */}
        <NavLink
          to="/events"
          className="group flex items-center justify-between bg-linear-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-2xl px-5 py-4 hover:from-blue-500/15 hover:to-violet-500/15 hover:border-blue-500/35 transition-all duration-300"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-[0_4px_14px_rgba(79,127,255,0.35)] shrink-0">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Upcoming Events
              </p>
              <p className="text-[11px] text-white/35 mt-0.5">
                Events module coming soon
              </p>
            </div>
          </div>
          <ArrowUpRight
            size={16}
            className="text-white/25 group-hover:text-blue-400 transition-colors duration-200 shrink-0"
          />
        </NavLink>

        {/* ── My Clubs ── */}
        {myClubs.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/25">
                My Clubs
              </p>
              <div className="flex-1 h-px bg-white/6" />
              <span className="text-[11px] text-white/20">
                {myClubs.length} total
              </span>
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
              {myClubs.map((club) => (
                <div
                  key={club.id}
                  className="group bg-white/3 border border-white/8 rounded-2xl p-4 hover:border-white/15 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-500/20 to-violet-500/20 border border-white/8 flex items-center justify-center mb-3.5">
                    <Users size={15} className="text-blue-300" />
                  </div>
                  <p className="text-sm font-semibold text-white/90 truncate mb-0.5">
                    {club.name}
                  </p>
                  <p className="text-[11px] text-white/30 truncate flex items-center gap-1 mb-3.5">
                    <MapPin size={10} />
                    {club.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        club.membershipStatus === "Active"
                          ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                          : "text-white/30 bg-white/4 border-white/10"
                      }`}
                    >
                      {club.membershipStatus}
                    </span>
                    <span className="text-[10px] text-white/20 flex items-center gap-1">
                      <Clock size={9} />
                      {club.expiryDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Payment History ── */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/25">
              Payment History
            </p>
            <div className="flex-1 h-px bg-white/6" />
            <span className="text-[11px] text-white/20">
              {payments.length} records
            </span>
          </div>

          <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 px-5 py-3 border-b border-white/[0.07] bg-white/2">
              {["Amount", "Club", "Date", "Status"].map((h) => (
                <p
                  key={h}
                  className="text-[9.5px] font-semibold tracking-[0.18em] uppercase text-white/20"
                >
                  {h}
                </p>
              ))}
            </div>

            {payments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center mb-1">
                  <CheckCircle2 size={18} className="text-white/20" />
                </div>
                <p className="text-sm text-white/30 font-medium">
                  No payments yet
                </p>
                <p className="text-[11px] text-white/15">
                  Your payment history will appear here
                </p>
              </div>
            ) : (
              payments.map((p, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 items-center px-5 py-4 border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors duration-150"
                >
                  <p className="text-sm font-semibold text-white">
                    ${p.amount}
                  </p>
                  <p className="text-sm text-white/55 truncate pr-2">
                    {p.club}
                  </p>
                  <p className="text-sm text-white/30">
                    {new Date(p.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "2-digit",
                    })}
                  </p>
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full border w-fit ${statusStyle(p.status)}`}
                    >
                      {p.status === "Paid" && <CheckCircle2 size={10} />}
                      {p.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
