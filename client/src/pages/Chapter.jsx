import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "../api";
import { useApp } from "../context/AppContext";
import QuizCard from "../components/QuizCard";

export default function Chapter() {
  const { id } = useParams();
  const { setToast } = useApp();
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    api
      .chapter(id)
      .then(setChapter)
      .catch((err) => setToast({ type: "error", text: err.message }));
  }, [id, setToast]);

  if (!chapter) return <p className="text-zinc-500 dark:text-slate-400">Loading chapter…</p>;

  return (
    <div className="space-y-6 text-zinc-900 dark:text-slate-100 transition-colors duration-300 animate-in text-left">
      {/* 🌟 FIXED BACK LINK COLOR */}
      <Link to="/learn" className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
        <ArrowLeft size={16} /> All chapters
      </Link>
      
      {/* 🌟 FIXED HEADER CARD BACKGROUND AND TITLE CONTRAST */}
      <header className="rounded-[2rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-xs transition-colors duration-300">
        <p className="text-xs font-bold tracking-widest uppercase font-mono" style={{ color: chapter.accent }}>
          {chapter.subject}
        </p>
        <h1 className="font-display mt-2 text-4xl text-zinc-950 dark:text-white">{chapter.title}</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{chapter.blurb}</p>
      </header>

      {/* 🌟 FIXED READING SECTION CONTAINER AND TEXT CONTRAST */}
      <section className="space-y-4 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-black/20 p-6 shadow-xs transition-colors duration-300">
        {chapter.reading.map((para) => (
          <p key={para} className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {para}
          </p>
        ))}
      </section>

      <div className="space-y-4">
        {chapter.questions.map((q, i) => (
          <QuizCard key={q.id} chapterId={chapter.id} question={q} index={i} />
        ))}
      </div>
    </div>
  );
}