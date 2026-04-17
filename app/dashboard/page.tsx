import { OverviewGrid } from "@/components/dashboard/overview-grid";
import { Topbar } from "@/components/ui/topbar";

export default function DashboardPage() {
  return (
    <div className="py-4">
      <Topbar
        title="Operator dashboard"
        subtitle="Track revenue, automations, conversations and agent performance in one place."
      />
      <OverviewGrid />
    </div>
  );
}
