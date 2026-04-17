import { Bot, DatabaseZap, LayoutDashboard, Workflow } from "lucide-react";
import { Shell } from "@/components/ui/shell";

const items = [
  {
    icon: Bot,
    title: "Agent Studio",
    description: "Create specialized digital workers with prompts, goals, tools, guardrails and KPIs."
  },
  {
    icon: DatabaseZap,
    title: "Knowledge Brain",
    description: "Turn PDFs, URLs, docs and scripts into retrieval-ready business context."
  },
  {
    icon: Workflow,
    title: "Automation Engine",
    description: "Activate workflows for no-reply leads, inbound requests, proposal follow-ups and support escalation."
  },
  {
    icon: LayoutDashboard,
    title: "Operator Dashboard",
    description: "Manage revenue, activity, usage, billing and conversations from one clean interface."
  }
];

export function FeaturesSection() {
  return (
    <section id="architecture" className="py-8 md:py-12">
      <Shell>
        <div className="max-w-2xl">
          <div className="badge">Core product</div>
          <h2 className="section-title mt-4">A practical operating system for AI-led execution</h2>
          <p className="mt-4 text-slate-400">
            This is positioned as a business platform, not a generic chatbot. That makes pricing, retention and
            expansion much stronger.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="card glow p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
