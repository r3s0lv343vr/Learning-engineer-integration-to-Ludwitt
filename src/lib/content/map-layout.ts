/**
 * Monopoly-style square board layout.
 * Modules travel clockwise around the perimeter starting at GO (bottom-left).
 * Corners are special spaces; side quests sit as Chance/Community piles.
 */

const BOARD_MIN = 8;
const BOARD_MAX = 92;
const SPAN = BOARD_MAX - BOARD_MIN;

/** Evenly place n points along the board perimeter, clockwise from bottom-left GO. */
export function perimeterPosition(
  indexZeroBased: number,
  total: number,
): { x: number; y: number } {
  const n = Math.max(total, 1);
  // Perimeter parameterized 0..1 starting at bottom-left, going right first (GO → along bottom)
  const t = indexZeroBased / n;
  const u = t * 4; // 4 sides
  const side = Math.floor(u) % 4;
  const f = u - Math.floor(u);

  let x = BOARD_MIN;
  let y = BOARD_MAX;
  if (side === 0) {
    // bottom: left → right
    x = BOARD_MIN + f * SPAN;
    y = BOARD_MAX;
  } else if (side === 1) {
    // right: bottom → top
    x = BOARD_MAX;
    y = BOARD_MAX - f * SPAN;
  } else if (side === 2) {
    // top: right → left
    x = BOARD_MAX - f * SPAN;
    y = BOARD_MIN;
  } else {
    // left: top → bottom
    x = BOARD_MIN;
    y = BOARD_MIN + f * SPAN;
  }
  return { x: round(x), y: round(y) };
}

export function moduleBoardPosition(indexZeroBased: number): { x: number; y: number } {
  // 18 modules around the path (exclude exact corner centers so corners stay special)
  return perimeterPosition(indexZeroBased + 0.5, 18);
}

export function modulePathPoints(): { x: number; y: number }[] {
  // denser path for the dashed track
  return Array.from({ length: 36 }, (_, i) => perimeterPosition(i, 36));
}

/** Corner labels for Monopoly feel */
export const BOARD_CORNERS = [
  { id: "go", label: "GO", x: BOARD_MIN, y: BOARD_MAX, hue: "go" },
  { id: "jail", label: "JAIL", x: BOARD_MAX, y: BOARD_MAX, hue: "jail" },
  { id: "parking", label: "PARK", x: BOARD_MAX, y: BOARD_MIN, hue: "park" },
  { id: "tax", label: "TAX", x: BOARD_MIN, y: BOARD_MIN, hue: "tax" },
] as const;

/** Monopoly-ish property stripe colors cycling by module index */
export const PROPERTY_COLORS = [
  "#8b4513", // brown
  "#87ceeb", // light blue
  "#ff69b4", // pink
  "#ffa500", // orange
  "#ff0000", // red
  "#ffff00", // yellow
  "#00a000", // green
  "#0000cd", // dark blue
];

export function propertyColor(indexZeroBased: number): string {
  return PROPERTY_COLORS[indexZeroBased % PROPERTY_COLORS.length];
}

/** Chance / Community Chest piles inside the board */
export function chancePilePosition(kind: "chance" | "chest"): { x: number; y: number } {
  return kind === "chance" ? { x: 32, y: 38 } : { x: 68, y: 62 };
}

export function sidequestBoardPosition(
  indexZeroBased: number,
  total: number,
): { x: number; y: number } {
  // Fan sidequests in the inner square (not on the track)
  const cols = 4;
  const rows = Math.ceil(total / cols);
  const col = indexZeroBased % cols;
  const row = Math.floor(indexZeroBased / cols);
  const x = 28 + col * (44 / Math.max(cols - 1, 1));
  const y = 28 + row * (44 / Math.max(rows - 1, 1));
  return { x: round(x), y: round(y) };
}

function round(n: number) {
  return Math.round(n * 10) / 10;
}

// Back-compat aliases used elsewhere
export function moduleGridPosition(indexZeroBased: number) {
  return moduleBoardPosition(indexZeroBased);
}
