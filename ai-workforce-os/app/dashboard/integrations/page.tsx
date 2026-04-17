import { IntegrationsGrid } from "@/components/dashboard/integrations-grid";
import { Topbar } from "@/components/ui/topbar";

export default function IntegrationsPage() {
  return (
    <div className="py-4">
      <Topbar
        title="Integrations"
        subtitle="Connect model providers, channels, payment processors and your favorite tools."
      />
      <IntegrationsGrid />
    </div>
  );
}
