import { Sparkles } from "lucide-react";
import { AgentTemplate } from "@/lib/types";

export function AgentCard({ agent }: { agent: AgentTemplate }) {
  return (
    <div className="card glow p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="badge">{agent.provider}</div>
          <h3 className="mt-4 text-xl font-semibold">{agent.name}</h3>
          <p className="mt-2 text-sm text-slate-400">{agent.description}</p>
        </div>
        <Sparkles className="h-5 w-5 text-brand-300" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {agent.capabilities.map((item) => (
          <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
            {item.replaceAll("_", " ")}
          </span>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Expected outcome</p>
        <p className="mt-2 text-sm text-slate-200">{agent.outcome}</p>
      </div>
    </div>
  );
}
