import { mkdir, writeFile, readFile, unlink } from "fs/promises";
import path from "path";
import { del, head, list, put } from "@vercel/blob";
import type { AreaId } from "@/lib/content/areas";
import { areaForModuleNumber, MAP_AREAS } from "@/lib/content/areas";
import { MODULES } from "@/lib/content/modules";
import {
  detectPortalPlatform,
  inferPortalKindFromFileName,
  portalMaterialKindLabel,
  type PortalCatalogDoc,
  type PortalLinkPlatform,
  type PortalMaterial,
  type PortalMaterialKind,
  type PortalTextOverlay,
} from "@/lib/portal-types";

export type {
  PortalCatalogDoc,
  PortalLinkPlatform,
  PortalMaterial,
  PortalMaterialKind,
  PortalTextOverlay,
};
export {
  detectPortalPlatform,
  inferPortalKindFromFileName,
  portalMaterialKindLabel,
};

const DATA_ROOT = path.join(process.cwd(), "data", "portals");
const TMP_ROOT = path.join("/tmp", "questfolio-portals");
const TMP_UPLOAD_ROOT = path.join(TMP_ROOT, "files");

function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function catalogBlobPath(moduleId: string) {
  return `portal-catalog/${moduleId}.json`;
}

function fileBlobPath(moduleId: string, stored: string) {
  return `portal-files/${moduleId}/${stored}`;
}

export function areaIdForModuleId(moduleId: string): AreaId | null {
  const mod = MODULES.find((m) => m.id === moduleId);
  if (!mod) return null;
  return areaForModuleNumber(mod.number).id;
}

export function modulesForArea(areaId: AreaId) {
  const area = MAP_AREAS.find((a) => a.id === areaId);
  if (!area) return [];
  return MODULES.filter(
    (m) => m.number >= area.moduleStart && m.number <= area.moduleEnd,
  );
}

function emptyDoc(moduleId: string, areaId: AreaId): PortalCatalogDoc {
  return {
    moduleId,
    areaId,
    updatedAt: new Date().toISOString(),
    text: {},
    materials: [],
  };
}

async function readBlobDoc(moduleId: string): Promise<PortalCatalogDoc | null> {
  if (!blobEnabled()) return null;
  try {
    const result = await list({ prefix: catalogBlobPath(moduleId), limit: 1 });
    const hit = result.blobs.find((b) => b.pathname === catalogBlobPath(moduleId));
    if (!hit) return emptyDoc(moduleId, areaIdForModuleId(moduleId) ?? "coral-ledger-bay");
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return emptyDoc(moduleId, areaIdForModuleId(moduleId) ?? "coral-ledger-bay");
    const parsed = (await res.json()) as PortalCatalogDoc;
    if (!parsed || parsed.moduleId !== moduleId) {
      return emptyDoc(moduleId, areaIdForModuleId(moduleId) ?? "coral-ledger-bay");
    }
    return {
      ...parsed,
      text: parsed.text ?? {},
      materials: Array.isArray(parsed.materials) ? parsed.materials : [],
    };
  } catch (err) {
    console.error("portal_blob_read_failed", err);
    return null;
  }
}

async function writeBlobDoc(doc: PortalCatalogDoc): Promise<boolean> {
  if (!blobEnabled()) return false;
  try {
    await put(catalogBlobPath(doc.moduleId), JSON.stringify(doc, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return true;
  } catch (err) {
    console.error("portal_blob_write_failed", err);
    return false;
  }
}

function localPaths(moduleId: string) {
  return [
    path.join(DATA_ROOT, `${moduleId}.json`),
    path.join(TMP_ROOT, `${moduleId}.json`),
  ];
}

export async function getPortalCatalog(
  moduleId: string,
): Promise<PortalCatalogDoc> {
  const areaId = areaIdForModuleId(moduleId);
  if (!areaId) throw new Error("invalid_module");

  const fromBlob = await readBlobDoc(moduleId);
  if (fromBlob) return { ...fromBlob, areaId };

  for (const file of localPaths(moduleId)) {
    try {
      const raw = await readFile(file, "utf8");
      const parsed = JSON.parse(raw) as PortalCatalogDoc;
      if (parsed?.moduleId === moduleId) {
        return {
          moduleId,
          areaId,
          updatedAt: parsed.updatedAt || new Date().toISOString(),
          text: parsed.text ?? {},
          materials: Array.isArray(parsed.materials) ? parsed.materials : [],
        };
      }
    } catch {
      /* try next */
    }
  }
  return emptyDoc(moduleId, areaId);
}

async function savePortalCatalog(doc: PortalCatalogDoc) {
  doc.updatedAt = new Date().toISOString();
  if (await writeBlobDoc(doc)) return;

  const payload = JSON.stringify(doc, null, 2);
  const targets = [
    { dir: DATA_ROOT, file: path.join(DATA_ROOT, `${doc.moduleId}.json`) },
    { dir: TMP_ROOT, file: path.join(TMP_ROOT, `${doc.moduleId}.json`) },
  ];
  let wrote = false;
  let lastError: unknown;
  for (const target of targets) {
    try {
      await mkdir(target.dir, { recursive: true });
      await writeFile(target.file, payload, "utf8");
      wrote = true;
      break;
    } catch (err) {
      lastError = err;
    }
  }
  if (!wrote) throw lastError ?? new Error("portal_catalog_write_failed");
}

export async function updatePortalText(
  moduleId: string,
  text: PortalTextOverlay,
): Promise<PortalCatalogDoc> {
  const doc = await getPortalCatalog(moduleId);
  doc.text = {
    summary: text.summary?.trim() || undefined,
    lesson: text.lesson?.trim() || undefined,
    scenario: text.scenario?.trim() || undefined,
    outcome: text.outcome?.trim() || undefined,
  };
  // Drop empty keys
  for (const key of Object.keys(doc.text) as (keyof PortalTextOverlay)[]) {
    if (!doc.text[key]) delete doc.text[key];
  }
  await savePortalCatalog(doc);
  return doc;
}

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
  if (lower.endsWith(".docx"))
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (lower.endsWith(".doc")) return "application/msword";
  if (lower.endsWith(".txt")) return "text/plain";
  return "application/octet-stream";
}

async function putPortalBytes(
  moduleId: string,
  stored: string,
  bytes: Buffer,
): Promise<string> {
  if (blobEnabled()) {
    try {
      const result = await put(fileBlobPath(moduleId, stored), bytes, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: contentTypeFor(stored),
      });
      return result.url;
    } catch (err) {
      console.error("portal_blob_upload_failed", err);
    }
  }

  const abs = path.join(TMP_UPLOAD_ROOT, moduleId, stored);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, bytes);
  return `/api/portals/file/${moduleId}/${stored}`;
}

