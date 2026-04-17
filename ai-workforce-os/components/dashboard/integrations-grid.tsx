const integrations = [
  { name: "OpenAI", status: "ready", description: "Primary reasoning and generation provider." },
  { name: "Anthropic", status: "ready", description: "Alternative model provider for content and long-context tasks." },
  { name: "Google AI", status: "ready", description: "Additional provider for multimodal and research workflows." },
  { name: "WhatsApp API", status: "pending", description: "Customer-facing messaging channel." },
  { name: "Stripe", status: "pending", description: "Billing and recurring subscriptions." },
  { name: "Webhook Hub", status: "ready", description: "Use external apps and no-code tools." }
];

export function IntegrationsGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {integrations.map((item) => (
        <div key={item.name} className="card glow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                item.status === "ready" ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"
              }`}
            >
              {item.status}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-400">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
