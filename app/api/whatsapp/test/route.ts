import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseAdminClient();
    const formData = await req.formData();

    const workspace_id = String(formData.get("workspace_id") || "").trim();

    console.log("BODY RECEBIDO /api/whatsapp/test:", {
      workspace_id,
    });

    if (!workspace_id) {
      return NextResponse.json(
        { error: "workspace_id é obrigatório." },
        { status: 400 }
      );
    }

    console.log("BUSCANDO INTEGRAÇÃO DO WORKSPACE:", workspace_id);

    const { data: integration, error } = await supabase
      .from("whatsapp_integrations")
      .select("*")
      .eq("workspace_id", workspace_id)
      .maybeSingle();

    console.log("INTEGRAÇÃO LIDA /api/whatsapp/test:", {
      integration: integration
        ? {
            ...integration,
            access_token_preview: integration.access_token
              ? `${String(integration.access_token).slice(0, 12)}...`
              : "",
          }
        : null,
      error,
    });

    if (error) {
      return NextResponse.json(
        {
          error: "Erro ao buscar integração no banco.",
          details: error,
          debug: {
            workspace_id,
          },
        },
        { status: 500 }
      );
    }

    if (!integration) {
      return NextResponse.json(
        {
          error: "Integração não encontrada.",
          debug: {
            workspace_id,
          },
        },
        { status: 400 }
      );
    }

    if (!integration.phone_number_id) {
      return NextResponse.json(
        {
          error: "phone_number_id não encontrado na integração.",
          debug: {
            workspace_id,
            integration,
          },
        },
        { status: 400 }
      );
    }

    if (!integration.access_token) {
      return NextResponse.json(
        {
          error: "access_token não encontrado na integração.",
          debug: {
            workspace_id,
            integration,
          },
        },
        { status: 400 }
      );
    }

    const to = "5575992212864";

    console.log("ENVIANDO TESTE WHATSAPP:", {
      workspace_id,
      phone_number_id: integration.phone_number_id,
      business_phone: integration.business_phone,
      access_token_preview: `${String(integration.access_token).slice(0, 12)}...`,
      to,
    });

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
        cache: "no-store",
      }
    );

    const data = await response.json();

    console.log("RESPOSTA META /api/whatsapp/test:", {
      ok: response.ok,
      status: response.status,
      data,
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data,
          debug: {
            workspace_id,
            phone_number_id: integration.phone_number_id,
            business_phone: integration.business_phone,
            token_preview: `${String(integration.access_token).slice(0, 12)}...`,
            to,
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/dashboard/settings/whatsapp?success=test-sent", req.url),
      303
    );
  } catch (error) {
    console.error("ERRO GERAL /api/whatsapp/test:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Erro inesperado.",
      },
      { status: 500 }
    );
  }
}
