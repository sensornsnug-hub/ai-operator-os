import { workflows } from "@/lib/mock-data";

export function WorkflowsList() {
  return (
    <div className="space-y-3">
      {workflows.map((workflow) => (
        <div key={workflow.id} className="card glow p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-medium text-white">{workflow.name}</h3>
              <p className="mt-1 text-sm text-slate-400">
                Trigger: {workflow.trigger} → Action: {workflow.action}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                workflow.active ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-500/10 text-slate-300"
              }`}
            >
              {workflow.active ? "active" : "paused"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
