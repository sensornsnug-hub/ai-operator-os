import {
  AgentTemplate,
  BillingPlan,
  Conversation,
  IntegrationStatus,
  KnowledgeSource,
  Lead,
  QueueItem,
  UsageStat,
  Workflow,
  WorkspaceProfile
} from "@/lib/types";

export const demoWorkspace: WorkspaceProfile = {
  id: "ws_demo_001",
  name: "AI Workforce OS",
  slug: "ai-workforce-os",
  niche: "Universal SaaS / AI Operations",
  companyName: "AI Workforce OS Ltda.",
  supportEmail: "support@example.com",
  defaultLocale: "pt-BR",
  supportedLocales: ["pt-BR", "en-US", "es-AR"],
  defaultDestinationLabel: "Destination",
  supportedIntentLabels: ["Buy", "Quote", "Book", "Support"],
  timezone: "America/Bahia",
  primaryColor: "#6366F1"
};

export const agentTemplates: AgentTemplate[] = [
  {
    id: "sales-recovery",
    name: "Sales Recovery Agent",
    slug: "sales-recovery",
    description: "Recovers abandoned leads, stalled conversations and silent prospects with proactive follow-up.",
    outcome: "Brings back lost revenue with multi-step recovery flows.",
    provider: "openai",
    model: "gpt-5",
    capabilities: ["chat", "sales_recovery", "lead_qualification", "task_execution"],
    starterSystemPrompt:
      "You are a revenue operator focused on recovering abandoned leads, reducing sales leakage and creating next-best-action plans.",
    isFeatured: true
  },
  {
    id: "content-engine",
    name: "Content Engine Agent",
    slug: "content-engine",
    description: "Creates offers, ads, landing pages, onboarding copy and follow-up sequences for any niche.",
    outcome: "Turns business context into production-grade content.",
    provider: "anthropic",
    model: "claude-sonnet",
    capabilities: ["chat", "content_creation", "knowledge_search"],
    starterSystemPrompt:
      "You are a conversion copywriter and content operator. Build assets that are concrete, persuasive and usable."
  },
  {
    id: "ops-copilot",
    name: "Ops Copilot Agent",
    slug: "ops-copilot",
    description: "Answers internal questions, drafts SOPs and turns business knowledge into repeatable workflows.",
    outcome: "Reduces operational chaos and speeds up execution.",
    provider: "google",
    model: "gemini-2.5-pro",
    capabilities: ["chat", "knowledge_search", "task_execution"],
    starterSystemPrompt:
      "You are an operations chief of staff. Organize work, find answers fast and propose simple execution plans."
  }
];

export const usageStats: UsageStat[] = [
  { label: "Recovered revenue", value: "R$ 24.890", change: "+18,2%" },
  { label: "Active workspaces", value: "18", change: "+5 this month" },
  { label: "Qualified leads", value: "184", change: "+31,4%" },
  { label: "Queue jobs processed", value: "3.412", change: "+11,9%" }
];

export const knowledgeSources: KnowledgeSource[] = [
  { id: "1", name: "Pricing playbook.pdf", kind: "pdf", status: "ready", chunks: 142 },
  { id: "2", name: "Offers database.csv", kind: "csv", status: "ready", chunks: 98 },
  { id: "3", name: "Onboarding SOP", kind: "manual", status: "syncing", chunks: 37 },
  { id: "4", name: "Brand site", kind: "url", status: "ready", chunks: 61 }
];

export const workflows: Workflow[] = [
  { id: "1", name: "Lead silent for 30 min", trigger: "No reply in WhatsApp", action: "Send recovery offer", active: true },
  { id: "2", name: "New form lead", trigger: "Landing page submit", action: "Qualify + book follow-up", active: true },
  { id: "3", name: "Webhook from Meta", trigger: "Instagram DM received", action: "Create lead and assign playbook", active: true }
];

export const conversations: Conversation[] = [
  { id: "1", channel: "whatsapp", contactName: "Marina Costa", lastMessage: "Can I pay later?", status: "qualified", revenuePotential: 1890 },
  { id: "2", channel: "site", contactName: "Rafael Lima", lastMessage: "I saw the offer but did not finish.", status: "open", revenuePotential: 690 },
  { id: "3", channel: "instagram", contactName: "Julia Dias", lastMessage: "Do you have plans for teams?", status: "won", revenuePotential: 3200 },
  { id: "4", channel: "facebook", contactName: "Vitor Nunes", lastMessage: "Send me the proposal again.", status: "open", revenuePotential: 5400 }
];

