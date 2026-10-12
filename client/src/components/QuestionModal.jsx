import { useState } from "react";
import { X } from "lucide-react";

const TAGS = [
  "Operating Systems",
  "Thermodynamics",
  "Network Theory",
  "Mechanics of Solids",
  "DBMS",
  "Other",
];

export default function QuestionModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState(TAGS[0]);
  const [xpReward, setXpReward] = useState(25);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await onSubmit({ title, description, tag, xpReward: Number(xpReward) });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#101522] p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl">Post a question</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-white/10">
            <X size={18} />
          </button>
        </div>
        <label className="mb-3 block text-sm text-slate-400">
          Title
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2.5 text-slate-100 outline-none focus:border-cyan-300/50"
            placeholder="Where does this proof lose me?"
          />
        </label>
        <label className="mb-3 block text-sm text-slate-400">
          Description
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-3 py-2.5 text-slate-100 outline-none focus:border-cyan-300/50"
            placeholder="What you tried, where you got stuck, what a useful answer looks like."
          />
        </label>
        <div className="mb-4 grid grid-cols-2 gap-3">
          <label className="block text-sm text-slate-400">
            Subject / tag
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2.5 text-slate-100 outline-none"
            >
              {TAGS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-slate-400">
            XP reward for help
            <input
              type="number"
              min={10}
              max={200}
              value={xpReward}
              onChange={(e) => setXpReward(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2.5 text-slate-100 outline-none"
            />
          </label>
        </div>
        {error && <p className="mb-3 text-sm text-rose-300">{error}</p>}
        <button
          disabled={busy}
          className="w-full rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-400 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60"
        >
          {busy ? "Posting…" : "Drop it in the feed"}
        </button>
      </form>
    </div>
  );
}
