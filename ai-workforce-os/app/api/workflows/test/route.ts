import { NextRequest, NextResponse } from "next/server";
import { evaluateWorkflow } from "@/lib/workflows/engine";
import { workflows } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const matches = evaluateWorkflow(
    { name: body.name || "No reply in WhatsApp", payload: body.payload || {} },
    workflows
  );

  return NextResponse.json({
    data: matches
  });
}
