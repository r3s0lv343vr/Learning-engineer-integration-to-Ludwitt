import { redirect, notFound } from "next/navigation";
import { loadState } from "@/lib/session";
import type { AreaId } from "@/lib/content/areas";
import { getClassroomLesson } from "@/lib/content/classroom";

const AREA_IDS: AreaId[] = [
  "coral-ledger-bay",
  "brick-exchange",
  "signal-quay",
  "mandate-highlands",
];

/** Learner entry: always open the Library Classroom shell for the city. */
export default async function LibraryPage({
  params,
}: {
  params: Promise<{ areaId: string }>;
}) {
  const { areaId } = await params;
  const state = await loadState();
  if (!state) redirect("/api/demo-launch");
  if (!AREA_IDS.includes(areaId as AreaId)) notFound();
  if (!getClassroomLesson(areaId)) notFound();
  redirect(`/library/${areaId}/classroom`);
}
