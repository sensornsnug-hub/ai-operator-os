import { queueItems } from "@/lib/mock-data";

export function processQueueBatch(limit = 10) {
  const now = Date.now();

  const due = queueItems
    .filter((item) => item.status === "pending" && new Date(item.scheduledFor).getTime() <= now)
    .slice(0, limit)
    .map((item) => ({
      ...item,
      status: "sent" as const,
      attemptCount: item.attemptCount + 1,
      processedAt: new Date().toISOString()
    }));

  return {
    processed: due.length,
    items: due
  };
}
