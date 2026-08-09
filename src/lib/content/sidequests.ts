import type { SideQuest } from "@/lib/types";

/** 12 side quests + 3 super chest quests (gold bars 3 / 5 / 10). */
export const SIDEQUESTS: SideQuest[] = [
  {
    id: "sq-bank-loan",
    title: "Credit Desk Line",
    kind: "bank-loan",
    summary: "Borrow at a fair rate to fund a researched opportunity — or overextend.",
    risk: "medium",
    capitalDeltaSuccess: 900,
    capitalDeltaFail: -600,
    goldReward: 1,
    prompt:
      "The bank offers $3,000 at 8% to fund a diversified ETF add. What do you do?",
    choices: [
      {
        label: "Borrow only what fits your risk budget and deploy into the ETF",
        success: true,
        feedback: "Sized leverage with a clear use of proceeds. Capital and skill both grow.",
      },
      {
        label: "Borrow the max and put it all in one meme stock",
        success: false,
        feedback: "Unsized leverage into a single name — the bank still wants repayment.",
      },
      {
        label: "Decline and keep optionality in cash",
        success: true,
        feedback: "Skipping unnecessary leverage is a valid risk decision. Small gold for discipline.",
      },
    ],
    x: 14,
    y: 50,
  },
  {
    id: "sq-shark-loan",
    title: "Alley Shark Note",
    kind: "shark-loan",
    summary: "A street lender offers fast cash at brutal terms.",
    risk: "high",
    capitalDeltaSuccess: 200,
    capitalDeltaFail: -1800,
    prompt: "A shark offers $2,500 due next week for $4,000. Tempted?",
    choices: [
      {
        label: "Refuse — the implied rate destroys expected edge",
        success: true,
        feedback: "You avoided predatory financing. Survival is a return.",
      },
      {
        label: "Take it to YOLO a forex scalp",
        success: false,
        feedback: "The note compounds faster than your edge. Capital is docked.",
      },
    ],
    x: 22,
    y: 64,
  },
  {
    id: "sq-buy-company",
    title: "Acquire Brightforge",
    kind: "buy-company",
    summary: "A small manufacturer is for sale — diligence or vanity?",
    risk: "high",
    capitalDeltaSuccess: 2200,
    capitalDeltaFail: -1500,
    goldReward: 2,
    prompt:
      "Brightforge asks $4,000. Cash flow is steady but customer concentration is high. Bid?",
    choices: [
      {
        label: "Bid with a margin of safety and demand key-person insurance",
        success: true,
        feedback: "You priced risk and protected downside. The acquisition pays.",
      },
      {
        label: "Pay full ask because the logo looks cool",
        success: false,
        feedback: "Vanity M&A without diligence — write-down incoming.",
      },
    ],
    x: 34,
    y: 44,
  },
  {
    id: "sq-reit",
    title: "REIT Coupon Desk",
    kind: "reit",
    summary: "Listed property exposure with rate sensitivity.",
    risk: "medium",
    capitalDeltaSuccess: 700,
    capitalDeltaFail: -500,
    prompt:
      "Rates just ticked up. A retail REIT yields 7%. Add a starter position or wait?",
    choices: [
      {
        label: "Small position — size for rate risk and tenant quality",
        success: true,
        feedback: "Sized REIT exposure with eyes open on duration risk.",
      },
      {
        label: "Go all-in because yield looks high",
        success: false,
        feedback: "Yield trap + rate shock. Capital slides.",
      },
    ],
    x: 50,
    y: 40,
  },
  {
    id: "sq-stock-trade",
    title: "Equity Pit Skirmish",
    kind: "stock-trade",
    summary: "Use the stock candle chart to decide a short swing.",
    risk: "medium",
    capitalDeltaSuccess: 650,
    capitalDeltaFail: -450,
    prompt:
      "A quality compounder pulled back 12% on soft guidance but FCF is intact. Chart shows higher lows. Action?",
    choices: [
      {
        label: "Scale in a measured buy with a falsifier if FCF breaks",
        success: true,
        feedback: "Thesis + chart + risk limit. The bounce pays the skirmish.",
      },
      {
        label: "Market-sell everything you own in panic",
        success: false,
        feedback: "Process abandoned. The skirmish bills you.",
      },
    ],
    x: 62,
    y: 54,
  },
  {
    id: "sq-forex-trade",
    title: "FX Tape Crossing",
    kind: "forex-trade",
    summary: "Read forex candles before risking pip capital.",
    risk: "high",
    capitalDeltaSuccess: 800,
    capitalDeltaFail: -700,
    prompt:
      "USD strengthens after a hot inflation print. Your EURUSD long is underwater. Next?",
    choices: [
      {
        label: "Cut to risk limit and reassess macro — do not average blindly",
        success: true,
        feedback: "Respecting FX risk limits preserves ammunition.",
      },
      {
        label: "Triple the long because mean reversion is due",
        success: false,
        feedback: "Doubling down against policy momentum — pips become wounds.",
      },
    ],
    x: 70,
    y: 40,
  },
  {
    id: "sq-commodity",
    title: "Copper Trading Desk",
    kind: "commodity",
    summary: "Industrial metal bet tied to growth expectations.",
    risk: "medium",
    capitalDeltaSuccess: 550,
    capitalDeltaFail: -400,
    prompt: "Global PMI softens. Copper inventory rises. Stay long copper ETF?",
    choices: [
      {
        label: "Trim — growth impulse faded and inventory is a tell",
        success: true,
        feedback: "You updated on evidence. Capital preserved with a gain.",
      },
      {
        label: "Add leverage ignoring inventories",
        success: false,
        feedback: "Narratives without inventory data are expensive.",
      },
    ],
    x: 80,
    y: 28,
  },
  {
    id: "sq-bond",
    title: "Duration Desk",
    kind: "bond",
    summary: "Choose bond duration into a possible hike.",
    risk: "low",
    capitalDeltaSuccess: 400,
    capitalDeltaFail: -350,
    prompt: "Hike odds rose. Extend duration for yield or stay short?",
    choices: [
      {
        label: "Prefer shorter duration until the path clarifies",
        success: true,
        feedback: "Duration humility pays when the curve is uncertain.",
      },
      {
        label: "Buy the longest zero with leverage",
        success: false,
        feedback: "Rates bite. Mark-to-market hurts.",
      },
    ],
    x: 66,
    y: 22,
  },
  {
    id: "sq-etf",
    title: "Index Tape Raise",
    kind: "etf",
    summary: "Core vs satellite — keep costs and drift in check.",
    risk: "low",
    capitalDeltaSuccess: 500,
    capitalDeltaFail: -250,
    prompt: "Your satellite stock picks drifted to 80% of the book. Rebalance to a world ETF core?",
    choices: [
      {
        label: "Rebalance toward the diversified core",
        success: true,
        feedback: "Concentration risk falls. Quiet compounding resumes.",
      },
      {
        label: "Ignore drift because recent winners feel inevitable",
        success: false,
        feedback: "Factor bet in disguise. A rotation taxes you.",
      },
    ],
    x: 52,
    y: 18,
  },
  {
    id: "sq-real-estate",
    title: "Lot Deed Filing",
    kind: "real-estate",
    summary: "Direct property speculation vs REIT liquidity.",
    risk: "high",
    capitalDeltaSuccess: 1200,
    capitalDeltaFail: -1100,
    prompt:
      "A riverfront lot is cheap after a flood scare. Illiquid, insurance uncertain. Buy?",
    choices: [
      {
        label: "Pass — illiquidity + uninsurable tail is outside mandate",
        success: true,
        feedback: "Saying no is a position. Capital stays deployable.",
      },
      {
        label: "All-in with a shark loan down payment",
        success: false,
        feedback: "Stacked risks. The deed becomes a detention story.",
      },
    ],
    x: 40,
    y: 34,
  },
  {
    id: "sq-industry",
    title: "Chip Supply Shock",
    kind: "industry",
    summary: "Sector event — capacity, geopolitics, and customers.",
    risk: "medium",
    capitalDeltaSuccess: 900,
    capitalDeltaFail: -650,
    goldReward: 1,
    prompt:
      "Export controls hit a chip supplier you hold. Competitors with domestic fabs rally. Response?",
    choices: [
      {
        label: "Re-underwrite: trim constrained names, consider diversified semi ETF",
        success: true,
        feedback: "Industry structure updated. You adapt without panic.",
      },
      {
        label: "Average down blindly on the halted exporter",
        success: false,
        feedback: "Policy risk ignored. Capital takes the hit.",
      },
    ],
    x: 32,
    y: 20,
  },
  {
    id: "sq-insurance-float",
    title: "Underwriter Float",
    kind: "industry",
    summary: "An insurer's float looks investable — until claims spike.",
    risk: "medium",
    capitalDeltaSuccess: 750,
    capitalDeltaFail: -550,
    prompt: "Combined ratio looks fine historically but catastrophe exposure rose. Buy the insurer?",
    choices: [
      {
        label: "Small sleeve only after reviewing cat reinsurance cover",
        success: true,
        feedback: "Float is capital — when risks are understood.",
      },
      {
        label: "Concentrate half the portfolio for 'Buffett vibes'",
        success: false,
        feedback: "Imitation without underwriting skill is costly.",
      },
    ],
    x: 18,
    y: 18,
  },
  {
    id: "sq-chest-3",
    title: "Bronze Vault Chest",
    kind: "super-chest",
    summary: "Solve a valuation riddle for 3 gold bars.",
    risk: "low",
    capitalDeltaSuccess: 300,
    capitalDeltaFail: -100,
    chestGold: 3,
    prompt: "Price $50, estimated intrinsic value $80, durable moat intact. Best action?",
    choices: [
      {
        label: "Buy with a margin of safety and write falsifiers",
        success: true,
        feedback: "Chest opens: 3 gold bars.",
      },
      {
        label: "Short it because the chart is boring",
        success: false,
        feedback: "The chest snaps shut — process mismatch.",
      },
    ],
    x: 46,
    y: 70,
  },
  {
    id: "sq-chest-5",
    title: "Silver Vault Chest",
    kind: "super-chest",
    summary: "Macro + FX puzzle for 5 gold bars.",
    risk: "medium",
    capitalDeltaSuccess: 500,
    capitalDeltaFail: -200,
    chestGold: 5,
    prompt:
      "Inflation sticky, policy hawkish, you hold long-duration tech and a EUR long. First risk action?",
    choices: [
      {
        label: "Reduce duration and FX risk toward limits before hunting upside",
        success: true,
        feedback: "Chest yields 5 gold bars.",
      },
      {
        label: "Add to both because pain means it's working",
        success: false,
        feedback: "Martingale thinking — no silver for you.",
      },
    ],
    x: 84,
    y: 52,
  },
  {
    id: "sq-chest-10",
    title: "Gold Vault Chest",
    kind: "super-chest",
    summary: "Mandate ethics trial for 10 gold bars.",
    risk: "high",
    capitalDeltaSuccess: 1000,
    capitalDeltaFail: -400,
    chestGold: 10,
    prompt:
      "A client demands you abandon the IPS to chase a viral asset outside constraints. You…",
    choices: [
      {
        label: "Document the request, refuse the breach, offer compliant alternatives",
        success: true,
        feedback: "Sovereign chest opens: 10 gold bars. Process over politics.",
      },
      {
        label: "Chase it secretly and hide the risk in a footnote",
        success: false,
        feedback: "Mandate breach. The chest is empty and trust is damaged.",
      },
    ],
    x: 88,
    y: 12,
  },
];

export function getSidequest(id: string) {
  return SIDEQUESTS.find((s) => s.id === id);
}
