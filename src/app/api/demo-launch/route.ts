import { NextRequest } from "next/server";
import { launchDemoSession } from "@/lib/demo-launch";

export async function GET(req: NextRequest) {
  return launchDemoSession(req.nextUrl.searchParams.get("next"));
}
