import { NextRequest } from "next/server";
import { launchDemoSession } from "@/lib/demo-launch";

/**
 * Path-style demo entry, e.g. /api/demo-launch/admin/portals
 * Equivalent to /api/demo-launch?next=/admin/portals
 */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const segments = (path ?? []).filter(Boolean);
  const next = segments.length ? `/${segments.join("/")}` : "/map";
  return launchDemoSession(next);
}
