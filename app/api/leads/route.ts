import { NextRequest, NextResponse } from "next/server";
import { leads, demoWorkspace } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const workspaceId = request.nextUrl.searchParams.get("workspaceId") || demoWorkspace.id;
  return NextResponse.json({
    data: leads.filter((lead) => lead.workspaceId === workspaceId)
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const lead = {
    id: `lead_${Date.now()}`,
    workspaceId: body.workspaceId || demoWorkspace.id,
    name: body.name || "Unnamed lead",
    channel: body.channel || "site",
    source: body.source || "API",
    destination: body.destination || "General",
    intent: body.intent || "Buy",
    status: "new" as const,
    phone: body.phone,
    email: body.email,
    language: body.language || demoWorkspace.defaultLocale,
    valueEstimate: Number(body.valueEstimate || 0),
    createdAt: new Date().toISOString(),
    nextFollowUpAt: body.nextFollowUpAt
  };

  leads.unshift(lead);

  return NextResponse.json({ data: lead }, { status: 201 });
}
