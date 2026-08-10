import { cookies } from "next/headers";
import { mkdir, writeFile, readFile } from "fs/promises";
import path from "path";
import type { AreaId } from "@/lib/content/areas";
import { CITY_LIBRARIES } from "@/lib/content/libraries";
import {
  detectPlatform,
  inferKindFromFileName,
  libraryItemKindLabel,
  type LibraryCatalogItem,
  type LibraryItemKind,
  type LinkPlatform,
} from "@/lib/library-types";

export type { LibraryCatalogItem, LibraryItemKind, LinkPlatform };
export { detectPlatform, inferKindFromFileName, libraryItemKindLabel };

const COOKIE = "questfolio_library";
const UPLOAD_ROOT = path.join(process.cwd(), "public", "library");

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
    })),
  );
}

async function readCookieCatalog(): Promise<LibraryCatalogItem[]> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as LibraryCatalogItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeCookieCatalog(items: LibraryCatalogItem[]) {
  const jar = await cookies();
  const custom = items.filter((i) => i.source !== "seed");
  jar.set(COOKIE, encodeURIComponent(JSON.stringify(custom)), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function listLibraryItems(areaId: AreaId): Promise<LibraryCatalogItem[]> {
  const seeded = seedItems().filter((i) => i.areaId === areaId);
  const custom = (await readCookieCatalog()).filter((i) => i.areaId === areaId);
  const byId = new Map<string, LibraryCatalogItem>();
  for (const item of [...seeded, ...custom]) byId.set(item.id, item);
  return Array.from(byId.values()).sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  );
}

export async function addLibraryLink(input: {
  areaId: AreaId;
  title: string;
  description?: string;
  url: string;
  platform?: LinkPlatform;
}): Promise<LibraryCatalogItem> {
  const item: LibraryCatalogItem = {
    id: `link-${crypto.randomUUID()}`,
    areaId: input.areaId,
    title: input.title.trim(),
    kind: "link",
    description: input.description?.trim() || `Linked reading (${input.platform ?? "web"})`,
    href: input.url.trim(),
    platform: input.platform ?? detectPlatform(input.url),
    source: "link",
    createdAt: new Date().toISOString(),
  };
  const all = await readCookieCatalog();
  all.push(item);
  await writeCookieCatalog(all);
  return item;
}

export async function addLibraryUpload(input: {
  areaId: AreaId;
  title: string;
  description?: string;
  kind: LibraryItemKind;
  fileName: string;
  bytes: Buffer;
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

  try {
    const metaDir = path.join("/tmp", "questfolio-library");
    await mkdir(metaDir, { recursive: true });
    await writeFile(
      path.join(metaDir, `${input.areaId}-${stamp}.json`),
      JSON.stringify({ stored, areaId: input.areaId }),
    );
  } catch {
    /* optional */
  }

  const item: LibraryCatalogItem = {
    id: `upload-${stamp}`,
    areaId: input.areaId,
    title: input.title.trim() || safeName,
    kind: input.kind,
    description:
      input.description?.trim() ||
      `Uploaded ${libraryItemKindLabel(input.kind)} for ${input.areaId}`,
    href: `/library/${input.areaId}/uploads/${stored}`,
    downloadName: safeName,
    source: "upload",
    createdAt: new Date().toISOString(),
  };
  const all = await readCookieCatalog();
  all.push(item);
  await writeCookieCatalog(all);
  return item;
}

export async function removeLibraryItem(id: string): Promise<boolean> {
  const all = await readCookieCatalog();
  const next = all.filter((i) => i.id !== id);
  if (next.length === all.length) return false;
  await writeCookieCatalog(next);
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
