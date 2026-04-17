"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, BookOpen, Cable, LayoutDashboard, MessageSquare, Settings2, Workflow, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/agents", label: "Agents", icon: Bot },
  { href: "/dashboard/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/dashboard/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/dashboard/workflows", label: "Workflows", icon: Workflow },
  { href: "/dashboard/integrations", label: "Integrations", icon: Cable },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings2 }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="card glow sticky top-4 h-[calc(100vh-2rem)] w-full max-w-[280px] p-4">
      <Logo />
      <nav className="mt-8 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition",
                active ? "bg-brand-500 text-white" : "text-slate-300 hover:bg-white/5"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-brand-400/20 bg-brand-500/10 p-4">
        <p className="text-sm font-semibold text-white">Scale mode</p>
        <p className="mt-1 text-sm text-slate-300">
          Add Stripe, WhatsApp, and your production knowledge base to start selling.
        </p>
      </div>
    </aside>
  );
}
