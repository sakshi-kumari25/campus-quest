import { Link } from "react-router-dom";
import { BookOpen, Clock } from "lucide-react";

export default function ChapterCard({ chapter }) {
  const pct = Math.round((chapter.completedCount / chapter.questionCount) * 100);
  
  return (
    <Link
      to={`/learn/${chapter.id}`}
      /* 🌟 FIXED CARD CONTAINERS AND BORDERS TO ADAPT TO LIGHT/DARK MODE */
      className="group block rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-xs backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-zinc-300 dark:hover:border-white/25 text-left"
    >
      {/* Subject Badge Ribbon Node */}
      <p className="text-xs font-bold tracking-widest uppercase font-mono" style={{ color: chapter.accent }}>
        {chapter.subject}
      </p>
      
      {/* 🌟 FIXED MAIN TITLE COLOR */}
      <h3 className="font-display mt-1 text-xl text-zinc-950 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
        {chapter.title}
      </h3>
      
      {/* 🌟 FIXED INNER BLURB CONTENT COLOR */}
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {chapter.blurb}
      </p>
      
      {/* 🌟 FIXED META LABELS DETAIL BAR COLORS */}
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 dark:text-slate-500 font-medium">
        <span className="inline-flex items-center gap-1">
          <Clock size={13} /> {chapter.minutes} min
        </span>
        <span className="inline-flex items-center gap-1">
          <BookOpen size={13} /> {chapter.completedCount}/{chapter.questionCount} quizzes
        </span>
      </div>
      
      {/* 🌟 FIXED PROGRESS BAR METRICS INNER CONTAINER RUNWAY */}
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10 border border-zinc-200/30 dark:border-none">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: chapter.accent }}
        />
      </div>
    </Link>
  );
}