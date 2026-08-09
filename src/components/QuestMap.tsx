"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MODULES } from "@/lib/content/modules";
import { SIDEQUESTS } from "@/lib/content/sidequests";
import {
  CHEST_MARKERS,
  MAP_HUD_ICONS,
  moduleBoardPosition,
  modulePathPoints,
  pathwayStones,
  portalColor,
  sidequestBoardPosition,
} from "@/lib/content/map-layout";
import {
  CoinIcon,
  CompassRose,
  HudBookIcon,
  HudCompassIcon,
  HudFlagIcon,
  HudScrollIcon,
  PortalArchIcon,
  TreasureChestIcon,
} from "@/components/MapIcons";
import type { GameState } from "@/lib/types";

const RealBasemap = dynamic(
  () => import("@/components/RealBasemap").then((m) => m.RealBasemap),
  { ssr: false, loading: () => <div className="hybrid-leaflet-fallback" /> },
);

const HUD_ICON = {
  book: HudBookIcon,
  scroll: HudScrollIcon,
  compass: HudCompassIcon,
  flag: HudFlagIcon,
} as const;

export function QuestMap({ state }: { state: GameState }) {
  const [toast, setToast] = useState<string | null>(null);
  const [showStreets, setShowStreets] = useState(false);
  const [posterStrength, setPosterStrength] = useState(1);

  const path = useMemo(() => modulePathPoints(), []);
  const pathD = path.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const stones = useMemo(() => pathwayStones(), []);

  const doneCount = state.completedModules.length;

  const coinPos = useMemo(() => {
    const unlockedIdx = MODULES.findIndex(
      (m) =>
        state.unlockedModules.includes(m.id) &&
        !state.completedModules.includes(m.id),
    );
    const useIdx =
      unlockedIdx >= 0 ? unlockedIdx : Math.min(Math.max(doneCount - 1, 0), 17);
    return moduleBoardPosition(useIdx);
  }, [state, doneCount]);

  const nextModuleHref = useMemo(() => {
    const unlocked = MODULES.find(
      (m) =>
        state.unlockedModules.includes(m.id) &&
        !state.completedModules.includes(m.id),
    );
    return `/quest/${unlocked?.id ?? "m1"}`;
  }, [state]);

  const sideDeals = useMemo(
    () => SIDEQUESTS.filter((s) => s.kind !== "super-chest"),
    [],
  );

  function onStoneClick(segment: number) {
    const from = MODULES[segment];
    const to = MODULES[segment + 1];
    if (!to) return;
    const unlocked =
      state.unlockedModules.includes(to.id) ||
      state.completedModules.includes(to.id);
    if (unlocked) {
      setToast(`Pathway open: ${from.mapLabel} → ${to.mapLabel}. Enter the portal.`);
    } else {
      setToast(
        `Pathway sealed. Clear “${from.mapLabel}” (Module ${from.number}) to open the road to “${to.mapLabel}”.`,
      );
    }
  }

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
        className="hybrid-map invest-map-2"
        role="img"
        aria-label="Investment Map 2 — portals, pathways, treasure chests"
      >
        <div
          className="hybrid-basemap"
          style={{ opacity: showStreets ? 1 : 0 }}
          aria-hidden={!showStreets}
        >
          <RealBasemap />
        </div>

        <div className="hybrid-poster" style={{ opacity: posterStrength }} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/maps/investment-map-2-poster.png" alt="" draggable={false} />
        </div>

        {/* Operationalized pathway stroke */}
        <svg
          className="hybrid-path"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d={pathD}
            fill="none"
            stroke="rgba(26,20,8,0.45)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#f7f3e8"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* White stepping-stone pathway nodes */}
        {stones.map((stone) => {
          const open = doneCount > stone.segment;
          return (
            <button
              key={stone.id}
              type="button"
              className={`path-stone z-10 ${open ? "open" : "sealed"}`}
              style={{ left: `${stone.x}%`, top: `${stone.y}%` }}
              title={
                open
                  ? `Open pathway segment ${stone.segment + 1}`
                  : `Sealed — finish module ${stone.segment + 1}`
              }
              aria-label={`Pathway stone ${stone.id}`}
              onClick={() => onStoneClick(stone.segment)}
            />
          );
        })}

        {/* Glowing portal arches = syllabus quests */}
        {MODULES.map((m, i) => {
          const pos = moduleBoardPosition(i);
          const done = state.completedModules.includes(m.id);
          const unlocked = state.unlockedModules.includes(m.id) || done;
          const color = portalColor(i);
          const labelAbove = i % 2 === 0;
          const className = `portal-pin z-20 ${done ? "done" : ""} ${
            unlocked ? "unlocked" : "locked"
          }`;

          const body = (
            <>
              <PortalArchIcon color={color} number={m.number} />
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
                setToast(
                  `Portal “${m.mapLabel}” is sealed. Clear Module ${m.number - 1} to enter.`,
                )
              }
            >
              {body}
            </button>
          );
        })}

        {/* Treasure chests ×12 (≥10), operationalized */}
        {CHEST_MARKERS.map((c) => {
          const done = state.completedSidequests.includes(c.sidequestId);
          return (
            <Link
              key={c.id}
              href={`/sidequest/${c.sidequestId}`}
              className={`map-chest ${done ? "done" : ""}`}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              title="Wealth treasure chest"
              aria-label="Wealth treasure chest"
            >
              <TreasureChestIcon />
            </Link>
          );
        })}

        {/* Side-deal markers (scrolls) — non-chest */}
        {sideDeals.map((s, i) => {
          const pos = sidequestBoardPosition(i);
          const done = state.completedSidequests.includes(s.id);
          return (
            <Link
              key={s.id}
              href={`/sidequest/${s.id}`}
              className={`map-deal z-10 ${done ? "done" : ""}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              title={s.title}
              aria-label={s.title}
            >
              ?
            </Link>
          );
        })}

        {/* Coin = user token */}
        <div
          className="hybrid-coin z-30"
          style={{ left: `${coinPos.x}%`, top: `calc(${coinPos.y}% - 3.5%)` }}
          aria-label="Your coin token"
        >
          <CoinIcon />
        </div>

        {/* Bottom-left HUD icons — operationalized */}
        <nav className="map-hud" aria-label="Map tools">
          {MAP_HUD_ICONS.map((icon) => {
            const Icon = HUD_ICON[icon.id];
            const href =
              icon.id === "book"
                ? nextModuleHref
                : icon.id === "scroll"
                  ? `/sidequest/${sideDeals.find((s) => !state.completedSidequests.includes(s.id))?.id ?? sideDeals[0]?.id ?? "sq-bank-loan"}`
                  : icon.href;
            return (
              <Link
                key={icon.id}
                href={href}
                className={`map-hud-btn hue-${icon.hue}`}
                title={icon.title}
                aria-label={icon.label}
              >
                <Icon />
                <span>{icon.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="map-compass" aria-hidden>
          <CompassRose />
        </div>
      </div>

      {toast ? (
        <div className="rounded-xl border border-[var(--path)]/40 bg-black/40 px-4 py-3 text-sm text-[var(--muted)]">
          {toast}{" "}
          <Link href={nextModuleHref} className="text-[var(--accent)] underline">
            Continue
          </Link>
          <button type="button" className="ml-3 text-xs underline" onClick={() => setToast(null)}>
            Dismiss
          </button>
        </div>
      ) : (
        <p className="text-xs text-[var(--muted)]">
          Investment Map 2: glowing portals are syllabus quests, white stones are
          pathways, chests are wealth trials, coin is you. HUD: Book · Scroll ·
          Compass · Flag.
        </p>
      )}
    </div>
  );
}
