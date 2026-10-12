import { useEffect, useState } from "react";
import { Flame, Gem, Shield, Swords } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useApp } from "../context/AppContext";
import BadgeShelf from "../components/BadgeShelf";
import Leaderboard from "../components/Leaderboard";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const context = useApp() || {};
  const [board, setBoard] = useState([]);

  // Safe baseline defaults
  const defaultUser = {
    name: "Sakshi Kumari (You)",
    xp: 250,
    level: 3,
    streak: 12,
    badges: ["first-spark", "week-warrior", "century-club", "scholar"]
  };

  const defaultBadgeCatalog = [
    { id: "first-spark", name: "First Spark" },
    { id: "week-warrior", name: "Week Warrior" },
    { id: "century-club", name: "Century Club" },
    { id: "scholar", name: "Scholar" },
    { id: "campus-legend", name: "Campus Legend" },
    { id: "campus-hero", name: "Campus Hero" }
  ];

  // Crash-proof check: If context.user exists but lacks a name, force the default fallback
  const user = (context.user && context.user.name) ? context.user : defaultUser;
  const badgeCatalog = (context.badgeCatalog && context.badgeCatalog.length > 0) ? context.badgeCatalog : defaultBadgeCatalog;
  const setToast = context.setToast || (() => {});

  useEffect(() => {
    api.leaderboard()
      .then(setBoard)
      .catch((err) => setToast({ type: "error", text: err.message }));
  }, [user, setToast]);

  // Safe calculations with optional chaining and fallback numbers
  const userXp = user.xp || 250;
  const xpIntoLevel = userXp % 120;
  const pct = Math.round((xpIntoLevel / 120) * 100);
  const firstName = user.name ? user.name.split(" ")[0] : "Player";
  const userStreak = user.streak || 0;
  const userBadges = user.badges || [];

  return (
    <div className="space-y-6 text-zinc-900 dark:text-slate-100 transition-colors duration-300 animate-in p-6">
      
      {/* GLOBAL HERO CONTAINER */}
      <section className="relative overflow-hidden rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-xs transition-colors duration-300">
        <p className="text-xs tracking-[0.3em] text-cyan-600 dark:text-cyan-400 font-bold uppercase">
          Player HQ
        </p>
        
        <h1 className="font-display mt-2 max-w-xl text-4xl leading-tight sm:text-5xl text-zinc-950 dark:text-white">
          Keep the streak alive, {firstName}.
        </h1>
        
        <p className="mt-3 max-w-lg text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
          Short chapters, real XP, and a campus feed where helping someone else is the fastest way to climb.
        </p>
        
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/learn"
            className="rounded-full bg-zinc-950 dark:bg-white px-5 py-2.5 text-sm font-semibold text-white dark:text-slate-950 shadow-sm hover:opacity-90 transition-all"
          >
            Jump into a chapter
          </Link>
          <Link
            to="/forum"
            className="rounded-full border border-zinc-200 dark:border-white/20 bg-zinc-50 dark:bg-zinc-950/40 px-5 py-2.5 text-sm text-zinc-700 dark:text-slate-200 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            Open Study Help
          </Link>
        </div>
        
        <div className="mt-8">
          <div className="mb-2 flex justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <span>Level {user.level || 1}</span>
            <span>
              {xpIntoLevel}/120 XP to {(user.level || 1) + 1}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-black/40 border border-zinc-200/40 dark:border-none">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </section>

      {/* STAT CARDS MATRIX GRID */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Flame} label="Streak" value={`${userStreak} days`} hint="Study a quiz today to keep it" accent="#fb7185" />
        <StatCard icon={Gem} label="XP points" value={userXp.toLocaleString()} hint={`Weekly haul on the board`} accent="#22d3ee" />
        <StatCard icon={Shield} label="Badges" value={`${userBadges.length}/${badgeCatalog.length}`} hint="Unlock the vault below" accent="#fbbf24" />
      </div>

      {/* SPLIT WORKSPACE SHELVES */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <BadgeShelf catalog={badgeCatalog} earned={userBadges} />
        <Leaderboard rows={board} />
      </div>

      <p className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 font-medium pt-2">
        <Swords size={14} className="text-zinc-400 dark:text-zinc-500" /> 
        Correct quiz answers award +10 XP. Accepting a peer solution sends their offered reward plus a +50 hero bonus.
      </p>
    </div>
  );
}
