import type { AreaId } from "@/lib/content/areas";
import { MAP_AREAS } from "@/lib/content/areas";

export type ResourceKind =
  | "pdf"
  | "ebook"
  | "infographic"
  | "jpeg"
  | "powerpoint"
  | "notes"
  | "paper";

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
  notes: "Study notes",
  paper: "Research paper",
};

export function resourceKindLabel(kind: ResourceKind) {
  return KIND_LABEL[kind];
}

export const CITY_LIBRARIES: CityLibrary[] = [
  {
    areaId: "coral-ledger-bay",
    name: "Coral Ledger Bay Library",
    tagline:
      "Purple City foundations — syllabus, study notes, and the Investment Foundations teaching deck for portals 1–9.",
    x: 14,
    y: 84,
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
      {
        id: "bay-class-3",
        title: "Purple City Notes Walkthrough",
        duration: "45 min",
        summary:
          "Investment Foundations teaching deck walkthrough aligned to portals 1–9.",
        outline: [
          "Enter the market",
          "Know your investor",
          "Asset classes & market mechanics",
          "Research → first portfolio → challenge",
        ],
      },
    ],
    resources: [
      {
        id: "bay-purple-notes",
        title: "Purple City Foundation Study Notes",
        kind: "notes",
        description:
          "Expanded study notes for Coral Ledger Bay (Purple City) portals 1–9. Downloadable PDF.",
        file: "purple-city-foundation-notes.pdf",
        downloadName: "purple-city-foundation-study-notes.pdf",
      },
      {
        id: "bay-purple-teaching-deck",
        title: "Purple City Investment Foundations Teaching Deck",
        kind: "powerpoint",
        description:
          "42-slide teaching deck for Portals 1–9 (PDF). Powers the Coral Ledger Bay Library Classroom board.",
        file: "purple-city-investment-foundations-teaching-deck.pdf",
        downloadName: "purple-city-investment-foundations-teaching-deck.pdf",
      },
      {
        id: "bay-syllabus",
        title: "36-Portal Syllabus",
        kind: "pdf",
        description: "Full AI Investment Simulator syllabus for all four cities.",
        file: "36-portal-syllabus.pdf",
        downloadName: "ai-investment-simulator-36-portal-syllabus.pdf",
      },
      {
        id: "bay-pdf",
        title: "Bay Research Brief",
        kind: "paper",
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
    tagline:
      "Blue City analysis — study notes and the Analysis & Asset Selection teaching deck for portals 10–18.",
    x: 88,
    y: 82,
    classes: [
      {
        id: "ex-class-blue",
        title: "Blue City Analysis & Asset Selection Walkthrough",
        duration: "77 slides",
        summary:
          "Analysis & Asset Selection teaching deck walkthrough aligned to Blue City portals 10–18.",
        outline: [
          "Companies & statements",
          "Ratios & interpretation",
          "Comps, DCF & selection",
          "Practice on the map portals",
        ],
      },
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
        id: "ex-blue-notes",
        title: "Blue City Analysis & Asset Selection Notes",
        kind: "notes",
        description:
          "Expanded study notes for Brick Exchange (Blue City) portals 10–18. Downloadable PDF.",
        file: "blue-city-analysis-asset-selection-notes.pdf",
        downloadName: "blue-city-analysis-and-asset-selection-notes.pdf",
      },
      {
        id: "ex-blue-teaching-deck",
        title: "Blue City Analysis & Asset Selection Teaching Deck",
        kind: "powerpoint",
        description:
          "77-slide teaching deck for Portals 10–18 (PDF). Powers the Brick Exchange Library Classroom board.",
        file: "blue-city-analysis-asset-selection-teaching-deck.pdf",
        downloadName: "blue-city-analysis-asset-selection-teaching-deck.pdf",
      },
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
    tagline:
      "Green City portfolio management — study notes and the Portfolio Management teaching deck for portals 19–27.",
    // Just right of the Gherkin on a neighboring glass tower (Gherkin stays clear)
    x: 88,
    y: 17,
    classes: [
      {
        id: "quay-class-green",
        title: "Green City Portfolio Management Walkthrough",
        duration: "81 slides",
        summary:
          "Portfolio Management teaching deck walkthrough aligned to Green City portals 19–27.",
        outline: [
          "Bonds & fixed income",
          "Commodities, property & multi-asset",
          "Risk, rebalancing & crisis playbooks",
          "Practice on the map portals",
        ],
      },
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
        id: "quay-green-notes",
        title: "Green City Portfolio Management Notes",
        kind: "notes",
        description:
          "Expanded study notes for Signal Quay (Green City) portals 19–27. Downloadable PDF.",
        file: "green-city-portfolio-management-notes.pdf",
        downloadName: "green-city-portfolio-management-expanded-notes.pdf",
      },
      {
        id: "quay-green-teaching-deck",
        title: "Green City Portfolio Management Teaching Deck",
        kind: "powerpoint",
        description:
          "81-slide teaching deck for Portals 19–27 (PDF). Powers the Signal Quay Library Classroom board.",
        file: "green-city-portfolio-management-teaching-deck.pdf",
        downloadName: "green-city-portfolio-management-teaching-deck.pdf",
      },
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

/**
 * Every city library opens the same Library Classroom room shell
 * (full-height Slides vertical scroll + fixed teaching board; city colour/content only).
 */
export function libraryHref(areaId: AreaId) {
  return `/library/${areaId}/classroom`;
}

export function areaName(areaId: AreaId) {
  return MAP_AREAS.find((a) => a.id === areaId)?.name ?? areaId;
}
