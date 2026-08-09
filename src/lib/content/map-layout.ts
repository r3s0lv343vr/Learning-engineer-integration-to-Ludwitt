/** Geometric 6×3 square grid with snake pathway for 18 syllabus modules. */
const COLS = 6;
const ROWS = 3;

export function moduleGridPosition(indexZeroBased: number): { x: number; y: number } {
  const band = Math.floor(indexZeroBased / COLS); // 0 bottom → 2 top
  const colInBand = indexZeroBased % COLS;
  const row = ROWS - 1 - band;
  // Snake: even bands L→R, odd bands R→L
  const col = band % 2 === 1 ? COLS - 1 - colInBand : colInBand;
  const x = 12 + col * (76 / (COLS - 1));
  const y = 16 + row * (68 / (ROWS - 1));
  return { x: round(x), y: round(y) };
}

/** Side quests / chests sit on a square frame around the grid. */
export function sidequestFramePosition(indexZeroBased: number, total: number): {
  x: number;
  y: number;
} {
  const n = Math.max(total, 1);
  // Walk the perimeter of a square clockwise starting top-left
  const perSide = Math.ceil(n / 4);
  const side = Math.floor(indexZeroBased / perSide) % 4;
  const t = (indexZeroBased % perSide) / Math.max(perSide, 1);
  const min = 4;
  const max = 96;
  let x = min;
  let y = min;
  if (side === 0) {
    // top: left → right
    x = min + t * (max - min);
    y = min;
  } else if (side === 1) {
    // right: top → bottom
    x = max;
    y = min + t * (max - min);
  } else if (side === 2) {
    // bottom: right → left
    x = max - t * (max - min);
    y = max;
  } else {
    // left: bottom → top
    x = min;
    y = max - t * (max - min);
  }
  return { x: round(x), y: round(y) };
}

export function modulePathPoints(): { x: number; y: number }[] {
  return Array.from({ length: 18 }, (_, i) => moduleGridPosition(i));
}

function round(n: number) {
  return Math.round(n * 10) / 10;
}
