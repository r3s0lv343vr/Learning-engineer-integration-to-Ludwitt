"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useRouter } from "next/navigation";
import { MODULES } from "@/lib/content/modules";
import { SIDEQUESTS } from "@/lib/content/sidequests";
import { EXAMS } from "@/lib/content/exams";
import { MAP_AREAS, areaForModuleNumber } from "@/lib/content/areas";
import { CITY_LIBRARIES } from "@/lib/content/libraries";
import { TRADE_AREAS } from "@/lib/content/trades";
import {
  CHEST_MARKERS,
  MAP_HUD_ICONS,
  moduleBoardPosition,
  modulePathPoints,
  pathwayStones,
  portalColorForModule,
  sidequestBoardPosition,
} from "@/lib/content/map-layout";
import {
  CoinIcon,
  CompassRose,
  ExamBadgeIcon,
  HudBookIcon,
  HudCompassIcon,
  HudFlagIcon,
  HudScrollIcon,
  PortalArchIcon,
  TreasureChestIcon,
} from "@/components/MapIcons";
import { MapPanZoom } from "@/components/MapPanZoom";
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

function clampPct(n: number) {
  return Math.min(96, Math.max(4, n));
}

export function QuestMap({ state }: { state: GameState }) {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const [showStreets, setShowStreets] = useState(false);
  const [posterStrength, setPosterStrength] = useState(1);
  const mapRef = useRef<HTMLDivElement>(null);
  const coinDragRef = useRef<{
    id: number;
    moved: boolean;
  } | null>(null);

  const unlockedExams = useMemo(
    () => state.unlockedExams ?? [],
    [state.unlockedExams],
  );
  const completedExams = useMemo(
    () => state.completedExams ?? [],
    [state.completedExams],
  );

  const path = useMemo(() => modulePathPoints(), []);
  const pathD = path.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const stones = useMemo(() => pathwayStones(), []);
  const doneCount = state.completedModules.length;

  const defaultCoinPos = useMemo(() => {
    const unlockedIdx = MODULES.findIndex(
      (m) =>
        state.unlockedModules.includes(m.id) &&
        !state.completedModules.includes(m.id),
    );
    const useIdx =
      unlockedIdx >= 0
        ? unlockedIdx
        : Math.min(Math.max(doneCount - 1, 0), MODULES.length - 1);
    return moduleBoardPosition(useIdx);
  }, [state, doneCount]);

  const [coinPos, setCoinPos] = useState(() => ({
    x: state.mapPosition?.x ?? defaultCoinPos.x,
    y: state.mapPosition?.y ?? defaultCoinPos.y,
  }));

  useEffect(() => {
    if (state.mapPosition?.x != null && state.mapPosition?.y != null) {
      setCoinPos({ x: state.mapPosition.x, y: state.mapPosition.y });
      return;
    }
    setCoinPos(defaultCoinPos);
  }, [state.mapPosition, defaultCoinPos]);

  const persistCoin = useCallback(async (x: number, y: number) => {
    await fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "move", x, y }),
    });
    router.refresh();
  }, [router]);

  function clientToPct(clientX: number, clientY: number) {
    const el = mapRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;
    return {
      x: clampPct(((clientX - rect.left) / rect.width) * 100),
      y: clampPct(((clientY - rect.top) / rect.height) * 100),
    };
  }

  function onCoinPointerDown(e: ReactPointerEvent<HTMLButtonElement>) {
    if (e.button !== 0) return;
    e.stopPropagation();
    coinDragRef.current = { id: e.pointerId, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onCoinPointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
    const d = coinDragRef.current;
    if (!d || d.id !== e.pointerId) return;
    d.moved = true;
    const next = clientToPct(e.clientX, e.clientY);
    if (next) setCoinPos(next);
  }

  async function onCoinPointerUp(e: ReactPointerEvent<HTMLButtonElement>) {
    const d = coinDragRef.current;
    if (!d || d.id !== e.pointerId) return;
    coinDragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (d.moved) {
      const next = clientToPct(e.clientX, e.clientY) ?? coinPos;
      setCoinPos(next);
      await persistCoin(next.x, next.y);
      setToast("Coin moved — drag it onto the next open portal.");
    }
  }

  const nextModuleHref = useMemo(() => {
    const unlocked = MODULES.find(
      (m) =>
        state.unlockedModules.includes(m.id) &&
        !state.completedModules.includes(m.id),
    );
    if (unlocked) return `/quest/${unlocked.id}`;
    const exam = EXAMS.find(
      (e) => unlockedExams.includes(e.id) && !completedExams.includes(e.id),
    );
    if (exam) return `/exam/${exam.id}`;
    return `/quest/m1`;
  }, [state, unlockedExams, completedExams]);

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
      setToast(`Pathway open: ${from.mapLabel} → ${to.mapLabel}.`);
    } else {
      setToast(
        `Pathway sealed. Clear “${from.mapLabel}” (and any exam gate) to reach “${to.mapLabel}”.`,
      );
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wide">
        {MAP_AREAS.map((a) => (
          <span
            key={a.id}
            className="rounded-full border px-2 py-1"
            style={{ borderColor: a.color, color: a.color }}
            title={a.blurb}
          >
            {a.name} · M{a.moduleStart}–{a.moduleEnd}
          </span>
        ))}
      </div>

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
        <Link href="/formulae" className="text-[var(--accent)] underline">
          Formulae Desk
        </Link>
      </div>

      <MapPanZoom
        overlay={
          <>
            <nav className="map-hud" aria-label="Map tools" data-map-chrome>
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
            <div className="map-compass" aria-hidden data-map-chrome>
              <CompassRose />
            </div>
          </>
        }
      >
      <div
        ref={mapRef}
        className="hybrid-map invest-map-2"
        aria-label="Investment Map with 36 portals, 9 exams, treasure chests, trade desks"
      >
        <div
          className="hybrid-basemap"
          style={{
            opacity: showStreets ? 1 : 0,
            pointerEvents: showStreets ? "auto" : "none",
          }}
          aria-hidden={!showStreets}
        >
          <RealBasemap />
        </div>

        <div className="hybrid-poster" style={{ opacity: posterStrength }} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/maps/investment-map-2-poster.jpg"
            alt=""
            draggable={false}
            decoding="async"
          />
        </div>

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
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#f7f3e8"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {MAP_AREAS.map((a) => (
          <div
            key={a.id}
            className="area-label"
            style={{
              left: `${a.labelAt.x}%`,
              top: `${a.labelAt.y}%`,
              borderColor: a.color,
              color: a.color,
            }}
          >
            {a.name}
          </div>
        ))}

        {stones.map((stone) => {
          const open = doneCount > stone.segment;
          return (
            <button
              key={stone.id}
              type="button"
              data-map-interactive
              className={`path-stone z-10 ${open ? "open" : "sealed"}`}
              style={{ left: `${stone.x}%`, top: `${stone.y}%` }}
              title={open ? "Open pathway" : "Sealed pathway"}
              aria-label={`Pathway stone ${stone.id}`}
              onClick={() => onStoneClick(stone.segment)}
            />
          );
        })}

        {MODULES.map((m, i) => {
          const pos = moduleBoardPosition(i);
          const done = state.completedModules.includes(m.id);
          const unlocked = state.unlockedModules.includes(m.id) || done;
          const color = portalColorForModule(m.number);
          const area = areaForModuleNumber(m.number);
          const labelAbove = i % 2 === 0;
          const className = `portal-pin z-20 strength-${area.strength} ${done ? "done" : ""} ${
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
                data-map-interactive
                className={`${className} pulse`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                title={`${m.number}. ${m.title} · ${area.name}`}
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
              data-map-interactive
              className={className}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              title={`Locked — ${area.name}`}
              aria-label={`${m.number}. ${m.title} (locked)`}
              onClick={() =>
                setToast(
                  `Portal “${m.mapLabel}” in ${area.name} is sealed. Clear prior modules/exams first.`,
                )
              }
            >
              {body}
            </button>
          );
        })}

        {/* 9 compulsory exams */}
        {EXAMS.map((exam) => {
          const done = completedExams.includes(exam.id);
          const unlocked = unlockedExams.includes(exam.id) || done;
          const className = `exam-pin z-25 ${done ? "done" : ""} ${
            unlocked ? "unlocked" : "locked"
          }`;
          const body = (
            <>
              <ExamBadgeIcon color={exam.color} roman={exam.roman} />
              <span className="hybrid-pin-label below">Exam {exam.roman}</span>
            </>
          );
          if (unlocked) {
            return (
              <Link
                key={exam.id}
                href={`/exam/${exam.id}`}
                data-map-interactive
                className={`${className} pulse`}
                style={{ left: `${exam.x}%`, top: `${exam.y}%` }}
                title={`${exam.title} (compulsory)`}
                aria-label={`Exam ${exam.roman}: ${exam.title}`}
              >
                {body}
              </Link>
            );
          }
          return (
            <button
              key={exam.id}
              type="button"
              data-map-interactive
              className={className}
              style={{ left: `${exam.x}%`, top: `${exam.y}%` }}
              title="Exam locked"
              aria-label={`Exam ${exam.roman} locked`}
              onClick={() =>
                setToast(
                  `Exam ${exam.roman} (“${exam.title}”) unlocks after Module ${exam.afterModuleId.replace("m", "")}.`,
                )
              }
            >
              {body}
            </button>
          );
        })}

        {/* City libraries — one per area (online classes + downloads) */}
        {CITY_LIBRARIES.map((lib) => {
          const area = MAP_AREAS.find((a) => a.id === lib.areaId);
          return (
            <Link
              key={lib.areaId}
              href={`/library/${lib.areaId}`}
              data-map-interactive
              className="library-pin"
              style={
                {
                  left: `${lib.x}%`,
                  top: `${lib.y}%`,
                  // City-tinted glow so each library reads on its district
                  "--glow-b": area?.color ?? "#8ec8ff",
                  "--glow-c": area?.color ?? "#5a96ff",
                } as CSSProperties
              }
              title={lib.name}
              aria-label={lib.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/library-icon.png" alt="" width={38} height={38} />
              <span className="hybrid-pin-label below">Library</span>
            </Link>
          );
        })}

        {/* City trade areas — 5–6 per district; gain/loss on book */}
        {TRADE_AREAS.map((t) => {
          const area = MAP_AREAS.find((a) => a.id === t.areaId);
          const done = (state.completedTrades ?? []).includes(t.id);
          return (
            <Link
              key={t.id}
              href={`/trade/${t.id}`}
              data-map-interactive
              className={`trade-pin ${done ? "done" : ""}`}
              style={
                {
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  "--glow-b": area?.color ?? "#c6a15b",
                  "--glow-c": area?.color ?? "#c6a15b",
                } as CSSProperties
              }
              title={`${t.title} · ${done ? "settled" : "open trade"}`}
              aria-label={t.title}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/trade-sword-icon.png" alt="" width={26} height={26} />
            </Link>
          );
        })}

        {/* Treasure chests — positions unchanged */}
        {CHEST_MARKERS.map((c) => {
          const done = state.completedSidequests.includes(c.sidequestId);
          return (
            <Link
              key={c.id}
              href={`/sidequest/${c.sidequestId}`}
              data-map-interactive
              className={`map-chest ${done ? "done" : ""}`}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              title="Wealth treasure chest"
              aria-label="Wealth treasure chest"
            >
              <TreasureChestIcon />
            </Link>
          );
        })}

        {sideDeals.map((s, i) => {
          const pos = sidequestBoardPosition(i);
          const done = state.completedSidequests.includes(s.id);
          return (
            <Link
              key={s.id}
              href={`/sidequest/${s.id}`}
              data-map-interactive
              className={`map-deal z-10 ${done ? "done" : ""}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              title={s.title}
              aria-label={s.title}
            >
              ?
            </Link>
          );
        })}

        <button
          type="button"
          data-coin-token
          className="hybrid-coin z-30 movable"
          style={{
            // Offset slightly so the coin does not cover the portal hit target
            left: `calc(${coinPos.x}% + 2.2%)`,
            top: `calc(${coinPos.y}% - 5.5%)`,
          }}
          aria-label="Your coin token — drag to move"
          title="Drag your coin to the next portal"
          onPointerDown={onCoinPointerDown}
          onPointerMove={onCoinPointerMove}
          onPointerUp={onCoinPointerUp}
          onPointerCancel={onCoinPointerUp}
        >
          <CoinIcon />
        </button>
      </div>
      </MapPanZoom>

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
          Drag to pan · zoom +/− · drag the gold coin · click open portals to
          complete them · chests stay put.
        </p>
      )}
    </div>
  );
}
