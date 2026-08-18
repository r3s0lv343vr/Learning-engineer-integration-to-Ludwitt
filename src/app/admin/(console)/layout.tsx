import { redirect } from "next/navigation";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/AdminShell";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await readSession();
  if (!session) redirect("/api/demo-launch?next=/admin");

  const admin = await isLibraryAdmin(session);
  if (!admin) redirect("/admin/login");

  return (
    <AdminShell sessionLabel={session.email || session.userId}>
      {children}
    </AdminShell>
  );
}
