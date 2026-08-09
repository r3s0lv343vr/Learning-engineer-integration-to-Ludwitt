"use client";

import Link from "next/link";
import { MODULES } from "@/lib/content/modules";
import { SIDEQUESTS } from "@/lib/content/sidequests";
import type { GameState } from "@/lib/types";

export function QuestMap({ state }: { state: GameState }) {
  return (
    <div className="map-canvas">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={MODULES.map((m, i) => `${i === 0 ? "M" : "L"} ${m.x} ${m.y}`).join(" ")}
          fill="none"
          stroke="#c6a15b"
          strokeWidth="1.2"
          strokeDasharray="2 1.5"
        />
      </svg>

      {MODULES.map((m) => {
        const done = state.completedModules.includes(m.id);
        const unlocked = state.unlockedModules.includes(m.id) || done;
        return (
          <Link
            key={m.id}
            href={unlocked ? `/quest/${m.id}` : "/map"}
            className={`quest-node pulse ${done ? "done" : ""} ${unlocked ? "" : "locked"}`}
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            title={m.title}
            aria-label={m.title}
          >
            {m.number}
          </Link>
        );
      })}

      {SIDEQUESTS.map((s) => {
        const done = state.completedSidequests.includes(s.id);
        const chest = s.kind === "super-chest";
        return (
          <Link
            key={s.id}
            href={`/sidequest/${s.id}`}
            className={`quest-node ${chest ? "chest" : "side"} ${done ? "done" : ""}`}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            title={s.title}
            aria-label={s.title}
          >
            {chest ? "◆" : "✦"}
          </Link>
        );
      })}

      <div
        className="warrior"
        style={{ left: `${state.mapPosition.x}%`, top: `${state.mapPosition.y}%` }}
        aria-label="Warrior avatar"
      >
        <WarriorIcon />
      </div>
    </div>
  );
}

function WarriorIcon() {
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" aria-hidden>
      <circle cx="32" cy="18" r="10" fill="#f0d7a8" />
      <path d="M20 30h24l4 22H16l4-22z" fill="#2f8f5b" />
      <path d="M24 14h16l2 6H22l2-6z" fill="#c6a15b" />
      <path d="M44 34l14 4-8 6-6-10z" fill="#e2b84a" />
      <rect x="26" y="50" width="6" height="10" fill="#5b3a1e" />
      <rect x="34" y="50" width="6" height="10" fill="#5b3a1e" />
    </svg>
  );
}
