import { createSupabaseAdminClient } from "@/lib/supabase";

export default async function WhatsAppSettingsPage() {
  const supabase = createSupabaseAdminClient();

  // ⚠️ depois vamos trocar isso por workspace real
  const workspace_id = "ws_demo_001";

  const { data: integration } = await supabase
    .from("whatsapp_integrations")
    .select("*")
    .eq("workspace_id", workspace_id)
    .single();

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold mb-6">
          Configurações do WhatsApp
        </h1>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-6">
          
          {/* STATUS */}
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

          {/* NÚMERO */}
          <div>
            <p className="text-sm text-slate-400">Número conectado</p>
            <p className="text-lg">
              {integration?.business_phone || "-"}
            </p>
          </div>

          {/* FORM DE CONEXÃO (SIMPLES POR ENQUANTO) */}
          <form
            action="/api/whatsapp/connect"
            method="POST"
            className="space-y-4"
          >
            <input
              type="hidden"
              name="workspace_id"
              value={workspace_id}
            />

            <div>
              <label className="text-sm text-slate-400">
                Nome da empresa
              </label>
              <input
                name="company_name"
                className="w-full mt-1 p-2 rounded bg-slate-800 border border-white/10"
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
                className="w-full mt-1 p-2 rounded bg-slate-800 border border-white/10"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Phone Number ID (Meta)
              </label>
              <input
                name="phone_number_id"
                className="w-full mt-1 p-2 rounded bg-slate-800 border border-white/10"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Access Token (Meta)
              </label>
              <input
                name="access_token"
                className="w-full mt-1 p-2 rounded bg-slate-800 border border-white/10"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-black px-4 py-2 rounded font-medium"
            >
              Salvar / Conectar
            </button>
          </form>

          {/* TESTE */}
          {integration?.is_connected && (
            <form
              action="/api/whatsapp/test"
              method="POST"
              className="pt-4"
            >
              <input
                type="hidden"
                name="workspace_id"
                value={workspace_id}
              />

              <button
                type="submit"
                className="text-blue-400 underline"
              >
                Enviar mensagem de teste
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
