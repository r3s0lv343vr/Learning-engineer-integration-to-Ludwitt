import { NextRequest, NextResponse } from "next/server";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import type { AreaId } from "@/lib/content/areas";
import { MAP_AREAS } from "@/lib/content/areas";
import { getModule } from "@/lib/content/modules";
import {
  addPortalLink,
  addPortalUpload,
  areaIdForModuleId,
  getPortalCatalog,
  inferPortalKindFromFileName,
  modulesForArea,
  removePortalMaterial,
  updatePortalText,
  type PortalMaterialKind,
  type PortalLinkPlatform,
} from "@/lib/portal-catalog";

function isAreaId(value: string): value is AreaId {
  return MAP_AREAS.some((a) => a.id === value);
}

export async function GET(req: NextRequest) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const moduleId = req.nextUrl.searchParams.get("moduleId") ?? "";
  const areaId = req.nextUrl.searchParams.get("areaId") ?? "";
  const admin = await isLibraryAdmin(session);

  if (moduleId) {
    if (!getModule(moduleId)) {
      return NextResponse.json({ error: "invalid_module" }, { status: 400 });
    }
    const doc = await getPortalCatalog(moduleId);
    return NextResponse.json({ doc, admin });
  }

  if (areaId) {
    if (!isAreaId(areaId)) {
      return NextResponse.json({ error: "invalid_area" }, { status: 400 });
    }
    const modules = modulesForArea(areaId);
    const docs = await Promise.all(
      modules.map(async (m) => {
        const doc = await getPortalCatalog(m.id);
        return {
          moduleId: m.id,
          number: m.number,
          title: m.title,
          mapLabel: m.mapLabel,
          materialCount: doc.materials.length,
          hasTextOverlay: Object.keys(doc.text).length > 0,
        };
      }),
    );
    return NextResponse.json({ areaId, modules: docs, admin });
  }

  return NextResponse.json({ error: "moduleId_or_areaId_required" }, { status: 400 });
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
    const moduleId = String(form.get("moduleId") ?? "");
    if (!getModule(moduleId) || !areaIdForModuleId(moduleId)) {
      return NextResponse.json({ error: "invalid_module" }, { status: 400 });
    }
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file_required" }, { status: 400 });
    }
    const kindRaw = String(form.get("kind") ?? "");
    const kind = (kindRaw ||
      inferPortalKindFromFileName(file.name)) as PortalMaterialKind;
    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.length > 40 * 1024 * 1024) {
      return NextResponse.json({ error: "file_too_large" }, { status: 413 });
    }
    try {
      const item = await addPortalUpload({
        moduleId,
        title: String(form.get("title") ?? file.name),
        description: String(form.get("description") ?? ""),
        kind,
        fileName: file.name,
        bytes,
      });
      return NextResponse.json({ item });
    } catch (err) {
      console.error("portal_upload_failed", err);
      return NextResponse.json(
        {
          error: "upload_failed",
          detail: err instanceof Error ? err.message : "write_error",
        },
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
  const moduleId = String(body.moduleId ?? "");
  if (!getModule(moduleId) || !areaIdForModuleId(moduleId)) {
    return NextResponse.json({ error: "invalid_module" }, { status: 400 });
  }

  if (action === "remove") {
    const ok = await removePortalMaterial(moduleId, String(body.id ?? ""));
    return NextResponse.json({ ok });
  }

  if (action === "update_text") {
    const doc = await updatePortalText(moduleId, {
      summary: body.summary != null ? String(body.summary) : undefined,
      lesson: body.lesson != null ? String(body.lesson) : undefined,
      scenario: body.scenario != null ? String(body.scenario) : undefined,
      outcome: body.outcome != null ? String(body.outcome) : undefined,
    });
    return NextResponse.json({ doc });
  }

  const url = String(body.url ?? "").trim();
  if (!/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }
  const item = await addPortalLink({
    moduleId,
    title: String(body.title ?? "Portal link"),
    description: body.description ? String(body.description) : undefined,
    url,
    kind: body.kind as PortalMaterialKind | undefined,
    platform: body.platform as PortalLinkPlatform | undefined,
  });
  return NextResponse.json({ item });
}
