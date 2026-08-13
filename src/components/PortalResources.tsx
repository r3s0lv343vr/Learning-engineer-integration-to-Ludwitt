import type { PortalMaterial } from "@/lib/portal-types";
import { portalMaterialKindLabel } from "@/lib/portal-types";

/**
 * Additive resources strip for portal pages.
 * Does not alter the standard Learn / Scenario / Challenge shell.
 */
export function PortalResources({ materials }: { materials: PortalMaterial[] }) {
  if (!materials.length) return null;

  return (
    <section className="mt-6 rounded-xl border border-[var(--path)]/25 bg-black/20 p-4">
      <h2 className="display text-xl text-[var(--gold)]">Portal resources</h2>
      <p className="mt-1 text-xs text-[var(--muted)]">
        Readings, videos, diagrams and news for this portal only
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {materials.map((item) => {
          const external = item.source === "link" || /^https?:\/\//i.test(item.href);
          return (
            <li key={item.id}>
              <a
                className="block rounded-lg border border-[var(--path)]/20 bg-black/25 px-3 py-2 transition hover:border-[var(--gold)]/40"
                href={item.href}
                {...(external
                  ? { target: "_blank", rel: "noreferrer" }
                  : { download: item.downloadName })}
              >
                <p className="text-[0.65rem] uppercase tracking-wide text-[var(--accent)]">
                  {portalMaterialKindLabel(item.kind)}
                  {item.platform ? ` · ${item.platform}` : ""}
                </p>
                <p className="font-semibold text-[var(--gold)]">{item.title}</p>
                {item.description ? (
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{item.description}</p>
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
