import { NextRequest, NextResponse } from "next/server";
import { readSession, loadState } from "@/lib/session";
import { getValidAccessToken } from "@/lib/tokens";
import { callAiProxy, fetchCreditBalance } from "@/lib/ludwitt";

const TOP_UP = "https://pitchrise.ludwitt.com/account/credits";

export async function POST(req: NextRequest) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (session.demo) {
    return NextResponse.json(
      {
        error: "demo_mode",
        message:
          "AI mentor uses Ludwitt paid credits. Sign in with Ludwitt to unlock adaptive feedback.",
      },
      { status: 403 },
    );
  }

  const access = await getValidAccessToken();
  if (!access) {
    return NextResponse.json(
      { error: "ludwitt_token_missing", message: "Re-authenticate with Ludwitt." },
      { status: 401 },
    );
  }

  const balance = await fetchCreditBalance(access);
  if (!balance.ok) {
    return NextResponse.json(balance.raw, { status: balance.status });
  }
  if (balance.spendableCents <= 0) {
    return NextResponse.json(
      {
        error: "INSUFFICIENT_PAID_CREDITS",
        message: `You're out of Ludwitt credits for third-party apps — top up at ${TOP_UP}`,
        spendableCents: 0,
        topUpUrl: TOP_UP,
      },
      { status: 402 },
    );
  }

  const body = (await req.json()) as {
    question?: string;
    context?: string;
    moduleId?: string;
  };
  const state = await loadState();
  const prompt = [
    "You are an investing learning mentor inside AI Investment Learning Simulator.",
    "Be concise (under 180 words). Teach by questioning assumptions and risk process.",
    `Learner profile: ${state?.investorProfile ?? "exploratory"}.`,
    `Hearts: ${state?.hearts ?? "?"}, gold bars: ${state?.goldBars ?? "?"}.`,
    body.moduleId ? `Module: ${body.moduleId}.` : "",
    body.context ? `Context: ${body.context}` : "",
    `Learner asks: ${body.question || "Help me improve my investment decision process."}`,
  ]
    .filter(Boolean)
    .join("\n");

  const ai = await callAiProxy(access, [{ role: "user", content: prompt }], {
    max_tokens: 700,
  });

  if (ai.status === 402) {
    return NextResponse.json(
      {
        error: "INSUFFICIENT_PAID_CREDITS",
        message: `You're out of Ludwitt credits for third-party apps — top up at ${TOP_UP}`,
        topUpUrl: TOP_UP,
        details: ai.json,
      },
      { status: 402 },
    );
  }

  if (!ai.ok) {
    return NextResponse.json(
      { error: "ai_proxy_failed", details: ai.json },
      { status: ai.status },
    );
  }

  // Anthropic-like content blocks
  const content = ai.json.content;
  let text = "";
  if (Array.isArray(content)) {
    text = content
      .map((block) => {
        if (block && typeof block === "object" && "text" in block) {
          return String((block as { text: string }).text);
        }
        return "";
      })
      .join("\n")
      .trim();
  } else if (typeof content === "string") {
    text = content;
  }

  return NextResponse.json({
    ok: true,
    text,
    credits: ai.json["x-ludwitt-credits"] ?? null,
    spendableCents: balance.spendableCents,
  });
}
