import Link from "next/link";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import { ADMIN_NAV } from "@/lib/admin-nav";
import { LibraryAdminUnlock } from "@/components/LibraryAdminUnlock";

export default async function AdminHomePage() {
  const session = await readSession();
  const admin = session ? await isLibraryAdmin(session) : false;

  return (
    <div className="admin-stage">
      <header className="admin-stage__header">
        <p className="admin-stage__eyebrow">Administrative backend</p>
        <h1 className="display admin-stage__title">Capacities</h1>
        <p className="admin-stage__lede">
          Select Library admin or Portal admin from the left panel. Additional
          capacities can be added to the same rail without changing the learner
          map or portal shells.
        </p>
      </header>

      {!admin ? (
        <LibraryAdminUnlock />
      ) : (
        <div className="admin-capacity-grid">
          {ADMIN_NAV.map((item) => (
            <Link key={item.id} href={item.href} className="admin-capacity-card">
              <h2 className="display text-xl text-[var(--gold)]">{item.label}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.description}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-[var(--accent)]">
                Open on the right →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
