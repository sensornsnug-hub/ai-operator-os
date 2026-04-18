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

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const supabase = createSupabaseAdminClient();

    if (!body.id) {
      return NextResponse.json({ error: "Lead id is required." }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};

    if (body.status) updateData.status = body.status;
    if (body.name !== undefined) updateData.name = body.name;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.source !== undefined) updateData.source = body.source;
    if (body.channel !== undefined) updateData.channel = body.channel;
    if (body.destination !== undefined) updateData.destination = body.destination;
    if (body.intent !== undefined) updateData.intent = body.intent;
    if (body.language !== undefined) updateData.language = body.language;
    if (body.valueEstimate !== undefined) {
      updateData.value_estimate = Number(body.valueEstimate || 0);
    }

    const { data, error } = await supabase
      .from("leads")
      .update(updateData)
      .eq("id", body.id)
      .select();

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
