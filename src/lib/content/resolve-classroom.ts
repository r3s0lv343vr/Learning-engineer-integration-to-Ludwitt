import type { AreaId } from "@/lib/content/areas";
import {
  getClassroomLesson,
  type ClassroomLesson,
} from "@/lib/content/classroom";
import { listAdminLibraryItems } from "@/lib/library-catalog";

/**
 * Build the learner classroom lesson for an area.
 * Starts from the static shell content, then overlays admin uploads/links
 * for that area only. Does not change the Library Classroom UI component.
 */
export async function resolveClassroomLesson(
  areaId: string,
): Promise<ClassroomLesson | undefined> {
  const base = getClassroomLesson(areaId);
  if (!base) return undefined;

  const custom = await listAdminLibraryItems(areaId as AreaId);
  if (custom.length === 0) return base;

  const lesson: ClassroomLesson = {
    ...base,
    linkedSites: [...base.linkedSites],
  };

  const notes = [...custom]
    .filter((i) => i.classroomRole === "notes")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  if (notes) {
    lesson.notesHref = notes.href;
    lesson.notesDownloadName = notes.downloadName || notes.title;
  }

  const deck = [...custom]
    .filter((i) => i.classroomRole === "deck")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  if (deck) {
    lesson.deckHref = deck.href;
    lesson.deckDownloadName = deck.downloadName || deck.title;
  }

  const links = custom.filter(
    (i) => i.classroomRole === "link" || i.kind === "link",
  );
  for (const link of links) {
    if (lesson.linkedSites.some((l) => l.url === link.href)) continue;
    lesson.linkedSites.push({
      id: link.id,
      title: link.title,
      url: link.href,
      platform: link.platform || "web",
    });
  }

  return lesson;
}
