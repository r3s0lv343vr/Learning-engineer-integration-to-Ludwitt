/**
 * Cartographic city map — one continuous landmass stitching:
 * Wall Street (irregular tip) · SoHo (cast-iron grid) ·
 * Shenzhen–Nanshan (tech parcels) · Canary Wharf (dock basins).
 * Street / node labels = syllabus quest names only.
 */

export type Point = { x: number; y: number };
export type DistrictId = "wall-street" | "soho" | "nanshan" | "canary";

/** Quest intersections along the main avenue (percent). */
export const MODULE_WORLD_POSITIONS: Point[] = [
  // Wall Street tip — irregular downtown
  { x: 42, y: 88 }, // 1 Opening Bell
  { x: 34, y: 82 }, // 2 Exchange Floor
  { x: 48, y: 78 }, // 3 Risk Alley
  { x: 38, y: 72 }, // 4 Research Desk
  { x: 52, y: 68 }, // 5 Ledger Lane
  // SoHo grid
  { x: 40, y: 58 }, // 6 Ratio Row
  { x: 52, y: 52 }, // 7 Value Spire
  { x: 40, y: 46 }, // 8 Style Cross
  { x: 52, y: 40 }, // 9 Asset Pier
  // Nanshan tech east
  { x: 66, y: 44 }, // 10 Portfolio Plaza
  { x: 76, y: 50 }, // 11 Macro Desk
  { x: 84, y: 58 }, // 12 News Wire
  { x: 78, y: 66 }, // 13 Crash Corridor
  { x: 70, y: 72 }, // 14 Crisis Archive
  // Canary Wharf north docks
  { x: 64, y: 32 }, // 15 Risk Bastion
  { x: 74, y: 24 }, // 16 Thesis Forge
  { x: 62, y: 18 }, // 17 Bias Mirror
  { x: 54, y: 28 }, // 18 Fund Mandate
];

export const PATH_WAYPOINTS: Point[] = [
  { x: 44, y: 94 },
  ...MODULE_WORLD_POSITIONS.slice(0, 5),
  { x: 46, y: 62 },
  ...MODULE_WORLD_POSITIONS.slice(5, 9),
  { x: 58, y: 42 },
  ...MODULE_WORLD_POSITIONS.slice(9, 14),
  { x: 66, y: 38 },
  ...MODULE_WORLD_POSITIONS.slice(14),
];

export function moduleBoardPosition(i: number): Point {
  const n = Math.max(0, Math.min(i, MODULE_WORLD_POSITIONS.length - 1));
  return MODULE_WORLD_POSITIONS[n];
}

export function modulePathPoints(): Point[] {
  return PATH_WAYPOINTS;
}

export function districtForModule(i: number): DistrictId {
  if (i <= 4) return "wall-street";
  if (i <= 8) return "soho";
  if (i <= 13) return "nanshan";
  return "canary";
}

/** Continuous peninsula shoreline (harbor on all sides). */
export const CITY_LAND =
  "M40,97 C22,94 10,82 8,64 C6,46 12,28 24,16 C36,6 52,3 68,6 C84,10 95,22 96,40 C97,56 92,68 86,76 C90,84 82,94 66,96 C54,98 46,98 40,97 Z";

/**
 * City blocks as real parcels — denser/irregular downtown,
 * orthogonal SoHo, large Nanshan campuses, Wharf towers around docks.
 */
export type Block = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  district: DistrictId;
};

export const CITY_BLOCKS: Block[] = [
  // —— Wall Street: small irregular parcels (rotated feel via offset sizes)
  { id: "ws-a", x: 30, y: 84, w: 7, h: 5, fill: "#b8b0a0", district: "wall-street" },
  { id: "ws-b", x: 38, y: 86, w: 6, h: 6, fill: "#c4bcae", district: "wall-street" },
  { id: "ws-c", x: 45, y: 84, w: 8, h: 5, fill: "#aea698", district: "wall-street" },
  { id: "ws-d", x: 28, y: 76, w: 5, h: 6, fill: "#bbb3a4", district: "wall-street" },
  { id: "ws-e", x: 35, y: 74, w: 7, h: 7, fill: "#c9c0b0", district: "wall-street" },
  { id: "ws-f", x: 44, y: 72, w: 6, h: 8, fill: "#b0a898", district: "wall-street" },
  { id: "ws-g", x: 52, y: 76, w: 5, h: 6, fill: "#c2b9a8", district: "wall-street" },
  { id: "ws-h", x: 32, y: 68, w: 6, h: 5, fill: "#a89f90", district: "wall-street" },
  { id: "ws-i", x: 48, y: 66, w: 7, h: 5, fill: "#bcb4a4", district: "wall-street" },
  // —— SoHo: regular cast-iron grid (even lots)
  { id: "sh-1", x: 30, y: 54, w: 8, h: 6, fill: "#c4a090", district: "soho" },
  { id: "sh-2", x: 40, y: 54, w: 8, h: 6, fill: "#d0ac9a", district: "soho" },
  { id: "sh-3", x: 50, y: 54, w: 8, h: 6, fill: "#b89484", district: "soho" },
  { id: "sh-4", x: 30, y: 46, w: 8, h: 6, fill: "#ccaa98", district: "soho" },
  { id: "sh-5", x: 40, y: 46, w: 8, h: 6, fill: "#d8b4a0", district: "soho" },
  { id: "sh-6", x: 50, y: 46, w: 8, h: 6, fill: "#c09c8c", district: "soho" },
  { id: "sh-7", x: 30, y: 38, w: 8, h: 6, fill: "#b89080", district: "soho" },
  { id: "sh-8", x: 40, y: 38, w: 8, h: 6, fill: "#d2ae9c", district: "soho" },
  { id: "sh-9", x: 50, y: 38, w: 8, h: 6, fill: "#c8a494", district: "soho" },
  // —— Nanshan: large tech campus slabs + tower pads
  { id: "ns-1", x: 62, y: 48, w: 10, h: 8, fill: "#8eb8b8", district: "nanshan" },
  { id: "ns-2", x: 74, y: 46, w: 12, h: 10, fill: "#7aa8a8", district: "nanshan" },
  { id: "ns-3", x: 64, y: 58, w: 8, h: 12, fill: "#6a9c9c", district: "nanshan" },
  { id: "ns-4", x: 74, y: 58, w: 6, h: 14, fill: "#5a9090", district: "nanshan" },
  { id: "ns-5", x: 82, y: 58, w: 6, h: 10, fill: "#70a4a4", district: "nanshan" },
  { id: "ns-6", x: 68, y: 72, w: 14, h: 6, fill: "#88b0b0", district: "nanshan" },
  // —— Canary Wharf: tower pads around dock basins
  { id: "cw-1", x: 58, y: 12, w: 5, h: 10, fill: "#8aa0b8", district: "canary" },
  { id: "cw-2", x: 66, y: 10, w: 6, h: 12, fill: "#7a94b0", district: "canary" },
  { id: "cw-3", x: 75, y: 14, w: 5, h: 9, fill: "#90a8c0", district: "canary" },
  { id: "cw-4", x: 58, y: 24, w: 6, h: 6, fill: "#849cb8", district: "canary" },
  { id: "cw-5", x: 68, y: 24, w: 8, h: 7, fill: "#9ab0c4", district: "canary" },
  { id: "cw-6", x: 52, y: 20, w: 5, h: 8, fill: "#c6a15b", district: "canary" },
];

