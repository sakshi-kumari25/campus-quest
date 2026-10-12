import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import QuizCard from "../components/QuizCard";

export default function Chapter({ chapters = [] }) {
  const { id } = useParams();

  // Find the exact active engineering chapter from the props array passed by App.jsx
  const chapter = chapters.find((c) => String(c.id) === String(id));

  if (!chapter) {
    return (
      <div className="p-6 text-left space-y-4">
        <Link to="/learn" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900">
          <ArrowLeft size={16} /> All chapters
        </Link>
        <p className="text-zinc-500 dark:text-slate-400">Loading chapter module details…</p>
      </div>
    );
  }

  // Safe fallbacks to protect layout loops from crashes
  const readingParagraphs = chapter.reading || [];
  const quizQuestions = chapter.questions || chapter.quizzes || [];

  return (
    <div className="space-y-6 text-zinc-900 dark:text-slate-100 transition-colors duration-300 animate-in text-left">
      {/* 🌟 FIXED BACK LINK COLOR */}
      <Link to="/learn" className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
        <ArrowLeft size={16} /> All chapters
      </Link>
      
      {/* 🌟 FIXED HEADER CARD BACKGROUND AND TITLE CONTRAST */}
      <header className="rounded-[2rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-xs transition-colors duration-300">
        <p className="text-xs font-bold tracking-widest uppercase font-mono" style={{ color: chapter.accent || "#22d3ee" }}>
          {chapter.subject || chapter.tag}
        </p>
        <h1 className="font-display mt-2 text-4xl text-zinc-950 dark:text-white">{chapter.title}</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{chapter.blurb || chapter.description}</p>
      </header>

      {/* 🌟 FIXED READING SECTION CONTAINER AND TEXT CONTRAST */}
      <section className="space-y-4 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-black/20 p-6 shadow-xs transition-colors duration-300">
        {readingParagraphs.map((para, idx) => (
          <p key={idx} className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {para}
          </p>
        ))}
      </section>

      <div className="space-y-4">
        {quizQuestions.map((q, i) => (
          <QuizCard key={q.id || i} chapterId={chapter.id} question={q} index={i} />
        ))}
      </div>
    </div>
  );
}
