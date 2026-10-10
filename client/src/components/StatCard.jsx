export default function StatCard({ icon: Icon, label, value, hint, accent }) {
  return (
    <div className="animate-in rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div
        className="mb-4 grid h-10 w-10 place-items-center rounded-2xl"
        style={{ background: `${accent}22`, color: accent }}
      >
        <Icon size={18} />
      </div>
      <p className="text-xs tracking-widest text-slate-400 uppercase">{label}</p>
      <p className="font-display mt-1 text-3xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
