import { LeadForm } from "@/components/LeadForm";
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
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card glow p-8">
              <div className="badge">What is already inside</div>
              <h2 className="section-title mt-4">A SaaS base positioned to be sold, not just demoed</h2>
              <div className="mt-6 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                {[
                  "Real workspace company configuration",
                  "Configurable niche",
                  "Default language + supported languages",
                  "Dynamic destination / intent capture",
                  "Lead persistence by workspace",
                  "Follow-up queue + process API",
                  "WhatsApp webhook base",
                  "Workspace integrations",
                  "Stripe billing foundation",
                  "Next 14 + React 18 compatible stack"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="card glow p-8">
              <div className="badge">What still depends on your accounts</div>
              <h2 className="section-title mt-4">External credentials and deployment configuration</h2>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p>• Supabase credentials and schema execution</p>
                <p>• WhatsApp Cloud API credentials</p>
                <p>• Meta credentials for Instagram/Facebook</p>
                <p>• Stripe credentials and webhook secret</p>
                <p>• Cron hitting /api/queue/process</p>
              </div>
            </div>
          </div>
        </Shell>
      </section>

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
                <p>1. Deploy on Vercel and connect Supabase.</p>
                <p>2. Run supabase/schema.sql.</p>
                <p>3. Fill .env.local based on .env.example.</p>
                <p>4. Configure workspace identity, niche, languages and channel integrations.</p>
                <p>5. Add a cron for /api/queue/process and start charging setup + SaaS.</p>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-6">
              <p className="text-sm font-medium text-white">Recommended launch offer</p>
              <p className="mt-3 text-slate-300">
                “We install your AI lead recovery operator, connect your channels and activate follow-up automation.”
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
