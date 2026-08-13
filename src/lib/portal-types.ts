import type { AreaId } from "@/lib/content/areas";

export type PortalMaterialKind =
  | "pdf"
  | "document"
  | "video"
  | "diagram"
  | "news"
  | "link";

export type PortalLinkPlatform =
  | "youtube"
  | "vimeo"
  | "news"
  | "web";

export interface PortalMaterial {
  id: string;
  moduleId: string;
  areaId: AreaId;
  title: string;
  kind: PortalMaterialKind;
  description: string;
  /** Public URL, /api/portals/file/... path, or external https link */
  href: string;
  downloadName?: string;
  platform?: PortalLinkPlatform;
  source: "upload" | "link";
  createdAt: string;
}

/** Optional text overlays — base portal shell/content stays; admin can improve copy. */
export interface PortalTextOverlay {
  summary?: string;
  lesson?: string;
  scenario?: string;
  outcome?: string;
}

export interface PortalCatalogDoc {
  moduleId: string;
  areaId: AreaId;
  updatedAt: string;
  text: PortalTextOverlay;
  materials: PortalMaterial[];
}

export function portalMaterialKindLabel(kind: PortalMaterialKind) {
  const labels: Record<PortalMaterialKind, string> = {
    pdf: "PDF / reading",
    document: "Document",
    video: "Video",
    diagram: "Diagram / image",
    news: "News article",
    link: "Web link",
  };
  return labels[kind] ?? kind;
}

export function detectPortalPlatform(url: string): PortalLinkPlatform {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("vimeo.com")) return "vimeo";
  if (
    u.includes("news") ||
    u.includes("bbc.") ||
    u.includes("reuters.") ||
    u.includes("bloomberg.") ||
    u.includes("ft.com") ||
    u.includes("wsj.com") ||
    u.includes("cnbc.")
  ) {
    return "news";
  }
  return "web";
}

export function inferPortalKindFromFileName(fileName: string): PortalMaterialKind {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".pdf")) return "pdf";
  if (
    lower.endsWith(".doc") ||
    lower.endsWith(".docx") ||
    lower.endsWith(".txt") ||
    lower.endsWith(".rtf") ||
    lower.endsWith(".odt")
  ) {
    return "document";
  }
  if (
    lower.endsWith(".mp4") ||
    lower.endsWith(".webm") ||
    lower.endsWith(".mov") ||
    lower.endsWith(".m4v")
  ) {
    return "video";
  }
  if (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".webp") ||
    lower.endsWith(".svg") ||
    lower.endsWith(".gif")
  ) {
    return "diagram";
  }
  return "document";
}
