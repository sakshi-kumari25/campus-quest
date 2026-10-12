import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Send, Sparkles } from "lucide-react";

export default function QuestionDetail({ questions = [] }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Find the exact thread matching our route params from the shared app array state
    if (questions && questions.length > 0) {
      const found = questions.find((q) => String(q.id) === String(id) || String(q.id) === `forum_${id}`);
      setPost(found || null);
    }
  }, [id, questions]);

  if (!post) {
    return (
      <div className="p-6 text-left space-y-4">
        <Link to="/forum" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900">
          <ArrowLeft size={16} /> Back to Forum
        </Link>
        <p className="text-zinc-500 dark:text-slate-400">Discussion thread not found.</p>
      </div>
    );
  }

  const threadAnswers = post.answers || [];

  return (
    <div className="space-y-6 text-zinc-900 dark:text-slate-100 text-left p-6 max-w-4xl mx-auto animate-in">
      <Link to="/forum" className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Forum
      </Link>

      {/* MAIN DISCUSSION CONTAINER */}
      <article className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-violet-600 dark:text-violet-300 font-semibold">
            {post.tag || post.subject}
          </span>
          <span className="rounded-full bg-amber-400/15 px-2.5 py-1 text-amber-600 dark:text-amber-200 font-semibold">
            {post.xpReward || post.bounty || 0} XP bounty
          </span>
        </div>
        <h1 className="font-display text-3xl text-zinc-950 dark:text-white font-black">{post.title}</h1>
        <p className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {post.description || post.body}
        </p>
        
        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/65 flex items-center gap-3">
          <div
            className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-slate-950 shadow-sm"
            style={{ background: post.author?.accent || "#6d28d9" }}
          >
            {post.author?.avatar || "US"}
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-950 dark:text-white">{post.author?.name}</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">{post.author?.major || "B.Tech Student"}</p>
          </div>
        </div>
      </article>

      {/* PEER SOLUTIONS SUB-SHELVES */}
      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold text-zinc-400 uppercase tracking-wider">
          Solutions ({threadAnswers.length})
        </h2>
        
        <div className="space-y-3">
          {threadAnswers.map((a) => (
            <div
              key={a.id}
              className={`p-5 rounded-3xl border transition-all ${
                a.accepted
                  ? "border-emerald-300 bg-emerald-50/40 dark:border-emerald-900/60 dark:bg-emerald-950/10 shadow-xs"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-slate-950 shadow-sm"
                    style={{ background: a.author?.accent || "#6d28d9" }}
                  >
                    {a.author?.avatar || "US"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-950 dark:text-white">{a.author?.name}</p>
                  </div>
                </div>
                {a.accepted && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-[10px] font-black text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                    <CheckCircle2 size={12} className="fill-current" /> Accepted Solution
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{a.body}</p>
            </div>
          ))}
          
          {threadAnswers.length === 0 && (
            <p className="rounded-3xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-400 dark:border-zinc-700">
              No solutions yet. First helpful write-up can claim the bounty.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
