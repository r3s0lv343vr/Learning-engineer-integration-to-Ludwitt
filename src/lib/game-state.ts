import { MODULES } from "@/lib/content/modules";
import { examAfterModule, getExam } from "@/lib/content/exams";
import { moduleGridPosition } from "@/lib/content/map-layout";
import type {
  GameState,
  Holding,
  InvestorProfile,
  LearningEvent,
} from "@/lib/types";

export const STARTING_CAPITAL = 14800;
export const MAX_HEARTS = 5;

export function createInitialState(input: {
  userId: string;
  email?: string;
  displayName?: string;
  investorProfile?: InvestorProfile;
}): GameState {
  const now = new Date().toISOString();
  const sessionId = crypto.randomUUID();
  return {
    version: 1,
    userId: input.userId,
    email: input.email,
    displayName: input.displayName,
    sessionId,
    hearts: MAX_HEARTS,
    maxHearts: MAX_HEARTS,
    goldBars: 0,
    capital: STARTING_CAPITAL,
    consecutiveWrong: 0,
    consecutiveCorrect: 0,
    inDetention: false,
    detentionQueue: [],
    wrongQuestionIds: [],
    completedModules: [],
    completedSidequests: [],
    completedTrades: [],
    unlockedModules: ["m1"],
    unlockedExams: [],
    completedExams: [],
    mapPosition: moduleGridPosition(0),
    investorProfile: input.investorProfile ?? "exploratory",
    holdings: [],
    cash: STARTING_CAPITAL,
    events: [
      {
        type: "session_started",
        sessionId,
        userId: input.userId,
        createdAt: now,
        metadata: { source: "createInitialState" },
      },
    ],
    createdAt: now,
    updatedAt: now,
  };
}

export function touch(state: GameState): GameState {
  return { ...state, updatedAt: new Date().toISOString() };
}

export function pushEvent(
  state: GameState,
  type: LearningEvent["type"],
  metadata?: Record<string, unknown>,
): GameState {
  const event: LearningEvent = {
    type,
    sessionId: state.sessionId,
    userId: state.userId,
    metadata,
    createdAt: new Date().toISOString(),
  };
  return touch({ ...state, events: [...state.events.slice(-199), event] });
}

export function applyAnswer(
  state: GameState,
  opts: { questionId: string; correct: boolean; moduleId?: string },
): GameState {
  let next = { ...state };
  if (opts.correct) {
    const consecutiveCorrect = next.consecutiveCorrect + 1;
    let hearts = next.hearts;
    let goldBars = next.goldBars;
    if (consecutiveCorrect > 0 && consecutiveCorrect % 5 === 0) {
      hearts = Math.min(next.maxHearts, hearts + 1);
      goldBars += 1;
    }
    next = pushEvent(
      {
        ...next,
        consecutiveCorrect,
        consecutiveWrong: 0,
        hearts,
        goldBars,
        wrongQuestionIds: next.wrongQuestionIds.filter((id) => id !== opts.questionId),
        detentionQueue: next.detentionQueue.filter((id) => id !== opts.questionId),
      },
      "quiz_submitted",
      { questionId: opts.questionId, correct: true, moduleId: opts.moduleId },
    );
  } else {
    const consecutiveWrong = next.consecutiveWrong + 1;
    let hearts = next.hearts;
    const wrongQuestionIds = Array.from(
      new Set([...next.wrongQuestionIds, opts.questionId]),
    );
    if (consecutiveWrong >= 4) {
      hearts = Math.max(0, hearts - 1);
    }
    let inDetention = next.inDetention;
    let detentionQueue = next.detentionQueue;
    if (hearts <= 0) {
      inDetention = true;
      detentionQueue = wrongQuestionIds.slice(-6);
      next = pushEvent(
        {
          ...next,
          consecutiveWrong: 0,
          consecutiveCorrect: 0,
          hearts: 0,
          wrongQuestionIds,
          inDetention,
          detentionQueue,
        },
        "remediation_triggered",
        { reason: "hearts_depleted" },
      );
      return next;
    }
    next = pushEvent(
      {
        ...next,
        consecutiveWrong: consecutiveWrong >= 4 ? 0 : consecutiveWrong,
        consecutiveCorrect: 0,
        hearts,
        wrongQuestionIds,
        inDetention,
        detentionQueue,
      },
      "quiz_submitted",
      { questionId: opts.questionId, correct: false, moduleId: opts.moduleId },
    );
  }
  return next;
}

