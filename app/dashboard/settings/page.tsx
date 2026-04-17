import { Topbar } from "@/components/ui/topbar";
import { demoWorkspace } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <div className="py-4">
      <Topbar
        title="Workspace settings"
        subtitle="Configure company identity, niche, language stack and dynamic destination/intent labels per workspace."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card glow p-6">
          <h2 className="text-lg font-semibold text-white">Company identity</h2>
          <label className="mb-2 mt-5 block text-sm text-slate-300">Workspace name</label>
          <input className="input" defaultValue={demoWorkspace.name} />
          <label className="mb-2 mt-4 block text-sm text-slate-300">Company name</label>
          <input className="input" defaultValue={demoWorkspace.companyName} />
          <label className="mb-2 mt-4 block text-sm text-slate-300">Support email</label>
          <input className="input" defaultValue={demoWorkspace.supportEmail} />
          <label className="mb-2 mt-4 block text-sm text-slate-300">Niche</label>
          <input className="input" defaultValue={demoWorkspace.niche} />
        </div>
        <div className="card glow p-6">
          <h2 className="text-lg font-semibold text-white">Language + intent model</h2>
          <label className="mb-2 mt-5 block text-sm text-slate-300">Primary brand color</label>
          <input className="input" defaultValue={demoWorkspace.primaryColor} />
          <label className="mb-2 mt-4 block text-sm text-slate-300">Default locale</label>
          <input className="input" defaultValue={demoWorkspace.defaultLocale} />
          <label className="mb-2 mt-4 block text-sm text-slate-300">Supported locales</label>
          <input className="input" defaultValue={demoWorkspace.supportedLocales.join(", ")} />
          <label className="mb-2 mt-4 block text-sm text-slate-300">Dynamic destination label</label>
          <input className="input" defaultValue={demoWorkspace.defaultDestinationLabel} />
          <label className="mb-2 mt-4 block text-sm text-slate-300">Intent labels</label>
          <input className="input" defaultValue={demoWorkspace.supportedIntentLabels.join(", ")} />
        </div>
      </div>

      <div className="card glow mt-4 p-6">
        <h2 className="text-lg font-semibold text-white">What this page now supports</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Real company config per workspace",
            "Configurable niche",
            "Default locale + supported locales",
            "Dynamic destination / intent fields"
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
