import Link from "next/link";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import { MAP_AREAS } from "@/lib/content/areas";
import { countPortalMaterialsForArea } from "@/lib/portal-catalog";
import { LibraryAdminUnlock } from "@/components/LibraryAdminUnlock";
import { LibraryAdminLogout } from "@/components/LibraryAdminLogout";

export default async function AdminPortalsHubPage() {
  const session = await readSession();
  if (!session) redirect("/api/demo-launch?next=/admin/portals");

  const admin = await isLibraryAdmin(session);
  const counts = await Promise.all(
    MAP_AREAS.map(async (area) => ({
      ...area,
      itemCount: await countPortalMaterialsForArea(area.id),
    })),
  );

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            Backend · Portal administrator
          </p>
          <h1 className="display mt-1 text-3xl text-[var(--gold)]">
            City portals
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
            Review, improve, and attach readings/videos/diagrams/news to each
            portal by city. Portal shells stay standard — map icons and positions
            are never edited here.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn btn-ghost text-sm" href="/admin/library">
            Library admin
          </Link>
          {admin ? <LibraryAdminLogout /> : null}
        </div>
      </header>

      {!admin ? (
        <LibraryAdminUnlock />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {counts.map((area) => (
            <Link
              key={area.id}
              href={`/admin/portals/${area.id}`}
              className="rounded-2xl border border-[var(--path)]/35 bg-black/30 p-5 transition hover:border-[var(--gold)]/50 hover:bg-black/45"
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
    </main>
  );
}
