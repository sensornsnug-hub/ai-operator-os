"use client";

import { useState } from "react";

export function LeadForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

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

      console.log(result);
      alert("Lead enviado com sucesso!");

      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <input name="name" placeholder="Seu nome" required className="w-full p-3 rounded bg-white text-black" />
      <input name="phone" placeholder="Seu telefone" required className="w-full p-3 rounded bg-white text-black" />
      <input name="email" placeholder="Seu email" required className="w-full p-3 rounded bg-white text-black" />

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded">
        {loading ? "Enviando..." : "Quero atendimento"}
      </button>
    </form>
  );
}