export const leads: Lead[] = [
  {
    id: "lead_001",
    workspaceId: demoWorkspace.id,
    name: "Carla Mendes",
    channel: "site",
    source: "Landing page",
    destination: "Premium consulting",
    intent: "Quote",
    status: "new",
    email: "carla@example.com",
    language: "pt-BR",
    valueEstimate: 1200,
    createdAt: new Date().toISOString(),
    nextFollowUpAt: new Date(Date.now() + 1000 * 60 * 30).toISOString()
  },
  {
    id: "lead_002",
    workspaceId: demoWorkspace.id,
    name: "Diego Alvarez",
    channel: "whatsapp",
    source: "WhatsApp Cloud API",
    destination: "Enterprise onboarding",
    intent: "Book",
    status: "qualified",
    phone: "+5511999999999",
    language: "es-AR",
    valueEstimate: 4900,
    createdAt: new Date().toISOString(),
    nextFollowUpAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString()
  }
];

export const queueItems: QueueItem[] = [
  {
    id: "queue_001",
    workspaceId: demoWorkspace.id,
    leadId: "lead_001",
    channel: "site",
    scheduledFor: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    status: "pending",
    attemptCount: 0,
    payload: {
      message: "Follow up with pricing recap and CTA.",
      destination: "Premium consulting",
      intent: "Quote"
    }
  },
  {
    id: "queue_002",
    workspaceId: demoWorkspace.id,
    leadId: "lead_002",
    channel: "whatsapp",
    scheduledFor: new Date(Date.now() + 1000 * 60 * 20).toISOString(),
    status: "pending",
    attemptCount: 0,
    payload: {
      message: "Send onboarding availability and payment link.",
      destination: "Enterprise onboarding",
      intent: "Book"
    }
  }
];

export const integrationStatuses: IntegrationStatus[] = [
  {
    key: "supabase",
    name: "Supabase",
    status: "partial",
    workspaceScoped: false,
    description: "Database, persistence and auth foundation.",
    fields: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]
  },
  {
    key: "whatsapp",
    name: "WhatsApp Cloud API",
    status: "missing",
    workspaceScoped: true,
    description: "Inbound and outbound WhatsApp messaging per workspace.",
    fields: ["WHATSAPP_PHONE_NUMBER_ID", "WHATSAPP_ACCESS_TOKEN", "WHATSAPP_VERIFY_TOKEN"]
  },
  {
    key: "meta",
    name: "Meta Instagram/Facebook",
    status: "missing",
    workspaceScoped: true,
    description: "Instagram and Facebook channel ingestion.",
    fields: ["META_APP_ID", "META_APP_SECRET", "META_WEBHOOK_VERIFY_TOKEN"]
  },
  {
    key: "stripe",
    name: "Stripe",
    status: "missing",
    workspaceScoped: true,
    description: "Billing, subscriptions and checkout.",
    fields: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"]
  },
  {
    key: "openai",
    name: "OpenAI",
    status: "missing",
    workspaceScoped: false,
    description: "Primary LLM provider for recovery and execution flows.",
    fields: ["OPENAI_API_KEY"]
  },
  {
    key: "webhook",
    name: "Webhook Hub",
    status: "configured",
    workspaceScoped: true,
    description: "Generic external ingestion and outbound events.",
    fields: ["none"]
  }
];

export const billingPlans: BillingPlan[] = [
  {
    code: "starter",
    name: "Starter",
    price: "R$ 297/mês",
    description: "1 workspace, lead inbox, follow-up queue and WhatsApp webhook base."
  },
  {
    code: "growth",
    name: "Growth",
    price: "R$ 997/mês",
    description: "Multiple channels, billing, advanced automations and white-label setup."
  },
  {
    code: "scale",
    name: "Scale",
    price: "Sob consulta",
    description: "Managed onboarding, multi-brand deployment and custom provider routing."
  }
];
