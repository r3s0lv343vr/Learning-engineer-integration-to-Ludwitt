import { notFound } from "next/navigation";
import type { AreaId } from "@/lib/content/areas";
import { getLibrary } from "@/lib/content/libraries";
import { listLibraryItems } from "@/lib/library-catalog";
import { LibraryAdminPanel } from "@/components/LibraryAdminPanel";

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

  const library = getLibrary(areaId);
  if (!library) notFound();

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
