import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const verifyToken = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (verifyToken && verifyToken === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge || "verified");
  }

  return new NextResponse("forbidden", { status: 403 });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json({
    ok: true,
    note: "WhatsApp webhook placeholder. Map inbound messages to conversations table.",
    body
  });
}
