import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.text();

  return NextResponse.json({
    ok: true,
    note: "Stripe webhook placeholder. Verify signature and map events before production.",
    receivedBytes: payload.length
  });
}
