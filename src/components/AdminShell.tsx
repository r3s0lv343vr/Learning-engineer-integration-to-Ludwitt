"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV, activeAdminNavId } from "@/lib/admin-nav";
import { LibraryAdminLogout } from "@/components/LibraryAdminLogout";

export function AdminShell({
  isAdmin,
  sessionLabel,
  children,
}: {
  isAdmin: boolean;
  sessionLabel: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/admin";
  const activeId = activeAdminNavId(pathname);

  return (
    <div className="admin-shell">
      <aside className="admin-shell__rail" aria-label="Admin capacities">
        <div className="admin-shell__brand">
          <p className="admin-shell__eyebrow">Backend</p>
          <Link href="/admin" className="admin-shell__title">
            Admin console
          </Link>
          <p className="admin-shell__hint">
            Choose a capacity. Work opens on the right. Map icons stay untouched.
          </p>
        </div>

        <nav className="admin-shell__nav">
          {ADMIN_NAV.map((item) => {
            const active = item.id === activeId;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`admin-shell__nav-item${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span className="admin-shell__nav-label">{item.label}</span>
                <span className="admin-shell__nav-desc">{item.description}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-shell__footer">
          <p className="admin-shell__session">
            {sessionLabel}
            {isAdmin ? " · administrator" : " · unlock required"}
          </p>
          <div className="admin-shell__footer-actions">
            <Link className="btn btn-ghost text-sm" href="/map">
              Map
            </Link>
            {isAdmin ? <LibraryAdminLogout /> : null}
          </div>
        </div>
      </aside>

      <section className="admin-shell__stage" aria-label="Admin workspace">
        {children}
      </section>
    </div>
  );
}
