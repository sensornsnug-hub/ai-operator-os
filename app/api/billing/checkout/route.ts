import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json({
    ok: true,
    mode: "stub",
    message: "Stripe checkout session base created. Add your Stripe credentials and replace this stub with the real SDK call.",
    requestedPlan: body.planCode || "starter"
  });
}
