import Link from "next/link";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import { MAP_AREAS } from "@/lib/content/areas";
import { countPortalMaterialsForArea } from "@/lib/portal-catalog";
import { LibraryAdminUnlock } from "@/components/LibraryAdminUnlock";

export default async function AdminPortalsHubPage() {
  const session = await readSession();
  const admin = session ? await isLibraryAdmin(session) : false;

  const counts = await Promise.all(
    MAP_AREAS.map(async (area) => ({
      ...area,
      itemCount: await countPortalMaterialsForArea(area.id),
    })),
  );

  return (
    <div className="admin-stage">
      <header className="admin-stage__header">
        <p className="admin-stage__eyebrow">Portal administrator</p>
        <h1 className="display admin-stage__title">City portals</h1>
        <p className="admin-stage__lede">
          Review, improve, and attach readings, videos, diagrams, and news to
          each portal by city. Portal shells stay standard — map icons and
          positions are never edited here.
        </p>
      </header>

      {!admin ? (
        <LibraryAdminUnlock />
      ) : (
        <div className="admin-capacity-grid">
          {counts.map((area) => (
            <Link
              key={area.id}
              href={`/admin/portals/${area.id}`}
              className="admin-capacity-card"
            >
              <h2 className="display text-xl text-[var(--gold)]">{area.name}</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{area.blurb}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-[var(--accent)]">
                Portals M{area.moduleStart}–M{area.moduleEnd} · {area.itemCount}{" "}
                admin item{area.itemCount === 1 ? "" : "s"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
