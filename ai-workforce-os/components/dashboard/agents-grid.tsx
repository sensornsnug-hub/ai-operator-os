import { agentTemplates } from "@/lib/mock-data";
import { AgentCard } from "@/components/ui/agent-card";

export function AgentsGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {agentTemplates.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
