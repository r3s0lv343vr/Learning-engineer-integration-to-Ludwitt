import { NextResponse } from "next/server";
import type { AreaId } from "@/lib/content/areas";
import { readUploadBytes } from "@/lib/library-catalog";

const AREA_IDS: AreaId[] = [
  "coral-ledger-bay",
  "brick-exchange",
  "signal-quay",
  "mandate-highlands",
];

function contentTypeFor(name: string) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".pptx"))
    return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  if (lower.endsWith(".ppt")) return "application/vnd.ms-powerpoint";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  return "application/octet-stream";
}

/** Serve an admin-uploaded library file for one city. */
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ areaId: string; fileName: string }> },
) {
  const { areaId, fileName } = await ctx.params;
  if (!AREA_IDS.includes(areaId as AreaId)) {
    return NextResponse.json({ error: "invalid_area" }, { status: 400 });
  }
  const bytes = await readUploadBytes(areaId as AreaId, fileName);
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
