/**
 * Admin backend capacities shown in the left rail.
 * Add new entries here when more admin tools are introduced.
 */
export type AdminNavItem = {
  id: string;
  label: string;
  href: string;
  description: string;
  /** Match pathname prefix to mark active (e.g. /admin/library). */
  match: string;
};

export const ADMIN_NAV: AdminNavItem[] = [
  {
    id: "libraries",
    label: "Library admin",
    href: "/admin/library",
    description: "Decks, notes, and reading links by city",
    match: "/admin/library",
  },
  {
    id: "portals",
    label: "Portal admin",
    href: "/admin/portals",
    description: "Portal text, PDFs, videos, diagrams, news",
    match: "/admin/portals",
  },
];

export function activeAdminNavId(pathname: string): string | null {
  const hit = ADMIN_NAV.find(
    (item) => pathname === item.match || pathname.startsWith(`${item.match}/`),
  );
  return hit?.id ?? null;
}
