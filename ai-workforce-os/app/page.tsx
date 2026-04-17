import Link from "next/link";
import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { PricingSection } from "@/components/sections/pricing";
import { agentTemplates } from "@/lib/mock-data";
import { AgentCard } from "@/components/ui/agent-card";
import { Shell } from "@/components/ui/shell";

export default function HomePage() {
  return (
    <main className="pb-16">
      <HeroSection />
      <FeaturesSection />

      <section className="py-8 md:py-12">
        <Shell>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="badge">What you will sell</div>
              <h2 className="section-title mt-4">Template agents with direct business outcomes</h2>
            </div>
            <Link href="/dashboard/agents" className="btn-secondary">
              Open agent catalog
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {agentTemplates.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </Shell>
      </section>

      <PricingSection />

      <section className="py-8 md:py-12">
        <Shell>
          <div className="card glow grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="badge">Execution</div>
              <h2 className="section-title mt-4">How to put this in action</h2>
              <div className="mt-6 space-y-4 text-slate-300">
                <p>1. Install the platform on Vercel + Supabase.</p>
                <p>2. Connect providers and create your first recovery agent.</p>
                <p>3. Upload your playbooks, offers, objections and product data.</p>
                <p>4. Activate WhatsApp and web lead flows.</p>
                <p>5. Start charging monthly for access plus onboarding.</p>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-6">
              <p className="text-sm font-medium text-white">Recommended launch offer</p>
              <p className="mt-3 text-slate-300">
                “We install your AI sales recovery operator in 48 hours and connect it to your lead channels.”
              </p>
              <div className="mt-6 rounded-2xl border border-brand-400/20 bg-brand-500/10 p-5">
                <p className="text-sm text-brand-100">Monetization stack</p>
                <p className="mt-2 text-sm text-slate-200">Setup fee + monthly SaaS + premium managed service.</p>
              </div>
            </div>
          </div>
        </Shell>
      </section>
    </main>
  );
}
