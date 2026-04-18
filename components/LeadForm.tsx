"use client";

import { useState } from "react";

type FeedbackState = {
  type: "success" | "error";
  message: string;
} | null;

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  return value;
}

export function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      phone: phone.replace(/\D/g, ""),
      email: formData.get("email"),
      source: "site",
      status: "new",
      valueEstimate: 0
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || "Erro ao enviar lead.");
      }

      setFeedback({
        type: "success",
        message: "Recebemos seus dados. Entraremos em contato em breve."
      });

      form.reset();
      setPhone("");
    } catch (err) {
      console.error(err);

      setFeedback({
        type: "error",
        message: "Não foi possível enviar agora. Tente novamente em instantes."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur md:p-8">
          <div className="mb-6 text-center">
            <div className="inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-1 text-sm text-brand-100">
              Solicite uma demonstração
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
           Ative um operador de vendas com IA no seu negócio
           </h2>

           <p className="mt-3 text-sm text-slate-300 md:text-base">
          Captura, responde e faz follow-up automático com seus clientes — 24h por dia.
           </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              name="name"
              placeholder="Seu nome"
              required
              className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-white placeholder:text-slate-400 outline-none transition focus:border-brand-400/50"
            />

            <input
              name="phone"
              placeholder="Seu telefone"
              required
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-white placeholder:text-slate-400 outline-none transition focus:border-brand-400/50"
            />

            <input
              name="email"
              type="email"
              placeholder="Seu email"
              required
              className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-white placeholder:text-slate-400 outline-none transition focus:border-brand-400/50"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-14 rounded-2xl bg-brand-500 px-6 text-base font-medium text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Enviando..." : "Quero ativar agora"}
            </button>
            <p className="mt-2 text-center text-xs text-slate-400">
            Sem spam. Resposta em até 5 minutos.
            </p>

            {feedback && (
              <div
                className={`mt-2 rounded-2xl border px-4 py-3 text-sm ${
                  feedback.type === "success"
                    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                    : "border-red-400/20 bg-red-500/10 text-red-200"
                }`}
              >
                {feedback.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
