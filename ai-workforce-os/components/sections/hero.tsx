import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Shell } from "@/components/ui/shell";

const proof = [
  "Multi-agent architecture",
  "Knowledge base + workflows",
  "Ready for Stripe + Supabase + WhatsApp",
  "Mobile-first dashboard"
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <Shell>
        <div className="card grid-bg glow overflow-hidden rounded-[2rem] border-white/10 px-6 py-6 md:px-10 md:py-10">
          <div className="flex items-center justify-between gap-4">
            <Logo />
            <Link className="badge" href="#pricing">
              Launch-ready SaaS
            </Link>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="badge">From leaked agent architectures to a sellable operating system</div>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                Build an <span className="gradient-text">AI workforce</span> your clients can actually pay for.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-300">
                Sell a modern platform where businesses create revenue agents, operational copilots and content systems
                with one dashboard.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard" className="btn-primary">
                  Open product demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="#architecture" className="btn-secondary">
                  View architecture
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {proof.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Revenue recovery control room</span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                    Live
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Agent action</p>
                    <p className="mt-2 text-sm text-white">Triggered WhatsApp recovery flow for 18 silent leads.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Knowledge result</p>
                    <p className="mt-2 text-sm text-white">Used pricing playbook, objections list and FAQ data.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Projected value</p>
                    <p className="mt-2 text-3xl font-semibold text-white">R$ 8.240</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
