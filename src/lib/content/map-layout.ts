/**
 * Global quest map — four fused districts inspired by:
 * Wall Street, SoHo, Shenzhen–Nanshan, Canary Wharf.
 * All on-map names are syllabus quests (module mapLabels).
 */

export type Point = { x: number; y: number };

export type DistrictId = "wall-street" | "soho" | "nanshan" | "canary";

/** 18 quest nodes: 1–5 Wall St · 6–9 SoHo · 10–14 Nanshan · 15–18 Canary Wharf. */
export const MODULE_WORLD_POSITIONS: Point[] = [
  // Wall Street — stone exchange tip (SW)
  { x: 12, y: 84 }, // 1 Opening Bell
  { x: 22, y: 78 }, // 2 Exchange Floor
  { x: 32, y: 86 }, // 3 Risk Alley
  { x: 38, y: 74 }, // 4 Research Desk
  { x: 28, y: 64 }, // 5 Ledger Lane
  // SoHo — cast-iron loft grid (NW)
  { x: 36, y: 50 }, // 6 Ratio Row
  { x: 46, y: 38 }, // 7 Value Spire
  { x: 56, y: 26 }, // 8 Style Cross
  { x: 42, y: 16 }, // 9 Asset Pier
  // Shenzhen–Nanshan — tech bay (SE)
  { x: 52, y: 48 }, // 10 Portfolio Plaza
  { x: 64, y: 58 }, // 11 Macro Desk
  { x: 76, y: 68 }, // 12 News Wire
  { x: 88, y: 58 }, // 13 Crash Corridor
  { x: 80, y: 46 }, // 14 Crisis Archive
  // Canary Wharf — glass dock towers (NE)
  { x: 72, y: 34 }, // 15 Risk Bastion
  { x: 84, y: 22 }, // 16 Thesis Forge
  { x: 70, y: 14 }, // 17 Bias Mirror
  { x: 60, y: 28 }, // 18 Fund Mandate
];

