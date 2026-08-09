/**
 * One continuous city map — neighborhoods blend Wall Street, SoHo,
 * Shenzhen–Nanshan, and Canary Wharf into a single landmass.
 * All street labels are syllabus quest names.
 */

export type Point = { x: number; y: number };

export type DistrictId = "wall-street" | "soho" | "nanshan" | "canary";

/** Single continuous path across the city (18 quests). */
export const MODULE_WORLD_POSITIONS: Point[] = [
  // South tip — Wall Street stone quarter
  { x: 48, y: 90 }, // 1 Opening Bell
  { x: 38, y: 84 }, // 2 Exchange Floor
  { x: 28, y: 78 }, // 3 Risk Alley
  { x: 22, y: 68 }, // 4 Research Desk
  { x: 30, y: 58 }, // 5 Ledger Lane
  // West–center — SoHo loft grid
  { x: 40, y: 50 }, // 6 Ratio Row
  { x: 36, y: 38 }, // 7 Value Spire
  { x: 46, y: 30 }, // 8 Style Cross
  { x: 56, y: 24 }, // 9 Asset Pier
  // East — Nanshan tech ridge
  { x: 66, y: 32 }, // 10 Portfolio Plaza
  { x: 74, y: 42 }, // 11 Macro Desk
  { x: 80, y: 54 }, // 12 News Wire
  { x: 78, y: 66 }, // 13 Crash Corridor
  { x: 68, y: 72 }, // 14 Crisis Archive
  // North dock — Canary Wharf glass
  { x: 58, y: 62 }, // 15 Risk Bastion
  { x: 52, y: 48 }, // 16 Thesis Forge
  { x: 60, y: 38 }, // 17 Bias Mirror
  { x: 50, y: 42 }, // 18 Fund Mandate (civic core)
];

export const PATH_WAYPOINTS: Point[] = [
  { x: 52, y: 94 },
  ...MODULE_WORLD_POSITIONS,
];

export function moduleBoardPosition(indexZeroBased: number): Point {
  const i = Math.max(0, Math.min(indexZeroBased, MODULE_WORLD_POSITIONS.length - 1));
  return MODULE_WORLD_POSITIONS[i];
}

export function modulePathPoints(): Point[] {
  return PATH_WAYPOINTS;
}

export function districtForModule(indexZeroBased: number): DistrictId {
  if (indexZeroBased <= 4) return "wall-street";
  if (indexZeroBased <= 8) return "soho";
  if (indexZeroBased <= 13) return "nanshan";
  return "canary";
}

/** One peninsula landmass (continuous city in a harbor). */
export const CITY_LAND =
  "M46,96 C28,94 14,84 10,68 C6,50 12,32 22,20 C34,8 52,4 68,8 C84,12 94,26 96,44 C98,62 90,78 76,88 C64,96 54,98 46,96 Z";

/** Soft neighborhood tint overlays on the same land (not separate islands). */
export const NEIGHBORHOODS = [
  {
    id: "wall-street" as const,
    hubQuest: "Opening Bell",
    d: "M20,70 C28,62 40,68 48,78 C52,88 40,96 28,94 C18,90 16,78 20,70 Z",
    fill: "rgba(198,161,91,0.18)",
    labelAt: { x: 34, y: 92 },
  },
  {
    id: "soho" as const,
    hubQuest: "Style Cross",
    d: "M24,28 C34,18 52,16 58,28 C54,40 40,46 28,42 C22,36 22,32 24,28 Z",
    fill: "rgba(232,168,124,0.2)",
    labelAt: { x: 38, y: 22 },
  },
  {
    id: "nanshan" as const,
    hubQuest: "Crisis Archive",
    d: "M66,36 C78,30 92,38 92,54 C90,68 78,76 68,70 C62,60 60,44 66,36 Z",
    fill: "rgba(78,205,196,0.16)",
    labelAt: { x: 86, y: 70 },
  },
  {
    id: "canary" as const,
    hubQuest: "Fund Mandate",
    d: "M48,18 C60,12 76,14 82,26 C78,36 66,40 54,36 C48,30 46,22 48,18 Z",
    fill: "rgba(126,182,255,0.16)",
    labelAt: { x: 70, y: 12 },
  },
] as const;

