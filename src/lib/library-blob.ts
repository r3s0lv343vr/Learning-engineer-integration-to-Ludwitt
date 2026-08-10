import { head, put, del, list } from "@vercel/blob";
import type { AreaId } from "@/lib/content/areas";
import type { LibraryCatalogItem } from "@/lib/library-types";

function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function catalogPathname(areaId: AreaId) {
  return `library-catalog/${areaId}.json`;
}

function filePathname(areaId: AreaId, stored: string) {
  return `library-files/${areaId}/${stored}`;
}

export async function readBlobCatalog(
  areaId: AreaId,
): Promise<LibraryCatalogItem[] | null> {
  if (!blobEnabled()) return null;
  try {
    const result = await list({
      prefix: catalogPathname(areaId),
      limit: 1,
    });
    const hit = result.blobs.find((b) => b.pathname === catalogPathname(areaId));
    if (!hit) return [];
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return [];
    const parsed = (await res.json()) as LibraryCatalogItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("blob_catalog_read_failed", err);
    return null;
  }
}

export async function writeBlobCatalog(
  areaId: AreaId,
  items: LibraryCatalogItem[],
): Promise<boolean> {
  if (!blobEnabled()) return false;
  try {
    await put(catalogPathname(areaId), JSON.stringify(items, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return true;
  } catch (err) {
    console.error("blob_catalog_write_failed", err);
    return false;
  }
}

export async function putBlobUpload(
  areaId: AreaId,
  stored: string,
  bytes: Buffer,
  contentType: string,
): Promise<string | null> {
  if (!blobEnabled()) return null;
  try {
    const result = await put(filePathname(areaId, stored), bytes, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType,
    });
    return result.url;
  } catch (err) {
    console.error("blob_upload_failed", err);
    return null;
  }
}

export async function deleteBlobUpload(
  areaId: AreaId,
  stored: string,
): Promise<void> {
  if (!blobEnabled()) return;
  try {
    const pathname = filePathname(areaId, stored);
    const meta = await head(pathname).catch(() => null);
    if (meta?.url) await del(meta.url);
  } catch (err) {
    console.error("blob_delete_failed", err);
  }
}

export function isBlobEnabled() {
  return blobEnabled();
}
