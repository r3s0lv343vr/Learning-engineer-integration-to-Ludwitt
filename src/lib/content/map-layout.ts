/**
 * Hybrid quest map coordinates (percent over the illustrated poster).
 * Districts on the painted city:
 *  1–5  Wall Street tip (south)
 *  6–9  SoHo loft grid (west-center)
 * 10–14 Nanshan tech bay (east)
 * 15–18 Canary Wharf docks (northeast)
 */

export type Point = { x: number; y: number };
export type DistrictId = "wall-street" | "soho" | "nanshan" | "canary";

/** Pin positions aligned to public/maps/quest-city-poster.png */
export const MODULE_WORLD_POSITIONS: Point[] = [
  // Wall Street — southern tip / stone canyons
  { x: 48, y: 90 }, // 1 Opening Bell
  { x: 42, y: 82 }, // 2 Exchange Floor
  { x: 54, y: 78 }, // 3 Risk Alley
  { x: 46, y: 72 }, // 4 Research Desk
  { x: 56, y: 68 }, // 5 Ledger Lane
  // SoHo — brick loft grid west-center
  { x: 34, y: 60 }, // 6 Ratio Row
  { x: 28, y: 50 }, // 7 Value Spire
  { x: 38, y: 44 }, // 8 Style Cross
  { x: 30, y: 36 }, // 9 Asset Pier
  // Nanshan — glass tech east
  { x: 62, y: 52 }, // 10 Portfolio Plaza
  { x: 72, y: 48 }, // 11 Macro Desk
  { x: 78, y: 56 }, // 12 News Wire
  { x: 74, y: 64 }, // 13 Crash Corridor
  { x: 66, y: 58 }, // 14 Crisis Archive
  // Canary Wharf — north dock basins
  { x: 68, y: 34 }, // 15 Risk Bastion
  { x: 76, y: 26 }, // 16 Thesis Forge
  { x: 64, y: 22 }, // 17 Bias Mirror
  { x: 58, y: 30 }, // 18 Fund Mandate
];

/** Real basemap focus: Lower Manhattan (Wall Street → SoHo). */
export const REAL_BASEMAP = {
  center: [40.7175, -74.005] as [number, number],
  zoom: 13,
  /** Carto Voyager — readable street atlas tiles */
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
  return [{ x: 50, y: 94 }, ...MODULE_WORLD_POSITIONS];
}

export function districtForModule(i: number): DistrictId {
  if (i <= 4) return "wall-street";
  if (i <= 8) return "soho";
  if (i <= 13) return "nanshan";
  return "canary";
}

export function propertyColor(i: number): string {
  const colors: Record<DistrictId, string> = {
    "wall-street": "#c6922e",
    soho: "#c4785c",
    nanshan: "#2a9d8f",
    canary: "#4a7ab5",
  };
  return colors[districtForModule(i)];
}

export function sidequestBoardPosition(i: number): Point {
  const ring: Point[] = [
    { x: 40, y: 86 },
    { x: 58, y: 84 },
    { x: 24, y: 56 },
    { x: 44, y: 52 },
    { x: 22, y: 40 },
    { x: 48, y: 38 },
    { x: 82, y: 52 },
    { x: 70, y: 70 },
    { x: 84, y: 42 },
    { x: 70, y: 18 },
    { x: 54, y: 18 },
    { x: 60, y: 44 },
    { x: 36, y: 68 },
    { x: 50, y: 60 },
    { x: 78, y: 32 },
  ];
  return ring[i % ring.length] ?? { x: 50, y: 50 };
}

export function moduleGridPosition(i: number) {
  return moduleBoardPosition(i);
}

export const NEIGHBORHOODS = [
  { id: "wall-street" as const, hubQuest: "Opening Bell", x: 50, y: 96 },
  { id: "soho" as const, hubQuest: "Style Cross", x: 22, y: 42 },
  { id: "nanshan" as const, hubQuest: "Crisis Archive", x: 86, y: 62 },
  { id: "canary" as const, hubQuest: "Fund Mandate", x: 72, y: 14 },
] as const;