/** Dock / river cuts carved into the land (Canary + Nanshan bay). */
export const WATER_FEATURES = [
  {
    id: "west-river",
    d: "M6,50 C10,40 12,30 16,22 L12,18 C8,28 4,42 4,56 Z",
  },
  {
    id: "east-river",
    d: "M90,40 C94,50 94,62 90,74 L96,76 C98,62 98,48 94,36 Z",
  },
  {
    id: "wharf-basin-1",
    d: "M60,16 C66,14 72,16 74,20 C72,24 66,24 60,22 Z",
  },
  {
    id: "wharf-basin-2",
    d: "M68,20 C74,18 80,20 80,26 C76,28 70,28 68,24 Z",
  },
  {
    id: "tech-inlet",
    d: "M86,64 C92,62 94,68 90,74 C86,72 84,68 86,64 Z",
  },
] as const;

/** Named streets drawn as white corridors (labels = quests in UI). */
export const STREETS: { id: string; points: Point[]; questIndex?: number }[] = [
  // Main spine
  {
    id: "main",
    points: PATH_WAYPOINTS,
  },
  // Wall St cross streets
  { id: "ws-x1", points: [{ x: 26, y: 84 }, { x: 56, y: 80 }] },
  { id: "ws-x2", points: [{ x: 28, y: 72 }, { x: 58, y: 70 }] },
  // SoHo avenues / streets
  { id: "sh-ave-w", points: [{ x: 38, y: 62 }, { x: 38, y: 36 }] },
  { id: "sh-ave-e", points: [{ x: 50, y: 62 }, { x: 50, y: 36 }] },
  { id: "sh-st-n", points: [{ x: 28, y: 42 }, { x: 60, y: 42 }] },
  { id: "sh-st-s", points: [{ x: 28, y: 50 }, { x: 60, y: 50 }] },
  // Nanshan arterials
  { id: "ns-ring", points: [{ x: 62, y: 44 }, { x: 88, y: 48 }, { x: 86, y: 70 }, { x: 66, y: 74 }, { x: 62, y: 44 }] },
  // Canary dock roads
  { id: "cw-loop", points: [{ x: 54, y: 14 }, { x: 80, y: 12 }, { x: 82, y: 28 }, { x: 56, y: 30 }, { x: 54, y: 14 }] },
];

/** Neighborhood callouts — quest hub names only. */
export const NEIGHBORHOODS = [
  { id: "wall-street" as const, hubQuest: "Opening Bell", x: 36, y: 94 },
  { id: "soho" as const, hubQuest: "Style Cross", x: 34, y: 34 },
  { id: "nanshan" as const, hubQuest: "Crisis Archive", x: 88, y: 78 },
  { id: "canary" as const, hubQuest: "Fund Mandate", x: 78, y: 8 },
] as const;

export function sidequestBoardPosition(i: number): Point {
  const ring: Point[] = [
    { x: 24, y: 80 },
    { x: 56, y: 86 },
    { x: 26, y: 56 },
    { x: 60, y: 48 },
    { x: 34, y: 42 },
    { x: 58, y: 36 },
    { x: 90, y: 52 },
    { x: 72, y: 80 },
    { x: 86, y: 70 },
    { x: 56, y: 14 },
    { x: 80, y: 20 },
    { x: 46, y: 60 },
    { x: 68, y: 56 },
    { x: 30, y: 66 },
    { x: 62, y: 66 },
  ];
  return ring[i % ring.length] ?? { x: 50, y: 50 };
}

export function propertyColor(i: number): string {
  const colors: Record<DistrictId, string> = {
    "wall-street": "#8a7040",
    soho: "#a06048",
    nanshan: "#2a8080",
    canary: "#3a5a8a",
  };
  return colors[districtForModule(i)];
}

export function moduleGridPosition(i: number) {
  return moduleBoardPosition(i);
}
