import OpenAI from "openai";
import { AgentTemplate, Provider } from "@/lib/types";

type Message = { role: "system" | "user" | "assistant"; content: string };

export type AICompletionInput = {
  provider: Provider;
  model: string;
  messages: Message[];
  temperature?: number;
};

export type AICompletionOutput = {
  text: string;
  provider: Provider;
  model: string;
};

function createOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }
  return new OpenAI({ apiKey });
}

async function completeWithOpenAI(input: AICompletionInput): Promise<AICompletionOutput> {
  const client = createOpenAIClient();
  const response = await client.responses.create({
    model: input.model,
    input: input.messages.map((message) => ({
      role: message.role,
      content: [{ type: "input_text", text: message.content }]
    })),
    temperature: input.temperature ?? 0.7
  });

  const text = response.output_text?.trim() || "No output produced.";
  return { text, provider: "openai", model: input.model };
}

async function completeWithFallback(input: AICompletionInput): Promise<AICompletionOutput> {
  const system = input.messages.find((message) => message.role === "system")?.content ?? "";
  const user = input.messages.findLast((message) => message.role === "user")?.content ?? "";

  return {
    text: [
      "Fallback provider response",
      `Provider: ${input.provider}`,
      `Model: ${input.model}`,
      "",
      "System intent:",
      system.slice(0, 240),
      "",
      "User request:",
      user.slice(0, 640)
    ].join("\n"),
    provider: input.provider,
    model: input.model
  };
}

export async function completeAgentTask(agent: AgentTemplate, userInput: string) {
  const input: AICompletionInput = {
    provider: agent.provider,
    model: resolveModel(agent),
    messages: [
      { role: "system", content: agent.starterSystemPrompt },
      { role: "user", content: userInput }
    ]
  };

  if (agent.provider === "openai") {
    return completeWithOpenAI(input);
  }

  return completeWithFallback(input);
}

function resolveModel(agent: AgentTemplate) {
  if (agent.provider === "openai") return process.env.OPENAI_MODEL || agent.model;
  if (agent.provider === "anthropic") return process.env.ANTHROPIC_MODEL || agent.model;
  if (agent.provider === "google") return process.env.GOOGLE_MODEL || agent.model;
  return agent.model;
}
