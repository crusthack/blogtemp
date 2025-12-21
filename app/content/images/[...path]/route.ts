export const runtime = "nodejs";
import fs from "fs";
import path from "path";
import { getContentType, resolveCaseInsensitive } from "@/lib/imageRouteUtils";

export async function GET(_req: Request, { params }: { params: { path: string[] } }) {
  const baseDir = path.join(process.cwd(), "content", "images");
  const filePath = await resolveCaseInsensitive(baseDir, params.path);
  if (!filePath) {
    return new Response("Not Found", { status: 404 });
  }
  let data: Buffer;
  try {
    data = await fs.promises.readFile(filePath);
  } catch {
    return new Response("Not Found", { status: 404 });
  }
  const contentType = getContentType(filePath);
  const arrayBuffer = new ArrayBuffer(data.byteLength);
  const view = new Uint8Array(arrayBuffer);
  view.set(data);
  return new Response(arrayBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
