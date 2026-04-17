import { ConversationsTable } from "@/components/dashboard/conversations-table";
import { Topbar } from "@/components/ui/topbar";

export default function ConversationsPage() {
  return (
    <div className="py-4">
      <Topbar
        title="Conversations"
        subtitle="Monitor active conversations, recover silent leads and route escalations to humans."
      />
      <ConversationsTable />
    </div>
  );
}
