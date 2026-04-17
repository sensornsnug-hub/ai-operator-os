import { AgentTemplate, Conversation, KnowledgeSource, UsageStat, Workflow } from "@/lib/types";

export const agentTemplates: AgentTemplate[] = [
  {
    id: "sales-recovery",
    name: "Sales Recovery Agent",
    slug: "sales-recovery",
    description: "Recovers abandoned carts, cold leads and silent prospects with proactive follow-up.",
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
    description: "Creates offers, ads, landing page copy, email flows and social content from your business knowledge.",
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
    description: "Answers internal questions, drafts SOPs and turns team knowledge into repeatable workflows.",
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
  { label: "Active agents", value: "12", change: "+3 this week" },
  { label: "Qualified leads", value: "184", change: "+31,4%" },
  { label: "Automation runs", value: "3.412", change: "+11,9%" }
];

export const knowledgeSources: KnowledgeSource[] = [
  { id: "1", name: "Pricing playbook.pdf", kind: "pdf", status: "ready", chunks: 142 },
  { id: "2", name: "Offers database.csv", kind: "csv", status: "ready", chunks: 98 },
  { id: "3", name: "Sales scripts", kind: "manual", status: "syncing", chunks: 37 },
  { id: "4", name: "Brand site", kind: "url", status: "ready", chunks: 61 }
];

export const workflows: Workflow[] = [
  { id: "1", name: "Lead silent for 30 min", trigger: "No reply in WhatsApp", action: "Send recovery offer", active: true },
  { id: "2", name: "New form lead", trigger: "Landing page submit", action: "Qualify + book follow-up", active: true },
  { id: "3", name: "Negative review risk", trigger: "Conversation sentiment drops", action: "Escalate to human", active: false }
];

export const conversations: Conversation[] = [
  { id: "1", channel: "whatsapp", contactName: "Marina Costa", lastMessage: "Can I pay later?", status: "qualified", revenuePotential: 1890 },
  { id: "2", channel: "site", contactName: "Rafael Lima", lastMessage: "I saw the offer but did not finish.", status: "open", revenuePotential: 690 },
  { id: "3", channel: "instagram", contactName: "Julia Dias", lastMessage: "Do you have plans for teams?", status: "won", revenuePotential: 3200 },
  { id: "4", channel: "email", contactName: "Vitor Nunes", lastMessage: "Send me the proposal again.", status: "open", revenuePotential: 5400 }
];
