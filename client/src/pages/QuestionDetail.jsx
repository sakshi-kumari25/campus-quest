import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Send, Sparkles } from "lucide-react";
import { api } from "../api";
import { useApp } from "../context/AppContext";

export default function QuestionDetail() {
  const { id } = useParams();
  const { setToast, setUser, setCelebration, refreshMe } = useApp();
  const [post, setPost] = useState(null);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setPost(await api.question(id));
    } catch (err) {
      setToast({ type: "error", text: err.message });
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function submitAnswer(e) {
    e.preventDefault();
    setBusy(true);
    try {
      await api.answerQuestion(id, body);
      setBody("");
      await load();
      setToast({ type: "ok", text: "Answer posted" });
    } catch (err) {
      setToast({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  }

  async function accept(answerId) {
    setBusy(true);
    try {
      const data = await api.acceptAnswer(id, answerId);
      if (data.user) setUser(data.user);
      setCelebration(data.celebration);
      await refreshMe();
      await load();
    } catch (err) {
      setToast({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  }

  if (!post) return <p className="text-slate-400">Loading thread…</p>;

  return (
    <div className="space-y-6">
      <Link to="/forum" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft size={16} /> Study Help
      </Link>

      <article className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-white/10 px-2.5 py-1">{post.tag}</span>
          <span className="rounded-full bg-amber-400/15 px-2.5 py-1 text-amber-200">
            {post.xpReward} XP bounty
          </span>
        </div>
        <h1 className="font-display mt-3 text-3xl">{post.title}</h1>
        <p className="mt-3 whitespace-pre-wrap text-slate-300">{post.description}</p>
        <div className="mt-5 flex items-center gap-3">
          <div
            className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-slate-950"
            style={{ background: post.author.accent }}
          >
            {post.author.avatar}
          </div>
          <div>
            <p className="text-sm">{post.author.name}</p>
            <p className="text-xs text-slate-500">{post.author.major}</p>
          </div>
        </div>
      </article>

      <section>
        <h2 className="font-display text-2xl">{post.answers.length} solutions</h2>
        <div className="mt-4 space-y-3">
          {post.answers.map((a) => (
            <div
              key={a.id}
              className={`rounded-3xl border p-5 ${
                a.accepted
                  ? "border-emerald-400/40 bg-emerald-400/10"
                  : "border-white/10 bg-black/25"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-slate-950"
                    style={{ background: a.author.accent }}
                  >
                    {a.author.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{a.author.name}</p>
                    <p className="text-xs text-slate-500">Lv {a.author.level} · {a.author.xp} XP</p>
                  </div>
                </div>
                {a.accepted && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-200">
                    <CheckCircle2 size={14} /> Accepted
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">{a.body}</p>
              {post.isMine && !post.acceptedAnswerId && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => accept(a.id)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-fuchsia-400 px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  <Sparkles size={15} /> Accept Solution
                </button>
              )}
            </div>
          ))}
          {post.answers.length === 0 && (
            <p className="rounded-3xl border border-dashed border-white/15 p-6 text-sm text-slate-500">
              No solutions yet. First helpful write-up can claim the bounty.
            </p>
          )}
        </div>
      </section>

      {!post.isMine && !post.acceptedAnswerId && (
        <form onSubmit={submitAnswer} className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <label className="text-sm text-slate-400">Your solution</label>
          <textarea
            required
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-sm outline-none focus:border-cyan-300/50"
            placeholder="Walk them through it. Specific beats vague."
          />
          <button
            disabled={busy}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
          >
            <Send size={14} /> Submit answer
          </button>
        </form>
      )}
    </div>
  );
}
