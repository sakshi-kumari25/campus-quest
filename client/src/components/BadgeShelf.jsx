import {
  Crown,
  Flame,
  GraduationCap,
  Handshake,
  MessageCircleQuestion,
  Sparkles,
  Trophy,
  Lock,
} from "lucide-react";

const ICONS = {
  Sparkles,
  Flame,
  Trophy,
  GraduationCap,
  MessageCircleQuestion,
  Handshake,
  Crown,
};

export default function BadgeShelf({ catalog, earned }) {
  const have = new Set(earned || []);
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <p className="font-display text-xl">Badge vault</p>
      <p className="mb-4 text-sm text-slate-400">Collect lore as you study and help peers</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {catalog.map((badge) => {
          const Icon = ICONS[badge.icon] || Sparkles;
          const unlocked = have.has(badge.id);
          return (
            <div
              key={badge.id}
              className={`rounded-2xl border p-3 ${
                unlocked
                  ? "border-amber-300/30 bg-amber-300/10"
                  : "border-white/5 bg-black/20 opacity-60"
              }`}
            >
              <div
                className={`mb-2 grid h-9 w-9 place-items-center rounded-xl ${
                  unlocked ? "bg-amber-300 text-slate-950" : "bg-white/10 text-slate-400"
                }`}
              >
                {unlocked ? <Icon size={16} /> : <Lock size={16} />}
              </div>
              <p className="text-sm font-medium">{badge.name}</p>
              <p className="text-xs text-slate-500">{badge.hint}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
