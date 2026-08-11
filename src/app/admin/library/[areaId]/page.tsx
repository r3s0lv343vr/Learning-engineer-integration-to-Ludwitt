import Link from "next/link";
import { notFound } from "next/navigation";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import type { AreaId } from "@/lib/content/areas";
import { getLibrary } from "@/lib/content/libraries";
import { listLibraryItems } from "@/lib/library-catalog";
import { LibraryAdminPanel } from "@/components/LibraryAdminPanel";
import { LibraryAdminUnlock } from "@/components/LibraryAdminUnlock";

const AREA_IDS: AreaId[] = [
  "coral-ledger-bay",
  "brick-exchange",
  "signal-quay",
  "mandate-highlands",
];

export default async function AdminLibraryAreaPage({
  params,
}: {
  params: Promise<{ areaId: string }>;
}) {
  const { areaId } = await params;
  if (!AREA_IDS.includes(areaId as AreaId)) notFound();

  const session = await readSession();
  const library = getLibrary(areaId);
  if (!library) notFound();

  const admin = session ? await isLibraryAdmin(session) : false;
  if (!admin) {
    return (
      <div className="admin-stage">
        <Link className="text-sm text-[var(--accent)]" href="/admin/library">
          ← Library admin
        </Link>
        <LibraryAdminUnlock />
      </div>
    );
  }

  const items = await listLibraryItems(areaId as AreaId);

  return (
    <div className="admin-stage">
      <LibraryAdminPanel
        areaId={areaId as AreaId}
        areaName={library.name}
        initialItems={items}
      />
    </div>
  );
}
