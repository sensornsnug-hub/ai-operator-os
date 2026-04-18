"use client";

import { useState } from "react";

type Props = {
  id: string;
  status: string;
};

export function LeadStatusSelect({ id, status }: Props) {
  const [value, setValue] = useState(status);
  const [loading, setLoading] = useState(false);

  async function handleChange(nextStatus: string) {
    setValue(nextStatus);
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          status: nextStatus
        })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || "Erro ao atualizar status.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={value}
      disabled={loading}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white disabled:opacity-60"
    >
      <option value="new">Novo</option>
      <option value="contacted">Contatado</option>
      <option value="closed">Fechado</option>
    </select>
  );
}
