/**
 * Monopoly World overworld layout — organic islands in an ocean,
 * path winding like a classic SNES map, Monopoly property colors & landmarks.
 * Modules 1→18 travel toward the central Boardwalk Tower.
 */

export type Point = { x: number; y: number };

/** Hand-placed module nodes along the overworld path (percent coords). */
export const MODULE_WORLD_POSITIONS: Point[] = [
  { x: 10, y: 78 }, // 1  GO Bay / brown
  { x: 20, y: 84 }, // 2
  { x: 32, y: 88 }, // 3  Light-blue pier
  { x: 46, y: 82 }, // 4
  { x: 60, y: 86 }, // 5  Pink boardwalk
  { x: 74, y: 80 }, // 6  Jail Rock
  { x: 86, y: 70 }, // 7  Orange hills
  { x: 90, y: 56 }, // 8
  { x: 86, y: 40 }, // 9  Red hotel district
  { x: 76, y: 26 }, // 10
  { x: 60, y: 16 }, // 11 Yellow plateau
  { x: 44, y: 12 }, // 12
  { x: 26, y: 18 }, // 13 Green Free Parking
  { x: 14, y: 30 }, // 14
  { x: 10, y: 46 }, // 15 Dark-blue avenue
  { x: 14, y: 62 }, // 16 Tax Bridge
  { x: 28, y: 70 }, // 17 Railroad spur
  { x: 50, y: 48 }, // 18 Boardwalk Tower (center)
];

/** Extra points for a smooth white path (between modules). */
export const PATH_WAYPOINTS: Point[] = [
  { x: 8, y: 74 },
  ...MODULE_WORLD_POSITIONS.slice(0, 17),
  { x: 38, y: 64 },
  { x: 50, y: 48 },
];

export function moduleBoardPosition(indexZeroBased: number): Point {
  const i = Math.max(0, Math.min(indexZeroBased, MODULE_WORLD_POSITIONS.length - 1));
  return MODULE_WORLD_POSITIONS[i];
}

export function modulePathPoints(): Point[] {
  return PATH_WAYPOINTS;
}

/** Landmark props for the overworld (visual only unless noted). */
export const WORLD_LANDMARKS = [
  { id: "go", label: "GO", x: 8, y: 72, kind: "go" as const },
  { id: "jail", label: "JAIL", x: 78, y: 78, kind: "jail" as const },
  { id: "park", label: "FREE PARK", x: 24, y: 14, kind: "park" as const },
  { id: "tax", label: "TAX", x: 12, y: 58, kind: "tax" as const },
  { id: "rail-s", label: "RR", x: 50, y: 88, kind: "rail" as const },
  { id: "rail-e", label: "RR", x: 92, y: 48, kind: "rail" as const },
  { id: "rail-n", label: "RR", x: 52, y: 8, kind: "rail" as const },
  { id: "hotel", label: "HOTEL", x: 82, y: 32, kind: "hotel" as const },
  { id: "tower", label: "BOARDWALK", x: 50, y: 42, kind: "tower" as const },
] as const;

export const BOARD_CORNERS = [
  { id: "go", label: "GO", x: 8, y: 72, hue: "go" },
  { id: "jail", label: "JAIL", x: 78, y: 78, hue: "jail" },
  { id: "parking", label: "PARK", x: 24, y: 14, hue: "park" },
  { id: "tax", label: "TAX", x: 12, y: 58, hue: "tax" },
] as const;

/** Monopoly property stripe colors by classic color groups. */
export const PROPERTY_COLORS = [
  "#8b4513", // 1 brown
  "#8b4513", // 2
  "#87ceeb", // 3 light blue
  "#87ceeb", // 4
  "#ff69b4", // 5 pink
  "#ff69b4", // 6
  "#ffa500", // 7 orange
  "#ffa500", // 8
  "#e53935", // 9 red
  "#e53935", // 10
  "#f4d03f", // 11 yellow
  "#f4d03f", // 12
  "#2e8b57", // 13 green
  "#2e8b57", // 14
  "#1a237e", // 15 dark blue
  "#1a237e", // 16
  "#6d4c41", // 17 railroad
  "#c6922e", // 18 boardwalk gold
];

