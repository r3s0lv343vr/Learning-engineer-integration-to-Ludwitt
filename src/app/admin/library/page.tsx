import Link from "next/link";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import { CITY_LIBRARIES } from "@/lib/content/libraries";
import { listAdminLibraryItems } from "@/lib/library-catalog";
import { LibraryAdminUnlock } from "@/components/LibraryAdminUnlock";

export default async function AdminLibraryHubPage() {
  const session = await readSession();
  const admin = session ? await isLibraryAdmin(session) : false;

  const counts = await Promise.all(
    CITY_LIBRARIES.map(async (lib) => ({
      areaId: lib.areaId,
      name: lib.name,
      tagline: lib.tagline,
      customCount: (await listAdminLibraryItems(lib.areaId)).length,
    })),
  );

  return (
    <div className="admin-stage">
      <header className="admin-stage__header">
        <p className="admin-stage__eyebrow">Library administrator</p>
        <h1 className="display admin-stage__title">City libraries</h1>
        <p className="admin-stage__lede">
          Manage PowerPoints, PDF notes, and links per city. This console is
          separate from the learner Library Classroom — the room shell learners
          use is not modified here.
        </p>
      </header>

      {!admin ? (
        <LibraryAdminUnlock />
      ) : (
        <div className="admin-capacity-grid">
          {counts.map((lib) => (
            <Link
              key={lib.areaId}
              href={`/admin/library/${lib.areaId}`}
              className="admin-capacity-card"
            >
              <h2 className="display text-xl text-[var(--gold)]">{lib.name}</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{lib.tagline}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-[var(--accent)]">
                {lib.customCount} admin item{lib.customCount === 1 ? "" : "s"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
