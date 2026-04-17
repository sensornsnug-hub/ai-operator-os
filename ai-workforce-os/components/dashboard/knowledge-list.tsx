import { knowledgeSources } from "@/lib/mock-data";

export function KnowledgeList() {
  return (
    <div className="space-y-3">
      {knowledgeSources.map((source) => (
        <div key={source.id} className="card glow p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-medium text-white">{source.name}</h3>
              <p className="mt-1 text-sm text-slate-400">
                {source.kind.toUpperCase()} • {source.chunks} chunks
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                source.status === "ready"
                  ? "bg-emerald-500/10 text-emerald-300"
                  : source.status === "syncing"
                    ? "bg-amber-500/10 text-amber-300"
                    : "bg-rose-500/10 text-rose-300"
              }`}
            >
              {source.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
