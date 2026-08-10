import type { AreaId } from "@/lib/content/areas";
import type { ResourceKind } from "@/lib/content/libraries";

export type LinkPlatform = "youtube" | "x" | "linkedin" | "web";

export type LibraryItemKind = ResourceKind | "link";

/** How an admin item maps onto the learner classroom downloads/links (shell unchanged). */
export type ClassroomRole = "notes" | "deck" | "link" | "none";

export interface LibraryCatalogItem {
  id: string;
  areaId: AreaId;
  title: string;
  kind: LibraryItemKind;
  description: string;
  /** Public path under /library/... or absolute URL for links */
  href: string;
  downloadName?: string;
  platform?: LinkPlatform;
  source: "seed" | "upload" | "link";
  createdAt: string;
  /** Optional classroom wiring — overlays Download Notes / PowerPoint / Linked Sites */
  classroomRole?: ClassroomRole;
}

const KIND_LABEL: Record<LibraryItemKind, string> = {
  pdf: "PDF",
  ebook: "E-book",
  infographic: "Infographic",
  jpeg: "JPEG",
  powerpoint: "PowerPoint",
  notes: "Study notes",
  paper: "Research paper",
  link: "Link",
};

export function libraryItemKindLabel(kind: LibraryItemKind) {
  return KIND_LABEL[kind] ?? kind;
}

export function detectPlatform(url: string): LinkPlatform {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("linkedin.com")) return "linkedin";
  if (u.includes("twitter.com") || u.includes("x.com")) return "x";
  return "web";
}

export function inferKindFromFileName(fileName: string): LibraryItemKind {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".pptx") || lower.endsWith(".ppt") || lower.endsWith(".pdf")) {
    if (lower.includes("deck") || lower.includes("slide") || lower.includes("powerpoint")) {
      return "powerpoint";
    }
    if (lower.endsWith(".pptx") || lower.endsWith(".ppt")) return "powerpoint";
  }
  if (lower.endsWith(".epub") || lower.endsWith(".mobi")) return "ebook";
  if (lower.endsWith(".png") || lower.endsWith(".svg") || lower.endsWith(".webp"))
    return "infographic";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "jpeg";
  if (lower.includes("note")) return "notes";
  if (lower.endsWith(".pdf")) return "pdf";
  return "paper";
}

export function defaultClassroomRole(
  kind: LibraryItemKind,
): ClassroomRole {
  if (kind === "link") return "link";
  if (kind === "powerpoint") return "deck";
  if (kind === "notes" || kind === "pdf" || kind === "paper" || kind === "ebook") {
    return "notes";
  }
  return "none";
}
