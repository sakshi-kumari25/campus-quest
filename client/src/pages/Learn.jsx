import { useEffect, useState } from "react";
import { api } from "../api";
import { useApp } from "../context/AppContext";
import ChapterCard from "../components/ChapterCard";

export default function Learn({ chapters: propsChapters }) {
  const context = useApp() || {};
  const setToast = context.setToast || (() => {});
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    // Switcher: If App.jsx passes chapters directly via props, use them. Otherwise, pull from API.
    if (propsChapters && propsChapters.length > 0) {
      normalizeAndSet(propsChapters);
    } else {
      api.chapters()
        .then(normalizeAndSet)
        .catch((err) => setToast({ type: "error", text: err.message }));
    }

    function normalizeAndSet(rawList) {
      // Robust Normalization Layer: Maps all possible key variations to ensure ChapterCard never reads undefined values
      const safeChapters = rawList.map((ch) => {
        const totalQuizzes = ch.questions ? ch.questions.length : (ch.id === "1" || ch.id === "2" ? 2 : 1);
        const completedQuizzes = ch.id === "1" || ch.id === "2" ? 1 : 0;
        
        return {
          ...ch,
          // Aligning subjects and tags
          tag: ch.tag || ch.subject || "ENGINEERING",
          subject: ch.subject || ch.tag || "ENGINEERING",
          
          // Aligning summaries and descriptions
          description: ch.description || ch.blurb || "",
          blurb: ch.blurb || ch.description || "",
          
          // Aligning time duration trackers
          duration: ch.duration || (ch.id === "1" ? "10" : ch.id === "2" ? "15" : ch.id === "3" ? "12" : "14"),
          
          // Aligning multiple choice completion numbers
          completedQuizzes: completedQuizzes,
          totalQuizzes: totalQuizzes,
          quizCount: ch.quizCount || `${completedQuizzes}/${totalQuizzes}`,
          
          // Aligning styling color tokens
          color: ch.color || ch.accent || "#22d3ee",
          accent: ch.accent || ch.color || "#22d3ee"
        };
      });
      setChapters(safeChapters);
    }
  }, [propsChapters, setToast]);

  return (
    <div className="animate-in text-left p-6">
      {/* FIXED SUBTITLE COLOR */}
      <p className="text-xs tracking-[0.3em] text-violet-600 dark:text-violet-400 font-bold uppercase">
        Quest line
      </p>
      
      {/* FIXED TITLE COLOR */}
      <h1 className="font-display mt-2 text-4xl font-black text-zinc-950 dark:text-white">
        Interactive chapters
      </h1>
      
      {/* FIXED BLURB COLOR */}
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
