import { NextRequest, NextResponse } from "next/server";
import { leads, demoWorkspace } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("hub.mode");
  const token = request.nextUrl.searchParams.get("hub.verify_token");
  const challenge = request.nextUrl.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge || "ok", { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const message = payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  const contact = payload?.entry?.[0]?.changes?.[0]?.value?.contacts?.[0];

  if (message) {
    leads.unshift({
      id: `lead_${Date.now()}`,
      workspaceId: demoWorkspace.id,
      name: contact?.profile?.name || "WhatsApp lead",
      channel: "whatsapp",
      source: "WhatsApp webhook",
      destination: "General",
      intent: "Support",
      status: "new",
      phone: contact?.wa_id,
      language: demoWorkspace.defaultLocale,
      valueEstimate: 0,
      createdAt: new Date().toISOString(),
      nextFollowUpAt: new Date(Date.now() + 1000 * 60 * 30).toISOString()
    });
  }

  return NextResponse.json({ received: true, hasMessage: Boolean(message) });
}
