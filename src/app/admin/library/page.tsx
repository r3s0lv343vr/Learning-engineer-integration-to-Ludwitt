import Link from "next/link";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import { CITY_LIBRARIES } from "@/lib/content/libraries";
import { listAdminLibraryItems } from "@/lib/library-catalog";
import { LibraryAdminUnlock } from "@/components/LibraryAdminUnlock";

export default async function AdminLibraryHubPage() {
  const session = await readSession();
  if (!session) redirect("/api/demo-launch?next=/admin/library");

  const admin = await isLibraryAdmin(session);

  const counts = await Promise.all(
    CITY_LIBRARIES.map(async (lib) => ({
      areaId: lib.areaId,
      name: lib.name,
      tagline: lib.tagline,
      customCount: (await listAdminLibraryItems(lib.areaId)).length,
    })),
  );

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
      <header>
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          Backend · Library administrator
        </p>
        <h1 className="display mt-1 text-3xl text-[var(--gold)]">
          City libraries
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Manage PowerPoints, PDF notes, and links per city. This console is
          separate from the learner Library Classroom — the room shell learners
          use is not modified here.
        </p>
      </header>

      {!admin ? (
        <LibraryAdminUnlock />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {counts.map((lib) => (
            <Link
              key={lib.areaId}
              href={`/admin/library/${lib.areaId}`}
              className="rounded-2xl border border-[var(--path)]/35 bg-black/30 p-5 transition hover:border-[var(--gold)]/50 hover:bg-black/45"
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

      <p className="text-xs text-[var(--muted)]">
        Signed in as {session.email || session.userId}
        {admin ? " · administrator" : " · learner (admin unlock required)"}
      </p>
    </main>
  );
}
