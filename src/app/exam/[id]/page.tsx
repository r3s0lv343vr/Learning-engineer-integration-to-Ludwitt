import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { loadState } from "@/lib/session";
import { getExam } from "@/lib/content/exams";
import { areaById } from "@/lib/content/areas";
import { StatusBar } from "@/components/StatusBar";
import { ExamClient } from "./ExamClient";
import { normalizeState } from "@/lib/game-state";

export default async function ExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const raw = await loadState();
  if (!raw) redirect("/api/demo-launch");
  const state = normalizeState(raw);
  if (state.inDetention) redirect("/detention");
  const exam = getExam(id);
  if (!exam) notFound();

  const unlocked =
    state.unlockedExams.includes(exam.id) ||
    state.completedExams.includes(exam.id);
  if (!unlocked) redirect("/map");

  const area = areaById(exam.areaId);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6">
      <StatusBar state={state} />
      <section className="panel rounded-2xl p-5 sm:p-7">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
          Compulsory exam {exam.roman} · {area.name}
        </p>
        <h1 className="display mt-2 text-3xl text-[var(--gold)]">{exam.title}</h1>
        <p className="mt-3 text-[var(--muted)]">{exam.summary}</p>
        <p className="mt-2 text-xs text-[var(--muted)]">
          Pass requires about two-thirds correct. Reference the{" "}
          <Link href="/formulae" className="text-[var(--accent)] underline">
            Formulae Desk
          </Link>{" "}
          anytime.
        </p>
        {state.completedExams.includes(exam.id) ? (
          <p className="mt-6 text-[var(--accent)]">
            Already passed.{" "}
            <Link href="/map" className="underline">
              Return to map
            </Link>
          </p>
        ) : (
          <ExamClient examId={exam.id} questions={exam.questions} />
        )}
      </section>
    </main>
  );
}
