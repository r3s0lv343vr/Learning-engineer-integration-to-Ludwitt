"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MODULES } from "@/lib/content/modules";
import { SIDEQUESTS } from "@/lib/content/sidequests";
import {
  BOARD_CORNERS,
  chancePilePosition,
  moduleBoardPosition,
  modulePathPoints,
  propertyColor,
  sidequestBoardPosition,
} from "@/lib/content/map-layout";
import type { GameState } from "@/lib/types";

export function QuestMap({ state }: { state: GameState }) {
  const [toast, setToast] = useState<string | null>(null);
  const path = useMemo(() => modulePathPoints(), []);
  const pathD = path.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  const coinPos = useMemo(() => {
    const unlockedIdx = MODULES.findIndex(
      (m) =>
        state.unlockedModules.includes(m.id) &&
        !state.completedModules.includes(m.id),
    );
    const doneCount = state.completedModules.length;
    const useIdx =
      unlockedIdx >= 0 ? unlockedIdx : Math.min(Math.max(doneCount - 1, 0), 17);
    return moduleBoardPosition(useIdx);
  }, [state]);

  return (
    <div className="space-y-3">
      <div className="mono-board">
        {/* Center branding */}
        <div className="mono-center">
          <p className="display text-center text-[clamp(0.9rem,2.5vw,1.35rem)] leading-tight text-[#1a1408]">
            AI Investment
            <br />
            Learning Simulator
          </p>
          <p className="mt-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b3a1e]">
            Questfolio Board
          </p>
        </div>

        {/* Track path */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            fill="none"
            stroke="#1a1408"
            strokeWidth="0.6"
            opacity="0.35"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#f3efe4"
            strokeWidth="2.4"
            strokeLinejoin="round"
            opacity="0.35"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#1a1408"
            strokeWidth="1.1"
            strokeDasharray="1.8 1.2"
            strokeLinejoin="round"
            opacity="0.75"
          />
        </svg>

        {/* Corners */}
        {BOARD_CORNERS.map((c) => (
          <div
            key={c.id}
            className={`mono-corner mono-corner-${c.hue}`}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            title={c.label}
          >
            {c.label}
          </div>
        ))}

        {/* Chance / Community piles (visual) */}
        <div
          className="mono-pile chance"
          style={{
            left: `${chancePilePosition("chance").x}%`,
            top: `${chancePilePosition("chance").y}%`,
          }}
        >
          Chance
        </div>
        <div
          className="mono-pile chest"
          style={{
            left: `${chancePilePosition("chest").x}%`,
            top: `${chancePilePosition("chest").y}%`,
          }}
        >
          Chest
        </div>

        {/* Module property spaces */}
        {MODULES.map((m, i) => {
          const pos = moduleBoardPosition(i);
          const done = state.completedModules.includes(m.id);
          const unlocked = state.unlockedModules.includes(m.id) || done;
          const color = propertyColor(i);
          const className = `mono-space z-20 ${done ? "done" : ""} ${
            unlocked ? "unlocked" : "locked"
          }`;

          if (unlocked) {
            return (
              <Link
                key={m.id}
                href={`/quest/${m.id}`}
                className={`${className} pulse`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  ["--prop" as string]: color,
                }}
                title={`${m.number}. ${m.title}`}
                aria-label={`${m.number}. ${m.title}`}
              >
                <span className="mono-stripe" />
                <span className="mono-num">{m.number}</span>
              </Link>
            );
          }

          return (
            <button
              key={m.id}
              type="button"
              className={className}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                ["--prop" as string]: color,
              }}
              title={`Locked — complete module ${m.number - 1} first`}
              aria-label={`${m.number}. ${m.title} (locked)`}
              onClick={() =>
                setToast(
                  `Property ${m.number} “${m.title}” is locked. Clear Module ${
                    m.number - 1
                  } to unlock this syllabus quest.`,
                )
              }
            >
              <span className="mono-stripe" />
              <span className="mono-num">{m.number}</span>
            </button>
          );
        })}

        {/* Side quests / wealth chests in the inner board */}
        {SIDEQUESTS.map((s, i) => {
          const pos = sidequestBoardPosition(i, SIDEQUESTS.length);
          const done = state.completedSidequests.includes(s.id);
          const chest = s.kind === "super-chest";
          return (
            <Link
              key={s.id}
              href={`/sidequest/${s.id}`}
              className={`mono-side z-10 ${chest ? "is-chest" : ""} ${done ? "done" : ""}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              title={s.title}
              aria-label={s.title}
            >
              {chest ? "◆" : "?"}
            </Link>
          );
        })}

        {/* Coin player token */}
        <div
          className="mono-coin z-30"
          style={{ left: `${coinPos.x}%`, top: `calc(${coinPos.y}% + 2.8%)` }}
          aria-label="Your coin token"
        >
          <CoinIcon />
        </div>
      </div>

      {toast ? (
        <div className="rounded-xl border border-[var(--path)]/40 bg-black/40 px-4 py-3 text-sm text-[var(--muted)]">
          {toast}{" "}
          <Link href="/quest/m1" className="text-[var(--accent)] underline">
            Open Module 1 (GO)
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
          Monopoly board: travel clockwise from GO. Colored properties are
          syllabus modules. “?” = side quests, ◆ = wealth chests. Your token is
          the gold coin.
        </p>
      )}
    </div>
  );
}

function CoinIcon() {
  return (
    <svg viewBox="0 0 64 64" width="42" height="42" aria-hidden>
      <ellipse cx="32" cy="34" rx="22" ry="22" fill="#a87820" />
      <ellipse cx="32" cy="30" rx="22" ry="22" fill="#e2b84a" />
      <ellipse cx="32" cy="30" rx="16" ry="16" fill="#f0d27a" />
      <ellipse cx="32" cy="30" rx="16" ry="16" fill="none" stroke="#a87820" strokeWidth="2" />
      <text
        x="32"
        y="36"
        textAnchor="middle"
        fontSize="18"
        fontWeight="800"
        fill="#5b3a1e"
        fontFamily="Georgia, serif"
      >
        $
      </text>
    </svg>
  );
}
