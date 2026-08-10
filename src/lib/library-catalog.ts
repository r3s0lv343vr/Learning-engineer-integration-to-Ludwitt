import { mkdir, writeFile, readFile, unlink } from "fs/promises";
import path from "path";
import type { AreaId } from "@/lib/content/areas";
import { CITY_LIBRARIES } from "@/lib/content/libraries";
import {
  defaultClassroomRole,
  detectPlatform,
  inferKindFromFileName,
  libraryItemKindLabel,
  type ClassroomRole,
  type LibraryCatalogItem,
  type LibraryItemKind,
  type LinkPlatform,
} from "@/lib/library-types";

export type { ClassroomRole, LibraryCatalogItem, LibraryItemKind, LinkPlatform };
export {
  defaultClassroomRole,
  detectPlatform,
  inferKindFromFileName,
  libraryItemKindLabel,
};

const UPLOAD_ROOT = path.join(process.cwd(), "public", "library");
const DATA_ROOT = path.join(process.cwd(), "data", "library");
const TMP_ROOT = path.join("/tmp", "questfolio-library");

function seedItems(): LibraryCatalogItem[] {
  const now = "2026-01-01T00:00:00.000Z";
  return CITY_LIBRARIES.flatMap((lib) =>
    lib.resources.map((r) => ({
      id: r.id,
      areaId: lib.areaId,
      title: r.title,
      kind: r.kind,
      description: r.description,
      href: `/library/${lib.areaId}/${r.file}`,
      downloadName: r.downloadName,
      source: "seed" as const,
      createdAt: now,
      classroomRole: "none" as const,
    })),
  );
}

function catalogPaths(areaId: AreaId) {
  return [
    path.join(DATA_ROOT, `${areaId}.json`),
    path.join(TMP_ROOT, `${areaId}.json`),
  ];
}

async function readAreaCustom(areaId: AreaId): Promise<LibraryCatalogItem[]> {
  for (const file of catalogPaths(areaId)) {
    try {
      const raw = await readFile(file, "utf8");
      const parsed = JSON.parse(raw) as LibraryCatalogItem[];
      if (!Array.isArray(parsed)) continue;
      return parsed.filter((i) => i && i.areaId === areaId && i.source !== "seed");
    } catch {
      /* try next location */
    }
  }
  return [];
}

async function writeAreaCustom(areaId: AreaId, items: LibraryCatalogItem[]) {
  const custom = items.filter((i) => i.source !== "seed" && i.areaId === areaId);
  const payload = JSON.stringify(custom, null, 2);
  const targets = [
    { dir: DATA_ROOT, file: path.join(DATA_ROOT, `${areaId}.json`) },
    { dir: TMP_ROOT, file: path.join(TMP_ROOT, `${areaId}.json`) },
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
  if (!wrote) throw lastError ?? new Error("catalog_write_failed");
}

/** Seed shelf + admin uploads/links for one city library only. */
export async function listLibraryItems(areaId: AreaId): Promise<LibraryCatalogItem[]> {
  const seeded = seedItems().filter((i) => i.areaId === areaId);
  const custom = await readAreaCustom(areaId);
  const byId = new Map<string, LibraryCatalogItem>();
  for (const item of [...seeded, ...custom]) byId.set(item.id, item);
  return Array.from(byId.values()).sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  );
}

/** Admin-authored items only (uploads + links) for one area. */
export async function listAdminLibraryItems(
  areaId: AreaId,
): Promise<LibraryCatalogItem[]> {
  return (await readAreaCustom(areaId)).sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  );
}

export async function addLibraryLink(input: {
  areaId: AreaId;
  title: string;
  description?: string;
  url: string;
  platform?: LinkPlatform;
  classroomRole?: ClassroomRole;
}): Promise<LibraryCatalogItem> {
  const item: LibraryCatalogItem = {
    id: `link-${crypto.randomUUID()}`,
    areaId: input.areaId,
    title: input.title.trim() || "Reading link",
    kind: "link",
    description:
      input.description?.trim() ||
      `Linked reading (${input.platform ?? "web"})`,
    href: input.url.trim(),
    platform: input.platform ?? detectPlatform(input.url),
    source: "link",
    createdAt: new Date().toISOString(),
    classroomRole: input.classroomRole ?? "link",
  };
  const all = await readAreaCustom(input.areaId);
  all.push(item);
  await writeAreaCustom(input.areaId, all);
  return item;
}

export async function addLibraryUpload(input: {
  areaId: AreaId;
  title: string;
  description?: string;
  kind: LibraryItemKind;
  fileName: string;
  bytes: Buffer;
  classroomRole?: ClassroomRole;
}): Promise<LibraryCatalogItem> {
  const safeName = input.fileName
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
  const stamp = Date.now();
  const stored = `${stamp}-${safeName}`;
  const dir = path.join(UPLOAD_ROOT, input.areaId, "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, stored), input.bytes);

  const kind = input.kind || inferKindFromFileName(input.fileName);
  const item: LibraryCatalogItem = {
    id: `upload-${stamp}`,
    areaId: input.areaId,
    title: input.title.trim() || safeName,
    kind,
    description:
      input.description?.trim() ||
      `Uploaded ${libraryItemKindLabel(kind)} for ${input.areaId}`,
    href: `/library/${input.areaId}/uploads/${stored}`,
    downloadName: safeName,
    source: "upload",
    createdAt: new Date().toISOString(),
    classroomRole: input.classroomRole ?? defaultClassroomRole(kind),
  };
  const all = await readAreaCustom(input.areaId);
  all.push(item);
  await writeAreaCustom(input.areaId, all);
  return item;
}

export async function removeLibraryItem(
  areaId: AreaId,
  id: string,
): Promise<boolean> {
  const all = await readAreaCustom(areaId);
  const target = all.find((i) => i.id === id);
  if (!target) return false;
  const next = all.filter((i) => i.id !== id);
  await writeAreaCustom(areaId, next);

  if (target.source === "upload" && target.href.startsWith(`/library/${areaId}/uploads/`)) {
    try {
      const abs = path.join(process.cwd(), "public", target.href.replace(/^\//, ""));
      await unlink(abs);
    } catch {
      /* file may already be gone */
    }
  }
  return true;
}

export async function ensureUploadReadable(relHref: string): Promise<Buffer | null> {
  if (!relHref.startsWith("/library/")) return null;
  const abs = path.join(process.cwd(), "public", relHref.replace(/^\//, ""));
  try {
    return await readFile(abs);
  } catch {
    return null;
  }
}
