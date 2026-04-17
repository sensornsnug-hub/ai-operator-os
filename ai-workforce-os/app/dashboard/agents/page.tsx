import { AgentsGrid } from "@/components/dashboard/agents-grid";
import { Topbar } from "@/components/ui/topbar";

export default function AgentsPage() {
  return (
    <div className="py-4">
      <Topbar
        title="Agent Studio"
        subtitle="Deploy specialized AI workers for sales, operations, content and internal knowledge."
      />
      <AgentsGrid />
    </div>
  );
}