export async function readPortalUploadBytes(
  moduleId: string,
  stored: string,
): Promise<Buffer | null> {
  const safe = path.basename(stored);
  if (!safe || safe !== stored || stored.includes("..")) return null;
  try {
    return await readFile(path.join(TMP_UPLOAD_ROOT, moduleId, safe));
  } catch {
    return null;
  }
}

export async function addPortalUpload(input: {
  moduleId: string;
  title: string;
  description?: string;
  kind?: PortalMaterialKind;
  fileName: string;
  bytes: Buffer;
}): Promise<PortalMaterial> {
  const doc = await getPortalCatalog(input.moduleId);
  const safeName = input.fileName
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
  const stamp = Date.now();
  const stored = `${stamp}-${safeName}`;
  const href = await putPortalBytes(input.moduleId, stored, input.bytes);
  const kind = input.kind || inferPortalKindFromFileName(input.fileName);

  const item: PortalMaterial = {
    id: `portal-upload-${stamp}`,
    moduleId: input.moduleId,
    areaId: doc.areaId,
    title: input.title.trim() || safeName,
    kind,
    description:
      input.description?.trim() ||
      `Uploaded ${portalMaterialKindLabel(kind)} for ${input.moduleId}`,
    href,
    downloadName: safeName,
    source: "upload",
    createdAt: new Date().toISOString(),
  };
  doc.materials.push(item);
  await savePortalCatalog(doc);
  return item;
}

export async function addPortalLink(input: {
  moduleId: string;
  title: string;
  description?: string;
  url: string;
  kind?: PortalMaterialKind;
  platform?: PortalLinkPlatform;
}): Promise<PortalMaterial> {
  const doc = await getPortalCatalog(input.moduleId);
  const platform = input.platform ?? detectPortalPlatform(input.url);
  const kind =
    input.kind ??
    (platform === "youtube" || platform === "vimeo"
      ? "video"
      : platform === "news"
        ? "news"
        : "link");

  const item: PortalMaterial = {
    id: `portal-link-${crypto.randomUUID()}`,
    moduleId: input.moduleId,
    areaId: doc.areaId,
    title: input.title.trim() || "Portal link",
    kind,
    description:
      input.description?.trim() ||
      `Linked ${portalMaterialKindLabel(kind)} (${platform})`,
    href: input.url.trim(),
    platform,
    source: "link",
    createdAt: new Date().toISOString(),
  };
  doc.materials.push(item);
  await savePortalCatalog(doc);
  return item;
}

export async function removePortalMaterial(
  moduleId: string,
  materialId: string,
): Promise<boolean> {
  const doc = await getPortalCatalog(moduleId);
  const target = doc.materials.find((m) => m.id === materialId);
  if (!target) return false;
  doc.materials = doc.materials.filter((m) => m.id !== materialId);
  await savePortalCatalog(doc);

  if (target.source === "upload") {
    const stored =
      target.href.split(`/api/portals/file/${moduleId}/`)[1] ||
      target.href.split(`/portal-files/${moduleId}/`)[1];
    if (stored) {
      const base = path.basename(stored.split("?")[0] || stored);
      if (blobEnabled()) {
        try {
          const meta = await head(fileBlobPath(moduleId, base)).catch(() => null);
          if (meta?.url) await del(meta.url);
        } catch {
          /* ignore */
        }
      }
      try {
        await unlink(path.join(TMP_UPLOAD_ROOT, moduleId, base));
      } catch {
        /* ignore */
      }
    }
  }
  return true;
}

export async function countPortalMaterialsForArea(areaId: AreaId) {
  const mods = modulesForArea(areaId);
  let total = 0;
  for (const mod of mods) {
    const doc = await getPortalCatalog(mod.id);
    total += doc.materials.length;
    if (Object.keys(doc.text).length) total += 1;
  }
  return total;
}
