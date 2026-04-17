import { NextResponse } from "next/server";
import { agentTemplates } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: agentTemplates });
}
