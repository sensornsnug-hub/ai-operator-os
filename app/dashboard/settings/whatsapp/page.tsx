import { createSupabaseAdminClient } from "@/lib/supabase";

export default async function WhatsAppSettingsPage() {
  const supabase = createSupabaseAdminClient();

  const workspace_id = "ws_demo_001";

  const { data: integration } = await supabase
    .from("whatsapp_integrations")
    .select("*")
    .eq("workspace_id", workspace_id)
    .single();

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-semibold">
          Configurações do WhatsApp
        </h1>

        <div className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6">
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
                placeholder="75999999999"
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
                className="mt-1 w-full rounded border border-white/10 bg-slate-800 p-2"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Access Token (Meta)
              </label>
              <input
                name="access_token"
                className="mt-1 w-full rounded border border-white/10 bg-slate-800 p-2"
              />
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
