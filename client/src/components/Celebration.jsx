import { useMemo } from "react";
import { PartyPopper, Sparkles, X, Zap } from "lucide-react";

export default function Celebration({ data, onClose }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.4}s`,
        dx: `${(Math.random() - 0.5) * 180}px`,
        color: ["#22d3ee", "#a78bfa", "#fbbf24", "#34d399", "#f472b6"][i % 5],
        size: 6 + Math.random() * 8,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 backdrop-blur-sm">
      {bits.map((b) => (
        <span
          key={b.id}
          className="confetti-piece pointer-events-none absolute top-0 rounded-sm"
          style={{
            left: b.left,
            width: b.size,
            height: b.size * 0.45,
            background: b.color,
            animationDelay: b.delay,
            "--dx": b.dx,
          }}
        />
      ))}

      <div className="relative w-full max-w-md animate-in rounded-3xl border border-white/15 bg-gradient-to-b from-[#161b2c] to-[#0b0e18] p-8 text-center shadow-[0_0_80px_rgba(167,139,250,.35)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="relative mx-auto mb-5 grid h-24 w-24 place-items-center">
          <span className="pulse-ring absolute inset-0 rounded-full bg-amber-400/30" />
          <span className="celebration-burst absolute top-1/2 left-1/2 h-24 w-24 rounded-full bg-violet-500/30" />
          <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-amber-300 via-fuchsia-400 to-cyan-400 text-slate-950 shadow-[0_0_30px_rgba(251,191,36,.55)]">
            {data.leveledUp ? <Sparkles size={34} /> : <PartyPopper size={34} />}
          </div>
        </div>

        <p className="font-display text-3xl tracking-tight">
          {data.leveledUp ? "Level up" : "Reward unlocked"}
        </p>
        <p className="mt-2 text-lg text-cyan-200">{data.title}</p>
        <p className="mt-2 text-sm text-slate-400">{data.subtitle}</p>

        <div className="mt-6 flex items-center justify-center gap-3">
          {data.helperAvatar && (
            <div className="grid h-10 w-10 place-items-center rounded-full bg-violet-400 text-sm font-bold text-slate-950">
              {data.helperAvatar}
            </div>
          )}
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-4 py-2 text-amber-200">
            <Zap size={16} />
            <span className="font-semibold">+{data.xpGained} XP transferred</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full rounded-2xl bg-white py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Back to the quest
        </button>
      </div>
    </div>
  );
}
