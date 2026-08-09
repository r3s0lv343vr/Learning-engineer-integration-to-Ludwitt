import { redirect } from "next/navigation";
import { loadState } from "@/lib/session";
import { StatusBar } from "@/components/StatusBar";
import { QuestMap } from "@/components/QuestMap";
import Link from "next/link";

export default async function MapPage() {
  const state = await loadState();
  if (!state) redirect("/api/demo-launch");
  if (state.inDetention) redirect("/detention");

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6">
      <StatusBar state={state} />
      <section className="panel rounded-2xl p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="display text-3xl text-[var(--gold)]">Investment Map</h1>
            <p className="mt-1 max-w-2xl text-[var(--muted)]">
              Four areas · 36 portals · 9 compulsory exams. Chests stay put.
              Your token is the gold coin.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-[var(--path)]/40 px-3 py-1">
              Modules {state.completedModules.length}/36
            </span>
            <span className="rounded-full border border-[var(--path)]/40 px-3 py-1">
              Exams {(state.completedExams ?? []).length}/9
            </span>
            <span className="rounded-full border border-[var(--path)]/40 px-3 py-1">
              Sidequests {state.completedSidequests.length}
            </span>
          </div>
        </div>
        <QuestMap state={state} />
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
          <span>♥ Hearts: start 5 · +1 per 5 correct · −1 per 4 wrong streak</span>
          <span>·</span>
          <Link href="/quest/m1" className="text-[var(--accent)] underline">
            Continue Opening Bell
          </Link>
        </div>
      </section>
    </main>
  );
}
