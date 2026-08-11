import { redirect } from "next/navigation";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/AdminShell";
import { AdminUnlockGate } from "@/components/AdminUnlockGate";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await readSession();
  // Middleware usually handles this; keep as a safety net.
  if (!session) redirect("/api/demo-launch?next=/admin");

  const admin = await isLibraryAdmin(session);
  if (!admin) {
    // Do not render the admin console (left rail / capacities) while logged out.
    return <AdminUnlockGate />;
  }

  const sessionLabel = session.email || session.userId;

  return (
    <AdminShell isAdmin sessionLabel={sessionLabel}>
      {children}
    </AdminShell>
  );
}
