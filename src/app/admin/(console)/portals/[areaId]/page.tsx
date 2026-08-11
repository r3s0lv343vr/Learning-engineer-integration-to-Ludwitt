import Link from "next/link";
import { notFound } from "next/navigation";
import { areaById, type AreaId, MAP_AREAS } from "@/lib/content/areas";
import { getPortalCatalog, modulesForArea } from "@/lib/portal-catalog";

export default async function AdminPortalsCityPage({
  params,
}: {
  params: Promise<{ areaId: string }>;
}) {
  const { areaId } = await params;
  if (!MAP_AREAS.some((a) => a.id === areaId)) notFound();

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
    <div className="admin-stage space-y-6">
      <header className="admin-stage__header">
        <p className="admin-stage__eyebrow">Portal administrator</p>
        <h1 className="display admin-stage__title">{area.name}</h1>
        <p className="admin-stage__lede">
          Portals M{area.moduleStart}–M{area.moduleEnd} belong only to this city.
        </p>
        <Link className="btn btn-ghost text-sm mt-3 inline-flex" href="/admin/portals">
          All cities
        </Link>
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
    </div>
  );
}
