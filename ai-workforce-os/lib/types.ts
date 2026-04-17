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
  channel: "site" | "whatsapp" | "instagram" | "email";
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
