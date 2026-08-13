import { NextResponse } from "next/server";
import { getModule } from "@/lib/content/modules";
import { readPortalUploadBytes } from "@/lib/portal-catalog";

function contentTypeFor(name: string) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".mp4")) return "video/mp4";
  if (lower.endsWith(".webm")) return "video/webm";
  if (lower.endsWith(".mov")) return "video/quicktime";
  if (lower.endsWith(".txt")) return "text/plain";
  return "application/octet-stream";
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ moduleId: string; fileName: string }> },
) {
  const { moduleId, fileName } = await ctx.params;
  if (!getModule(moduleId)) {
    return NextResponse.json({ error: "invalid_module" }, { status: 400 });
  }
  const bytes = await readPortalUploadBytes(moduleId, fileName);
  if (!bytes) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const downloadName = fileName.replace(/^\d+-/, "") || fileName;
  return new NextResponse(new Uint8Array(bytes), {
    status: 200,
    headers: {
      "Content-Type": contentTypeFor(fileName),
      "Content-Disposition": `inline; filename="${downloadName}"`,
      "Cache-Control": "private, max-age=60",
    },
  });
}
