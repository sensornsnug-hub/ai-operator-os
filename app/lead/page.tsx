"use client";

import { useState } from "react";

export default function LeadPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspace_id: "ws_demo_001",
          name,
          phone,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Erro ao enviar lead");
        return;
      }

      alert("Lead enviado com sucesso!");
      setName("");
      setPhone("");
      setMessage("");
      console.log("Resposta da API:", data);
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
      alert("Erro ao enviar lead");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-2">Teste de Lead</h1>
        <p className="text-slate-400 mb-6">
          Preencha o formulário para testar o envio automático no WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Nome</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Telefone</label>
            <input
              type="text"
              placeholder="5571999999999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Mensagem</label>
            <textarea
              placeholder="Quero mais informações"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none min-h-[120px]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar lead"}
          </button>
        </form>
      </div>
    </main>
  );
}
