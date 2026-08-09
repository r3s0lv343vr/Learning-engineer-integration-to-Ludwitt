/**
 * Four main map areas (Investment Map 2 districts).
 * Modules 1–36 are distributed 9 per area.
 */

export type AreaId =
  | "coral-ledger-bay"
  | "brick-exchange"
  | "signal-quay"
  | "mandate-highlands";

export type StrengthHue = "purple" | "blue" | "green" | "gold";

export interface MapArea {
  id: AreaId;
  name: string;
  shortName: string;
  blurb: string;
  /** Module numbers inclusive */
  moduleStart: number;
  moduleEnd: number;
  strength: StrengthHue;
  color: string;
  labelAt: { x: number; y: number };
}

export const MAP_AREAS: MapArea[] = [
  {
    id: "coral-ledger-bay",
    name: "Coral Ledger Bay",
    shortName: "Bay",
    blurb: "Foundations — capital, markets, and investor behaviour on the tropical shores.",
    moduleStart: 1,
    moduleEnd: 9,
    strength: "purple",
    color: "#7c4dff",
    labelAt: { x: 24, y: 88 },
  },
  {
    id: "brick-exchange",
    name: "Brick Exchange",
    shortName: "Exchange",
    blurb: "Analysis — research, statements, ratios, and valuation in the industrial docks.",
    moduleStart: 10,
    moduleEnd: 18,
    strength: "blue",
    color: "#2196f3",
    labelAt: { x: 78, y: 86 },
  },
  {
    id: "signal-quay",
    name: "Signal Quay",
    shortName: "Quay",
    blurb: "Markets — portfolio construction, macro, news, and crisis navigation among glass towers.",
    moduleStart: 19,
    moduleEnd: 27,
    strength: "green",
    color: "#43a047",
    labelAt: { x: 86, y: 28 },
  },
  {
    id: "mandate-highlands",
    name: "Mandate Highlands",
    shortName: "Highlands",
    blurb: "Mastery — risk, thesis, bias control, and fund mandate defence in the classical heights.",
    moduleStart: 28,
    moduleEnd: 36,
    strength: "gold",
    color: "#c6922e",
    labelAt: { x: 28, y: 18 },
  },
];

export function areaForModuleNumber(n: number): MapArea {
  return (
    MAP_AREAS.find((a) => n >= a.moduleStart && n <= a.moduleEnd) ?? MAP_AREAS[0]
  );
}

export function areaById(id: AreaId): MapArea {
  return MAP_AREAS.find((a) => a.id === id) ?? MAP_AREAS[0];
}
