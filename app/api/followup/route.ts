import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseAdminClient();
    const formData = await req.formData();

    const lead_id = String(formData.get("lead_id") || "");
    const phone = String(formData.get("phone") || "");

    if (!lead_id || !phone) {
      return NextResponse.redirect(new URL("/dashboard/leads?error=missing-data", req.url));
    }

    const { error } = await supabase.from("follow_ups").insert([
      {
        lead_id,
        phone,
        message: "Olá! Estou entrando em contato para dar continuidade.",
        send_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        sent: false
      }
    ]);

    if (error) {
      console.error("Erro ao salvar follow-up:", error.message);
      return NextResponse.redirect(new URL("/dashboard/leads?error=save-failed", req.url));
    }

    return NextResponse.redirect(new URL("/dashboard/leads?success=followup-created", req.url));
  } catch (error) {
    console.error("Erro inesperado no follow-up:", error);
    return NextResponse.redirect(new URL("/dashboard/leads?error=unexpected", req.url));
  }
}
