import { Bell, Search } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <label className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input className="input w-72 pl-10" placeholder="Search agents, leads, workflows..." />
        </label>
        <button className="btn-secondary h-12 w-12 rounded-2xl p-0">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
