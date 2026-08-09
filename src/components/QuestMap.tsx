"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MODULES } from "@/lib/content/modules";
import { SIDEQUESTS } from "@/lib/content/sidequests";
import {
  moduleGridPosition,
  modulePathPoints,
  sidequestFramePosition,
} from "@/lib/content/map-layout";
import type { GameState } from "@/lib/types";

export function QuestMap({ state }: { state: GameState }) {
  const [toast, setToast] = useState<string | null>(null);
  const path = useMemo(() => modulePathPoints(), []);
  const pathD = path.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  const warriorPos = useMemo(() => {
    const idx = Math.max(
      0,
      MODULES.findIndex((m) => m.id === state.activeQuestId) >= 0
        ? MODULES.findIndex((m) => m.id === state.activeQuestId)
        : state.completedModules.length > 0
          ? state.completedModules.length - 1
          : 0,
    );
    // Prefer last unlocked module position
    const unlockedIdx = MODULES.findIndex(
      (m) =>
        state.unlockedModules.includes(m.id) &&
        !state.completedModules.includes(m.id),
    );
    const useIdx = unlockedIdx >= 0 ? unlockedIdx : Math.min(idx, 17);
    return moduleGridPosition(useIdx);
  }, [state]);

  return (
    <div className="space-y-3">
      <div className="map-canvas map-square">
        {/* Square board frame */}
        <div className="pointer-events-none absolute inset-[3%] rounded-lg border-2 border-[var(--path)]/35" />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d={pathD}
            fill="none"
            stroke="#c6a15b"
            strokeWidth="1.4"
            strokeDasharray="2.2 1.4"
            opacity="0.85"
          />
        </svg>

        {MODULES.map((m, i) => {
          const pos = moduleGridPosition(i);
          const done = state.completedModules.includes(m.id);
          const unlocked = state.unlockedModules.includes(m.id) || done;
          if (unlocked) {
            return (
              <Link
                key={m.id}
                href={`/quest/${m.id}`}
                className={`quest-node z-20 ${done ? "done" : "pulse"}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                title={`${m.number}. ${m.title}`}
                aria-label={`${m.number}. ${m.title}`}
              >
                {m.number}
              </Link>
            );
          }
          return (
            <button
              key={m.id}
              type="button"
              className="quest-node locked z-20"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              title={`Locked — complete module ${m.number - 1} first`}
              aria-label={`${m.number}. ${m.title} (locked)`}
              onClick={() =>
                setToast(
                  `Module ${m.number} “${m.title}” is locked. Finish Module ${
                    m.number - 1
                  } to unlock its syllabus quests.`,
                )
              }
            >
              {m.number}
            </button>
          );
        })}

        {SIDEQUESTS.map((s, i) => {
          const pos = sidequestFramePosition(i, SIDEQUESTS.length);
          const done = state.completedSidequests.includes(s.id);
          const chest = s.kind === "super-chest";
          return (
            <Link
              key={s.id}
              href={`/sidequest/${s.id}`}
              className={`quest-node z-10 ${chest ? "chest" : "side"} ${done ? "done" : ""}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              title={s.title}
              aria-label={s.title}
            >
              {chest ? "◆" : "✦"}
            </Link>
          );
        })}

        <div
          className="warrior z-30"
          style={{
            left: `${warriorPos.x}%`,
            top: `calc(${warriorPos.y}% + 3.2%)`,
          }}
          aria-label="Warrior avatar"
        >
          <WarriorIcon />
        </div>
      </div>

      {toast ? (
        <div className="rounded-xl border border-[var(--path)]/40 bg-black/40 px-4 py-3 text-sm text-[var(--muted)]">
          {toast}{" "}
          <Link href="/quest/m1" className="text-[var(--accent)] underline">
            Open Module 1
          </Link>
          <button
            type="button"
            className="ml-3 text-xs underline"
            onClick={() => setToast(null)}
          >
            Dismiss
          </button>
        </div>
      ) : (
        <p className="text-xs text-[var(--muted)]">
          Square path runs Module 1→18 in a snake grid. Gold nodes are unlocked;
          grey nodes need the previous module completed. Side quests (✦) and
          chests (◆) sit on the outer frame.
        </p>
      )}
    </div>
  );
}

function WarriorIcon() {
  return (
    <svg viewBox="0 0 64 64" width="40" height="40" aria-hidden>
      <circle cx="32" cy="18" r="10" fill="#f0d7a8" />
      <path d="M20 30h24l4 22H16l4-22z" fill="#2f8f5b" />
      <path d="M24 14h16l2 6H22l2-6z" fill="#c6a15b" />
      <path d="M44 34l14 4-8 6-6-10z" fill="#e2b84a" />
      <rect x="26" y="50" width="6" height="10" fill="#5b3a1e" />
      <rect x="34" y="50" width="6" height="10" fill="#5b3a1e" />
    </svg>
  );
}
