import { getIntegrationStatuses } from "@/lib/integrations/status";

export function IntegrationsGrid() {
  const integrations = getIntegrationStatuses();

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {integrations.map((item) => (
        <div key={item.name} className="card glow p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                item.status === "configured"
                  ? "bg-emerald-500/10 text-emerald-300"
                  : item.status === "partial"
                    ? "bg-amber-500/10 text-amber-300"
                    : "bg-rose-500/10 text-rose-300"
              }`}
            >
              {item.status}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-400">{item.description}</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              {item.workspaceScoped ? "Per workspace" : "Platform-wide"}
            </p>
            <p className="mt-2 text-sm text-slate-300">Required fields: {item.fields.join(", ")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
