"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MODULES } from "@/lib/content/modules";
import { SIDEQUESTS } from "@/lib/content/sidequests";
import {
  CITY_BLOCKS,
  CONNECTORS,
  DISTRICTS,
  WATER_CUTS,
  districtForModule,
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
      <div
        className="ws-map"
        role="img"
        aria-label="Global quest map: Opening Bell, Style Cross, Crisis Archive, Fund Mandate districts"
      >
        <svg
          className="ws-map-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="harbor" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#163246" />
              <stop offset="40%" stopColor="#1f4a62" />
              <stop offset="100%" stopColor="#0f2a3a" />
            </linearGradient>
            <pattern id="water-ripple" width="6" height="6" patternUnits="userSpaceOnUse">
              <path
                d="M0 3 Q1.5 2 3 3 T6 3"
                fill="none"
                stroke="rgba(180,210,230,0.1)"
                strokeWidth="0.2"
              />
            </pattern>
            <linearGradient id="glass-sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <filter id="block-shadow" x="-15%" y="-15%" width="140%" height="140%">
              <feDropShadow dx="0.25" dy="0.45" stdDeviation="0.3" floodOpacity="0.4" />
            </filter>
          </defs>

          <rect width="100" height="100" fill="url(#harbor)" />
          <rect width="100" height="100" fill="url(#water-ripple)" />

          {/* District landmasses */}
          {DISTRICTS.map((d) => (
            <g key={d.id}>
              <path d={d.land} fill={d.shore} transform="translate(0.5 0.7)" />
              <path
                d={d.land}
                fill={d.fill}
                stroke={d.accent}
                strokeWidth="0.4"
                opacity="0.98"
              />
            </g>
          ))}

          {/* Dock basins */}
          {WATER_CUTS.map((w) => (
            <path
              key={w.id}
              d={w.d}
              fill={w.fill}
              stroke="rgba(126,182,255,0.25)"
              strokeWidth="0.2"
            />
          ))}

          {/* Bridges */}
          {CONNECTORS.map((c) => (
            <g key={c.id}>
              <line
                x1={c.x1}
                y1={c.y1}
                x2={c.x2}
                y2={c.y2}
                stroke="#1a1408"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <line
                x1={c.x1}
                y1={c.y1}
                x2={c.x2}
                y2={c.y2}
                stroke="#d8c9a0"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeDasharray="1.2 0.7"
              />
            </g>
          ))}

          {/* Buildings */}
          {CITY_BLOCKS.map((b) => (
            <g key={b.id} filter="url(#block-shadow)">
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx={b.kind === "loft" ? 0.15 : 0.35}
                fill={b.fill}
                stroke="#1a1408"
                strokeWidth="0.22"
              />
              {b.kind === "loft" && (
                <>
                  {/* cast-iron window columns */}
                  <path
                    d={`M${b.x + 1.2},${b.y + 1.5} V${b.y + b.h - 1.2} M${b.x + b.w / 2},${b.y + 1.5} V${b.y + b.h - 1.2} M${b.x + b.w - 1.2},${b.y + 1.5} V${b.y + b.h - 1.2}`}
                    stroke="rgba(232,168,124,0.35)"
                    strokeWidth="0.25"
                  />
                  <rect
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height="1.1"
                    fill="rgba(0,0,0,0.25)"
                  />
                </>
              )}
              {(b.kind === "tower" || b.kind === "glass") && (
                <>
                  <rect
                    x={b.x + 0.4}
                    y={b.y + 0.4}
                    width={b.w - 0.8}
                    height={b.h - 0.8}
                    fill="url(#glass-sheen)"
                  />
                  {Array.from({ length: Math.max(2, Math.floor(b.h / 3)) }).map((_, i) => (
                    <line
                      key={i}
                      x1={b.x + 0.6}
                      y1={b.y + 1.5 + i * 2.4}
                      x2={b.x + b.w - 0.6}
                      y2={b.y + 1.5 + i * 2.4}
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="0.15"
                    />
                  ))}
                </>
              )}
              {b.kind === "stone" && (
                <path
                  d={`M${b.x + 1},${b.y + 2} H${b.x + b.w - 1} M${b.x + 1},${b.y + b.h / 2} H${b.x + b.w - 1}`}
                  stroke="rgba(226,184,74,0.2)"
                  strokeWidth="0.2"
                />
              )}
              {b.id === "mandate" && (
                <text
                  x={b.x + b.w / 2}
                  y={b.y + b.h / 2 + 0.8}
                  textAnchor="middle"
                  fontSize="1.8"
                  fill="#1a1408"
                  fontFamily="Georgia, serif"
                  fontWeight="700"
                >
                  $
                </text>
              )}
            </g>
          ))}

          {/* Quest path */}
          <path
            d={pathD}
            fill="none"
            stroke="#1a1408"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#d8c9a0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#1a1408"
            strokeWidth="0.28"
            strokeDasharray="1.1 0.9"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>

        {/* District hub badges — quest names only */}
        {DISTRICTS.map((d) => (
          <div
            key={d.id}
            className={`ws-district ws-district-${d.id}`}
            style={{ left: `${d.labelAt.x}%`, top: `${d.labelAt.y}%` }}
          >
            {d.hubQuest}
          </div>
        ))}

        {/* Quest nodes */}
        {MODULES.map((m, i) => {
          const pos = moduleBoardPosition(i);
          const done = state.completedModules.includes(m.id);
          const unlocked = state.unlockedModules.includes(m.id) || done;
          const color = propertyColor(i);
          const district = districtForModule(i);
          const labelAbove = i % 2 === 0;
          const className = `ws-node z-20 district-${district} ${done ? "done" : ""} ${
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

        {/* Side quests */}
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

        {/* Coin */}
        <div
          className="ws-coin z-30"
          style={{ left: `${coinPos.x}%`, top: `calc(${coinPos.y}% - 3.4%)` }}
          aria-label="Your coin token"
        >
          <CoinIcon />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wide text-[var(--muted)]">
        <span className="ws-legend-chip wall">Opening Bell · stone</span>
        <span className="ws-legend-chip soho">Style Cross · loft</span>
        <span className="ws-legend-chip nanshan">Crisis Archive · tech</span>
        <span className="ws-legend-chip canary">Fund Mandate · wharf</span>
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
          Four fused districts on one map — street names are your syllabus
          quests. Path: Opening Bell → Style Cross → Crisis Archive → Fund
          Mandate. “?” = side deals, ◆ = vault chests. Token: gold coin.
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
