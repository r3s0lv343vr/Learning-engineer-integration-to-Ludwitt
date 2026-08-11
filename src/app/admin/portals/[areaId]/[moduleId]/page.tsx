import Link from "next/link";
import { notFound } from "next/navigation";
import { readSession } from "@/lib/session";
import { isLibraryAdmin } from "@/lib/admin";
import { areaById, type AreaId, MAP_AREAS } from "@/lib/content/areas";
import { getModule } from "@/lib/content/modules";
import {
  areaIdForModuleId,
  getPortalCatalog,
} from "@/lib/portal-catalog";
import { PortalAdminPanel } from "@/components/PortalAdminPanel";
import { LibraryAdminUnlock } from "@/components/LibraryAdminUnlock";

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

  const session = await readSession();
  const admin = session ? await isLibraryAdmin(session) : false;
  if (!admin) {
    return (
      <div className="admin-stage">
        <Link
          className="text-sm text-[var(--accent)]"
          href={`/admin/portals/${areaId}`}
        >
          ← {areaById(areaId as AreaId).name} portals
        </Link>
        <LibraryAdminUnlock />
      </div>
    );
  }

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
