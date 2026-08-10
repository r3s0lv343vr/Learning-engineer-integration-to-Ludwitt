import Link from "next/link";
import { notFound, redirect } from "next/navigation";
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
  if (!session) redirect(`/api/demo-launch?next=/admin/library/${areaId}`);

  const library = getLibrary(areaId);
  if (!library) notFound();

  const admin = await isLibraryAdmin(session);
  if (!admin) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <Link className="text-sm text-[var(--accent)]" href="/admin/library">
          ← Library admin hub
        </Link>
        <LibraryAdminUnlock />
      </main>
    );
  }

  const items = await listLibraryItems(areaId as AreaId);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <LibraryAdminPanel
        areaId={areaId as AreaId}
        areaName={library.name}
        initialItems={items}
      />
    </main>
  );
}
