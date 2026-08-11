import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import { areaById, type AreaId, MAP_AREAS } from "@/lib/content/areas";
import { getPortalCatalog, modulesForArea } from "@/lib/portal-catalog";
import { LibraryAdminUnlock } from "@/components/LibraryAdminUnlock";
import { LibraryAdminLogout } from "@/components/LibraryAdminLogout";

export default async function AdminPortalsCityPage({
  params,
}: {
  params: Promise<{ areaId: string }>;
}) {
  const { areaId } = await params;
  if (!MAP_AREAS.some((a) => a.id === areaId)) notFound();

  const session = await readSession();
  if (!session) redirect(`/api/demo-launch?next=/admin/portals/${areaId}`);

  const admin = await isLibraryAdmin(session);
  if (!admin) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <Link className="text-sm text-[var(--accent)]" href="/admin/portals">
          ← Portal admin hub
        </Link>
        <LibraryAdminUnlock />
      </main>
    );
  }

  const area = areaById(areaId as AreaId);
  const modules = modulesForArea(areaId as AreaId);
  const rows = await Promise.all(
    modules.map(async (m) => {
      const doc = await getPortalCatalog(m.id);
      return {
        ...m,
        materialCount: doc.materials.length,
        hasTextOverlay: Object.keys(doc.text).length > 0,
      };
    }),
  );

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            Portal administrator
          </p>
          <h1 className="display mt-1 text-3xl text-[var(--gold)]">{area.name}</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Portals M{area.moduleStart}–M{area.moduleEnd} belong only to this city.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn btn-ghost text-sm" href="/admin/portals">
            All cities
          </Link>
          <LibraryAdminLogout />
        </div>
      </header>

      <div className="space-y-3">
        {rows.map((m) => (
          <Link
            key={m.id}
            href={`/admin/portals/${areaId}/${m.id}`}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--path)]/30 bg-black/25 px-4 py-3 transition hover:border-[var(--gold)]/45"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-[var(--accent)]">
                Portal M{m.number} · {m.mapLabel}
              </p>
              <h2 className="font-bold text-[var(--gold)]">{m.title}</h2>
            </div>
            <p className="text-xs text-[var(--muted)]">
              {m.materialCount} material{m.materialCount === 1 ? "" : "s"}
              {m.hasTextOverlay ? " · text overlay" : ""}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
