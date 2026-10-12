import React, { useState } from 'react';
import { Award, Flame, TrendingUp, X, Trophy } from 'lucide-react';

export default function Leaderboard({ rows, users }) {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const localDefaultPeers = [
    {
      id: "u5",
      name: "Shraddha",
      major: "B.Tech × Electronics & Comm.",
      xp: 512,
      weeklyXp: 140,
      streak: 18,
      avatar: "SR",
      accent: "#fbbf24",
      badges: ["first-spark", "week-warrior", "century-club", "scholar", "campus-legend"]
    },
    {
      id: "u2",
      name: "Vaibhav",
      major: "B.Tech × Mechanical Engineering",
      xp: 410,
      weeklyXp: 124,
      streak: 9,
      avatar: "VB",
      accent: "#a78bfa",
      badges: ["first-spark", "week-warrior", "century-club", "scholar"]
    },
    {
      id: "u1",
      name: "Sakshi Kumari (You)",
      major: "B.Tech × Computer Science",
      xp: 250,
      weeklyXp: 96,
      streak: 12,
      avatar: "SK",
      accent: "#22d3ee",
      badges: ["first-spark", "week-warrior", "century-club", "scholar"]
    },
    {
      id: "u3",
      name: "Rabindra",
      major: "B.Tech × Electrical Engineering",
      xp: 355,
      weeklyXp: 101,
      streak: 21,
      avatar: "RB",
      accent: "#f472b6",
      badges: ["first-spark", "week-warrior", "century-club", "campus-hero"]
    },
    {
      id: "u4",
      name: "Shashi",
      major: "B.Tech × Civil Engineering",
      xp: 198,
      weeklyXp: 72,
      streak: 4,
      avatar: "SS",
      accent: "#34d399",
      badges: ["first-spark", "century-club"]
    }
  ];

  const activeUsersList =
    (rows && rows.length > 0 ? rows : null) ||
    (users && users.length > 0 ? users : localDefaultPeers);

  const rankedUsers = [...activeUsersList].sort(
    (a, b) => (b.weeklyXp || 0) - (a.weeklyXp || 0) || b.xp - a.xp
  );

  const badgeNames = {
    "first-spark": "First Spark",
    "week-warrior": "Week Warrior",
    "century-club": "Century Club",
    scholar: "Scholar",
    "campus-legend": "Campus Legend",
    "campus-hero": "Campus Hero"
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm transition-colors duration-300">

      {/* Leaderboard Header */}
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-amber-500" />
        <h3 className="text-base font-bold text-zinc-900 dark:text-slate-100">
          Weekly Peer Leaderboard
        </h3>
      </div>

      {/* Leaderboard Rows */}
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {rankedUsers.map((user, index) => {
          const isMe =
            user.id === "u1" ||
            user.name.includes("Sakshi");

          return (
            <div
              key={user.id}
              onClick={() => setSelectedProfile(user)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 transform hover:scale-102 active:scale-98 group ${
                isMe
                  ? 'bg-violet-50/60 dark:bg-violet-950/20 border-violet-300 dark:border-violet-800 shadow-xs'
                  : 'bg-zinc-50/50 dark:bg-zinc-950/40 border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-black font-mono w-5 text-center ${
                    index === 0
                      ? 'text-amber-500 text-sm'
                      : index === 1
                      ? 'text-zinc-400'
                      : index === 2
                      ? 'text-amber-700'
                      : 'text-zinc-500'
                  }`}
                >
                  #{index + 1}
                </span>

                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow-sm"
                  style={{
                    backgroundColor: user.accent || '#6d28d9'
                  }}
                >
                  {user.avatar || user.name.slice(0, 2).toUpperCase()}
                </div>

                <div className="text-left">
                  <span
                    className={`text-sm font-bold block ${
                      isMe
                        ? 'text-violet-700 dark:text-violet-400 font-extrabold'
                        : 'text-zinc-900 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400'
                    }`}
                  >
                    {user.name}
                  </span>

                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block truncate max-w-[140px]">
                    {user.major}
                  </span>
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                <span className="text-xs font-bold font-mono text-zinc-900 dark:text-slate-200">
                  {user.xp} XP
                </span>

                <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400 font-mono">
                  +{user.weeklyXp || 40} this week
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Popup */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-colors duration-300">

            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Information */}
            <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5 mb-5 mt-2">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black text-white shadow-md"
                style={{
                  backgroundColor: selectedProfile.accent || '#6d28d9'
                }}
              >
                {selectedProfile.avatar ||
                  selectedProfile.name.slice(0, 2).toUpperCase()}
              </div>

              <div className="text-left">
                <h4 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">
                  {selectedProfile.name}
                </h4>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                  {selectedProfile.major}
                </p>

                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="flex items-center gap-1 font-bold text-amber-500 font-mono">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    {selectedProfile.streak || 0} Day Streak
                  </span>

                  <span className="text-zinc-300 dark:text-zinc-700">
                    |
                  </span>

                  <span className="flex items-center gap-1 font-bold text-violet-600 dark:text-violet-400 font-mono">
                    ⚡ {selectedProfile.xp} Total XP
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Performance Graph */}
            <div className="mb-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  Weekly Learning Velocity
                </span>

                <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                  +{selectedProfile.weeklyXp || 50} XP
                </span>
              </div>

              <div className="h-24 flex items-end justify-between px-2 pt-4 gap-2">
                {[
                  { day: 'M', val: 15 },
                  { day: 'T', val: 45 },
                  { day: 'W', val: 30 },
                  {
                    day: 'T',
                    val: selectedProfile.weeklyXp
                      ? selectedProfile.weeklyXp / 2
                      : 65
                  },
                  { day: 'F', val: 20 },
                  {
                    day: 'S',
                    val: selectedProfile.weeklyXp || 80
                  },
                  { day: 'S', val: 10 }
                ].map((d, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                  >
                    <div
                      className="w-full bg-violet-600/20 dark:bg-violet-500/10 rounded-t-md relative overflow-hidden min-h-[4px] transition-all duration-500"
                      style={{
                        height: `${Math.min(d.val, 100)}%`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-violet-600 to-fuchsia-500 rounded-t-md"></div>
                    </div>

                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 font-mono">
                      {d.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Earned Badges */}
            <div className="text-left">
              <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-violet-500" />
                Earned Badge Vault ({selectedProfile.badges?.length || 0})
              </h5>

              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-1">
                {selectedProfile.badges?.map((badgeId, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    🎖️
                    {badgeNames[badgeId] || badgeId.replace(/-/g, ' ')}
                  </div>
                ))}

                {(!selectedProfile.badges ||
                  selectedProfile.badges.length === 0) && (
                  <p className="text-xs text-zinc-500">
                    No achievements claimed yet this semester.
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <button
              onClick={() => setSelectedProfile(null)}
              className="w-full mt-6 px-4 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              Close Profile
            </button>

          </div>
        </div>
      )}
    </div>
  );
}