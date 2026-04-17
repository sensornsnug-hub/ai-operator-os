import { Topbar } from "@/components/ui/topbar";
import { billingPlans } from "@/lib/mock-data";

export default function BillingPage() {
  return (
    <div className="py-4">
      <Topbar
        title="Billing"
        subtitle="Stripe-ready pricing foundation for recurring subscriptions, setup fees and workspace plans."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {billingPlans.map((plan) => (
          <div key={plan.code} className="card glow p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{plan.code}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{plan.name}</h2>
            <p className="mt-3 text-xl text-brand-200">{plan.price}</p>
            <p className="mt-4 text-sm text-slate-400">{plan.description}</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Base endpoint available at <span className="text-white">/api/billing/checkout</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
