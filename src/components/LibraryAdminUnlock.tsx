"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LibraryAdminUnlock() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await fetch("/api/admin/library-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    const data = await res.json();
    setPending(false);
    if (!res.ok) {
      setError(
        data.error === "admin_key_not_configured"
          ? "LIBRARY_ADMIN_KEY is not set on the server."
          : "Invalid administrator key.",
      );
      return;
    }
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-8 max-w-md rounded-2xl border border-[var(--path)]/30 bg-black/30 p-6"
    >
      <h2 className="display text-xl text-[var(--gold)]">Administrator unlock</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Library and portal admin tools are administrator-only. Enter the admin
        key, or sign in with an allow-listed admin email.
      </p>
      <label className="mt-4 block text-sm">
        Admin key
        <input
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2"
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      <button type="submit" className="btn btn-forest mt-4" disabled={pending}>
        Unlock admin console
      </button>
    </form>
  );
}
