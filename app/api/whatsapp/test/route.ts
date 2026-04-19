import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseAdminClient();
    const formData = await req.formData();

    const workspace_id = String(formData.get("workspace_id") || "");

    const { data: integration, error } = await supabase
      .from("whatsapp_integrations")
      .select("*")
      .eq("workspace_id", workspace_id)
      .maybeSingle();

    if (error || !integration) {
      return NextResponse.json(
        { error: "Integração não encontrada." },
        { status: 400 }
      );
    }

    // COLOQUE AQUI O NÚMERO EXATO QUE ESTÁ AUTORIZADO NA META
    const to = "5575992212864";

    const response = await fetch(
      `https://graph.facebook.com/v25.0/${integration.phone_number_id}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${integration.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "template",
          template: {
            name: "hello_world",
            language: {
              code: "en_US",
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: 500 });
    }

    return NextResponse.redirect(
      new URL("/dashboard/settings/whatsapp?success=test-sent", req.url),
      303
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Erro inesperado.",
      },
      { status: 500 }
    );
  }
}
