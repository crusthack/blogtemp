import fs from "fs";
import path from "path";

export function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

export async function resolveCaseInsensitive(
  baseDir: string,
  segments: string[] | string | undefined
): Promise<string | null> {
  // Normalize segments input
  const parts: string[] = Array.isArray(segments)
    ? segments
    : typeof segments === "string"
    ? segments.split("/").filter(Boolean)
    : [];
  if (parts.length === 0) return null;

  let current = baseDir;
  for (let seg of parts) {
    // Decode percent-encoding and sanitize separators
    try {
      seg = decodeURIComponent(seg);
    } catch {
      // If decoding fails, keep original
    }
    if (!seg || seg === "." || seg === ".." || /[\\/]/.test(seg)) {
      return null;
    }
    let entries: string[];
    try {
      entries = await fs.promises.readdir(current);
    } catch {
      return null;
    }
    const match = entries.find((e) => e.toLowerCase() === seg.toLowerCase());
    if (!match) return null;
    current = path.join(current, match);
  }
  return current;
}
