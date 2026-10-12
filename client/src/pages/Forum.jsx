import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, MessageSquarePlus, Sparkles } from "lucide-react";
import { api } from "../api";
import { useApp } from "../context/AppContext";
import QuestionModal from "../components/QuestionModal";

function timeAgo(iso) {
  const delta = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.round(delta / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 48) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export default function Forum() {
  const { setToast } = useApp();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  async function load() {
    setPosts(await api.forum());
  }

  useEffect(() => {
    load().catch((err) => setToast({ type: "error", text: err.message }));
  }, [setToast]);

  async function create(payload) {
    await api.createQuestion(payload);
    setOpen(false);
    setToast({ type: "ok", text: "Question posted to the campus feed" });
    await load();
  }

  return (
    <div className="animate-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-500 dark:text-fuchsia-400">
            Peer network
          </p>
          <h1 className="font-display mt-2 text-4xl text-zinc-950 dark:text-white">Study Help</h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
            Post a stuck-point, bounty it with XP, and accept the answer that actually unblocks you.
            Helpers get your bounty plus a +50 hero bonus.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20"
        >
          <MessageSquarePlus size={16} /> Post a Question
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((p) => (
          <Link
            key={p.id}
            to={`/forum/${p.id}`}
            className="block rounded-3xl border border-zinc-200 bg-white p-5 transition hover:border-violet-400/40 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-violet-500/10 px-2.5 py-1 font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-300">
                {p.tag}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2.5 py-1 font-semibold text-amber-600 dark:text-amber-200">
                <Sparkles size={12} /> {p.xpReward} XP bounty
              </span>
              {p.acceptedAnswerId && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-emerald-600 dark:text-emerald-300">
                  <CheckCircle2 size={12} /> Solved
                </span>
              )}
              <span className="ml-auto text-zinc-400">{timeAgo(p.createdAt)}</span>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-zinc-950 dark:text-white">{p.title}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{p.description}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-zinc-500">
              <span
                className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold text-slate-950"
                style={{ background: p.author.accent }}
              >
                {p.author.avatar}
              </span>
              {p.author.name}
              {p.isMine ? " · you" : ""}
              <span className="ml-auto">{p.answerCount} solution{p.answerCount === 1 ? "" : "s"}</span>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="rounded-3xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700">
            Feed is quiet. Be the first to post a question.
          </p>
        )}
      </div>

      {open && <QuestionModal onClose={() => setOpen(false)} onSubmit={create} />}
    </div>
  );
}
