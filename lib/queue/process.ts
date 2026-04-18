import { createSupabaseAdminClient } from "@/lib/supabase";

type ProcessQueueResult = {
  processed: number;
  items: Array<{
    id: string;
    lead_id: string | null;
    phone: string | null;
    message: string | null;
    send_at: string | null;
    link: string;
  }>;
};

export async function processQueueBatch(limit = 10): Promise<ProcessQueueResult> {
  const supabase = createSupabaseAdminClient();
  const now = new Date().toISOString();

  const { data: items, error } = await supabase
    .from("follow_ups")
    .select("*")
    .eq("sent", false)
    .lte("send_at", now)
    .order("send_at", { ascending: true })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  const processed: ProcessQueueResult["items"] = [];

  for (const item of items || []) {
    const digits = String(item.phone || "").replace(/\D/g, "");
    const link = `https://wa.me/55${digits}?text=${encodeURIComponent(
      item.message || ""
    )}`;

    const { error: updateError } = await supabase
      .from("follow_ups")
      .update({ sent: true })
      .eq("id", item.id);

    if (!updateError) {
      processed.push({
        id: item.id,
        lead_id: item.lead_id ?? null,
        phone: item.phone ?? null,
        message: item.message ?? null,
        send_at: item.send_at ?? null,
        link
      });
    }
  }

  return {
    processed: processed.length,
    items: processed
  };
}