export const PATH_WAYPOINTS: Point[] = [
  { x: 8, y: 90 },
  ...MODULE_WORLD_POSITIONS.slice(0, 5),
  { x: 34, y: 56 },
  ...MODULE_WORLD_POSITIONS.slice(5, 9),
  { x: 50, y: 42 },
  ...MODULE_WORLD_POSITIONS.slice(9, 14),
  { x: 76, y: 40 },
  ...MODULE_WORLD_POSITIONS.slice(14),
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

/**
 * District landmasses. `label` / `hubQuest` are quest names only
 * (no real-world place names on the map).
 */
export const DISTRICTS = [
  {
    id: "wall-street" as const,
    hubQuest: "Opening Bell",
    vibe: "stone",
    land: "M2,62 C12,54 22,58 30,66 C40,76 42,94 28,96 C12,98 0,88 2,74 Z",
    fill: "#2a3340",
    shore: "#1a222c",
    accent: "#c6a15b",
    labelAt: { x: 14, y: 96 },
  },
  {
    id: "soho" as const,
    hubQuest: "Style Cross",
    vibe: "loft",
    land: "M28,6 C46,2 68,4 72,16 C76,28 66,42 50,44 C36,46 26,34 24,20 C22,10 26,8 28,6 Z",
    fill: "#4a3530",
    shore: "#2e201c",
    accent: "#e8a87c",
    labelAt: { x: 48, y: 4 },
  },
  {
    id: "nanshan" as const,
    hubQuest: "Crisis Archive",
    vibe: "tech",
    land: "M54,44 C68,40 94,42 98,56 C100,70 90,82 74,84 C60,86 50,74 48,60 C46,48 50,46 54,44 Z",
    fill: "#1a3d48",
    shore: "#0f2832",
    accent: "#4ecdc4",
    labelAt: { x: 90, y: 78 },
  },
  {
    id: "canary" as const,
    hubQuest: "Fund Mandate",
    vibe: "wharf",
    land: "M56,8 C72,4 94,8 96,22 C98,34 88,42 74,40 C62,38 54,28 52,18 C50,10 54,8 56,8 Z",
    fill: "#243a55",
    shore: "#152536",
    accent: "#7eb6ff",
    labelAt: { x: 86, y: 8 },
  },
] as const;

/** Building footprints — style differs by district. */
export const CITY_BLOCKS = [
  // Wall Street — low stone
  { id: "ws1", district: "wall-street", x: 8, y: 70, w: 9, h: 8, fill: "#3a4554", kind: "stone" as const },
  { id: "ws2", district: "wall-street", x: 20, y: 72, w: 8, h: 10, fill: "#445062", kind: "stone" as const },
  { id: "ws3", district: "wall-street", x: 16, y: 62, w: 11, h: 6, fill: "#384454", kind: "stone" as const },
  { id: "nyse", district: "wall-street", x: 12, y: 76, w: 10, h: 7, fill: "#5a4a2e", kind: "stone" as const },
  // SoHo — mid brick / cast-iron
  { id: "sh1", district: "soho", x: 34, y: 14, w: 7, h: 11, fill: "#6b3f36", kind: "loft" as const },
  { id: "sh2", district: "soho", x: 44, y: 12, w: 9, h: 9, fill: "#7a4a3e", kind: "loft" as const },
  { id: "sh3", district: "soho", x: 56, y: 16, w: 7, h: 12, fill: "#5c3830", kind: "loft" as const },
  { id: "sh4", district: "soho", x: 46, y: 24, w: 10, h: 8, fill: "#8a5648", kind: "loft" as const },
  { id: "sh5", district: "soho", x: 32, y: 22, w: 6, h: 9, fill: "#6e4238", kind: "loft" as const },
  // Nanshan — glass tech towers
  { id: "sz1", district: "nanshan", x: 62, y: 52, w: 4.5, h: 18, fill: "#2a6a7a", kind: "tower" as const },
  { id: "sz2", district: "nanshan", x: 70, y: 48, w: 5, h: 22, fill: "#1f5a6a", kind: "tower" as const },
  { id: "sz3", district: "nanshan", x: 80, y: 54, w: 4.5, h: 16, fill: "#34808f", kind: "tower" as const },
  { id: "sz4", district: "nanshan", x: 66, y: 62, w: 8, h: 8, fill: "#275866", kind: "campus" as const },
  { id: "sz5", district: "nanshan", x: 84, y: 50, w: 5, h: 12, fill: "#3a90a0", kind: "tower" as const },
  // Canary Wharf — pale glass dock towers
  { id: "cw1", district: "canary", x: 64, y: 12, w: 4, h: 16, fill: "#3d5a7a", kind: "glass" as const },
  { id: "cw2", district: "canary", x: 72, y: 10, w: 5, h: 20, fill: "#4a6d94", kind: "glass" as const },
  { id: "cw3", district: "canary", x: 80, y: 14, w: 4, h: 14, fill: "#355878", kind: "glass" as const },
  { id: "cw4", district: "canary", x: 68, y: 22, w: 7, h: 8, fill: "#2f4f6e", kind: "campus" as const },
  { id: "mandate", district: "canary", x: 56, y: 20, w: 6, h: 14, fill: "#c6922e", kind: "glass" as const },
] as const;

/** Dock / canal water cuts (Canary + Nanshan). */
export const WATER_CUTS = [
  { id: "wharf-basin", d: "M62,18 C70,16 78,18 80,24 C78,28 70,28 64,26 Z", fill: "#1a4a68" },
  { id: "tech-bay", d: "M70,70 C78,68 90,70 92,76 C88,80 76,80 70,76 Z", fill: "#165a68" },
] as const;

/** Bridges between districts. */
export const CONNECTORS = [
  { id: "ws-soho", x1: 30, y1: 62, x2: 36, y2: 52 },
  { id: "soho-ns", x1: 50, y1: 40, x2: 54, y2: 46 },
  { id: "ns-cw", x1: 78, y1: 44, x2: 74, y2: 36 },
] as const;

export function sidequestBoardPosition(indexZeroBased: number): Point {
  const ring: Point[] = [
    { x: 8, y: 72 },
    { x: 36, y: 80 },
    { x: 20, y: 58 },
    { x: 50, y: 10 },
    { x: 66, y: 20 },
    { x: 38, y: 32 },
    { x: 54, y: 34 },
    { x: 94, y: 52 },
    { x: 60, y: 70 },
    { x: 86, y: 70 },
    { x: 92, y: 30 },
    { x: 58, y: 54 },
    { x: 48, y: 62 },
    { x: 74, y: 8 },
    { x: 26, y: 44 },
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

export function chancePilePosition(kind: "chance" | "chest"): Point {
  return kind === "chance" ? { x: 48, y: 56 } : { x: 58, y: 18 };
}
