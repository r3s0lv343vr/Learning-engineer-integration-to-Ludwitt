"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MODULES } from "@/lib/content/modules";
import { SIDEQUESTS } from "@/lib/content/sidequests";
import {
  NEIGHBORHOODS,
  districtForModule,
  moduleBoardPosition,
  modulePathPoints,
  propertyColor,
  sidequestBoardPosition,
} from "@/lib/content/map-layout";
import type { GameState } from "@/lib/types";

const RealBasemap = dynamic(
  () => import("@/components/RealBasemap").then((m) => m.RealBasemap),
  { ssr: false, loading: () => <div className="hybrid-leaflet-fallback" /> },
);

export function QuestMap({ state }: { state: GameState }) {
  const [toast, setToast] = useState<string | null>(null);
  const [showStreets, setShowStreets] = useState(true);
  const [posterStrength, setPosterStrength] = useState(0.78);

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
      <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={showStreets}
            onChange={(e) => setShowStreets(e.target.checked)}
          />
          Real street basemap
        </label>
        <label className="inline-flex items-center gap-2">
          Poster strength
          <input
            type="range"
            min={0.35}
            max={1}
            step={0.05}
            value={posterStrength}
            onChange={(e) => setPosterStrength(Number(e.target.value))}
            className="w-28"
          />
        </label>
      </div>

      <div
        className="hybrid-map"
        role="img"
        aria-label="Illustrated quest city over a real street basemap"
      >
        {/* Layer 1 — real OSM/Carto streets (Lower Manhattan) */}
        <div
          className="hybrid-basemap"
          style={{ opacity: showStreets ? 1 : 0 }}
          aria-hidden={!showStreets}
        >
          <RealBasemap />
        </div>

        {/* Layer 2 — painted poster blending four district vibes */}
        <div
          className="hybrid-poster"
          style={{ opacity: posterStrength }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/maps/quest-city-poster.png"
            alt=""
            draggable={false}
          />
        </div>

        {/* Layer 3 — quest path + pins */}
        <svg
          className="hybrid-path"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d={pathD}
            fill="none"
            stroke="rgba(26,20,8,0.55)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#f0d27a"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1.4 0.9"
          />
        </svg>

        {NEIGHBORHOODS.map((n) => (
          <div
            key={n.id}
            className={`hybrid-hood hybrid-hood-${n.id}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {n.hubQuest}
          </div>
        ))}

        {MODULES.map((m, i) => {
          const pos = moduleBoardPosition(i);
          const done = state.completedModules.includes(m.id);
          const unlocked = state.unlockedModules.includes(m.id) || done;
          const color = propertyColor(i);
          const district = districtForModule(i);
          const labelAbove = i % 2 === 0;
          const className = `hybrid-pin z-20 district-${district} ${done ? "done" : ""} ${
            unlocked ? "unlocked" : "locked"
          }`;

          const body = (
            <>
              <span className="hybrid-pin-dot" style={{ ["--prop" as string]: color }}>
                {m.number}
              </span>
              <span className={`hybrid-pin-label ${labelAbove ? "above" : "below"}`}>
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
                setToast(`“${m.mapLabel}” is locked. Finish Module ${m.number - 1} first.`)
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
              className={`hybrid-side z-10 ${chest ? "is-chest" : ""} ${done ? "done" : ""}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              title={s.title}
              aria-label={s.title}
            >
              {chest ? "◆" : "?"}
            </Link>
          );
        })}

        <div
          className="hybrid-coin z-30"
          style={{ left: `${coinPos.x}%`, top: `calc(${coinPos.y}% - 2.8%)` }}
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
          Painted city poster over live Lower Manhattan streets. Drag the
          basemap to explore real geography; dial poster strength to let streets
          show through. Pins are syllabus quests. Token: gold coin.
        </p>
      )}
    </div>
  );
}

function CoinIcon() {
  return (
    <svg viewBox="0 0 64 64" width="46" height="46" aria-hidden className="hybrid-coin-svg">
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
