import { Check } from "lucide-react";
import { Shell } from "@/components/ui/shell";

const plans = [
  {
    name: "Starter",
    price: "R$ 197",
    description: "For solo operators validating the first use case.",
    bullets: ["3 agents", "1 knowledge workspace", "5,000 monthly actions", "Email support"]
  },
  {
    name: "Scale",
    price: "R$ 597",
    description: "For agencies and SMBs selling AI-powered operations.",
    bullets: ["10 agents", "5 workspaces", "25,000 monthly actions", "WhatsApp + webhook support"],
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For bigger teams with compliance and custom integrations.",
    bullets: ["Unlimited agents", "Advanced roles", "Private deployment option", "Priority onboarding"]
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-8 md:py-12">
      <Shell>
        <div className="max-w-2xl">
          <div className="badge">Monetization</div>
          <h2 className="section-title mt-4">Pricing that supports high-margin recurring revenue</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card glow p-6 ${plan.featured ? "border-brand-400/40 bg-brand-500/10" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                {plan.featured && <span className="badge border-brand-300/30 text-brand-100">Best margin</span>}
              </div>
              <p className="mt-4 text-4xl font-semibold">{plan.price}</p>
              <p className="mt-3 text-sm text-slate-400">{plan.description}</p>

              <div className="mt-6 space-y-3">
                {plan.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-center gap-3 text-sm text-slate-200">
                    <Check className="h-4 w-4 text-emerald-300" />
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}
