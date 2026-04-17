import { KnowledgeList } from "@/components/dashboard/knowledge-list";
import { Topbar } from "@/components/ui/topbar";

export default function KnowledgePage() {
  return (
    <div className="py-4">
      <Topbar
        title="Knowledge Brain"
        subtitle="Upload the context your agents need to think and produce better outputs."
      />
      <div className="mb-6 card glow p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Paste new business context</label>
            <textarea
              className="input min-h-36"
              placeholder="Paste pricing rules, sales script, FAQs, product details or SOPs..."
            />
          </div>
          <button className="btn-primary h-12">Create chunks</button>
        </div>
      </div>
      <KnowledgeList />
    </div>
  );
}
