import Link from "next/link";
import { LibraryAdminUnlock } from "@/components/LibraryAdminUnlock";

/** Standalone unlock screen — no admin console chrome until authenticated. */
export function AdminUnlockGate() {
  return (
    <main className="admin-unlock-gate">
      <div className="admin-unlock-gate__card">
        <p className="admin-stage__eyebrow">Administrative backend</p>
        <h1 className="display admin-stage__title">Admin access required</h1>
        <p className="admin-stage__lede">
          Unlock with an administrator key to open the console. The admin
          capacities stay hidden until you are signed in as admin.
        </p>
        <LibraryAdminUnlock />
        <p className="mt-6 text-center">
          <Link className="text-sm text-[var(--accent)]" href="/map">
            ← Back to map
          </Link>
        </p>
      </div>
    </main>
  );
}
