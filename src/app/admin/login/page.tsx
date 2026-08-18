import { redirect } from "next/navigation";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import { AdminUnlockGate } from "@/components/AdminUnlockGate";

function safeNext(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/admin";
  if (value.startsWith("/admin/login")) return "/admin";
  return value;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await readSession();
  if (!session) redirect("/api/demo-launch?next=/admin/login");

  const params = await searchParams;
  const next = safeNext(params.next);

  if (await isLibraryAdmin(session)) redirect(next);

  return <AdminUnlockGate nextPath={next} />;
}
