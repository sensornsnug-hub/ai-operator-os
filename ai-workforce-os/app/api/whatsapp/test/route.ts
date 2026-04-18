import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const supabase = createSupabaseAdminClient();
  const formData = await req.formData();

  const workspace_id = formData.get("workspace_id");

  const { data: integration } = await supabase
    .from("whatsapp_integrations")
    .select("*")
    .eq("workspace_id", workspace_id)
    .single();

  if (!integration) {
    return NextResponse.json({ error: "Não conectado" }, { status: 400 });
  }

  const response = await fetch(
    `https://graph.facebook.com/v23.0/${integration.phone_number_id}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${integration.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: integration.business_phone,
        type: "text",
        text: {
          body: "Teste de conexão do sistema 🚀",
        },
      }),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}
