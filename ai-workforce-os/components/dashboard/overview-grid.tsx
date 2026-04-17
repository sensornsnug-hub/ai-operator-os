import { conversations, usageStats } from "@/lib/mock-data";
import { formatMoney } from "@/lib/utils";
import { StatCard } from "@/components/ui/stat-card";

export function OverviewGrid() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {usageStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="card glow p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pipeline radar</h2>
            <span className="text-sm text-slate-400">Last 7 days</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Open deals", value: "48" },
              { label: "Recovery flows", value: "22" },
              { label: "Human escalations", value: "5" }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 h-72 rounded-3xl border border-dashed border-white/10 bg-gradient-to-b from-brand-500/10 to-transparent p-6">
            <div className="flex h-full items-end gap-3">
              {[32, 48, 44, 58, 63, 71, 68].map((height, index) => (
                <div key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-brand-600 to-cyan-400" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="card glow p-6">
          <h2 className="text-lg font-semibold">Highest value conversations</h2>
          <div className="mt-5 space-y-3">
            {conversations.slice(0, 3).map((conversation) => (
              <div key={conversation.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{conversation.contactName}</p>
                    <p className="mt-1 text-sm text-slate-400">{conversation.lastMessage}</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-300">
                    {formatMoney(conversation.revenuePotential)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
