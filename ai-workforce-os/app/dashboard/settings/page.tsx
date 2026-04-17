import { Topbar } from "@/components/ui/topbar";

export default function SettingsPage() {
  return (
    <div className="py-4">
      <Topbar
        title="Settings"
        subtitle="Manage brand, workspace, access control and deployment parameters."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card glow p-6">
          <label className="mb-2 block text-sm text-slate-300">Workspace name</label>
          <input className="input" defaultValue="AI Workforce OS" />
          <label className="mb-2 mt-4 block text-sm text-slate-300">Support email</label>
          <input className="input" defaultValue="support@example.com" />
        </div>
        <div className="card glow p-6">
          <label className="mb-2 block text-sm text-slate-300">Primary brand color</label>
          <input className="input" defaultValue="#6366F1" />
          <label className="mb-2 mt-4 block text-sm text-slate-300">Default locale</label>
          <input className="input" defaultValue="pt-BR" />
        </div>
      </div>
    </div>
  );
}
