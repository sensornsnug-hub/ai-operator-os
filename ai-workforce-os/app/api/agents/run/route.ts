import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { agentTemplates } from "@/lib/mock-data";
import { completeAgentTask } from "@/lib/ai/provider-registry";

const bodySchema = z.object({
  agentId: z.string(),
  input: z.string().min(2)
});

export async function POST(request: NextRequest) {
  try {
    const body = bodySchema.parse(await request.json());
    const agent = agentTemplates.find((item) => item.id === body.agentId);

    if (!agent) {
      return NextResponse.json({ error: "Agent not found." }, { status: 404 });
    }

    const result = await completeAgentTask(agent, body.input);
    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 400 }
    );
  }
}
