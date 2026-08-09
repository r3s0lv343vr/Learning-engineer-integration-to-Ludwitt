"use client";

import { useEffect, useState } from "react";

export function CreditsBadge() {
  const [label, setLabel] = useState<string>("Credits…");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/credits");
        const data = await res.json();
        if (cancelled) return;
        if (data.demo) {
          setLabel("Demo (no credits)");
          return;
        }
        if (!res.ok) {
          setLabel("Credits n/a");
          return;
        }
        const cents = Number(data.spendableCents ?? 0);
        setLabel(
          data.spendableFormatted ||
            `$${(cents / 100).toFixed(2)} spendable`,
        );
      } catch {
        if (!cancelled) setLabel("Credits n/a");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <span className="rounded-full border border-[var(--path)]/40 px-3 py-1 text-xs">
      Ludwitt {label}
    </span>
  );
}
