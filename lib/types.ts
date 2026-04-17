export type Provider = "openai" | "anthropic" | "google" | "custom";

export type AgentCapability =
  | "chat"
  | "lead_qualification"
  | "sales_recovery"
  | "content_creation"
  | "knowledge_search"
  | "task_execution";

export type AgentTemplate = {
  id: string;
  name: string;
  slug: string;
  description: string;
  outcome: string;
  provider: Provider;
  model: string;
  capabilities: AgentCapability[];
  starterSystemPrompt: string;
  isFeatured?: boolean;
};

export type KnowledgeSource = {
  id: string;
  name: string;
  kind: "pdf" | "url" | "csv" | "notion" | "drive" | "manual";
  status: "ready" | "syncing" | "error";
  chunks: number;
};

export type Workflow = {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
};

export type Conversation = {
  id: string;
  channel: "site" | "whatsapp" | "instagram" | "facebook" | "email";
  contactName: string;
  lastMessage: string;
  status: "open" | "won" | "lost" | "qualified";
  revenuePotential: number;
};

export type UsageStat = {
  label: string;
  value: string;
  change: string;
};

export type WorkspaceProfile = {
  id: string;
  name: string;
  slug: string;
  niche: string;
  companyName: string;
  supportEmail: string;
  defaultLocale: string;
  supportedLocales: string[];
  defaultDestinationLabel: string;
  supportedIntentLabels: string[];
  timezone: string;
  primaryColor: string;
};

export type Lead = {
  id: string;
  workspaceId: string;
  name: string;
  channel: "site" | "whatsapp" | "instagram" | "facebook" | "email";
  source: string;
  destination: string;
  intent: string;
  status: "new" | "in_progress" | "qualified" | "won" | "lost";
  phone?: string;
  email?: string;
  language: string;
  valueEstimate: number;
  createdAt: string;
  nextFollowUpAt?: string;
};

export type QueueItem = {
  id: string;
  workspaceId: string;
  leadId: string;
  channel: Lead["channel"];
  scheduledFor: string;
  status: "pending" | "processing" | "sent" | "failed";
  attemptCount: number;
  payload: {
    message: string;
    destination?: string;
    intent?: string;
  };
};

export type IntegrationStatus = {
  key:
    | "supabase"
    | "whatsapp"
    | "meta"
    | "stripe"
    | "openai"
    | "webhook";
  name: string;
  description: string;
  status: "configured" | "missing" | "partial";
  workspaceScoped: boolean;
  fields: string[];
};

export type BillingPlan = {
  code: string;
  name: string;
  price: string;
  description: string;
};
