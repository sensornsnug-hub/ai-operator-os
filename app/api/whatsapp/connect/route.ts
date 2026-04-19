import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseAdminClient();
    const formData = await req.formData();

    const workspace_id = String(formData.get("workspace_id") || "").trim();
    const company_name = String(formData.get("company_name") || "").trim();
    const business_phone = normalizePhone(
      String(formData.get("business_phone") || "")
    );
    const phone_number_id = String(
      formData.get("phone_number_id") || ""
    ).trim();
    const access_token = String(formData.get("access_token") || "").trim();
    const remove_token = String(formData.get("remove_token") || "").trim() === "true";

    console.log("BODY RECEBIDO /api/whatsapp/connect:", {
      workspace_id,
      company_name,
      business_phone,
      phone_number_id,
      access_token_preview: access_token ? `${access_token.slice(0, 12)}...` : "",
      remove_token,
    });

    if (!workspace_id) {
      return NextResponse.json(
        { error: "workspace_id é obrigatório" },
        { status: 400 }
      );
    }

    if (!business_phone) {
      return NextResponse.json(
        { error: "business_phone é obrigatório" },
        { status: 400 }
      );
    }

    if (!phone_number_id) {
      return NextResponse.json(
        { error: "phone_number_id é obrigatório" },
        { status: 400 }
      );
    }

    const { data: existingIntegration, error: existingError } = await supabase
      .from("whatsapp_integrations")
      .select("*")
      .eq("workspace_id", workspace_id)
      .maybeSingle();

    if (existingError) {
      return NextResponse.json(
        { error: existingError.message },
        { status: 500 }
      );
    }

    if (remove_token) {
      const { error } = await supabase
        .from("whatsapp_integrations")
        .upsert(
          {
            workspace_id,
            company_name,
            business_phone,
            phone_number_id,
            access_token: null,
            is_connected: false,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "workspace_id",
          }
        );

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.redirect(
        new URL("/dashboard/settings/whatsapp?success=connected", req.url),
        303
      );
    }

    const final_access_token = access_token || existingIntegration?.access_token || "";

    if (!final_access_token) {
      return NextResponse.json(
        { error: "access_token é obrigatório" },
        { status: 400 }
      );
    }

    const payload = {
      workspace_id,
      company_name,
      business_phone,
      phone_number_id,
      access_token: final_access_token,
      is_connected: true,
      updated_at: new Date().toISOString(),
    };

    console.log("PAYLOAD UPSERT whatsapp_integrations:", {
      ...payload,
      access_token: `${final_access_token.slice(0, 12)}...`,
    });

    const { data, error } = await supabase
      .from("whatsapp_integrations")
      .upsert(payload, {
        onConflict: "workspace_id",
      })
      .select()
      .single();

    console.log("RESULTADO SAVE whatsapp_integrations:", {
      data: data
        ? {
            ...data,
            access_token_preview: data.access_token
              ? `${String(data.access_token).slice(0, 12)}...`
              : "",
          }
        : null,
      error,
    });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          details: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/dashboard/settings/whatsapp?success=connected", req.url),
      303
    );
  } catch (error) {
    console.error("ERRO GERAL /api/whatsapp/connect:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unexpected server error.",
      },
      { status: 500 }
    );
  }
}
