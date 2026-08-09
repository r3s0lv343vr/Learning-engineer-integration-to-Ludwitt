/**
 * Wall Street quest map — Lower Manhattan financial-district layout.
 * Street corners are syllabus quests (names come from module mapLabels).
 */

export type Point = { x: number; y: number };

/** Module nodes along the trading-floor trail (percent coords). */
export const MODULE_WORLD_POSITIONS: Point[] = [
  { x: 16, y: 84 }, // 1  Opening Bell (Battery tip)
  { x: 28, y: 78 }, // 2  Exchange Floor
  { x: 42, y: 82 }, // 3  Risk Alley
  { x: 56, y: 76 }, // 4  Research Desk
  { x: 70, y: 80 }, // 5  Ledger Lane
  { x: 84, y: 72 }, // 6  Ratio Row
  { x: 88, y: 58 }, // 7  Value Spire
  { x: 82, y: 44 }, // 8  Style Cross
  { x: 70, y: 34 }, // 9  Asset Pier
  { x: 56, y: 26 }, // 10 Portfolio Plaza
  { x: 40, y: 22 }, // 11 Macro Desk
  { x: 24, y: 28 }, // 12 News Wire
  { x: 14, y: 40 }, // 13 Crash Corridor
  { x: 18, y: 54 }, // 14 Crisis Archive
  { x: 30, y: 62 }, // 15 Risk Bastion
  { x: 44, y: 56 }, // 16 Thesis Forge
  { x: 58, y: 50 }, // 17 Bias Mirror
  { x: 48, y: 40 }, // 18 Fund Mandate (exchange heart)
];

/** Dense path for the street stroke. */
export const PATH_WAYPOINTS: Point[] = [
  { x: 12, y: 88 },
  ...MODULE_WORLD_POSITIONS,
];

export function moduleBoardPosition(indexZeroBased: number): Point {
  const i = Math.max(0, Math.min(indexZeroBased, MODULE_WORLD_POSITIONS.length - 1));
  return MODULE_WORLD_POSITIONS[i];
}

export function modulePathPoints(): Point[] {
  return PATH_WAYPOINTS;
}

/** City building blocks (stone financial district). */
export const CITY_BLOCKS = [
  { id: "b1", x: 20, y: 68, w: 18, h: 12, fill: "#3a4554" },
  { id: "b2", x: 42, y: 70, w: 16, h: 10, fill: "#445062" },
  { id: "b3", x: 62, y: 66, w: 14, h: 12, fill: "#384454" },
  { id: "b4", x: 74, y: 48, w: 14, h: 16, fill: "#4a5568" },
  { id: "b5", x: 60, y: 38, w: 16, h: 12, fill: "#3d4a5c" },
  { id: "b6", x: 42, y: 30, w: 18, h: 14, fill: "#465468" },
  { id: "b7", x: 22, y: 34, w: 14, h: 16, fill: "#3a4658" },
  { id: "b8", x: 10, y: 48, w: 12, h: 14, fill: "#414d60" },
  { id: "b9", x: 34, y: 48, w: 14, h: 10, fill: "#4c586c" },
  { id: "b10", x: 52, y: 54, w: 12, h: 10, fill: "#3f4c5e" },
  { id: "exchange", x: 40, y: 34, w: 16, h: 12, fill: "#5a4a2e" },
] as const;

/** Harbor / pier shapes around the tip of Manhattan. */
export const HARBOR_SHAPES = [
  {
    id: "hudson",
    d: "M0,0 H100 V100 H0 Z",
  },
] as const;

/** District street grid lines (percent). */
export const STREET_GRID = [
  { x1: 12, y1: 90, x2: 90, y2: 70 },
  { x1: 90, y1: 70, x2: 86, y2: 30 },
  { x1: 86, y1: 30, x2: 20, y2: 24 },
  { x1: 20, y1: 24, x2: 12, y2: 56 },
  { x1: 12, y1: 56, x2: 48, y2: 40 },
  { x1: 28, y1: 88, x2: 28, y2: 60 },
  { x1: 56, y1: 82, x2: 56, y2: 28 },
  { x1: 72, y1: 78, x2: 40, y2: 50 },
] as const;

/** Accent “ticker” districts — labels use quest mapLabels at runtime. */
export const DISTRICT_MARKERS = [
  { id: "south", moduleIndex: 0, x: 14, y: 92 },
  { id: "east", moduleIndex: 6, x: 94, y: 58 },
  { id: "north", moduleIndex: 10, x: 40, y: 14 },
  { id: "west", moduleIndex: 13, x: 8, y: 52 },
  { id: "heart", moduleIndex: 17, x: 48, y: 34 },
] as const;

/** Side quests tucked on alley corners / piers. */
export function sidequestBoardPosition(indexZeroBased: number): Point {
  const ring: Point[] = [
    { x: 36, y: 70 },
    { x: 64, y: 58 },
    { x: 76, y: 38 },
    { x: 50, y: 18 },
    { x: 30, y: 36 },
    { x: 22, y: 66 },
    { x: 80, y: 64 },
    { x: 66, y: 22 },
    { x: 38, y: 44 },
    { x: 54, y: 64 },
    { x: 72, y: 50 },
    { x: 44, y: 74 },
    { x: 58, y: 36 },
    { x: 32, y: 52 },
    { x: 86, y: 48 },
  ];
  return ring[indexZeroBased % ring.length] ?? { x: 50, y: 50 };
}

/** District accent colors cycling by module index (ticker tape feel). */
export const TICKER_COLORS = [
  "#c6922e", // gold
  "#3ecf8e", // green up
  "#5b8def", // blue chip
  "#e2b84a",
  "#4ea8de",
  "#ff6b4a", // red tape / risk
  "#8b9bb4",
  "#d4a017",
];

export function propertyColor(indexZeroBased: number): string {
  return TICKER_COLORS[indexZeroBased % TICKER_COLORS.length];
}

// Back-compat aliases
export function moduleGridPosition(indexZeroBased: number) {
  return moduleBoardPosition(indexZeroBased);
}

export function chancePilePosition(kind: "chance" | "chest"): Point {
  return kind === "chance" ? { x: 68, y: 46 } : { x: 34, y: 46 };
}

export const BOARD_CORNERS = [] as const;
export const WORLD_LANDMARKS = [] as const;
export const WORLD_ISLANDS = [] as const;
export const PROPERTY_COLORS = TICKER_COLORS;
