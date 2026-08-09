"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { SideQuest } from "@/lib/types";

export function SidequestClient({ quest }: { quest: SideQuest }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);

  function choose(choice: SideQuest["choices"][number]) {
    startTransition(async () => {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sidequest_started",
          metadata: { sidequestId: quest.id },
        }),
      });
      const capitalDelta = choice.success
        ? quest.capitalDeltaSuccess
        : quest.capitalDeltaFail;
      await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sidequest",
          sidequestId: quest.id,
          success: choice.success,
          capitalDelta,
          goldReward: quest.goldReward,
          chestGold: quest.chestGold,
        }),
      });
      setResult(choice.feedback);
      setTimeout(() => {
        router.push("/map");
        router.refresh();
      }, 1400);
    });
  }

  return (
    <div className="mt-4 space-y-2">
      {quest.choices.map((c) => (
        <button
          key={c.label}
          type="button"
          className="btn btn-ghost w-full justify-start text-left"
          disabled={pending || Boolean(result)}
          onClick={() => choose(c)}
        >
          {c.label}
        </button>
      ))}
      {result ? (
        <p className="rounded-lg bg-black/30 p-3 text-[var(--muted)]">{result}</p>
      ) : null}
    </div>
  );
}
