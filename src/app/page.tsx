import Link from "next/link";
import { ludwittConfigured } from "@/lib/ludwitt";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const configured = ludwittConfigured();
  const params = await searchParams;
  const error = params.error;

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-end px-4 pb-16 pt-10 sm:justify-center">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/map-hero.svg')] bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07140f] via-[#07140f]/70 to-transparent" />
      </div>

      <div className="max-w-2xl">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[var(--accent)]">
          Ludwitt Learning Quest
        </p>
        <h1 className="display text-4xl leading-tight text-[var(--gold)] sm:text-6xl">
          AI Investment Learning Simulator
        </h1>
        <p className="mt-4 max-w-xl text-lg text-[var(--muted)]">
          Guide a warrior across an investing map. Earn gold bars, protect your
          hearts, trade a $14,800 Portfolio Lab, and learn by deciding.
        </p>
        {error ? (
          <div className="mt-5 rounded-xl border border-[var(--danger)]/40 bg-black/40 p-4 text-sm leading-relaxed">
            <strong className="text-[var(--danger)]">Ludwitt sign-in blocked</strong>
            <p className="mt-2 text-[var(--muted)]">
              Ludwitt returned <code>invalid_client</code> — usually the Creator app
              is still in <strong>Get ready / pending review</strong>, not a bad
              GitHub login. Cohort peers can use <strong>Enter demo quest</strong>
              meanwhile. In Ludwitt Creator → your app, submit/check review status
              (often 1–2 business days).
            </p>
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/auth/login" className="btn btn-gold">
            {configured ? "Sign in with Ludwitt" : "Sign in with Ludwitt (set keys)"}
          </Link>
          <Link href="/api/demo-launch" className="btn btn-forest">
            Enter demo quest
          </Link>
          <Link href="/markets" className="btn btn-ghost">
            Preview markets
          </Link>
        </div>
        <p className="mt-6 text-sm text-[var(--muted)]">
          Learn → Decide → Explain → Experience → Reflect → Adapt
        </p>
      </div>
    </main>
  );
}
