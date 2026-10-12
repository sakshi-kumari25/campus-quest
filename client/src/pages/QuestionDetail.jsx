import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";

export default function QuestionDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  const defaultThreads = {
    "1": {
      id: "1",
      tag: "THERMODYNAMICS",
      xpReward: 30,
      acceptedAnswerId: null,
      isMine: false,
      title: "Why is ΔU zero for isothermal expansion of an ideal gas?",
      description:
        "Stuck on the first-law write-up. If the gas does work, where does that energy come from if internal energy does not change?",
      author: {
        name: "Vaibhav",
        avatar: "VB",
        accent: "#a78bfa",
        major: "B.Tech × Mechanical Engineering",
      },
      answers: [
        {
          id: "ans_0",
          body:
            "Since temperature is constant for an isothermal process, the internal energy of an ideal gas depends solely on temperature, making delta U zero. The heat supplied exactly equals work done.",
          accepted: false,
          author: {
            name: "Sakshi Kumari",
            avatar: "SK",
            accent: "#22d3ee",
            level: 3,
            xp: 250,
          },
        },
      ],
    },

    forum_1: {
      id: "forum_1",
      tag: "THERMODYNAMICS",
      xpReward: 30,
      acceptedAnswerId: null,
      isMine: false,
      title: "Why is ΔU zero for isothermal expansion of an ideal gas?",
      description:
        "Stuck on the first-law write-up. If the gas does work, where does that energy come from if internal energy does not change?",
      author: {
        name: "Vaibhav",
        avatar: "VB",
        accent: "#a78bfa",
        major: "B.Tech × Mechanical Engineering",
      },
      answers: [
        {
          id: "ans_0",
          body:
            "Since temperature is constant for an isothermal process, the internal energy of an ideal gas depends solely on temperature, making delta U zero. The heat supplied exactly equals work done.",
          accepted: false,
          author: {
            name: "Sakshi Kumari",
            avatar: "SK",
            accent: "#22d3ee",
            level: 3,
            xp: 250,
          },
        },
      ],
    },

    "2": {
      id: "2",
      tag: "OPERATING SYSTEMS",
      xpReward: 40,
      acceptedAnswerId: "ans_1",
      isMine: true,
      title: "SJF vs Round Robin: when does starvation actually happen?",
      description:
        "I get that SJF picks the shortest ready job, but I am not sure how a stream of short jobs can starve a long one in a real lab scheduler. Looking for a walkthrough with a tiny Gantt-chart example.",
      author: {
        name: "Sakshi Kumari (You)",
        avatar: "SK",
        accent: "#22d3ee",
        major: "B.Tech × Computer Science",
      },
      answers: [
        {
          id: "ans_1",
          body:
            "If new short processes keep entering the ready queue continuously, the scheduler will repeatedly pick them over the long process, indefinitely postponing its execution. This is starvation.",
          accepted: true,
          author: {
            name: "Shraddha",
            avatar: "SR",
            accent: "#fbbf24",
            level: 5,
            xp: 512,
          },
        },
      ],
    },

    forum_2: {
      id: "forum_2",
      tag: "OPERATING SYSTEMS",
      xpReward: 40,
      acceptedAnswerId: "ans_1",
      isMine: true,
      title: "SJF vs Round Robin: when does starvation actually happen?",
      description:
        "I get that SJF picks the shortest ready job, but I am not sure how a stream of short jobs can starve a long one in a real lab scheduler. Looking for a walkthrough with a tiny Gantt-chart example.",
      author: {
        name: "Sakshi Kumari (You)",
        avatar: "SK",
        accent: "#22d3ee",
        major: "B.Tech × Computer Science",
      },
      answers: [
        {
          id: "ans_1",
          body:
            "If new short processes keep entering the ready queue continuously, the scheduler will repeatedly pick them over the long process, indefinitely postponing its execution. This is starvation.",
          accepted: true,
          author: {
            name: "Shraddha",
            avatar: "SR",
            accent: "#fbbf24",
            level: 5,
            xp: 512,
          },
        },
      ],
    },
  };

  useEffect(() => {
    const activeId = String(id);
    setPost(defaultThreads[activeId] || defaultThreads["1"]);
    setBody("");
  }, [id]);

  async function submitAnswer(e) {
    e.preventDefault();

    if (!body.trim() || busy) return;

    setBusy(true);

    try {
      const newAnswer = {
        id: `ans_${Date.now()}`,
        body: body.trim(),
        accepted: false,
        author: {
          name: "Sakshi Kumari (You)",
          avatar: "SK",
          accent: "#22d3ee",
          level: 3,
          xp: 250,
        },
      };

      setPost((prev) => ({
        ...prev,
        answers: [...(prev.answers || []), newAnswer],
      }));

      setBody("");
    } finally {
      setBusy(false);
    }
  }

  if (!post) {
    return (
      <p className="p-6 text-left text-zinc-500 dark:text-slate-400">
        Loading thread…
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-4xl animate-in space-y-6 p-6 text-left text-zinc-900 dark:text-slate-100">
      {/* Back to Forum */}
      <Link
        to="/forum"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Forum
      </Link>

      {/* Discussion Topic */}
      <article className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-violet-500/10 px-2.5 py-1 font-semibold text-violet-600 dark:text-violet-300">
            {post.tag}
          </span>

          <span className="rounded-full bg-amber-400/15 px-2.5 py-1 font-semibold text-amber-600 dark:text-amber-200">
            {post.xpReward} XP bounty
          </span>
        </div>

        <h1 className="font-display text-3xl font-black text-zinc-950 dark:text-white">
          {post.title}
        </h1>

        <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {post.description}
        </p>

        <div className="mt-5 flex items-center gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800/65">
          <div
            className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white shadow-sm"
            style={{
              background: post.author?.accent || "#6d28d9",
            }}
          >
            {post.author?.avatar || "US"}
          </div>

          <div>
            <p className="text-sm font-bold text-zinc-950 dark:text-white">
              {post.author?.name}
            </p>

            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              {post.author?.major}
            </p>
          </div>
        </div>
      </article>

      {/* Solutions Area */}
      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold uppercase tracking-wider text-zinc-400">
          Solutions ({post.answers?.length || 0})
        </h2>

        <div className="space-y-3">
          {post.answers?.map((a) => (
            <div
              key={a.id}
              className={`rounded-3xl border p-5 transition-all ${
                a.accepted
                  ? "border-emerald-300 bg-emerald-50/40 shadow-xs dark:border-emerald-900/60 dark:bg-emerald-950/10"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white shadow-sm"
                    style={{
                      background: a.author?.accent || "#6d28d9",
                    }}
                  >
                    {a.author?.avatar || "US"}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-zinc-950 dark:text-white">
                      {a.author?.name}
                    </p>

                    {a.author?.level && (
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">
                        Lv {a.author.level} · {a.author.xp} XP
                      </p>
                    )}
                  </div>
                </div>

                {a.accepted && (
                  <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-100 px-2.5 py-1 text-[10px] font-black text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <CheckCircle2 size={12} />
                    Accepted Solution
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {a.body}
              </p>
            </div>
          ))}

          {(!post.answers || post.answers.length === 0) && (
            <p className="rounded-3xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-400 dark:border-zinc-700">
              No solutions yet. First helpful write-up can claim the bounty.
            </p>
          )}
        </div>
      </section>

      {/* Answer Input */}
      {!post.isMine && (
        <form
          onSubmit={submitAnswer}
          className="mt-4 flex items-center gap-3 rounded-3xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
        >
          <input
            type="text"
            value={body}
            disabled={busy}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a helpful peer solution to claim this bounty..."
            className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-900 focus:border-violet-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
          />

          <button
            type="submit"
            disabled={busy || !body.trim()}
            className="rounded-xl bg-violet-600 p-2.5 text-white transition-all hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </form>
      )}
    </div>
  );
}
