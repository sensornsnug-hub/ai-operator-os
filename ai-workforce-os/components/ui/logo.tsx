export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-cyan-400 text-base font-black text-slate-950">
        AW
      </div>
      <div>
        <p className="text-sm font-semibold tracking-wide text-white">AI Workforce OS</p>
        <p className="text-xs text-slate-400">Agentic revenue & operations platform</p>
      </div>
    </div>
  );
}
