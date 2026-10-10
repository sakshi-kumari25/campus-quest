import { useState } from "react";
import { Check, X, Zap } from "lucide-react";
import { api } from "../api";
import { useApp } from "../context/AppContext";

export default function QuizCard({ chapterId, question, index }) {
  const { setUser, setCompletedQuizzes, setToast } = useApp();
  const [picked, setPicked] = useState(null);
  const [result, setResult] = useState(
    question.answered ? { correct: true, alreadyAwarded: true } : null
  );
  const [busy, setBusy] = useState(false);
  const locked = Boolean(result?.correct) || question.answered;

  async function choose(optionIndex) {
    if (locked || busy) return;
    setPicked(optionIndex);
    setBusy(true);
    try {
      const data = await api.answerQuiz(chapterId, { questionId: question.id, optionIndex });
      setResult(data);
      if (data.user) setUser(data.user);
      if (data.completedQuizzes) setCompletedQuizzes(data.completedQuizzes);
      if (data.correct && data.xpGained) {
        setToast({ type: "ok", text: `Correct — +${data.xpGained} XP` });
      }
    } catch (err) {
      setToast({ type: "error", text: err.message });
      setPicked(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="rounded-3xl border border-white/10 bg-black/25 p-5">
      <p className="text-xs tracking-widest text-cyan-300/80 uppercase">Check {index + 1} · +10 XP</p>
      <h3 className="mt-2 text-lg font-medium">{question.prompt}</h3>
      <div className="mt-4 space-y-2">
        {question.options.map((opt, i) => {
          const selected = picked === i;
          const show = result && selected;
          const good = show && result.correct;
          const bad = show && !result.correct;
          return (
            <button
              key={opt}
              type="button"
              disabled={locked || busy}
              onClick={() => choose(i)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                good
                  ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-100"
                  : bad
                    ? "border-rose-400/40 bg-rose-400/10 text-rose-100"
                    : selected
                      ? "border-cyan-300/50 bg-cyan-300/10"
                      : "border-white/10 bg-white/5 hover:border-white/25"
              }`}
            >
              <span>{opt}</span>
              {good && <Check size={16} />}
              {bad && <X size={16} />}
            </button>
          );
        })}
      </div>
      {result && (
        <p className="mt-4 flex items-start gap-2 text-sm text-slate-300">
          <Zap size={16} className="mt-0.5 text-amber-300" />
          {result.alreadyAwarded
            ? "Already cleared — XP was banked the first time you nailed this."
            : result.correct
              ? result.explanation || "Nice — XP added to your streak log."
              : "Not quite. Try another option after a re-read of the chapter."}
        </p>
      )}
    </article>
  );
}
