"use client";

import { useState } from "react";

export function LeadForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
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

      alert("Lead enviado com sucesso!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar lead.");
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
              Receba atendimento e veja como esse sistema pode operar no seu negócio
            </h2>
            <p className="mt-3 text-sm text-slate-300 md:text-base">
              Preencha seus dados e entraremos em contato para apresentar a estrutura,
              ativação e possibilidades de monetização.
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
              className="mt-2 h-14 rounded-2xl bg-brand-500 px-6 text-base font-medium text-white transition hover:bg-brand-400 disabled:opacity-70"
            >
              {loading ? "Enviando..." : "Quero atendimento"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
