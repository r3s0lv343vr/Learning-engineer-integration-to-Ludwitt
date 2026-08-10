import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { loadState } from "@/lib/session";
import { StatusBar } from "@/components/StatusBar";
import { areaById, type AreaId } from "@/lib/content/areas";
import {
  getLibrary,
  resourceKindLabel,
} from "@/lib/content/libraries";

const AREA_IDS: AreaId[] = [
  "coral-ledger-bay",
  "brick-exchange",
  "signal-quay",
  "mandate-highlands",
];

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ areaId: string }>;
}) {
  const { areaId } = await params;
  const state = await loadState();
  if (!state) redirect("/api/demo-launch");
  if (!AREA_IDS.includes(areaId as AreaId)) notFound();

  const library = getLibrary(areaId);
  if (!library) notFound();
  const area = areaById(areaId as AreaId);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6">
      <StatusBar state={state} />
      <section className="panel rounded-2xl p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/library-icon.png"
              alt=""
              width={72}
              height={72}
              className="library-hero-icon"
            />
            <div>
              <p
                className="text-sm uppercase tracking-[0.2em]"
                style={{ color: area.color }}
              >
                City library · {area.name}
              </p>
              <h1 className="display mt-1 text-3xl text-[var(--gold)]">
                {library.name}
              </h1>
              <p className="mt-2 max-w-2xl text-[var(--muted)]">{library.tagline}</p>
            </div>
          </div>
          <Link href="/map" className="btn btn-ghost text-sm">
            Back to map
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="display text-xl text-[var(--accent)]">Online classes</h2>
            <div className="mt-3 space-y-3">
              {library.classes.map((c) => (
                <article
                  key={c.id}
                  className="rounded-xl border border-[var(--path)]/30 bg-black/25 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-[var(--gold)]">{c.title}</h3>
                    <span className="text-xs text-[var(--muted)]">{c.duration}</span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{c.summary}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                    {c.outline.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-[var(--accent)]">
                    Class room ready — pair with downloads below.
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="display text-xl text-[var(--accent)]">Downloads</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              PDF papers · e-books · infographics · JPEGs · PowerPoints
            </p>
            <div className="mt-3 space-y-3">
              {library.resources.map((r) => (
                <article
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--path)]/30 bg-black/25 p-4"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[var(--accent)]">
                      {resourceKindLabel(r.kind)}
                    </p>
                    <h3 className="font-bold text-[var(--gold)]">{r.title}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{r.description}</p>
                  </div>
                  <a
                    className="btn btn-gold text-sm"
                    href={`/library/${library.areaId}/${r.file}`}
                    download={r.downloadName}
                  >
                    Download
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 text-xs">
          {AREA_IDS.map((id) => (
            <Link
              key={id}
              href={`/library/${id}`}
              className={`rounded-full border px-3 py-1 ${
                id === areaId
                  ? "border-[var(--gold)] text-[var(--gold)]"
                  : "border-[var(--path)]/40 text-[var(--muted)]"
              }`}
            >
              {areaById(id).name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
