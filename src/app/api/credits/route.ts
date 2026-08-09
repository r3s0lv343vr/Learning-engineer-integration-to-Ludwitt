import { NextResponse } from "next/server";
import { readSession } from "@/lib/session";
import { getValidAccessToken } from "@/lib/tokens";
import { fetchCreditBalance } from "@/lib/ludwitt";

export async function GET() {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (session.demo) {
    return NextResponse.json({
      demo: true,
      spendableCents: 0,
      message: "Demo mode — Sign in with Ludwitt to use paid credits.",
    });
  }

  const access = await getValidAccessToken();
  if (!access) {
    return NextResponse.json(
      { error: "ludwitt_token_missing", message: "Re-authenticate with Ludwitt." },
      { status: 401 },
    );
  }

  const balance = await fetchCreditBalance(access);
  return NextResponse.json(balance, { status: balance.ok ? 200 : balance.status });
}
