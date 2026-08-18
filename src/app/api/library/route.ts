import { NextRequest, NextResponse } from "next/server";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import type { AreaId } from "@/lib/content/areas";
import {
  addLibraryLink,
  addLibraryUpload,
  defaultClassroomRole,
  inferKindFromFileName,
  listLibraryItems,
  removeLibraryItem,
  type ClassroomRole,
  type LibraryItemKind,
  type LinkPlatform,
} from "@/lib/library-catalog";

const AREA_IDS: AreaId[] = [
  "coral-ledger-bay",
  "brick-exchange",
  "signal-quay",
  "mandate-highlands",
];

function isAreaId(value: string): value is AreaId {
  return AREA_IDS.includes(value as AreaId);
}

function parseClassroomRole(
  raw: string,
  kind: LibraryItemKind,
): ClassroomRole {
  if (raw === "notes" || raw === "deck" || raw === "link" || raw === "none") {
    return raw;
  }
  return defaultClassroomRole(kind);
}

/** Learners may list shelf items; mutations require library administrator. */
export async function GET(req: NextRequest) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const areaId = req.nextUrl.searchParams.get("areaId") ?? "";
  if (!isAreaId(areaId)) {
    return NextResponse.json({ error: "invalid_area" }, { status: 400 });
  }
  const items = await listLibraryItems(areaId);
  const admin = await isLibraryAdmin(session);
  return NextResponse.json({ items, admin });
}

export async function POST(req: NextRequest) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!(await isLibraryAdmin(session))) {
    return NextResponse.json({ error: "admin_required" }, { status: 403 });
  }

  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const areaId = String(form.get("areaId") ?? "");
    if (!isAreaId(areaId)) {
      return NextResponse.json({ error: "invalid_area" }, { status: 400 });
    }
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file_required" }, { status: 400 });
    }
    const title = String(form.get("title") ?? file.name);
    const description = String(form.get("description") ?? "");
    const kindRaw = String(form.get("kind") ?? "");
    const kind = (kindRaw || inferKindFromFileName(file.name)) as LibraryItemKind;
    const classroomRole = parseClassroomRole(
      String(form.get("classroomRole") ?? ""),
      kind,
    );
    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.length > 25 * 1024 * 1024) {
      return NextResponse.json({ error: "file_too_large" }, { status: 413 });
    }
    try {
      const item = await addLibraryUpload({
        areaId,
        title,
        description,
        kind,
        fileName: file.name,
        bytes,
        classroomRole,
      });
      return NextResponse.json({ item });
    } catch (err) {
      console.error("library_upload_failed", err);
      return NextResponse.json(
        { error: "upload_failed", detail: err instanceof Error ? err.message : "write_error" },
        { status: 500 },
      );
    }
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const action = String(body.action ?? "link");

  if (action === "remove") {
    const areaId = String(body.areaId ?? "");
    if (!isAreaId(areaId)) {
      return NextResponse.json({ error: "invalid_area" }, { status: 400 });
    }
    const ok = await removeLibraryItem(areaId, String(body.id ?? ""));
    return NextResponse.json({ ok });
  }

  const areaId = String(body.areaId ?? "");
  if (!isAreaId(areaId)) {
    return NextResponse.json({ error: "invalid_area" }, { status: 400 });
  }
  const url = String(body.url ?? "").trim();
  if (!/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }
  const item = await addLibraryLink({
    areaId,
    title: String(body.title ?? "Reading link"),
    description: body.description ? String(body.description) : undefined,
    url,
    platform: body.platform as LinkPlatform | undefined,
    classroomRole: parseClassroomRole(
      String(body.classroomRole ?? "link"),
      "link",
    ),
  });
  return NextResponse.json({ item });
}
