import { createSupabaseAdminClient } from "@/lib/supabase";

export default async function LeadsPage() {
  const supabase = createSupabaseAdminClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6 text-red-400">
        Erro ao carregar leads: {error.message}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Leads</h1>
          <p className="mt-2 text-sm text-slate-400">
            Lista de leads capturados pelo sistema.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-300">
                <tr>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Telefone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Origem</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Valor</th>
                  <th className="px-4 py-3">Criado em</th>
                  <th className="px-4 py-3">Ações</th>
                </tr>
              </thead>

              <tbody>
                {!leads || leads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-6 text-center text-slate-400"
                    >
                      Nenhum lead encontrado.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-t border-white/10">
                      <td className="px-4 py-3">{lead.name || "-"}</td>
                      <td className="px-4 py-3">{lead.phone || "-"}</td>
                      <td className="px-4 py-3">{lead.email || "-"}</td>
                      <td className="px-4 py-3">{lead.source || "-"}</td>
                      <td className="px-4 py-3">{lead.status || "-"}</td>

                      <td className="px-4 py-3">
                        {lead.value_estimate
                          ? `R$ ${lead.value_estimate}`
                          : "-"}
                      </td>

                      <td className="px-4 py-3">
                        {lead.created_at
                          ? new Date(lead.created_at).toLocaleString("pt-BR")
                          : "-"}
                      </td>

                      <td className="px-4 py-3">
                        <a
                          href={`https://wa.me/55${String(
                            lead.phone || ""
                          ).replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-400 underline"
                        >
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