export function normalizeState(state: GameState): GameState {
  return {
    ...state,
    unlockedExams: state.unlockedExams ?? [],
    completedExams: state.completedExams ?? [],
    completedTrades: state.completedTrades ?? [],
  };
}

/** Resolve a city trade area — capital delta may raise or lower the book. */
export function applyTradeAreaResult(
  state: GameState,
  opts: {
    tradeId: string;
    outcome: "gain" | "loss";
    capitalDelta: number;
    goldReward?: number;
  },
): GameState {
  state = normalizeState(state);
  if (state.completedTrades.includes(opts.tradeId)) return state;
  const capital = Math.max(0, state.capital + opts.capitalDelta);
  const cash = Math.max(0, state.cash + opts.capitalDelta);
  const goldBars =
    state.goldBars +
    (opts.outcome === "gain" ? (opts.goldReward ?? 0) : 0);
  let next: GameState = {
    ...state,
    capital,
    cash,
    goldBars,
    completedTrades: Array.from(
      new Set([...state.completedTrades, opts.tradeId]),
    ),
  };
  next = pushEvent(next, "trade_area_started", {
    tradeId: opts.tradeId,
    outcome: opts.outcome,
  });
  next = pushEvent(next, "trade_area_completed", {
    tradeId: opts.tradeId,
    outcome: opts.outcome,
    capitalDelta: opts.capitalDelta,
  });
  return next;
}

export function completeModule(state: GameState, moduleId: string): GameState {
  state = normalizeState(state);
  if (state.completedModules.includes(moduleId)) return state;
  const idx = MODULES.findIndex((m) => m.id === moduleId);
  const nextId = MODULES[idx + 1]?.id;
  const gate = examAfterModule(moduleId);
  const unlocked = new Set([...state.unlockedModules, moduleId]);
  const unlockedExams = new Set(state.unlockedExams);
  // Portals unlock sequentially so the coin can advance city-by-city.
  // Exams still unlock as checkpoints but no longer soft-lock the next portal.
  if (nextId) unlocked.add(nextId);
  if (gate && !state.completedExams.includes(gate.id)) {
    unlockedExams.add(gate.id);
  }
  const coinIdx = nextId ? idx + 1 : Math.max(0, idx);
  let next = pushEvent(
    {
      ...state,
      completedModules: [...state.completedModules, moduleId],
      unlockedModules: Array.from(unlocked),
      unlockedExams: Array.from(unlockedExams),
      goldBars: state.goldBars + 1,
      mapPosition: moduleGridPosition(coinIdx),
      activeQuestId: nextId,
      capital: state.capital + 250,
      cash: state.cash + 250,
    },
    "module_completed",
    { moduleId, examUnlocked: gate?.id, nextModuleId: nextId },
  );
  next = pushEvent(next, "lesson_completed", { moduleId });
  next = pushEvent(next, "competency_demonstrated", { moduleId });
  return next;
}

