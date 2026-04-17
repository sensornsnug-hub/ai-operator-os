import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { demoWorkspace } from "@/lib/mock-data";

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected server error." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const supabase = createSupabaseAdminClient();

    const payload = {
      workspace_id: body.workspaceId || demoWorkspace.id,
      name: body.name || "Unnamed lead",
      channel: body.channel || body.source || "site",
      source: body.source || "site",
      destination: body.destination || "General",
      intent: body.intent || "Quote",
      status: body.status || "new",
      phone: body.phone || null,
      email: body.email || null,
      language: body.language || "pt-BR",
      value_estimate: Number(body.valueEstimate || 0),
      payload: body.payload && typeof body.payload === "object" ? body.payload : {}
    };

    const { data, error } = await supabase.from("leads").insert([payload]).select();

    if (error) {
      return NextResponse.json({ error: error.message, payload }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected server error." },
      { status: 500 }
    );
  }
}
