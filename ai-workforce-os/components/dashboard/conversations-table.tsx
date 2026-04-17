import { conversations } from "@/lib/mock-data";
import { formatMoney } from "@/lib/utils";

export function ConversationsTable() {
  return (
    <div className="card glow overflow-hidden">
      <div className="border-b border-white/10 px-6 py-4">
        <h2 className="text-lg font-semibold">Conversations</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Channel</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Value</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conversation) => (
              <tr key={conversation.id} className="border-t border-white/5 text-sm text-slate-200">
                <td className="px-6 py-4 font-medium text-white">{conversation.contactName}</td>
                <td className="px-6 py-4 capitalize">{conversation.channel}</td>
                <td className="px-6 py-4 capitalize">{conversation.status}</td>
                <td className="px-6 py-4 text-slate-400">{conversation.lastMessage}</td>
                <td className="px-6 py-4 font-semibold text-emerald-300">{formatMoney(conversation.revenuePotential)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
