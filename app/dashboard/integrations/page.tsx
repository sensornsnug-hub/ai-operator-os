import { IntegrationsGrid } from "@/components/dashboard/integrations-grid";
import { Topbar } from "@/components/ui/topbar";

export default function IntegrationsPage() {
  return (
    <div className="py-4">
      <Topbar
        title="Workspace integrations"
        subtitle="Connect channels, storage, billing and provider credentials per workspace for real operation."
      />
      <IntegrationsGrid />

      <div className="card glow mt-4 p-6">
        <h2 className="text-lg font-semibold text-white">Missing to operate for real</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Supabase credentials",
            "WhatsApp Cloud API credentials",
            "Meta Instagram/Facebook credentials",
            "Stripe credentials + webhook"
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
