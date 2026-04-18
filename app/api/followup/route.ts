import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseAdminClient();

    const formData = await req.formData();

    const lead_id = formData.get("lead_id");
    const phone = formData.get("phone");

    const { error } = await supabase.from("follow_ups").insert({
      lead_id,
      phone,
      message: "Olá! Estou entrando em contato para dar continuidade.",
      send_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      sent: false
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.redirect(new URL("/dashboard/leads", req.url));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected server error." },
      { status: 500 }
    );
  }
}
