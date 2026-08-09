export type InvestorProfile =
  | "long-term"
  | "value"
  | "growth"
  | "dividend"
  | "etf-focused"
  | "active-trader"
  | "exploratory";

export type AssetClass =
  | "stock"
  | "etf"
  | "bond"
  | "reit"
  | "forex"
  | "commodity"
  | "cash"
  | "company";

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  shares: number;
  avgCost: number;
  lastPrice: number;
}

export interface LearningEvent {
  type:
    | "session_started"
    | "session_completed"
    | "module_started"
    | "module_completed"
    | "scenario_started"
    | "scenario_completed"
    | "investment_decision_submitted"
    | "decision_reasoning_submitted"
    | "portfolio_trade_executed"
    | "portfolio_rebalanced"
    | "competency_demonstrated"
    | "remediation_triggered"
    | "remediation_completed"
    | "sidequest_started"
    | "sidequest_completed"
    | "lesson_started"
    | "lesson_completed"
    | "quiz_submitted"
    | "session_heartbeat"
    | "chest_opened";
  sessionId: string;
  userId: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface GameState {
  version: 1;
  userId: string;
  email?: string;
  displayName?: string;
  sessionId: string;
  hearts: number;
  maxHearts: number;
  goldBars: number;
  capital: number;
  consecutiveWrong: number;
  consecutiveCorrect: number;
  inDetention: boolean;
  detentionQueue: string[];
  wrongQuestionIds: string[];
  completedModules: string[];
  completedSidequests: string[];
  unlockedModules: string[];
  mapPosition: { x: number; y: number };
  activeQuestId?: string;
  investorProfile: InvestorProfile;
  holdings: Holding[];
  cash: number;
  events: LearningEvent[];
  lastHeartbeatAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  chartHint?: "stock" | "forex" | "none";
  newsHint?: boolean;
}

export interface ModuleQuest {
  id: string;
  number: number;
  title: string;
  mapLabel: string;
  x: number;
  y: number;
  summary: string;
  concepts: string[];
  outcome: string;
  lesson: string;
  scenario: string;
  questions: QuizQuestion[];
}

export interface SideQuest {
  id: string;
  title: string;
  kind:
    | "bank-loan"
    | "shark-loan"
    | "buy-company"
    | "reit"
    | "stock-trade"
    | "forex-trade"
    | "commodity"
    | "bond"
    | "etf"
    | "real-estate"
    | "industry"
    | "super-chest";
  summary: string;
  risk: "low" | "medium" | "high";
  capitalDeltaSuccess: number;
  capitalDeltaFail: number;
  goldReward?: number;
  chestGold?: 1 | 2 | 3 | 5 | 10;
  prompt: string;
  choices: { label: string; success: boolean; feedback: string }[];
  x: number;
  y: number;
}
