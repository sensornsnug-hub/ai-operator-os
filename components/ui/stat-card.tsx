import { UsageStat } from "@/lib/types";

export function StatCard({ stat }: { stat: UsageStat }) {
  return (
    <div className="card glow p-5">
      <p className="text-sm text-slate-400">{stat.label}</p>
      <div className="mt-3 flex items-end justify-between">
        <h3 className="text-2xl font-semibold text-white">{stat.value}</h3>
        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
          {stat.change}
        </span>
      </div>
    </div>
  );
}
