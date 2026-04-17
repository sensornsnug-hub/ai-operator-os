export function chunkText(source: string, size = 1200, overlap = 120): string[] {
  const clean = source.replace(/\s+/g, " ").trim();
  if (!clean) return [];

  const chunks: string[] = [];
  let start = 0;

  while (start < clean.length) {
    const end = Math.min(start + size, clean.length);
    chunks.push(clean.slice(start, end));
    start = end - overlap;
    if (start < 0) start = 0;
    if (end === clean.length) break;
  }

  return chunks;
}
