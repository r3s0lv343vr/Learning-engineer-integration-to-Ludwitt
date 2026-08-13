import { getModule } from "@/lib/content/modules";
import { getPortalCatalog } from "@/lib/portal-catalog";
import type { ModuleQuest } from "@/lib/types";
import type { PortalMaterial } from "@/lib/portal-types";

export type ResolvedPortal = ModuleQuest & {
  areaId: string;
  materials: PortalMaterial[];
  hasAdminOverlay: boolean;
};

/**
 * Base portal shell fields (id/number/title/mapLabel/x/y/questions) stay intact.
 * Admin text overlays may improve summary/lesson/scenario/outcome only.
 */
export async function resolvePortalModule(
  moduleId: string,
): Promise<ResolvedPortal | undefined> {
  const base = getModule(moduleId);
  if (!base) return undefined;

  const catalog = await getPortalCatalog(moduleId);
  const text = catalog.text ?? {};
  const hasAdminOverlay =
    catalog.materials.length > 0 || Object.keys(text).length > 0;

  return {
    ...base,
    summary: text.summary?.trim() || base.summary,
    lesson: text.lesson?.trim() || base.lesson,
    scenario: text.scenario?.trim() || base.scenario,
    outcome: text.outcome?.trim() || base.outcome,
    // Never alter map geometry or identity from admin overlays.
    id: base.id,
    number: base.number,
    title: base.title,
    mapLabel: base.mapLabel,
    x: base.x,
    y: base.y,
    questions: base.questions,
    areaId: catalog.areaId,
    materials: catalog.materials,
    hasAdminOverlay,
  };
}
