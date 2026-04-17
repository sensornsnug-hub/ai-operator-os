import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chunkText } from "@/lib/knowledge/chunker";

const bodySchema = z.object({
  content: z.string().min(50),
  sourceName: z.string().min(2)
});

export async function POST(request: NextRequest) {
  try {
    const body = bodySchema.parse(await request.json());
    const chunks = chunkText(body.content);

    return NextResponse.json({
      data: {
        sourceName: body.sourceName,
        chunkCount: chunks.length,
        preview: chunks.slice(0, 3)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 400 }
    );
  }
}
