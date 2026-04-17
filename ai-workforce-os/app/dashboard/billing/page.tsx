import { Topbar } from "@/components/ui/topbar";

export default function BillingPage() {
  return (
    <div className="py-4">
      <Topbar
        title="Billing"
        subtitle="Set up recurring plans, track account value and prepare Stripe for production."
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="card glow p-6">
          <h2 className="text-lg font-semibold">Recommended pricing model</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { label: "Starter", value: "R$ 197 / mo" },
              { label: "Scale", value: "R$ 597 / mo" },
              { label: "Managed", value: "R$ 1.990+ / mo" }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-2 text-xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card glow p-6">
          <h2 className="text-lg font-semibold">Go-live checklist</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p>• Connect Stripe webhook route</p>
            <p>• Protect premium features by plan</p>
            <p>• Create upgrade prompts in dashboard</p>
            <p>• Add Portuguese and English pricing pages</p>
          </div>
        </div>
      </div>
    </div>
  );
}