export function completeExam(state: GameState, examId: string): GameState {
  state = normalizeState(state);
  if (state.completedExams.includes(examId)) return state;
  const exam = getExam(examId);
  if (!exam) return state;
  const unlocked = new Set(state.unlockedModules);
  if (exam.unlocksModuleId) unlocked.add(exam.unlocksModuleId);
  // Also unlock the module after the gate if it differs
  const afterIdx = MODULES.findIndex((m) => m.id === exam.afterModuleId);
  const following = MODULES[afterIdx + 1]?.id;
  if (following) unlocked.add(following);
  let next = pushEvent(
    {
      ...state,
      completedExams: [...state.completedExams, examId],
      unlockedModules: Array.from(unlocked),
      goldBars: state.goldBars + 2,
      capital: state.capital + 400,
      cash: state.cash + 400,
      activeQuestId: exam.unlocksModuleId,
    },
    "exam_completed",
    { examId, roman: exam.roman },
  );
  next = pushEvent(next, "competency_demonstrated", { examId });
  return next;
}

export function applySidequestResult(
  state: GameState,
  opts: {
    sidequestId: string;
    success: boolean;
    capitalDelta: number;
    goldReward?: number;
    chestGold?: number;
  },
): GameState {
  const capital = Math.max(0, state.capital + opts.capitalDelta);
  const cash = Math.max(0, state.cash + opts.capitalDelta);
  const goldBars =
    state.goldBars +
    (opts.success ? (opts.goldReward ?? 0) + (opts.chestGold ?? 0) : 0);
  let next: GameState = {
    ...state,
    capital,
    cash,
    goldBars,
    completedSidequests: opts.success
      ? Array.from(new Set([...state.completedSidequests, opts.sidequestId]))
      : state.completedSidequests,
  };
  next = pushEvent(next, opts.success ? "sidequest_completed" : "sidequest_started", {
    sidequestId: opts.sidequestId,
    success: opts.success,
    capitalDelta: opts.capitalDelta,
  });
  if (opts.success && opts.chestGold) {
    next = pushEvent(next, "chest_opened", {
      sidequestId: opts.sidequestId,
      gold: opts.chestGold,
    });
  }
  return next;
}

export function upsertHolding(
  state: GameState,
  holding: Holding,
  mode: "add" | "remove",
): GameState {
  if (mode === "remove") {
    const existing = state.holdings.find((h) => h.id === holding.id);
    if (!existing) return state;
    const proceeds = existing.shares * existing.lastPrice;
    const next = {
      ...state,
      holdings: state.holdings.filter((h) => h.id !== holding.id),
      cash: state.cash + proceeds,
      capital: state.capital, // mark-to-market elsewhere; cash rises
    };
    return pushEvent(next, "portfolio_trade_executed", {
      action: "sell",
      symbol: existing.symbol,
      shares: existing.shares,
    });
  }

  const cost = holding.shares * holding.avgCost;
  if (cost > state.cash) return state;
  const existing = state.holdings.find((h) => h.symbol === holding.symbol);
  let holdings: Holding[];
  if (existing) {
    const shares = existing.shares + holding.shares;
    const avgCost =
      (existing.shares * existing.avgCost + holding.shares * holding.avgCost) /
      shares;
    holdings = state.holdings.map((h) =>
      h.symbol === holding.symbol
        ? { ...h, shares, avgCost, lastPrice: holding.lastPrice }
        : h,
    );
  } else {
    holdings = [...state.holdings, holding];
  }
  const next = {
    ...state,
    holdings,
    cash: state.cash - cost,
  };
  return pushEvent(next, "portfolio_trade_executed", {
    action: "buy",
    symbol: holding.symbol,
    shares: holding.shares,
  });
}

export function portfolioValue(state: GameState): number {
  const holdingsValue = state.holdings.reduce(
    (sum, h) => sum + h.shares * h.lastPrice,
    0,
  );
  return Math.round((state.cash + holdingsValue) * 100) / 100;
}

export function leaveDetention(state: GameState): GameState {
  if (!state.inDetention) return state;
  return pushEvent(
    {
      ...state,
      inDetention: false,
      hearts: 2,
      detentionQueue: [],
      consecutiveWrong: 0,
    },
    "remediation_completed",
    {},
  );
}