export function propertyColor(indexZeroBased: number): string {
  return PROPERTY_COLORS[indexZeroBased % PROPERTY_COLORS.length];
}

export function chancePilePosition(kind: "chance" | "chest"): Point {
  return kind === "chance" ? { x: 68, y: 58 } : { x: 36, y: 36 };
}

/** Side quests on small islets inside the sea. */
export function sidequestBoardPosition(
  indexZeroBased: number,
  _total: number,
): Point {
  const ring: Point[] = [
    { x: 38, y: 28 },
    { x: 58, y: 32 },
    { x: 66, y: 48 },
    { x: 58, y: 64 },
    { x: 40, y: 60 },
    { x: 32, y: 44 },
    { x: 48, y: 24 },
    { x: 72, y: 42 },
    { x: 70, y: 66 },
    { x: 44, y: 72 },
    { x: 28, y: 52 },
    { x: 54, y: 54 },
  ];
  return ring[indexZeroBased % ring.length] ?? { x: 50, y: 50 };
}

/** Island blobs for the SVG backdrop (Monopoly color districts). */
export const WORLD_ISLANDS = [
  {
    id: "go-bay",
    fill: "#5a8f3a",
    shore: "#3d6b28",
    d: "M2,68 C6,62 14,60 22,66 C28,72 26,86 18,90 C10,94 2,86 2,78 Z",
  },
  {
    id: "blue-pier",
    fill: "#4a9e6a",
    shore: "#2f6b45",
    d: "M28,78 C36,74 50,74 56,80 C60,86 54,94 42,94 C30,94 24,86 28,78 Z",
  },
  {
    id: "jail-rock",
    fill: "#6b7a5a",
    shore: "#4a5540",
    d: "M66,72 C74,68 88,70 92,78 C94,86 84,92 74,90 C64,88 60,80 66,72 Z",
  },
  {
    id: "orange-hills",
    fill: "#5f8a3e",
    shore: "#3f5e28",
    d: "M82,48 C90,42 96,50 94,62 C92,72 84,74 78,68 C74,60 76,52 82,48 Z",
  },
  {
    id: "red-hotels",
    fill: "#4e8a42",
    shore: "#325c2c",
    d: "M70,20 C80,16 92,22 92,34 C90,44 80,48 72,42 C66,36 64,26 70,20 Z",
  },
  {
    id: "yellow-mesa",
    fill: "#6a9648",
    shore: "#456830",
    d: "M38,6 C52,2 68,6 72,14 C74,22 64,28 50,26 C36,24 32,14 38,6 Z",
  },
  {
    id: "green-park",
    fill: "#3d9e55",
    shore: "#28703a",
    d: "M8,12 C20,6 34,10 36,20 C38,30 26,36 14,34 C4,32 2,20 8,12 Z",
  },
  {
    id: "navy-avenue",
    fill: "#4a7a48",
    shore: "#2f5230",
    d: "M2,38 C10,34 18,40 18,52 C18,64 10,70 4,64 C0,56 0,44 2,38 Z",
  },
  {
    id: "center-tower",
    fill: "#5c8f4a",
    shore: "#3a5e30",
    d: "M38,40 C46,34 58,34 64,42 C68,50 62,60 52,62 C42,64 34,54 38,40 Z",
  },
  {
    id: "chance-islet",
    fill: "#6b9e4e",
    shore: "#456832",
    d: "M64,54 C70,52 76,56 74,62 C72,68 64,68 62,62 C60,56 62,54 64,54 Z",
  },
  {
    id: "chest-islet",
    fill: "#6b9e4e",
    shore: "#456832",
    d: "M32,32 C38,30 44,34 42,40 C40,46 32,46 30,40 C28,34 30,32 32,32 Z",
  },
] as const;

// Back-compat aliases used elsewhere
export function moduleGridPosition(indexZeroBased: number) {
  return moduleBoardPosition(indexZeroBased);
}
