"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Clears the library administrator unlock cookie only (learner session stays). */
export function LibraryAdminLogout({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    await fetch("/api/admin/library-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setPending(false);
    // Leave the admin console entirely — it must not remain visible when logged out.
    router.replace("/map");
    router.refresh();
  }

  return (
    <button
      type="button"
      className={`btn btn-ghost text-sm ${className}`.trim()}
      onClick={logout}
      disabled={pending}
    >
      {pending ? "Logging out…" : "Log out admin"}
    </button>
  );
}
