import { WorkflowsList } from "@/components/dashboard/workflows-list";
import { Topbar } from "@/components/ui/topbar";

export default function WorkflowsPage() {
  return (
    <div className="py-4">
      <Topbar
        title="Workflow Engine"
        subtitle="Trigger proactive actions based on events, customer behavior and lead inactivity."
      />
      <div className="mb-6 card glow p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <input className="input" placeholder="Trigger event" />
          <input className="input" placeholder="Action" />
          <button className="btn-primary">Create workflow</button>
        </div>
      </div>
      <WorkflowsList />
    </div>
  );
}
