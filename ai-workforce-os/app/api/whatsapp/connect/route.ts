import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const supabase = createSupabaseAdminClient();
  const formData = await req.formData();

  const workspace_id = formData.get("workspace_id");
  const company_name = formData.get("company_name");
  const business_phone = formData.get("business_phone");
  const phone_number_id = formData.get("phone_number_id");
  const access_token = formData.get("access_token");

  const { error } = await supabase
    .from("whatsapp_integrations")
    .upsert({
      workspace_id,
      company_name,
      business_phone,
      phone_number_id,
      access_token,
      is_connected: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(
    new URL("/dashboard/settings/whatsapp", req.url)
  );
}
