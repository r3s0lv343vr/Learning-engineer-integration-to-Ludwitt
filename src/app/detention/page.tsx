import { redirect } from "next/navigation";
import { loadState } from "@/lib/session";
import { MODULES } from "@/lib/content/modules";
import { StatusBar } from "@/components/StatusBar";
import { DetentionClient } from "./DetentionClient";

export default async function DetentionPage() {
  const state = await loadState();
  if (!state) redirect("/api/demo-launch");
  if (!state.inDetention) redirect("/map");

  const questions = MODULES.flatMap((m) => m.questions).filter((q) =>
    state.detentionQueue.includes(q.id),
  );

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6">
      <StatusBar state={state} />
      <section className="panel rounded-2xl p-6">
        <h1 className="display text-3xl text-[var(--danger)]">Detention Hall</h1>
        <p className="mt-3 text-[var(--muted)]">
          Hearts depleted. Resit the questions you missed. Pass the set to
          recover 2 hearts and return to the map.
        </p>
        <DetentionClient questions={questions} />
      </section>
    </main>
  );
}
