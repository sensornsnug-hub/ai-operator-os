import { createSupabaseAdminClient } from "@/lib/supabase";

export default async function WhatsAppSettingsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    success?: string;
  }>;
}) {
  const supabase = createSupabaseAdminClient();
  const params = searchParams ? await searchParams : undefined;

  const workspace_id = "ws_demo_001";

  const { data: integration } = await supabase
    .from("whatsapp_integrations")
    .select("*")
    .eq("workspace_id", workspace_id)
    .maybeSingle();

  const hasSavedToken = Boolean(integration?.access_token);

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-semibold">Configuração do WhatsApp</h1>

        <div className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6">
          {params?.success === "connected" && (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
              Integração salva com sucesso.
            </div>
          )}

          {params?.success === "test-sent" && (
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-300">
              Mensagem de teste enviada com sucesso.
            </div>
          )}

          <div>
            <p className="text-sm text-slate-400">Status</p>
            <p className="text-lg">
              {integration?.is_connected ? (
                <span className="text-green-400">Conectado</span>
              ) : (
                <span className="text-red-400">Não conectado</span>
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Número conectado</p>
            <p className="text-lg">{integration?.business_phone || "-"}</p>
          </div>

          <form
            action="/api/whatsapp/connect"
            method="POST"
            className="space-y-4"
          >
            <input type="hidden" name="workspace_id" value={workspace_id} />

            <div>
              <label className="text-sm text-slate-400">Nome da empresa</label>
              <input
                name="company_name"
                defaultValue={integration?.company_name || ""}
                className="mt-1 w-full rounded border border-white/10 bg-slate-800 p-2"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Número do WhatsApp (com DDD)
              </label>
              <input
                name="business_phone"
                defaultValue={integration?.business_phone || ""}
                placeholder="75992212864"
                className="mt-1 w-full rounded border border-white/10 bg-slate-800 p-2"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Phone Number ID (Meta)
              </label>
              <input
                name="phone_number_id"
                defaultValue={integration?.phone_number_id || ""}
                className="mt-1 w-full rounded border border-white/10 bg-slate-800 p-2"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Access Token (Meta)
              </label>
              <input
                type="password"
                name="access_token"
                defaultValue=""
                placeholder={
                  hasSavedToken
                    ? "Token já salvo. Cole outro apenas se quiser substituir."
                    : "Cole o Access Token da Meta"
                }
                className="mt-1 w-full rounded border border-white/10 bg-slate-800 p-2"
              />
              <p className="mt-1 text-xs text-slate-500">
                {hasSavedToken
                  ? "Já existe um token salvo no banco. Deixe em branco para manter o atual."
                  : "Cole aqui o token da Meta para conectar o número."}
              </p>
            </div>

            <button
              type="submit"
              className="rounded bg-green-500 px-4 py-2 font-medium text-black"
            >
              Salvar / Conectar
            </button>
          </form>

          {integration?.is_connected && (
            <form action="/api/whatsapp/test" method="POST" className="pt-4">
              <input type="hidden" name="workspace_id" value={workspace_id} />
              <button type="submit" className="text-blue-400 underline">
                Enviar mensagem de teste
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
