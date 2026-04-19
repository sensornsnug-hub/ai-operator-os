import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { sendWhatsAppMessage } from "../../../lib/whatsapp";

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseAdminClient();
    const body = await req.json();

    const workspace_id = String(body.workspace_id || "").trim();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();

    if (!workspace_id || !name || !phone) {
      return NextResponse.json(
        { error: "workspace_id, name e phone são obrigatórios" },
        { status: 400 }
      );
    }

    const normalizedPhone = phone.replace(/\D/g, "");

    if (!normalizedPhone) {
      return NextResponse.json(
        { error: "Telefone inválido" },
        { status: 400 }
      );
    }

    console.log("Criando lead...");
    console.log("workspace_id:", workspace_id);
    console.log("name:", name);
    console.log("phone original:", phone);
    console.log("phone normalizado:", normalizedPhone);

    const { data: integration, error: integrationError } = await supabase
      .from("whatsapp_integrations")
      .select("access_token, phone_number_id, workspace_id")
      .eq("workspace_id", workspace_id)
      .maybeSingle();

    if (integrationError) {
      console.error(
        "Erro ao buscar integração WhatsApp:",
        integrationError.message
      );
    }

    console.log("Integração encontrada:", integration);

    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        workspace_id,
        name,
        phone: normalizedPhone,
        message,
      })
      .select()
      .single();

    if (leadError) {
      console.error("Erro ao salvar lead:", leadError.message);

      return NextResponse.json(
        { error: leadError.message },
        { status: 500 }
      );
    }

    console.log("Lead salvo com sucesso:", lead);

    try {
      if (
        integration?.access_token &&
        integration?.phone_number_id &&
        lead?.phone
      ) {
        console.log("Tentando enviar mensagem automática para:", lead.phone);

        const whatsappResult = await sendWhatsAppMessage({
          phoneNumberId: integration.phone_number_id,
          accessToken: integration.access_token,
          to: lead.phone,
          message:
            "Olá! Recebemos seu contato e em breve vamos te responder. Se quiser, já pode enviar sua dúvida por aqui.",
        });

        console.log("Mensagem automática enviada com sucesso:", whatsappResult);
      } else {
        console.error(
          "Integração WhatsApp ausente ou incompleta para o workspace:",
          workspace_id
        );
      }
    } catch (whatsError) {
      console.error("Erro ao enviar mensagem automática:", whatsError);
    }

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Erro geral ao criar lead:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
