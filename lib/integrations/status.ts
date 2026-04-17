import { integrationStatuses } from "@/lib/mock-data";
import { integrationHealth } from "@/lib/env";

export function getIntegrationStatuses() {
  const health = integrationHealth();

  return integrationStatuses.map((item) => {
    if (item.key === "webhook") {
      return item;
    }

    const isOk = health[item.key as keyof typeof health];

    return {
      ...item,
      status: isOk ? "configured" : item.key === "supabase" ? "partial" : "missing"
    };
  });
}
