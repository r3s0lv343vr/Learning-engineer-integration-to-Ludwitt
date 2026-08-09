/**
 * Investment Map 2 layout — isometric archipelago poster coordinates.
 * Portals = syllabus quests · white nodes = pathway · chests = wealth.
 */

export type Point = { x: number; y: number };
export type DistrictId = "wall-street" | "soho" | "nanshan" | "canary";

/** Glowing portal colors (reference Investment Map 2). */
export const PORTAL_COLORS = [
  "#7c4dff", // purple
  "#2196f3", // blue
  "#43a047", // green
  "#ff9800", // orange
  "#e53935", // red
  "#00bcd4", // teal
  "#ec407a", // pink
  "#c6922e", // gold
];

export function portalColor(i: number): string {
  return PORTAL_COLORS[i % PORTAL_COLORS.length];
}

/**
 * Module portals on investment-map-2-poster.png
 * SW beach → SE brick → NE metro → NW classical → center
 */
export const MODULE_WORLD_POSITIONS: Point[] = [
  // SW tropical / Opening Bell shore
  { x: 22, y: 78 }, // 1
  { x: 30, y: 72 }, // 2
  { x: 38, y: 80 }, // 3
  { x: 28, y: 64 }, // 4
  { x: 40, y: 68 }, // 5
  // SE brick industrial
  { x: 58, y: 74 }, // 6
  { x: 70, y: 78 }, // 7
  { x: 78, y: 68 }, // 8
  { x: 68, y: 60 }, // 9
  // NE modern metro / docks
  { x: 72, y: 48 }, // 10
  { x: 82, y: 40 }, // 11
  { x: 74, y: 30 }, // 12
  { x: 64, y: 36 }, // 13
  { x: 70, y: 22 }, // 14
  // NW classical / mountains → center mandate
  { x: 48, y: 28 }, // 15
  { x: 34, y: 32 }, // 16
  { x: 28, y: 44 }, // 17
  { x: 50, y: 50 }, // 18 Fund Mandate (central plaza)
];

/** Real basemap under the poster (optional). */
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

/** Dense waypoints for the golden path stroke. */
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

/**
 * White stepping-stone nodes along pathways (operationalized).
 * Each stone knows which module segment it belongs to (unlock gate).
 */
export type PathStone = Point & { segment: number; id: string };

export function pathwayStones(): PathStone[] {
  const stones: PathStone[] = [];
  for (let i = 0; i < MODULE_WORLD_POSITIONS.length - 1; i++) {
    const a = MODULE_WORLD_POSITIONS[i];
    const b = MODULE_WORLD_POSITIONS[i + 1];
    for (const t of [0.33, 0.66]) {
      stones.push({
        id: `stone-${i}-${t}`,
        segment: i,
        x: Math.round(a.x + (b.x - a.x) * t),
        y: Math.round(a.y + (b.y - a.y) * t),
      });
    }
  }
  return stones;
}

export function districtForModule(i: number): DistrictId {
  if (i <= 4) return "soho"; // beach / resort start
  if (i <= 8) return "wall-street"; // brick industrial
  if (i <= 13) return "nanshan"; // modern metro
  return "canary"; // classical → mandate
}

export function propertyColor(i: number): string {
  return portalColor(i);
}

/** 12 treasure chest placements (≥10) — ids match sidequest chests. */
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

/** Side deals (non-chest) tucked near alleys. */
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

/** Bottom-left HUD icons — operational targets. */
export const MAP_HUD_ICONS = [
  {
    id: "book",
    label: "Syllabus",
    hue: "purple",
    href: "/quest/m1",
    title: "Open syllabus quest (Opening Bell)",
  },
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
