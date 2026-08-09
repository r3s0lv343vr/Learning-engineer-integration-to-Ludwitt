import type { GameState } from "@/lib/types";
import { getHostedDoc, putHostedDoc } from "@/lib/ludwitt";
import { getValidAccessToken } from "@/lib/tokens";

export async function loadProgressFromHosted(
  fallback: GameState,
): Promise<GameState> {
  const access = await getValidAccessToken();
  if (!access) return fallback;
  const doc = await getHostedDoc(access, "progress", "latest");
  if (!doc?.data || typeof doc.data !== "object") return fallback;
  const data = doc.data as Partial<GameState>;
  return {
    ...fallback,
    ...data,
    userId: fallback.userId,
    version: 1,
    events: Array.isArray(data.events)
      ? (data.events as GameState["events"]).slice(-20)
      : fallback.events,
  };
}

export async function syncStateToHosted(state: GameState) {
  const access = await getValidAccessToken();
  if (!access) return { skipped: true as const };

  const slim = {
    ...state,
    events: state.events.slice(-20),
    userId: state.userId,
    updatedAt: state.updatedAt,
  };

  const progress = await putHostedDoc(access, "progress", "latest", slim);
  const portfolio = await putHostedDoc(access, "portfolio", "latest", {
    userId: state.userId,
    cash: state.cash,
    capital: state.capital,
    holdings: state.holdings,
    investorProfile: state.investorProfile,
    updatedAt: state.updatedAt,
  });
  const session = await putHostedDoc(access, "sessions", state.sessionId, {
    userId: state.userId,
    startedAt: state.createdAt,
    updatedAt: state.updatedAt,
    inDetention: state.inDetention,
  });

  const last = state.events[state.events.length - 1];
  let eventLog = { ok: true, status: 200, body: "" };
  if (last) {
    const docId = `${Date.now()}`.slice(0, 64);
    eventLog = await putHostedDoc(access, "event_log", docId, {
      type: last.type,
      sessionId: last.sessionId,
      createdAt: last.createdAt,
      metadata: last.metadata ?? {},
      userId: state.userId,
    });
  }

  return {
    skipped: false as const,
    progress,
    portfolio,
    session,
    eventLog,
  };
}
