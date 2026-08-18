/**
 * Investment Map 2 layout — 36 portals across four named areas.
 * Treasure chest positions are frozen (do not move).
 */

import { MAP_AREAS, type StrengthHue } from "@/lib/content/areas";

export type Point = { x: number; y: number };

export const STRENGTH_COLORS: Record<StrengthHue, string> = {
  purple: "#7c4dff",
  blue: "#2196f3",
  green: "#43a047",
  gold: "#c6922e",
};

export function portalColorForModule(number: number): string {
  const area = MAP_AREAS.find(
    (a) => number >= a.moduleStart && number <= a.moduleEnd,
  );
  return area ? STRENGTH_COLORS[area.strength] : "#7c4dff";
}

/**
 * 36 portal positions — 9 per area on investment-map-2-poster.png
 * Coral Ledger Bay (SW) → Brick Exchange (SE) → Signal Quay (NE) → Mandate Highlands (NW/center)
 */
export const MODULE_WORLD_POSITIONS: Point[] = [
  // Coral Ledger Bay (1–9) SW shores
  { x: 20, y: 80 },
  { x: 28, y: 84 },
  { x: 36, y: 78 },
  { x: 24, y: 72 },
  { x: 32, y: 68 },
  { x: 40, y: 72 },
  { x: 22, y: 62 },
  { x: 30, y: 58 },
  { x: 38, y: 62 },
  // Brick Exchange (10–18) SE industrial
  { x: 56, y: 80 },
  { x: 64, y: 84 },
  { x: 72, y: 78 },
  { x: 80, y: 74 },
  { x: 60, y: 70 },
  { x: 68, y: 66 },
  { x: 76, y: 62 },
  { x: 84, y: 66 },
  { x: 72, y: 56 },
  // Signal Quay (19–27) NE metro / docks
  { x: 78, y: 48 },
  { x: 86, y: 44 },
  { x: 80, y: 38 },
  { x: 72, y: 42 },
  { x: 88, y: 34 },
  { x: 76, y: 30 },
  { x: 68, y: 34 },
  { x: 84, y: 24 },
  { x: 70, y: 22 },
  // Mandate Highlands (28–36) NW classical → center
  { x: 52, y: 24 },
  { x: 42, y: 20 },
  { x: 32, y: 24 },
  { x: 24, y: 32 },
  { x: 34, y: 36 },
  { x: 44, y: 32 },
  { x: 38, y: 44 },
  { x: 48, y: 40 },
  { x: 58, y: 45 }, // 36 — center of the central rotunda plaza
];

/** FROZEN — do not reposition treasure chests. */
export const CHEST_MARKERS: { id: string; sidequestId: string; x: number; y: number }[] = [
  { id: "chest-1", sidequestId: "sq-chest-1", x: 18, y: 70 },
  { id: "chest-2", sidequestId: "sq-chest-2", x: 44, y: 84 },
  { id: "chest-3", sidequestId: "sq-chest-3", x: 62, y: 82 },
  { id: "chest-4", sidequestId: "sq-chest-4", x: 84, y: 72 },
  { id: "chest-5", sidequestId: "sq-chest-5", x: 88, y: 52 },
  { id: "chest-6", sidequestId: "sq-chest-6", x: 86, y: 28 },
  { id: "chest-7", sidequestId: "sq-chest-7", x: 58, y: 16 },
  { id: "chest-8", sidequestId: "sq-chest-8", x: 36, y: 18 },
  { id: "chest-9", sidequestId: "sq-chest-9", x: 16, y: 40 },
  { id: "chest-10", sidequestId: "sq-chest-10", x: 48, y: 58 },
  { id: "chest-11", sidequestId: "sq-chest-3", x: 74, y: 56 },
  { id: "chest-12", sidequestId: "sq-chest-5", x: 52, y: 38 },
];

export const REAL_BASEMAP = {
  center: [40.7175, -74.005] as [number, number],
  zoom: 13,
  tileUrl:
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

export function moduleBoardPosition(i: number): Point {
  const n = Math.max(0, Math.min(i, MODULE_WORLD_POSITIONS.length - 1));
  return MODULE_WORLD_POSITIONS[n];
}

export function modulePathPoints(): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < MODULE_WORLD_POSITIONS.length - 1; i++) {
    const a = MODULE_WORLD_POSITIONS[i];
    const b = MODULE_WORLD_POSITIONS[i + 1];
    pts.push(a);
    pts.push({
      x: Math.round((a.x + b.x) / 2),
      y: Math.round((a.y + b.y) / 2),
    });
  }
  pts.push(MODULE_WORLD_POSITIONS[MODULE_WORLD_POSITIONS.length - 1]);
  return pts;
}

export type PathStone = Point & { segment: number; id: string };

export function pathwayStones(): PathStone[] {
  const stones: PathStone[] = [];
  for (let i = 0; i < MODULE_WORLD_POSITIONS.length - 1; i++) {
    const a = MODULE_WORLD_POSITIONS[i];
    const b = MODULE_WORLD_POSITIONS[i + 1];
    // Fewer stones so 36-module path stays readable
    stones.push({
      id: `stone-${i}`,
      segment: i,
      x: Math.round(a.x + (b.x - a.x) * 0.5),
      y: Math.round(a.y + (b.y - a.y) * 0.5),
    });
  }
  return stones;
}

export function propertyColor(i: number): string {
  return portalColorForModule(i + 1);
}

export function sidequestBoardPosition(i: number): Point {
  const ring: Point[] = [
    { x: 24, y: 86 },
    { x: 48, y: 76 },
    { x: 66, y: 70 },
    { x: 80, y: 60 },
    { x: 78, y: 44 },
    { x: 66, y: 26 },
    { x: 44, y: 22 },
    { x: 22, y: 52 },
    { x: 56, y: 48 },
    { x: 34, y: 56 },
    { x: 60, y: 54 },
    { x: 42, y: 44 },
  ];
  return ring[i % ring.length] ?? { x: 50, y: 50 };
}

export function moduleGridPosition(i: number) {
  return moduleBoardPosition(i);
}

export const MAP_HUD_ICONS = [
  {
    id: "scroll",
    label: "Side deals",
    hue: "blue",
    href: "/sidequest/sq-bank-loan",
    title: "Open side-deal scroll",
  },
  {
    id: "compass",
    label: "Markets",
    hue: "green",
    href: "/markets",
    title: "Navigate to markets",
  },
  {
    id: "flag",
    label: "Portfolio",
    hue: "red",
    href: "/portfolio",
    title: "Claim your portfolio flag",
  },
] as const;

/** Re-export areas for map labels */
export { MAP_AREAS };
