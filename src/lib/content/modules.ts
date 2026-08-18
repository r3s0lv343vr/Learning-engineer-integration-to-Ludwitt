import type { ModuleQuest } from "@/lib/types";
import { MODULES_PURPLE } from "@/lib/content/modules-purple";
import { MODULES_MID } from "@/lib/content/modules-mid";
import { MODULES_EXTRA } from "@/lib/content/modules-extra";

/** 36 syllabus modules as quest portals on the adventure map. */
export const MODULES: ModuleQuest[] = [
  ...MODULES_PURPLE,
  ...MODULES_MID,
  ...MODULES_EXTRA,
];

export function getModule(id: string): ModuleQuest | undefined {
  return MODULES.find((module) => module.id === id);
}

export function getNextModuleId(currentId: string): string | null {
  const index = MODULES.findIndex((module) => module.id === currentId);
  if (index < 0 || index >= MODULES.length - 1) return null;
  return MODULES[index + 1].id;
}