/** Buildings sitting on the one city — mixed styles by quarter. */
export const CITY_BLOCKS = [
  // Wall Street south
  { id: "ws1", x: 34, y: 78, w: 8, h: 7, fill: "#3a4554", kind: "stone" as const },
  { id: "ws2", x: 44, y: 80, w: 7, h: 9, fill: "#445062", kind: "stone" as const },
  { id: "ws3", x: 26, y: 72, w: 9, h: 6, fill: "#384454", kind: "stone" as const },
  { id: "ws4", x: 40, y: 70, w: 8, h: 6, fill: "#5a4a2e", kind: "stone" as const },
  // SoHo west
  { id: "sh1", x: 28, y: 34, w: 6, h: 10, fill: "#6b3f36", kind: "loft" as const },
  { id: "sh2", x: 36, y: 28, w: 8, h: 9, fill: "#7a4a3e", kind: "loft" as const },
  { id: "sh3", x: 46, y: 32, w: 6, h: 11, fill: "#5c3830", kind: "loft" as const },
  { id: "sh4", x: 32, y: 44, w: 9, h: 7, fill: "#8a5648", kind: "loft" as const },
  // Nanshan east towers
  { id: "ns1", x: 72, y: 48, w: 4, h: 16, fill: "#2a6a7a", kind: "tower" as const },
  { id: "ns2", x: 80, y: 44, w: 5, h: 20, fill: "#1f5a6a", kind: "tower" as const },
  { id: "ns3", x: 70, y: 58, w: 6, h: 10, fill: "#34808f", kind: "campus" as const },
  { id: "ns4", x: 84, y: 56, w: 4, h: 12, fill: "#3a90a0", kind: "tower" as const },
  // Canary north glass + dock
  { id: "cw1", x: 56, y: 14, w: 4, h: 14, fill: "#3d5a7a", kind: "glass" as const },
  { id: "cw2", x: 64, y: 12, w: 5, h: 18, fill: "#4a6d94", kind: "glass" as const },
  { id: "cw3", x: 72, y: 16, w: 4, h: 12, fill: "#355878", kind: "glass" as const },
  { id: "core", x: 46, y: 38, w: 7, h: 10, fill: "#c6922e", kind: "glass" as const },
] as const;

/** Inner dock / canal cut into the same land (wharf feel). */
export const WATER_CUTS = [
  {
    id: "north-dock",
    d: "M54,16 C62,14 70,16 72,22 C68,26 60,26 54,24 Z",
    fill: "#1a4a68",
  },
  {
    id: "east-bay",
    d: "M76,62 C84,60 92,64 90,72 C84,76 76,74 74,68 Z",
    fill: "#165a68",
  },
] as const;

/** Street grid faint lines across the one city. */
export const STREET_GRID = [
  { x1: 20, y1: 70, x2: 70, y2: 78 },
  { x1: 24, y1: 50, x2: 78, y2: 58 },
  { x1: 30, y1: 30, x2: 82, y2: 38 },
  { x1: 40, y1: 88, x2: 40, y2: 28 },
  { x1: 56, y1: 90, x2: 56, y2: 16 },
  { x1: 72, y1: 80, x2: 72, y2: 20 },
] as const;

export function sidequestBoardPosition(indexZeroBased: number): Point {
  const ring: Point[] = [
    { x: 18, y: 74 },
    { x: 44, y: 86 },
    { x: 24, y: 48 },
    { x: 50, y: 18 },
    { x: 68, y: 20 },
    { x: 42, y: 42 },
    { x: 62, y: 50 },
    { x: 88, y: 48 },
    { x: 84, y: 68 },
    { x: 64, y: 80 },
    { x: 34, y: 64 },
    { x: 54, y: 56 },
    { x: 76, y: 36 },
    { x: 28, y: 36 },
    { x: 60, y: 70 },
  ];
  return ring[indexZeroBased % ring.length] ?? { x: 50, y: 50 };
}

export const DISTRICT_NODE_COLORS: Record<DistrictId, string[]> = {
  "wall-street": ["#c6922e", "#e2b84a", "#a87820", "#d4a017", "#b8953a"],
  soho: ["#e8a87c", "#d4896a", "#c47a5c", "#f0b896"],
  nanshan: ["#4ecdc4", "#3ecf8e", "#2a9d8f", "#5ee0d6", "#48b5ae"],
  canary: ["#7eb6ff", "#5b8def", "#9ec9ff", "#c6922e"],
};

export function propertyColor(indexZeroBased: number): string {
  const d = districtForModule(indexZeroBased);
  const palette = DISTRICT_NODE_COLORS[d];
  const local =
    d === "wall-street"
      ? indexZeroBased
      : d === "soho"
        ? indexZeroBased - 5
        : d === "nanshan"
          ? indexZeroBased - 9
          : indexZeroBased - 14;
  return palette[local % palette.length];
}

export function moduleGridPosition(indexZeroBased: number) {
  return moduleBoardPosition(indexZeroBased);
}
