"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MODULES } from "@/lib/content/modules";
import { SIDEQUESTS } from "@/lib/content/sidequests";
import {
  CITY_BLOCKS,
  CITY_LAND,
  NEIGHBORHOODS,
  STREETS,
  WATER_FEATURES,
  districtForModule,
  moduleBoardPosition,
  modulePathPoints,
  propertyColor,
  sidequestBoardPosition,
} from "@/lib/content/map-layout";
import type { GameState } from "@/lib/types";

function poly(points: { x: number; y: number }[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

export function QuestMap({ state }: { state: GameState }) {
  const [toast, setToast] = useState<string | null>(null);
  const path = useMemo(() => modulePathPoints(), []);
  const pathD = poly(path);

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
        className="city-map"
        role="img"
        aria-label="Cartographic quest city map combining financial and tech districts"
      >
        <svg
          className="city-map-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <pattern id="paper" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill="#e7e0d2" />
              <circle cx="1" cy="2" r="0.2" fill="rgba(0,0,0,0.03)" />
            </pattern>
            <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8ebfd4" />
              <stop offset="100%" stopColor="#6aa4bc" />
            </linearGradient>
            <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0.15" dy="0.2" stdDeviation="0.15" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Map sheet */}
          <rect width="100" height="100" fill="url(#paper)" />

          {/* Harbor water under / around city */}
          <rect width="100" height="100" fill="url(#water)" opacity="0.92" />
          <path
            d="M0,20 Q25,14 50,18 T100,16 V0 H0 Z"
            fill="rgba(255,255,255,0.08)"
          />

          {/* Continuous land */}
          <path d={CITY_LAND} fill="#d8d0c0" stroke="#5a5040" strokeWidth="0.35" />
          <path d={CITY_LAND} fill="#e4dcc8" opacity="0.55" />

          {/* Water features carved into land */}
          {WATER_FEATURES.map((w) => (
            <path
              key={w.id}
              d={w.d}
              fill="url(#water)"
              stroke="#4a7a90"
              strokeWidth="0.2"
            />
          ))}

          {/* City blocks / parcels */}
          {CITY_BLOCKS.map((b) => (
            <g key={b.id} filter="url(#ink)">
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                fill={b.fill}
                stroke="#5a5040"
                strokeWidth="0.18"
                rx={b.district === "soho" ? 0.1 : 0.25}
              />
              {/* window ticks by district */}
              {b.district === "soho" && (
                <path
                  d={`M${b.x + 1.5},${b.y + 1} V${b.y + b.h - 1} M${b.x + b.w / 2},${b.y + 1} V${b.y + b.h - 1} M${b.x + b.w - 1.5},${b.y + 1} V${b.y + b.h - 1}`}
                  stroke="rgba(80,40,30,0.25)"
                  strokeWidth="0.2"
                />
              )}
              {(b.district === "nanshan" || b.district === "canary") && b.h > 8 && (
                <>
                  {Array.from({ length: Math.floor(b.h / 2.5) }).map((_, i) => (
                    <line
                      key={i}
                      x1={b.x + 0.5}
                      y1={b.y + 1.2 + i * 2.2}
                      x2={b.x + b.w - 0.5}
                      y2={b.y + 1.2 + i * 2.2}
                      stroke="rgba(255,255,255,0.28)"
                      strokeWidth="0.12"
                    />
                  ))}
                </>
              )}
              {b.id === "cw-6" && (
                <text
                  x={b.x + b.w / 2}
                  y={b.y + b.h / 2 + 0.7}
                  textAnchor="middle"
                  fontSize="2.2"
                  fill="#1a1408"
                  fontFamily="Georgia, serif"
                  fontWeight="700"
                >
                  $
                </text>
              )}
            </g>
          ))}

          {/* Street network (white roads) */}
          {STREETS.map((s) => (
            <path
              key={s.id}
              d={poly(s.points)}
              fill="none"
              stroke="#f7f3e8"
              strokeWidth={s.id === "main" ? 2.4 : 1.35}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {STREETS.filter((s) => s.id !== "main").map((s) => (
            <path
              key={`${s.id}-edge`}
              d={poly(s.points)}
              fill="none"
              stroke="#6a6050"
              strokeWidth="0.25"
              strokeLinecap="round"
              opacity="0.45"
            />
          ))}

          {/* Quest avenue highlight */}
          <path
            d={pathD}
            fill="none"
            stroke="#c6922e"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1.6 0.9"
            opacity="0.95"
          />

          {/* Compass rose */}
          <g transform="translate(90 90)">
            <circle r="3.2" fill="#f7f3e8" stroke="#5a5040" strokeWidth="0.25" />
            <path d="M0,-2.4 L0.7,0.4 L0,0 L-0.7,0.4 Z" fill="#8a3030" />
            <text y="4.6" textAnchor="middle" fontSize="1.6" fill="#5a5040" fontWeight="700">
              N
            </text>
          </g>

          {/* Scale bar */}
          <g transform="translate(6 94)">
            <line x1="0" y1="0" x2="12" y2="0" stroke="#5a5040" strokeWidth="0.35" />
            <line x1="0" y1="-0.8" x2="0" y2="0.8" stroke="#5a5040" strokeWidth="0.3" />
            <line x1="12" y1="-0.8" x2="12" y2="0.8" stroke="#5a5040" strokeWidth="0.3" />
            <text x="6" y="-1.4" textAnchor="middle" fontSize="1.5" fill="#5a5040">
              0.5 mi
            </text>
          </g>
        </svg>

        {/* Neighborhood plates — quest names */}
        {NEIGHBORHOODS.map((n) => (
          <div
            key={n.id}
            className={`city-hood city-hood-${n.id}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {n.hubQuest}
          </div>
        ))}

        {/* Quest intersections */}
        {MODULES.map((m, i) => {
          const pos = moduleBoardPosition(i);
          const done = state.completedModules.includes(m.id);
          const unlocked = state.unlockedModules.includes(m.id) || done;
          const color = propertyColor(i);
          const district = districtForModule(i);
          const labelAbove = i % 2 === 0;
          const className = `city-node z-20 district-${district} ${done ? "done" : ""} ${
            unlocked ? "unlocked" : "locked"
          }`;

          const body = (
            <>
              <span className="city-node-dot" style={{ ["--prop" as string]: color }}>
                {m.number}
              </span>
              <span className={`city-street-label ${labelAbove ? "above" : "below"}`}>
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
                  `“${m.mapLabel}” is locked. Finish Module ${m.number - 1} first.`,
                )
              }
            >
              {body}
            </button>
          );
        })}

        {SIDEQUESTS.map((s, i) => {
          const pos = sidequestBoardPosition(i);
          const done = state.completedSidequests.includes(s.id);
          const chest = s.kind === "super-chest";
          return (
            <Link
              key={s.id}
              href={`/sidequest/${s.id}`}
              className={`city-side z-10 ${chest ? "is-chest" : ""} ${done ? "done" : ""}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              title={s.title}
              aria-label={s.title}
            >
              {chest ? "◆" : "?"}
            </Link>
          );
        })}

        <div
          className="city-coin z-30"
          style={{ left: `${coinPos.x}%`, top: `calc(${coinPos.y}% - 3%)` }}
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
          <button type="button" className="ml-3 text-xs underline" onClick={() => setToast(null)}>
            Dismiss
          </button>
        </div>
      ) : (
        <p className="text-xs text-[var(--muted)]">
          Street atlas of one city: irregular downtown tip, loft grid, tech
          campuses, dock towers. Street names are quests. Token: gold coin.
        </p>
      )}
    </div>
  );
}

function CoinIcon() {
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" aria-hidden className="city-coin-svg">
      <ellipse cx="32" cy="36" rx="22" ry="10" fill="rgba(0,0,0,0.25)" />
      <ellipse cx="32" cy="34" rx="22" ry="22" fill="#a87820" />
      <ellipse cx="32" cy="30" rx="22" ry="22" fill="#e2b84a" />
      <ellipse cx="32" cy="30" rx="16" ry="16" fill="#f0d27a" />
      <ellipse cx="32" cy="30" rx="16" ry="16" fill="none" stroke="#a87820" strokeWidth="2" />
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
