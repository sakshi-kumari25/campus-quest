import { useEffect, useState } from "react";
import { api } from "../api";
import { useApp } from "../context/AppContext";
import ChapterCard from "../components/ChapterCard";

export default function Learn() {
  const { setToast } = useApp();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    api.chapters().then(setChapters).catch((err) => setToast({ type: "error", text: err.message }));
  }, [setToast]);

  return (
    <div className="animate-in">
      {/* 🌟 FIXED SUBTITLE COLOR: Swaps seamlessly between violet-600 and violet-400 */}
      <p className="text-xs tracking-[0.3em] text-violet-600 dark:text-violet-400 font-bold uppercase">
        Quest line
      </p>
      
      {/* 🌟 FIXED TITLE COLOR: Adapts from charcoal-black to bright white */}
      <h1 className="font-display mt-2 text-4xl text-zinc-950 dark:text-white">
        Interactive chapters
      </h1>
      
      {/* 🌟 FIXED BLURB COLOR: Swaps from standard deep gray to light slate-400 */}
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
        Read a tight briefing, then fire a multiple-choice check. Each correct answer banks +10 XP and feeds the weekly board.
      </p>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {chapters.map((ch) => (
          <ChapterCard key={ch.id} chapter={ch} />
        ))}
      </div>
    </div>
  );
}