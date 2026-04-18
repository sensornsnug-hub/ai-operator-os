import { createSupabaseAdminClient } from "@/lib/supabase";
import { LeadStatusSelect } from "@/components/LeadStatusSelect";

type Lead = {
  id: string;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  source?: string | null;
  status?: string | null;
  value_estimate?: number | null;
  created_at?: string | null;
};

function formatWhatsappLink(phone: string | null | undefined) {
  const digits = String(phone || "").replace(/\D/g, "");
  return `https://wa.me/55${digits}`;
}

function formatCurrency(value: number | null | undefined) {
  if (!value) return "-";
  return `R$ ${value}`;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  return new Date(value).toLocaleString("pt-BR");
}

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
                  (leads as Lead[]).map((lead) => (
                    <tr key={lead.id} className="border-t border-white/10">
                      <td className="px-4 py-3">{lead.name || "-"}</td>
                      <td className="px-4 py-3">{lead.phone || "-"}</td>
                      <td className="px-4 py-3">{lead.email || "-"}</td>
                      <td className="px-4 py-3">{lead.source || "-"}</td>

                      <td className="px-4 py-3">
                        <LeadStatusSelect
                          id={lead.id}
                          status={lead.status || "new"}
                        />
                      </td>

                      <td className="px-4 py-3">
                        {formatCurrency(lead.value_estimate)}
                      </td>

                      <td className="px-4 py-3">
                        {formatDate(lead.created_at)}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-2">
                          <a
                            href={formatWhatsappLink(lead.phone)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-400 underline"
                          >
                            WhatsApp
                          </a>

                          <form action="/api/followup" method="POST">
                            <input type="hidden" name="lead_id" value={lead.id} />
                            <input
                              type="hidden"
                              name="phone"
                              value={lead.phone || ""}
                            />
                            <button
                              type="submit"
                              className="text-blue-400 underline text-left"
                            >
                              Follow-up
                            </button>
                          </form>
                        </div>
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
