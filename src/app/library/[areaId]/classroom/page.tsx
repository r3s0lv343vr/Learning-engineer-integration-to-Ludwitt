import { redirect, notFound } from "next/navigation";
import { loadState } from "@/lib/session";
import type { AreaId } from "@/lib/content/areas";
import { getClassroomLesson } from "@/lib/content/classroom";
import { LibraryClassroom } from "@/components/LibraryClassroom";

const AREA_IDS: AreaId[] = [
  "coral-ledger-bay",
  "brick-exchange",
  "signal-quay",
  "mandate-highlands",
];

export default async function LibraryClassroomPage({
  params,
}: {
  params: Promise<{ areaId: string }>;
}) {
  const { areaId } = await params;
  const state = await loadState();
  if (!state) redirect("/api/demo-launch");
  if (!AREA_IDS.includes(areaId as AreaId)) notFound();

  const lesson = getClassroomLesson(areaId);
  if (!lesson) notFound();

  return <LibraryClassroom lesson={lesson} state={state} />;
}
