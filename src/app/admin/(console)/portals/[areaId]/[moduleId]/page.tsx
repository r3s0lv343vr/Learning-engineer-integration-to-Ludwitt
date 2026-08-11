import { notFound } from "next/navigation";
import { areaById, type AreaId, MAP_AREAS } from "@/lib/content/areas";
import { getModule } from "@/lib/content/modules";
import {
  areaIdForModuleId,
  getPortalCatalog,
} from "@/lib/portal-catalog";
import { PortalAdminPanel } from "@/components/PortalAdminPanel";

export default async function AdminPortalModulePage({
  params,
}: {
  params: Promise<{ areaId: string; moduleId: string }>;
}) {
  const { areaId, moduleId } = await params;
  if (!MAP_AREAS.some((a) => a.id === areaId)) notFound();

  const mod = getModule(moduleId);
  if (!mod) notFound();
  const ownedArea = areaIdForModuleId(moduleId);
  if (ownedArea !== areaId) notFound();

  const doc = await getPortalCatalog(moduleId);
  const area = areaById(areaId as AreaId);

  return (
    <div className="admin-stage">
      <PortalAdminPanel
        areaId={areaId as AreaId}
        areaName={area.name}
        moduleId={mod.id}
        moduleNumber={mod.number}
        moduleTitle={mod.title}
        baseSummary={mod.summary}
        baseLesson={mod.lesson}
        baseScenario={mod.scenario}
        baseOutcome={mod.outcome}
        initialDoc={doc}
      />
    </div>
  );
}
