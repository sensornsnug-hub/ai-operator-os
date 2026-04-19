import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseAdminClient();
    const formData = await req.formData();

    const workspace_id = String(formData.get("workspace_id") || "");
    const company_name = String(formData.get("company_name") || "");
    const business_phone = String(formData.get("business_phone") || "");
    const phone_number_id = String(formData.get("phone_number_id") || "");
    const access_token = String(formData.get("access_token") || "");

    if (!workspace_id) {
      return NextResponse.json(
        { error: "workspace_id é obrigatório" },
        { status: 400 }
      );
    }

    const payload = {
      workspace_id,
      company_name,
      business_phone,
      phone_number_id,
      access_token,
      is_connected: true,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("whatsapp_integrations")
      .upsert(payload, {
        onConflict: "workspace_id",
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.redirect(
      new URL("/dashboard/settings/whatsapp?success=connected", req.url),
      303
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unexpected server error.",
      },
      { status: 500 }
    );
  }
}
