import type { AreaId } from "@/lib/content/areas";
import { MAP_AREAS } from "@/lib/content/areas";

export type ResourceKind = "pdf" | "ebook" | "infographic" | "jpeg" | "powerpoint";

export interface LibraryResource {
  id: string;
  title: string;
  kind: ResourceKind;
  description: string;
  /** Public path under /library/{areaId}/ */
  file: string;
  downloadName: string;
}

export interface OnlineClass {
  id: string;
  title: string;
  duration: string;
  summary: string;
  outline: string[];
}

export interface CityLibrary {
  areaId: AreaId;
  name: string;
  tagline: string;
  /** Map marker % coords — do not overlap frozen chests */
  x: number;
  y: number;
  classes: OnlineClass[];
  resources: LibraryResource[];
}

const KIND_LABEL: Record<ResourceKind, string> = {
  pdf: "PDF paper",
  ebook: "E-book",
  infographic: "Infographic",
  jpeg: "JPEG",
  powerpoint: "PowerPoint",
};

export function resourceKindLabel(kind: ResourceKind) {
  return KIND_LABEL[kind];
}

export const CITY_LIBRARIES: CityLibrary[] = [
  {
    areaId: "coral-ledger-bay",
    name: "Coral Ledger Bay Library",
    tagline: "Foundations classroom — capital, behaviour, and first formulae.",
    x: 8,
    y: 88,
    classes: [
      {
        id: "bay-class-1",
        title: "Opening Bell Online: Investing vs Trading",
        duration: "35 min",
        summary: "Live-style lecture covering horizons, asset classes, and risk/return.",
        outline: ["Why invest", "Asset class tour", "Compound growth demo", "Q&A drill"],
      },
      {
        id: "bay-class-2",
        title: "Behaviour Lab Livestream",
        duration: "40 min",
        summary: "Bias fire-drill with journal templates for Coral Ledger Bay modules.",
        outline: ["Confirmation bias", "Loss aversion", "Pre-mortem", "Journal sprint"],
      },
    ],
    resources: [
      {
        id: "bay-pdf",
        title: "Bay Research Brief",
        kind: "pdf",
        description: "Peer-style paper on starter capital allocation.",
        file: "research-brief.pdf",
        downloadName: "coral-ledger-bay-research-brief.pdf",
      },
      {
        id: "bay-ebook",
        title: "Foundations E-Book",
        kind: "ebook",
        description: "Downloadable chapter for self-paced study.",
        file: "ebook-foundations.pdf",
        downloadName: "coral-ledger-bay-ebook.pdf",
      },
      {
        id: "bay-info",
        title: "Ratios Infographic Pack",
        kind: "infographic",
        description: "One-page visual on P/E and acid-test basics.",
        file: "infographic-ratios.png",
        downloadName: "coral-ledger-bay-infographic.png",
      },
      {
        id: "bay-jpg",
        title: "Classroom Slide Still",
        kind: "jpeg",
        description: "JPEG slide graphic for decks and handouts.",
        file: "classroom-slide.jpg",
        downloadName: "coral-ledger-bay-slide.jpg",
      },
      {
        id: "bay-ppt",
        title: "Bay Class Deck",
        kind: "powerpoint",
        description: "PowerPoint starter deck for online sessions.",
        file: "class-deck.pptx",
        downloadName: "coral-ledger-bay-class-deck.pptx",
      },
    ],
  },
  {
    areaId: "brick-exchange",
    name: "Brick Exchange Library",
    tagline: "Analysis stacks — statements, ratios, and valuation briefs.",
    x: 94,
    y: 86,
    classes: [
      {
        id: "ex-class-1",
        title: "Statements Night School",
        duration: "45 min",
        summary: "Walkthrough of income, balance sheet, and cash flow linkages.",
        outline: ["Three statements", "Working capital", "Red flags", "Practice set"],
      },
      {
        id: "ex-class-2",
        title: "Valuation Workshop Online",
        duration: "50 min",
        summary: "P/E, EV/EBITDA, and margin of safety with worked examples.",
        outline: ["Multiples", "Intrinsic sketches", "Peer comps", "MoS"],
      },
    ],
    resources: [
      {
        id: "ex-pdf",
        title: "Exchange Research Brief",
        kind: "pdf",
        description: "PDF paper on earnings quality screens.",
        file: "research-brief.pdf",
        downloadName: "brick-exchange-research-brief.pdf",
      },
      {
        id: "ex-ebook",
        title: "Ratio Reliquary E-Book",
        kind: "ebook",
        description: "E-book chapter on liquidity and leverage ratios.",
        file: "ebook-foundations.pdf",
        downloadName: "brick-exchange-ebook.pdf",
      },
      {
        id: "ex-info",
        title: "Acid-Test Infographic",
        kind: "infographic",
        description: "Infographic comparing current vs quick ratio.",
        file: "infographic-ratios.png",
        downloadName: "brick-exchange-infographic.png",
      },
      {
        id: "ex-jpg",
        title: "Workshop Slide JPEG",
        kind: "jpeg",
        description: "JPEG visual for classroom boards.",
        file: "classroom-slide.jpg",
        downloadName: "brick-exchange-slide.jpg",
      },
      {
        id: "ex-ppt",
        title: "Exchange Class Deck",
        kind: "powerpoint",
        description: "PowerPoint for valuation workshops.",
        file: "class-deck.pptx",
        downloadName: "brick-exchange-class-deck.pptx",
      },
    ],
  },
  {
    areaId: "signal-quay",
    name: "Signal Quay Library",
    tagline: "Markets studio — portfolio, macro, and crisis media packs.",
    // Top-right glass district — seated on the Gherkin
    x: 90,
    y: 16,
    classes: [
      {
        id: "quay-class-1",
        title: "Portfolio Construction Stream",
        duration: "40 min",
        summary: "Risk budgets, weights, and correlation spikes under stress.",
        outline: ["Role of sleeves", "Risk budgets", "Rebalance bands", "Case"],
      },
      {
        id: "quay-class-2",
        title: "Macro Wire Online Class",
        duration: "35 min",
        summary: "Rates, FX, and news-reaction drills for Signal Quay modules.",
        outline: ["Duration", "FX hedges", "Guidance vs prints", "Playbook"],
      },
    ],
    resources: [
      {
        id: "quay-pdf",
        title: "Quay Macro Paper",
        kind: "pdf",
        description: "PDF brief on policy and asset duration.",
        file: "research-brief.pdf",
        downloadName: "signal-quay-research-brief.pdf",
      },
      {
        id: "quay-ebook",
        title: "Markets E-Book",
        kind: "ebook",
        description: "E-book on portfolio construction basics.",
        file: "ebook-foundations.pdf",
        downloadName: "signal-quay-ebook.pdf",
      },
      {
        id: "quay-info",
        title: "Correlation Infographic",
        kind: "infographic",
        description: "Infographic on crisis correlation spikes.",
        file: "infographic-ratios.png",
        downloadName: "signal-quay-infographic.png",
      },
      {
        id: "quay-jpg",
        title: "Studio Slide JPEG",
        kind: "jpeg",
        description: "JPEG asset for livestream overlays.",
        file: "classroom-slide.jpg",
        downloadName: "signal-quay-slide.jpg",
      },
      {
        id: "quay-ppt",
        title: "Quay Class Deck",
        kind: "powerpoint",
        description: "PowerPoint for macro wire sessions.",
        file: "class-deck.pptx",
        downloadName: "signal-quay-class-deck.pptx",
      },
    ],
  },
  {
    areaId: "mandate-highlands",
    name: "Mandate Highlands Library",
    tagline: "Mastery archive — thesis, ethics, and mandate defence packs.",
    x: 10,
    y: 18,
    classes: [
      {
        id: "high-class-1",
        title: "Thesis Forge Seminar Online",
        duration: "45 min",
        summary: "Build falsifiers and defend a recommendation to a mock IC.",
        outline: ["Thesis spine", "Falsifiers", "Hostile Q&A", "Journal"],
      },
      {
        id: "high-class-2",
        title: "IPS & Ethics Capstone Class",
        duration: "50 min",
        summary: "Mandate language, breach refusal, and client letter craft.",
        outline: ["IPS blocks", "Ethics drill", "Client letter", "Defence packet"],
      },
    ],
    resources: [
      {
        id: "high-pdf",
        title: "Highlands Mandate Paper",
        kind: "pdf",
        description: "PDF on IPS design and fiduciary process.",
        file: "research-brief.pdf",
        downloadName: "mandate-highlands-research-brief.pdf",
      },
      {
        id: "high-ebook",
        title: "Defence E-Book",
        kind: "ebook",
        description: "E-book chapter for capstone defence prep.",
        file: "ebook-foundations.pdf",
        downloadName: "mandate-highlands-ebook.pdf",
      },
      {
        id: "high-info",
        title: "Bias Infographic",
        kind: "infographic",
        description: "Infographic of common decision biases.",
        file: "infographic-ratios.png",
        downloadName: "mandate-highlands-infographic.png",
      },
      {
        id: "high-jpg",
        title: "Seminar Slide JPEG",
        kind: "jpeg",
        description: "JPEG visual for highland seminars.",
        file: "classroom-slide.jpg",
        downloadName: "mandate-highlands-slide.jpg",
      },
      {
        id: "high-ppt",
        title: "Highlands Class Deck",
        kind: "powerpoint",
        description: "PowerPoint for ethics and mandate classes.",
        file: "class-deck.pptx",
        downloadName: "mandate-highlands-class-deck.pptx",
      },
    ],
  },
];

export function getLibrary(areaId: string) {
  return CITY_LIBRARIES.find((l) => l.areaId === areaId);
}

export function libraryHref(areaId: AreaId) {
  return `/library/${areaId}`;
}

export function areaName(areaId: AreaId) {
  return MAP_AREAS.find((a) => a.id === areaId)?.name ?? areaId;
}
