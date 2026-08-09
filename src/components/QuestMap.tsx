"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MODULES } from "@/lib/content/modules";
import { SIDEQUESTS } from "@/lib/content/sidequests";
import {
  CITY_BLOCKS,
  STREET_GRID,
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
      <div className="ws-map" role="img" aria-label="Wall Street quest map">
        <svg
          className="ws-map-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="harbor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a3a52" />
              <stop offset="55%" stopColor="#234e6d" />
              <stop offset="100%" stopColor="#163246" />
            </linearGradient>
            <pattern id="water-ripple" width="6" height="6" patternUnits="userSpaceOnUse">
              <path
                d="M0 3 Q1.5 2 3 3 T6 3"
                fill="none"
                stroke="rgba(180,210,230,0.12)"
                strokeWidth="0.2"
              />
            </pattern>
            <pattern id="stone" width="3" height="3" patternUnits="userSpaceOnUse">
              <rect width="3" height="3" fill="#2a3340" />
              <path d="M0 3 H3 M3 0 V3" stroke="rgba(255,255,255,0.04)" strokeWidth="0.15" />
            </pattern>
            <filter id="block-shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0.3" dy="0.5" stdDeviation="0.35" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Harbor */}
          <rect width="100" height="100" fill="url(#harbor)" />
          <rect width="100" height="100" fill="url(#water-ripple)" />

          {/* Manhattan tip landmass */}
          <path
            d="M10,20 C22,12 40,10 58,12 C78,14 94,22 96,40 C98,58 92,78 78,90 C62,98 38,98 22,92 C10,86 6,70 6,52 C6,36 8,26 10,20 Z"
            fill="#1e2633"
            stroke="#c6a15b"
            strokeWidth="0.45"
          />
          <path
            d="M14,24 C26,16 42,15 58,17 C74,19 88,26 90,40 C92,56 86,74 74,84 C58,92 38,92 24,86 C14,80 11,64 11,50 C11,36 12,28 14,24 Z"
            fill="url(#stone)"
          />

          {/* Building blocks */}
          {CITY_BLOCKS.map((b) => (
            <g key={b.id} filter="url(#block-shadow)">
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx="0.4"
                fill={b.fill}
                stroke="#1a1408"
                strokeWidth="0.25"
              />
              {/* window grid */}
              <path
                d={`M${b.x + 1.2},${b.y + 2} H${b.x + b.w - 1.2} M${b.x + 1.2},${b.y + b.h / 2} H${b.x + b.w - 1.2} M${b.x + 1.2},${b.y + b.h - 2} H${b.x + b.w - 1.2}`}
                stroke="rgba(226,184,74,0.18)"
                strokeWidth="0.2"
              />
              {b.id === "exchange" && (
                <text
                  x={b.x + b.w / 2}
                  y={b.y + b.h / 2 + 1}
                  textAnchor="middle"
                  fontSize="2.2"
                  fill="#e2b84a"
                  fontFamily="Georgia, serif"
                  fontWeight="700"
                >
                  NYSE
                </text>
              )}
            </g>
          ))}

          {/* Faint street grid */}
          {STREET_GRID.map((s, i) => (
            <line
              key={i}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="rgba(198,161,91,0.18)"
              strokeWidth="0.35"
            />
          ))}

          {/* Quest street path */}
          <path
            d={pathD}
            fill="none"
            stroke="#1a1408"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#d8c9a0"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#1a1408"
            strokeWidth="0.3"
            strokeDasharray="1.2 1.0"
            strokeLinecap="round"
            opacity="0.55"
          />

          {/* Small pier / bull tips */}
          <rect x="4" y="78" width="8" height="1.2" fill="#6b5a3a" />
          <rect x="88" y="30" width="8" height="1.2" fill="#6b5a3a" />
        </svg>

        {/* Quest nodes with street names */}
        {MODULES.map((m, i) => {
          const pos = moduleBoardPosition(i);
          const done = state.completedModules.includes(m.id);
          const unlocked = state.unlockedModules.includes(m.id) || done;
          const color = propertyColor(i);
          const labelAbove = i % 2 === 0;
          const className = `ws-node z-20 ${done ? "done" : ""} ${
            unlocked ? "unlocked" : "locked"
          }`;

          const body = (
            <>
              <span className="ws-node-dot" style={{ ["--prop" as string]: color }}>
                {m.number}
              </span>
              <span className={`ws-street-label ${labelAbove ? "above" : "below"}`}>
                {m.mapLabel}
              </span>
            </>
          );

          if (unlocked) {
            return (
              <Link
                key={m.id}
                href={`/quest/${m.id}`}
                className={`${className} pulse`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                title={`${m.number}. ${m.title}`}
                aria-label={`${m.number}. ${m.title}`}
              >
                {body}
              </Link>
            );
          }

          return (
            <button
              key={m.id}
              type="button"
              className={className}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              title={`Locked — complete module ${m.number - 1} first`}
              aria-label={`${m.number}. ${m.title} (locked)`}
              onClick={() =>
                setToast(
                  `Quest “${m.mapLabel}” (${m.title}) is locked. Clear Module ${
                    m.number - 1
                  } to unlock this street.`,
                )
              }
            >
              {body}
            </button>
          );
        })}

        {/* Side quests — alley deals */}
        {SIDEQUESTS.map((s, i) => {
          const pos = sidequestBoardPosition(i);
          const done = state.completedSidequests.includes(s.id);
          const chest = s.kind === "super-chest";
          return (
            <Link
              key={s.id}
              href={`/sidequest/${s.id}`}
              className={`ws-side z-10 ${chest ? "is-chest" : ""} ${done ? "done" : ""}`}
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
          className="ws-coin z-30"
          style={{ left: `${coinPos.x}%`, top: `calc(${coinPos.y}% - 3.4%)` }}
          aria-label="Your coin token"
        >
          <CoinIcon />
        </div>
      </div>

      {toast ? (
        <div className="rounded-xl border border-[var(--path)]/40 bg-black/40 px-4 py-3 text-sm text-[var(--muted)]">
          {toast}{" "}
          <Link href="/quest/m1" className="text-[var(--accent)] underline">
            Open Opening Bell
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
          Wall Street map: walk the street from Opening Bell to Fund Mandate.
          Street names are your syllabus quests. “?” = side deals, ◆ = vault
          chests. Your token is the gold coin.
        </p>
      )}
    </div>
  );
}

function CoinIcon() {
  return (
    <svg viewBox="0 0 64 64" width="48" height="48" aria-hidden className="ws-coin-svg">
      <ellipse cx="32" cy="36" rx="22" ry="10" fill="rgba(0,0,0,0.25)" />
      <ellipse cx="32" cy="34" rx="22" ry="22" fill="#a87820" />
      <ellipse cx="32" cy="30" rx="22" ry="22" fill="#e2b84a" />
      <ellipse cx="32" cy="30" rx="16" ry="16" fill="#f0d27a" />
      <ellipse
        cx="32"
        cy="30"
        rx="16"
        ry="16"
        fill="none"
        stroke="#a87820"
        strokeWidth="2"
      />
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fill="#5b3a1e"
        fontFamily="Georgia, serif"
      >
        $
      </text>
    </svg>
  );
}
