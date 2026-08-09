"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MODULES } from "@/lib/content/modules";
import { SIDEQUESTS } from "@/lib/content/sidequests";
import {
  WORLD_ISLANDS,
  WORLD_LANDMARKS,
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
      <div className="mono-world" role="img" aria-label="Monopoly World quest map">
        <svg
          className="mono-world-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <pattern id="sea-grid" width="4" height="4" patternUnits="userSpaceOnUse">
              <path
                d="M0 2 H4 M2 0 V4"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="0.15"
              />
            </pattern>
            <linearGradient id="sea-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1a5f9e" />
              <stop offset="45%" stopColor="#1470b8" />
              <stop offset="100%" stopColor="#0d4a7a" />
            </linearGradient>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0.4" stdDeviation="0.35" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Ocean */}
          <rect width="100" height="100" fill="url(#sea-grad)" />
          <rect width="100" height="100" fill="url(#sea-grid)" />
          {/* Soft wave bands */}
          <path
            d="M0,22 Q25,18 50,22 T100,22 V28 Q75,24 50,28 T0,28 Z"
            fill="rgba(255,255,255,0.04)"
          />
          <path
            d="M0,55 Q25,51 50,55 T100,55 V61 Q75,57 50,61 T0,61 Z"
            fill="rgba(255,255,255,0.035)"
          />

          {/* Islands */}
          {WORLD_ISLANDS.map((isle) => (
            <g key={isle.id} filter="url(#soft)">
              <path d={isle.d} fill={isle.shore} transform="translate(0.6 0.9)" />
              <path d={isle.d} fill={isle.fill} stroke="#1a1408" strokeWidth="0.35" />
              {/* grass speckles */}
              <path
                d={isle.d}
                fill="rgba(255,255,255,0.06)"
                transform="translate(-0.2 -0.3) scale(0.98)"
                style={{ transformOrigin: "50% 50%" }}
              />
            </g>
          ))}

          {/* Path — Mario-style white track with dark outline */}
          <path
            d={pathD}
            fill="none"
            stroke="#1a1408"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#f7f3e8"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#1a1408"
            strokeWidth="0.35"
            strokeDasharray="1.4 1.1"
            strokeLinecap="round"
            opacity="0.55"
          />

          {/* Tiny trees / houses decoration */}
          <g opacity="0.85">
            <ellipse cx="18" cy="70" rx="1.2" ry="1.4" fill="#2d6b32" />
            <ellipse cx="40" cy="90" rx="1.1" ry="1.3" fill="#2d6b32" />
            <ellipse cx="84" cy="52" rx="1.2" ry="1.4" fill="#2d6b32" />
            <ellipse cx="54" cy="14" rx="1.1" ry="1.3" fill="#2d6b32" />
            <rect x="79" y="28" width="2.2" height="2.8" fill="#c0392b" stroke="#1a1408" strokeWidth="0.2" />
            <rect x="81.5" y="30" width="1.6" height="2" fill="#e74c3c" stroke="#1a1408" strokeWidth="0.2" />
          </g>
        </svg>

        {/* Landmarks */}
        {WORLD_LANDMARKS.map((lm) => (
          <div
            key={lm.id}
            className={`mono-landmark mono-landmark-${lm.kind}`}
            style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
            title={lm.label}
          >
            {lm.kind === "tower" ? "◆" : lm.kind === "hotel" ? "⌂" : lm.kind === "rail" ? "▣" : lm.label}
          </div>
        ))}

        {/* Chance / Community Chest piles */}
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

        {/* Module nodes — property colored dots on the path */}
        {MODULES.map((m, i) => {
          const pos = moduleBoardPosition(i);
          const done = state.completedModules.includes(m.id);
          const unlocked = state.unlockedModules.includes(m.id) || done;
          const color = propertyColor(i);
          const className = `mono-node z-20 ${done ? "done" : ""} ${
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
                <span className="mono-node-ring" />
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
              <span className="mono-node-ring" />
              <span className="mono-num">{m.number}</span>
            </button>
          );
        })}

        {/* Side quests on islets */}
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
          style={{ left: `${coinPos.x}%`, top: `calc(${coinPos.y}% - 3.2%)` }}
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
          Monopoly World: sail the path from GO Bay to Boardwalk Tower. Colored
          dots are syllabus properties. “?” = Chance side quests, ◆ = wealth
          chests. Your token is the gold coin.
        </p>
      )}
    </div>
  );
}

function CoinIcon() {
  return (
    <svg viewBox="0 0 64 64" width="48" height="48" aria-hidden className="mono-coin-svg">
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
