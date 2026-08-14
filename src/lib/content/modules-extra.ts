import type { ModuleQuest } from "@/lib/types";

/** Modules 19–36 — Signal Quay + Mandate Highlands. */
export const MODULES_EXTRA: ModuleQuest[] = [
  {
    id: "m19",
    number: 19,
    title: "Bonds & Fixed Income",
    mapLabel: "Asset Mix Lab",
    x: 50,
    y: 50,
    summary:
      "Understand government and corporate bonds, yields, duration, credit risk and interest-rate sensitivity.",
    concepts: [
      "bond cash flows",
      "coupon and current yield",
      "holding-period return",
      "duration / rate sensitivity",
      "credit spread",
      "fixed-income portfolio role",
    ],
    outcome:
      "Decide whether fixed income improves the $14,800 portfolio after measuring coupon income, yield, duration risk and credit spread.",
    lesson:
      "A bond is a debt security: the investor is mainly a creditor, not an owner. Face (par) value is principal due at maturity; coupon rate sets contractual interest on face value; market price is what investors pay today for the promised cash flows; yield is the return implied by price and cash flows; duration measures interest-rate sensitivity; credit risk is the chance promised payments are missed. Annual coupon = Face value × Coupon rate (e.g. $1,000 × 6% = $60). Current yield = Annual coupon / Market price × 100% (e.g. $60 / $950 ≈ 6.32%) — it is not the same as yield to maturity. Holding-period return = (Coupon + Ending price − Beginning price) / Beginning price × 100% (e.g. buy $980, coupon $50, sell $1,005 → ≈ 7.65%). Bond prices move inversely to market yields: when rates rise, older lower-coupon bonds become less attractive and prices fall. Approximate % price change ≈ −Modified duration × Change in yield (e.g. duration 5.2 and +0.75 pp → ≈ −3.9%). Credit spread ≈ Corporate yield − Comparable government yield (e.g. 6.4% − 4.1% = 2.3% or 230 bp). Fixed income can add income, capital preservation, diversification, liability matching and recession ballast — but long duration, inflation and credit stress can still create losses.",
    scenario:
      "In Portfolio Lab you are sizing a fixed-income sleeve beside equities and cash on the $14,800 book. Before you buy, you must know what a bond is, how coupon and current yield differ, how total return includes price change, how duration estimates rate risk, and whether a corporate spread compensates for credit risk — then decide if bonds improve the portfolio.",
    questions: [
      {
        id: "m19-q1",
        prompt:
          "In Green City Portal 19, buying a conventional bond is economically different from buying a share mainly because:",
        choices: [
          "A bondholder is primarily a creditor with contractual cash-flow claims; a shareholder has a residual ownership claim",
          "Bonds never change price after purchase",
          "Bondholders always own voting control of the company",
          "Shares repay a fixed face value at a stated maturity date",
        ],
        correctIndex: 0,
        explanation:
          "Notes §19.1: a shareholder participates in residual success; a bondholder has a contractual claim focused on coupons, principal, rates and ability to pay.",
      },
      {
        id: "m19-q2",
        prompt:
          "A bond has face value $1,000 and a 6% annual coupon rate. What is the annual coupon payment?",
        choices: [
          "$60",
          "$6",
          "$1,060",
          "$600",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 19.1: Annual coupon = Face value × Coupon rate = $1,000 × 0.06 = $60.",
      },
      {
        id: "m19-q3",
        prompt:
          "A $1,000 face-value bond pays a $60 annual coupon and trades at $950. Approximate current yield is:",
        choices: [
          "About 6.32% (coupon ÷ market price × 100%)",
          "Exactly 6.00% because the coupon rate is 6%",
          "About 15.8% ($950 ÷ $60)",
          "Zero until maturity",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 19.2: Current yield = $60 / $950 × 100% ≈ 6.32%. Coupon rate ≠ current yield; current yield is not YTM.",
      },
      {
        id: "m19-q4",
        prompt:
          "A bond has modified duration 5.2 and market yield rises by 0.75 percentage points. Using the notes’ duration approximation, estimated price change is about:",
        choices: [
          "A 3.9% price decline (−5.2 × 0.0075)",
          "A 3.9% price increase",
          "No price change if coupons are still paid",
          "A 5.2% price decline equal to duration in years",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 19.4: %ΔPrice ≈ −Duration × ΔYield = −5.2 × 0.0075 = −0.039 → about −3.9%. Higher duration means more rate sensitivity.",
      },
      {
        id: "m19-q5",
        prompt:
          "For the $14,800 Portfolio Lab book, which decision best applies Portal 19 fixed-income thinking?",
        choices: [
          "Add/size a bond sleeve only after checking income role, duration (rate) risk and credit spread — not because a high yield looks free",
          "Treat every high-yield corporate bond as risk-free income",
          "Ignore duration because coupon payments guarantee no mark-to-market loss",
          "Replace all cash with the longest-duration bond available for maximum stability",
        ],
        correctIndex: 0,
        explanation:
          "Notes §§19.7–19.8: fixed income can diversify and stabilize, but duration, inflation and credit risk can still create losses; a wide spread may warn of stress, not free return.",
      },
    ],
  },
  {
    id: "m20",
    number: 20,
    title: "ETFs, Commodities & Alternatives",
    mapLabel: "Risk Budget",
    x: 50,
    y: 50,
    summary:
      "Understand index funds, sector ETFs, gold, commodities and alternative exposures; compare direct ownership with pooled vehicles.",
    concepts: [
      "ETF exposure vs wrapper",
      "expense ratio",
      "tracking difference",
      "commodity drivers",
      "direct vs pooled ownership",
    ],
    outcome:
      "Compare direct ownership with ETF/pooled and commodity exposures, then decide what role each vehicle plays in the $14,800 portfolio.",
    lesson:
      "An ETF is a wrapper around a basket or strategy that trades on an exchange — it does not remove underlying risk (a tech ETF still has tech risk; a long-duration bond ETF still has rate risk). Ask 'What exposure does this ETF actually contain?' and check holdings, mandate, expense ratio, bid-ask spread, tracking difference, liquidity, concentration and currency hedge status. Approximate annual fund fee = Amount invested × Expense ratio (e.g. $8,000 × 0.25% ≈ $20/year). Tracking difference = ETF return − Benchmark return (e.g. ETF 8.9% vs index 9.2% → −0.30 pp). Commodities (energy, metals, agriculture) generally do not produce operating earnings like a business; returns depend on price, supply/demand, inventories, weather, geopolitics, USD pricing and futures structure (contango/backwardation can affect fund returns even if spot barely moves). Price return = (Ending − Beginning) / Beginning × 100% (e.g. gold $2,000 → $2,140 = 7%). Direct ownership vs pooled: stocks/bonds/gold/property/commodities can be held directly or via ETFs/REITs/futures funds — choose the vehicle for a portfolio purpose, not recent price alone.",
    scenario:
      "In Portfolio Lab you can buy single names, a broad ETF, a sector ETF, or a commodity/gold vehicle inside the $14,800 book. Before you allocate, compare what exposure you actually get, what it costs, how closely it tracks, and whether a commodity sleeve is justified by inflation/supply risk — not by a hot chart.",
    questions: [
      {
        id: "m20-q1",
        prompt:
          "In Green City Portal 20, the most important question when evaluating an ETF is:",
        choices: [
          "What economic exposure does this ETF actually contain?",
          "Whether the product is labeled an ETF, regardless of holdings",
          "Whether the ticker looks diversified in its marketing name alone",
          "Whether the fund can eliminate underlying market risk",
        ],
        correctIndex: 0,
        explanation:
          "Notes §20.1: an ETF is a wrapper; it does not remove underlying risks. Two 'diversified' ETFs can have very different concentration.",
      },
      {
        id: "m20-q2",
        prompt:
          "An investor places $8,000 in an ETF with a 0.25% annual expense ratio. Approximate annual fund fee is:",
        choices: [
          "About $20 ($8,000 × 0.0025)",
          "About $200",
          "About $2",
          "$8,000 — the whole investment is the fee",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 20.1: Annual fee ≈ Investment × Expense ratio = $8,000 × 0.0025 ≈ $20. Small yearly, compounds over long holdings.",
      },
      {
        id: "m20-q3",
        prompt:
          "An index rises 9.2% while the ETF tracking it returns 8.9%. Tracking difference is:",
        choices: [
          "−0.30 percentage points (ETF return − index return)",
          "+0.30 percentage points",
          "9.2%",
          "8.9%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 20.2: Tracking difference = 8.9% − 9.2% = −0.30 pp. Fees, trading costs, cash drag and imperfect replication can create gaps.",
      },
      {
        id: "m20-q4",
        prompt:
          "Gold rises from $2,000 to $2,140 per ounce. Ignoring costs and vehicle structure, price return is:",
        choices: [
          "7.0%",
          "14.0%",
          "6.5%",
          "0% because commodities have no earnings",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 20.3: ($2,140 − $2,000) / $2,000 × 100% = 7.0%. Commodities lack operating cash flow like a business; return depends heavily on price and vehicle.",
      },
      {
        id: "m20-q5",
        prompt:
          "For the $14,800 Portfolio Lab book, which choice best applies Portal 20?",
        choices: [
          "Prefer a pooled ETF/REIT/futures vehicle when it delivers the intended exposure more practically than direct ownership — after checking holdings, costs and tracking",
          "Buy any commodity ETF solely because the spot price chart is rising",
          "Assume a sector ETF is as diversified as a broad global index because both are ETFs",
          "Ignore expense ratio and tracking difference if the fund name says 'index'",
        ],
        correctIndex: 0,
        explanation:
          "Notes §§20.1–20.6: compare direct vs pooled ownership; justify commodity/alternative sleeves by portfolio purpose; research exposure, costs and tracking.",
      },
    ],
  },
  {
    id: "m21",
    number: 21,
    title: "Strategic Asset Allocation",
    mapLabel: "Factor Desk",
    x: 50,
    y: 50,
    summary:
      "Understand long-term allocation across stocks, businesses, property, forex, bonds, alternatives and cash; create a target multi-asset portfolio.",
    concepts: [
      "strategic asset allocation",
      "portfolio weights",
      "target dollars",
      "expected portfolio return",
      "rebalancing to target",
      "strategic vs tactical",
    ],
    outcome:
      "Create a target multi-asset allocation for the $14,800 book and compute the rebalancing trade needed to reconnect actual holdings to policy.",
    lesson:
      "Strategic asset allocation sets long-term target weights from objectives, horizon, risk capacity, liquidity needs and beliefs — not a bet on which asset wins next month. Even an attractive security can hurt the portfolio if its weight is excessive. Asset weight = Asset value / Total portfolio value × 100% (e.g. $4,440 / $14,800 = 30% stocks). Target dollars = Portfolio value × Target weight (e.g. 25% bonds × $14,800 = $3,700). Example policy on $14,800: stocks 30% ($4,440), bonds 25% ($3,700), real estate 15% ($2,220), broad ETF 10% ($1,480), commodities/alts 5% ($740), forex/hedge 5% ($740), cash 10% ($1,480). Expected portfolio return = Σ (weight × expected asset return) with weights summing to 100% and consistent horizons (e.g. 50%×8% + 30%×4% + 20%×2% = 5.60%). Expected ≠ guaranteed. Rebalancing trade = Target dollars − Current dollars (e.g. target bonds $3,700 vs current $3,150 → buy/add $550). Strategic = long-term architecture; tactical = temporary deviation on a short/medium-term view that adds timing risk.",
    scenario:
      "In Portfolio Lab you must turn the $14,800 book into a written multi-asset policy: pick target weights, convert them to dollars, estimate weighted expected return, then rebalance any sleeve that has drifted — without confusing strategic architecture with a tactical chase.",
    questions: [
      {
        id: "m21-q1",
        prompt:
          "In Green City Portal 21, strategic asset allocation primarily sets:",
        choices: [
          "Long-term target weights from objectives, horizon, risk capacity and liquidity needs — not a prediction of next month’s winner",
          "Which single stock will outperform this week",
          "Day-trading entry signals for every sleeve",
          "A guarantee of the highest possible return",
        ],
        correctIndex: 0,
        explanation:
          "Notes §21.1: SAA is portfolio architecture. An excellent asset can still create a poor portfolio if its weight is excessive.",
      },
      {
        id: "m21-q2",
        prompt:
          "A $14,800 portfolio holds $4,440 in stocks. Stock weight is:",
        choices: [
          "30%",
          "44.4%",
          "14.8%",
          "70%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 21.1: Weight = $4,440 / $14,800 × 100% = 30%.",
      },
      {
        id: "m21-q3",
        prompt:
          "Target bond weight is 25% of a $14,800 portfolio. Target bond dollars equal:",
        choices: [
          "$3,700",
          "$2,960",
          "$4,440",
          "$1,480",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 21.2: Target value = $14,800 × 0.25 = $3,700.",
      },
      {
        id: "m21-q4",
        prompt:
          "A portfolio is 50% stocks E(R)=8%, 30% bonds E(R)=4%, 20% cash E(R)=2%. Expected portfolio return is:",
        choices: [
          "5.60%",
          "8.00%",
          "4.67% (simple average of 8%, 4%, 2%)",
          "14.00%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 21.3: 0.50×8% + 0.30×4% + 0.20×2% = 4% + 1.2% + 0.4% = 5.60%. Use weighted contributions, not an unweighted average.",
      },
      {
        id: "m21-q5",
        prompt:
          "Target bond value is $3,700 but bonds currently equal $3,150 in the $14,800 book. The rebalancing trade is:",
        choices: [
          "Buy/add $550 of bonds (target − current)",
          "Sell $550 of bonds",
          "Do nothing — strategic allocation never rebalances",
          "Move the entire $3,700 into cash",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 21.4: Trade = $3,700 − $3,150 = +$550. Rebalancing reconnects actual holdings to strategic policy.",
      },
    ],
  },
  {
    id: "m22",
    number: 22,
    title: "Portfolio Diversification",
    mapLabel: "Quality Screen",
    x: 50,
    y: 50,
    summary:
      "Understand correlation, concentration, sector, geographic and currency exposure, and liquidity; find hidden concentrations and diversification gaps.",
    concepts: [
      "diversification vs name-count",
      "concentration weight",
      "correlation",
      "two-asset portfolio volatility",
      "FX + local return",
      "liquidity diversification",
    ],
    outcome:
      "Audit the $14,800 book for hidden concentration and correlation risk, then identify diversification and liquidity gaps before acting.",
    lesson:
      "Diversification is not counting tickers — five banks can still be one credit/rate/economy bet. Audit issuer, sector, geography, currency, economic sensitivity, liquidity, duration and cash-flow source. Relationships change; correlations can rise in crises. Concentration weight = Exposure / Portfolio × 100% (e.g. $6,216 tech / $14,800 = 42%). Correlation ranges from −1 to +1 and describes co-movement, not causation. Two-asset variance: σp² = w₁²σ₁² + w₂²σ₂² + 2w₁w₂σ₁σ₂ρ₁₂; σp = √σp². Example: 60%/40%, σ 15%/10%, ρ=0.20 → ≈10.56% volatility; if ρ rises to 0.90 → ≈12.72%. Domestic-currency return ≈ (1+Local)(1+FX)−1 (e.g. +8% local and +5% FX → 13.4%). A portfolio can be asset-class diversified yet illiquid (property, private business, lockups).",
    scenario:
      "In Portfolio Lab your $14,800 book looks ‘diversified’ because it owns many names. Audit whether they share the same drivers, measure sector concentration and correlation benefit, check FX on foreign holdings, and ask whether you can sell what you own in a stress week.",
    questions: [
      {
        id: "m22-q1",
        prompt:
          "In Green City Portal 22, true diversification primarily requires:",
        choices: [
          "Examining how exposures overlap (drivers, sector, geography, currency, liquidity) — not merely counting holdings",
          "Owning as many tickers as possible regardless of shared risks",
          "Eliminating all portfolio risk",
          "Assuming correlation stays fixed forever once measured",
        ],
        correctIndex: 0,
        explanation:
          "Notes §22.1: many holdings can still be concentrated if they respond to the same economic drivers; correlations are dynamic.",
      },
      {
        id: "m22-q2",
        prompt:
          "Technology-related holdings total $6,216 in a $14,800 portfolio. Sector concentration is:",
        choices: [
          "42%",
          "24%",
          "6.2%",
          "148%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 22.1: $6,216 / $14,800 × 100% = 42% technology-sector exposure.",
      },
      {
        id: "m22-q3",
        prompt:
          "Portfolio is 60% Asset A (σ=15%) and 40% Asset B (σ=10%) with correlation 0.20. Approximate portfolio volatility is:",
        choices: [
          "About 10.56%",
          "About 12.5% (weighted average of 15% and 10%)",
          "About 25%",
          "About 15% — equal to the riskier asset",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 22.2: σp² = 0.00810 + 0.00160 + 0.00144 = 0.01114; σp ≈ 10.56%. Risk is not a simple weighted average of volatilities.",
      },
      {
        id: "m22-q4",
        prompt:
          "Using the same 60/40 and 15%/10% volatilities, if correlation rises from 0.20 to 0.90, portfolio volatility becomes about:",
        choices: [
          "12.72% — higher because assets move more together",
          "10.56% — unchanged because weights are unchanged",
          "Lower than 10.56% because diversification always improves in crises",
          "0% because correlation cannot exceed 0.5",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 22.3: higher ρ raises the covariance term; σp ≈ 12.72%. Diversification can weaken when correlations rise.",
      },
      {
        id: "m22-q5",
        prompt:
          "A foreign stock rises 8% locally and the foreign currency appreciates 5% vs home currency. Approximate domestic-currency return is:",
        choices: [
          "13.4% — (1.08)×(1.05) − 1",
          "13.0% — 8% + 5%",
          "3.0% — 8% − 5%",
          "8.0% — ignore FX for diversified portfolios",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 22.4: Domestic return = (1+0.08)(1+0.05) − 1 = 13.4%. Geographic diversification does not automatically remove currency risk.",
      },
    ],
  },
  {
    id: "m23",
    number: 23,
    title: "Add, Trim or Exit",
    mapLabel: "WC Watch",
    x: 50,
    y: 50,
    summary:
      "Understand rebalancing bands, valuation discipline, thesis deterioration, sell rules and capital rotation; choose ADD, HOLD, TRIM, EXIT or REPLACE for every holding.",
    concepts: [
      "ADD/HOLD/TRIM/EXIT/REPLACE",
      "rebalancing bands",
      "trim-to-target",
      "valuation upside",
      "capital rotation",
      "thesis deterioration",
    ],
    outcome:
      "For each material holding in the $14,800 book, choose ADD, HOLD, TRIM, EXIT or REPLACE using bands, valuation and thesis rules — not emotion.",
    lesson:
      "HOLD is an active decision that thesis, valuation and size remain appropriate — not neglect. Separate thesis from size: you can still like an asset and TRIM it for concentration. Decision set: ADD (increase), HOLD (unchanged), TRIM (reduce), EXIT (close), REPLACE (exit one to fund another). Rebalancing band: Upper = Target + deviation, Lower = Target − deviation (e.g. 30% ±5 pp → 25%–35%). Crossing a band triggers analysis, not an automatic trade. Trim amount = Current position value − Target position value; Target value = Portfolio × Target weight (e.g. $16,000 book, $6,000 position, 30% target → trim $1,200). Upside to estimated value = (Value − Price) / Price × 100% (e.g. $72 vs $66 → ≈9.09%). Relative expected-return advantage = New E(R) − Current E(R) (e.g. 9% − 5% = 4 pp) — still weigh costs, taxes and thesis quality. Exit/trim also when thesis drivers weaken, debt risk rises, valuation no longer compensates, concentration is too high, or a superior opportunity emerges.",
    scenario:
      "In Portfolio Lab a sleeve has drifted and one name looks expensive versus your estimate while another opportunity looks better. Use bands and written rules to choose ADD, HOLD, TRIM, EXIT or REPLACE on the $14,800 book without letting attachment decide.",
    questions: [
      {
        id: "m23-q1",
        prompt:
          "In Green City Portal 23, choosing HOLD for a position primarily means:",
        choices: [
          "An active conclusion that the thesis remains intact, valuation is acceptable and size is appropriate",
          "That the portfolio has been forgotten and needs no review",
          "That price falls always require adding",
          "That liking a company forbids ever trimming it",
        ],
        correctIndex: 0,
        explanation:
          "Notes §23.1: HOLD is a decision, not neglect. Thesis and position size are separate questions.",
      },
      {
        id: "m23-q2",
        prompt:
          "Target stock weight is 30% with a ±5 percentage-point band. The acceptable range is:",
        choices: [
          "25% to 35%",
          "30% to 35% only",
          "0% to 5%",
          "Exactly 30% every day",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 23.1: Upper = 30%+5%=35%; Lower = 30%−5%=25%. Bands avoid trading tiny noise while creating discipline.",
      },
      {
        id: "m23-q3",
        prompt:
          "Portfolio value is $16,000; a stock position is worth $6,000; target weight is 30%. Trim amount to target is:",
        choices: [
          "$1,200",
          "$4,800",
          "$6,000",
          "$1,600",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 23.2: Target value = $16,000 × 0.30 = $4,800; Trim = $6,000 − $4,800 = $1,200.",
      },
      {
        id: "m23-q4",
        prompt:
          "Estimated value is $72 and market price is $66. Approximate upside to estimated value is:",
        choices: [
          "About 9.09%",
          "About 8.33% (($72−$66)/$72)",
          "About 72%",
          "Zero because the thesis is still correct",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 23.3: Upside = ($72−$66)/$66 × 100% ≈ 9.09%. A valid thesis can still be a poor size/price decision.",
      },
      {
        id: "m23-q5",
        prompt:
          "Current holding E(R)=5%; a new opportunity E(R)=9% with similar risk/liquidity. Relative expected-return advantage is:",
        choices: [
          "4 percentage points — still check costs, taxes, uncertainty and thesis quality before REPLACE",
          "14% — add the two expected returns",
          "Automatic REPLACE with no further analysis",
          "0 — expected returns cannot be compared across holdings",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 23.4: Relative advantage = 9% − 5% = 4 pp. Replacement still accounts for frictions and thesis quality.",
      },
    ],
  },
  {
    id: "m24",
    number: 24,
    title: "Macroeconomics for Investors",
    mapLabel: "Duration Desk",
    x: 50,
    y: 50,
    summary:
      "Understand GDP, inflation, interest rates, unemployment, monetary/fiscal policy, yield curves and cycles; assess implications across major portfolio asset classes.",
    concepts: [
      "macro transmission channels",
      "real interest rate",
      "yield-curve / term spread",
      "inflation sensitivity by asset",
      "economic cycle phases",
    ],
    outcome:
      "Stress the $14,800 book for growth, inflation and rate scenarios — asking how cash flows and required returns change — without treating macro as fortune-telling.",
    lesson:
      "Macro matters through transmission channels (e.g. higher rates → mortgages, corporate borrowing, bond prices, FX). Purpose is sensitivity analysis, not predicting every recession. For any macro event ask: (1) do cash flows change? (2) does the required return/discount rate change? Approximate real rate ≈ Nominal − Inflation (e.g. 5.5% − 3.2% ≈ 2.3%). Exact real rate = (1+n)/(1+π) − 1 (same inputs ≈ 2.23%). Term spread = Long govt yield − Short govt yield (e.g. 10Y 4.0% − 2Y 4.7% = −70 bps inversion). Inflation hits assets differently: cash purchasing power, nominal bonds, stocks (pricing power), property (rents vs financing), commodities, FX. Cycle map: expansion → late cycle → slowdown/recession → recovery, each with different portfolio questions about cyclicals, leverage, liquidity and valuations.",
    scenario:
      "In Portfolio Lab rates are sticky and inflation is still above target. Before you ADD/TRIM any sleeve in the $14,800 book, compute the real rate, read the yield-curve spread, and map how cash, bonds, stocks, property, commodities and FX might respond.",
    questions: [
      {
        id: "m24-q1",
        prompt:
          "In Green City Portal 24, the best use of macro analysis for portfolio management is to:",
        choices: [
          "Understand portfolio sensitivities to growth, inflation and rates (cash flows and discount rates) — not to forecast every policy move",
          "Replace all company and asset analysis with GDP forecasts",
          "Guarantee the timing of the next recession from one indicator",
          "Ignore macro because only stock picking matters",
        ],
        correctIndex: 0,
        explanation:
          "Notes §24.1: macro provides the environment and transmission channels; it should not replace asset analysis or become fortune-telling.",
      },
      {
        id: "m24-q2",
        prompt:
          "Nominal rate is 5.5% and inflation is 3.2%. Approximate real interest rate is:",
        choices: [
          "About +2.3%",
          "About 8.7%",
          "About −2.3%",
          "Exactly 5.5%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 24.1: Real ≈ Nominal − Inflation = 5.5% − 3.2% ≈ 2.3%. Higher real rates can tighten conditions and pressure long-duration assets.",
      },
      {
        id: "m24-q3",
        prompt:
          "Using the exact Fisher formula with n=5.5% and π=3.2%, approximate exact real rate is:",
        choices: [
          "About 2.23% — (1.055)/(1.032) − 1",
          "Exactly 2.30% — same as simple subtraction always",
          "About 1.055%",
          "About 3.2%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 24.2: Exact real = (1+n)/(1+π) − 1 ≈ 2.23%. Use exact form when precision matters or rates/inflation are high.",
      },
      {
        id: "m24-q4",
        prompt:
          "10-year government yield is 4.0% and 2-year yield is 4.7%. Term spread is:",
        choices: [
          "−0.70% (−70 bps) — this segment is inverted",
          "+0.70%",
          "+4.0%",
          "Zero because both are government yields",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 24.3: Term spread = 4.0% − 4.7% = −0.70%. Inversion is evidence to investigate, not a guaranteed recession timer.",
      },
      {
        id: "m24-q5",
        prompt:
          "For the $14,800 book facing sticky inflation, which response best applies Portal 24?",
        choices: [
          "Ask how cash, nominal bonds, stocks, property, commodities and FX each transmit inflation/rate shocks before resizing sleeves",
          "Assume cash always preserves purchasing power regardless of inflation",
          "Treat inversion as an automatic signal to liquidate every equity",
          "Ignore financing costs for property because rents always rise with inflation",
        ],
        correctIndex: 0,
        explanation:
          "Notes §§24.5–24.6: inflation and cycle phases affect assets differently; map sensitivities across the portfolio rather than one blunt reaction.",
      },
    ],
  },
  {
    id: "m25",
    number: 25,
    title: "Earnings, News & New Information",
    mapLabel: "FX Desk",
    x: 50,
    y: 50,
    summary:
      "Understand earnings, guidance, analyst revisions, regulation, rate announcements and property-market information; distinguish thesis-changing evidence from market noise.",
    concepts: [
      "expectation gap",
      "earnings surprise",
      "guidance revision",
      "event return",
      "information triage",
      "noise vs thesis change",
    ],
    outcome:
      "Triage new information for the $14,800 book — measure surprise and reaction, then decide ADD/HOLD/TRIM/EXIT only if cash flows, risk or valuation assumptions change.",
    lesson:
      "Markets respond to information vs expectations, not merely ‘good’ or ‘bad’ news. Separate fact → thesis impact → price reaction. Earnings surprise % = (Actual EPS − Expected EPS) / |Expected EPS| × 100% (e.g. $2.10 vs $1.95 → ≈ +7.69%). Guidance midpoint = (Low + High)/2; Guidance change % = (New midpoint − Old midpoint) / Old midpoint × 100% (e.g. old $980–$1,020m → $1,000m; new $1,040–$1,100m → $1,070m → +7.0%). Event return = (Post − Pre) / Pre × 100% (e.g. $50 → $46 = −8.0%) measures reaction, not correctness. Noise vs thesis: one-day falls, analyst moves, headlines and rate news only change the thesis when they alter cash flows, financing, regulation or valuation structurally. Triage: what changed? source credible? already expected? alters cash flows/risk/valuation/financing? temporary or structural? one holding or whole book? then ADD/HOLD/TRIM/EXIT or no action.",
    scenario:
      "In Portfolio Lab an earnings print and a guidance update hit a core holding. Measure the surprise and the price reaction, then decide whether the $14,800 book needs an action — or whether the move is noise relative to expectations.",
    questions: [
      {
        id: "m25-q1",
        prompt:
          "In Green City Portal 25, markets primarily respond to news by comparing:",
        choices: [
          "New information versus what was already expected (the expectation gap)",
          "Whether headlines sound optimistic in isolation",
          "Only the size of the one-day price move",
          "Whether the company reported a record number, regardless of consensus",
        ],
        correctIndex: 0,
        explanation:
          "Notes §25.1: a record profit can still disappoint if investors expected more. Separate fact, thesis impact and price.",
      },
      {
        id: "m25-q2",
        prompt:
          "Actual EPS is $2.10 while consensus expected $1.95. Approximate earnings surprise is:",
        choices: [
          "About +7.69%",
          "About +$0.15 with no percentage meaning",
          "About −7.69%",
          "Exactly 2.10%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 25.1: Surprise = ($2.10−$1.95)/$1.95 × 100% ≈ 7.69%. Still ask if the beat is sustainable.",
      },
      {
        id: "m25-q3",
        prompt:
          "Old revenue guidance $980m–$1.02bn; new guidance $1.04bn–$1.10bn. Guidance midpoint change is:",
        choices: [
          "+7.0% ($1,000m → $1,070m)",
          "+2.0%",
          "−7.0%",
          "Unchanged because both ranges include $1bn",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 25.2: Old midpoint $1,000m; new $1,070m; change = 7.0%.",
      },
      {
        id: "m25-q4",
        prompt:
          "A stock closes at $50 before earnings and $46 after. Event return is:",
        choices: [
          "−8.0%",
          "+8.0%",
          "−$4 with no percentage",
          "Proof the market thesis is always correct",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 25.3: Event return = ($46−$50)/$50 × 100% = −8.0%. Reaction ≠ correctness.",
      },
      {
        id: "m25-q5",
        prompt:
          "For the $14,800 book, which response best applies Portal 25 information triage?",
        choices: [
          "Ask what changed, whether it was expected, and whether cash flows/risk/valuation changed structurally before ADD/HOLD/TRIM/EXIT",
          "Trade immediately on every analyst downgrade and one-day price fall",
          "Ignore guidance revisions if EPS beat consensus",
          "Treat every true headline as automatically material to long-term value",
        ],
        correctIndex: 0,
        explanation:
          "Notes §§25.4–25.6: source → expectation → economic impact → portfolio action; not every true fact is investment-relevant.",
      },
    ],
  },
  {
    id: "m26",
    number: 26,
    title: "Risk Management & Stress Testing",
    mapLabel: "Credit Spread",
    x: 50,
    y: 50,
    summary:
      "Understand volatility, beta, drawdown, Sharpe, correlation, VaR, leverage, liquidity and scenario analysis; stress-test against recession, inflation, property, currency and company shocks.",
    concepts: [
      "multi-dimensional risk",
      "volatility",
      "drawdown & recovery",
      "Sharpe ratio",
      "scenario stress P/L",
      "liquidity stress",
    ],
    outcome:
      "Stress-test the $14,800 book for a recession (and related) shocks, quantify scenario loss/return, and decide whether size, leverage or liquidity must change.",
    lesson:
      "Risk is multi-dimensional: volatility, beta, drawdown, Sharpe, VaR, leverage and liquidity answer different questions. Historical stats ≠ guaranteed future; stress tests ask what happens when assumptions fail. Ask how you can lose, how fast, what forces selling, and whether the book survives long enough for the thesis. Arithmetic mean = ΣR/n (e.g. 2%,−1%,3%,0%,1% → 1%). Sample volatility uses squared deviations /(n−1) (same series ≈ 1.58% monthly). Drawdown = (Trough − Peak)/Peak (e.g. $18,000 → $14,400 = −20%); recovery needed = Peak/Trough − 1 = 25% after a 20% loss. Sharpe = (Rp − Rf)/σp (e.g. 9%, 3%, 12% → 0.50). Scenario P/L = Σ(Value × shock); e.g. stocks $6,000/−20%, bonds $4,000/+5%, RE $3,000/−15%, cash $1,800/0 → −$1,450; on $14,800 that is ≈ −9.80%. Also ask liquidity: can you sell at the displayed price?",
    scenario:
      "In Portfolio Lab you must prove the $14,800 book can survive a recession-style stress — not just quote average return. Compute drawdown math, run a multi-asset shock table, and decide if concentration, leverage or illiquid sleeves need to change before the next crisis.",
    questions: [
      {
        id: "m26-q1",
        prompt:
          "In Green City Portal 26, why is one risk statistic (e.g. volatility alone) insufficient?",
        choices: [
          "Portfolios can share the same volatility but differ in leverage, concentration, liquidity and crisis vulnerability",
          "Volatility already includes every possible loss path",
          "Historical volatility guarantees the future distribution",
          "Only maximum return matters for portfolio management",
        ],
        correctIndex: 0,
        explanation:
          "Notes §26.1: use several lenses and stress tests; ask how/when you can lose and what forces selling.",
      },
      {
        id: "m26-q2",
        prompt:
          "A portfolio peaks at $18,000 and falls to $14,400. Drawdown and required recovery return are:",
        choices: [
          "−20% drawdown; 25% recovery required to regain the peak",
          "−20% drawdown; 20% recovery required",
          "−25% drawdown; 20% recovery required",
          "No drawdown if the thesis is still intact",
        ],
        correctIndex: 0,
        explanation:
          "Notes Examples 26.4–26.5: (−$3,600)/$18,000 = −20%; recovery = $18,000/$14,400 − 1 = 25%.",
      },
      {
        id: "m26-q3",
        prompt:
          "Portfolio return 9%, risk-free 3%, volatility 12%. Sharpe ratio is:",
        choices: [
          "0.50",
          "0.75",
          "1.33",
          "6.00",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 26.6: Sharpe = (9%−3%)/12% = 0.50. Compare only with consistent methodology; pair with drawdown/scenarios.",
      },
      {
        id: "m26-q4",
        prompt:
          "Recession stress: stocks $6,000 (−20%), bonds $4,000 (+5%), real estate $3,000 (−15%), cash $1,800 (0%). Scenario P/L is:",
        choices: [
          "−$1,450",
          "−$1,200",
          "+$200",
          "−$14,800",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 26.9: −$1,200 + $200 − $450 + $0 = −$1,450. Identifies which sleeves drive loss.",
      },
      {
        id: "m26-q5",
        prompt:
          "On a $14,800 starting book, that −$1,450 recession P/L is about a −9.80% scenario return. Best Portfolio Lab response is:",
        choices: [
          "Compare the loss with risk tolerance/liquidity needs and change size, leverage, hedges or allocation if it is intolerable",
          "Ignore the result because stress tests are not probabilities",
          "Increase leverage to recover faster",
          "Assume property can always be sold instantly at the model price",
        ],
        correctIndex: 0,
        explanation:
          "Notes Examples 26.10–26.11: use scenario results to change decisions; include liquidity shocks where displayed prices may not be realizable.",
      },
    ],
  },
  {
    id: "m27",
    number: 27,
    title: "Green City Crisis Challenge",
    mapLabel: "Liquidity Desk",
    x: 50,
    y: 50,
    summary:
      "Integrate a multi-asset market-shock simulation and decide what to sell, protect, add to, or leave untouched under pressure — without abandoning process.",
    concepts: [
      "crisis triage order",
      "liquidity first",
      "thesis break vs bargain",
      "duration & FX shock math",
      "concentration after moves",
      "ADD/HOLD/TRIM/EXIT/REPLACE/HEDGE",
    ],
    outcome:
      "Under an integrated shock on the $14,800 book, triage liquidity and thesis breaks first, quantify rate/FX hits, refresh weights, then record ADD/HOLD/TRIM/EXIT/REPLACE/HEDGE with evidence.",
    lesson:
      "A crisis is a decision test: incomplete information, fast prices, emotional pressure. Do not sell every fall — separate liquidity needs, thesis breaks, valuation opportunities and portfolio-level risk. Cash has option value. Triage order: (1) liquidity/obligations, (2) forced risks (margin, refinancing, covenants), (3) thesis breaks, (4) concentration, (5) scenario losses/recovery, (6) valuation vs updated fundamentals, (7) decide ADD/HOLD/TRIM/EXIT/REPLACE/HEDGE, (8) record the reason. Integrated shock example: rates +1.0 pp, equities −15%, property −10%, credit spreads wider, home currency +6%, one holding cuts guidance. Duration: %ΔPrice ≈ −Duration × ΔYield; e.g. $3,700 bonds, duration 5.0, Δy = +1.0% → ≈ −5% → ≈ −$185. FX: Domestic return = (1+Local)(1+FX)−1; 0% local and −6% FX → −6% domestic. Concentration: New weight = Position / New portfolio value; e.g. $2,500 on a book that fell $14,800 → $12,500 = 20%. Debrief: expected market risk vs thesis failure, diversification, correlations, liquidity, leverage, panic sells, missed opportunities, and which rule to change before the next crisis.",
    scenario:
      "Portfolio Lab runs Green City’s crisis challenge on the $14,800 book: rates jump, equities and property fall, spreads widen, the home currency strengthens, and a core name cuts guidance. Triage first, compute the bond and FX hits, refresh weights, then decide — with a written reason — what to sell, protect, add, or leave alone.",
    questions: [
      {
        id: "m27-q1",
        prompt:
          "In Green City Portal 27, why is a falling price alone not enough reason to sell?",
        choices: [
          "Price can fall while fundamentals stay intact (improving expected return) or because economics truly deteriorated — you must identify which case before acting",
          "Every price decline is always a bargain that must be bought",
          "Crisis prices are always wrong, so never update the thesis",
          "Only maximum drawdown statistics matter; prices are irrelevant",
        ],
        correctIndex: 0,
        explanation:
          "Notes §27.1: separate liquidity needs, thesis breaks, valuation opportunities and portfolio-level risk; do not react to every falling price.",
      },
      {
        id: "m27-q2",
        prompt:
          "Crisis triage: which check comes first, and why before hunting bargains?",
        choices: [
          "Liquidity and forced risks (obligations, margin, refinancing) — an elegant long-term plan fails if you cannot implement it or must raise cash immediately",
          "Average down on every name that fell 30%",
          "Maximize Sharpe using yesterday’s volatility only",
          "Hedge every foreign asset before checking cash needs",
        ],
        correctIndex: 0,
        explanation:
          "Notes §27.2: liquidity first; thesis breaks before bargains — a 30% decline is not automatically a bargain if cash flows deteriorated more than the price.",
      },
      {
        id: "m27-q3",
        prompt:
          "A $3,700 bond sleeve has modified duration 5.0. Yields rise 1.0 percentage point. Approximate dollar P/L is:",
        choices: [
          "−$185",
          "−$3,700",
          "+$185",
          "−$37",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 27.1: %ΔPrice ≈ −5.0 × 0.010 = −5%; $3,700 × (−0.05) ≈ −$185 (ignoring convexity/credit).",
      },
      {
        id: "m27-q4",
        prompt:
          "A foreign holding has 0% local return while the foreign currency falls 6% vs home. Domestic-currency return is:",
        choices: [
          "−6.0%",
          "0%",
          "+6.0%",
          "−0.6%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 27.2: Domestic = (1+0)(1−0.06)−1 = −6%. FX can create loss even when local asset price is unchanged.",
      },
      {
        id: "m27-q5",
        prompt:
          "After the shock the $14,800 book is $12,500; a defensive holding is still $2,500 (20% new weight). Best Portfolio Lab next step is:",
        choices: [
          "Use updated weights for crisis rebalancing, then record ADD/HOLD/TRIM/EXIT/REPLACE/HEDGE with evidence — not old target percentages or panic selling on price alone",
          "Ignore new weights because the dollar value did not rise",
          "Sell every name that fell regardless of thesis or liquidity",
          "Deploy all cash immediately without a review trigger",
        ],
        correctIndex: 0,
        explanation:
          "Notes Examples 27.3 + §§27.4/27.8–27.9: concentration can rise without the position rising; decide with a recorded reason and debrief which rule to change next time.",
      },
    ],
  },
  {
    id: "m28",
    number: 28,
    title: "Build an Investment Thesis",
    mapLabel: "Scenario Tree",
    x: 50,
    y: 50,
    summary:
      "Develop expected return, catalysts, risks, variant perception, falsification and sell criteria — then write a formal, testable thesis before sizing capital.",
    concepts: [
      "testable thesis",
      "scenario-weighted expected return",
      "upside / downside / MoS",
      "variant perception",
      "catalysts",
      "falsification & sell criteria",
    ],
    outcome:
      "Write a formal thesis for a major holding on the $14,800 book: expected return, upside/downside, variant view, catalyst, falsifiers, and sell rules — before sizing.",
    lesson:
      "An investment thesis is a structured, testable argument for risk-adjusted return over a horizon — not a pile of positive facts. Connect economics, valuation, catalysts, risks, and evidence that would prove you wrong. Vague praise (‘strong company’) is not a thesis. Sequence: research → valuation → why the gap may close → then size. Expected return = Σ(Probabilityᵢ × Scenario returnᵢ); probabilities sum to 100% (e.g. 30%/+25%, 50%/+10%, 20%/−20% → 8.5%). Upside to fair value = (Fair value − Price) / Price (e.g. $55 vs $42 ≈ 30.95%); compare with downside and confidence — reward must compensate for being wrong. Variant perception: state what the market embeds vs your evidence-based difference (not ‘cheap’ or ‘good’). Catalysts are mechanisms that may change expectations (earnings, launch, refinancing, regulation, rates) — not the thesis itself. Falsification + sell criteria (thesis-, valuation-, risk-, or opportunity-based) are set before emotional pressure; a price fall alone is not an automatic sell if value is unchanged.",
    scenario:
      "In Portfolio Lab you must approve a Highlands holding for the $14,800 book. Build a Yellow City thesis: scenario-weighted expected return, upside vs bear downside, a clear variant perception, a plausible catalyst, and written falsifiers/sell criteria — then decide whether the idea earns a size at all.",
    questions: [
      {
        id: "m28-q1",
        prompt:
          "In Yellow City Portal 28, what makes an investment thesis professional rather than vague praise?",
        choices: [
          "It is a testable argument linking economics, valuation, catalysts, risks, and evidence that would prove the view wrong",
          "It is a list of every positive fact about the company",
          "It is a guarantee that price will rise within a week",
          "It is only a chart pattern with no assumptions stated",
        ],
        correctIndex: 0,
        explanation:
          "Notes §28.1: a thesis must be specific enough to become wrong; ‘strong company’ is too vague.",
      },
      {
        id: "m28-q2",
        prompt:
          "Scenario-weighted expected return uses 30% chance of +25%, 50% of +10%, and 20% of −20%. E(R) is:",
        choices: [
          "8.5%",
          "15%",
          "25%",
          "−4%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 28.1: 0.30×0.25 + 0.50×0.10 + 0.20×(−0.20) = 7.5% + 5.0% − 4.0% = 8.5%. Not a promised outcome.",
      },
      {
        id: "m28-q3",
        prompt:
          "Current price $42; estimated fair value $55. Upside to fair value is about:",
        choices: [
          "30.95%",
          "13%",
          "55%",
          "42%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 28.2: ($55 − $42) / $42 ≈ 30.95%. Compare that gap with downside and confidence before sizing.",
      },
      {
        id: "m28-q4",
        prompt:
          "Which statement is the strongest form of variant perception?",
        choices: [
          "Consensus prices 3% growth; evidence supports ~7% because a new distribution channel is scaling faster than expected",
          "The company is good",
          "The stock is cheap",
          "Disagree with the market for the sake of being different",
        ],
        correctIndex: 0,
        explanation:
          "Notes §28.4: state consensus assumption, alternative assumption, evidence, and what could close the gap.",
      },
      {
        id: "m28-q5",
        prompt:
          "Before putting capital from the $14,800 book into the idea, the best Portfolio Lab close is:",
        choices: [
          "Write falsifiers and sell criteria now (thesis/valuation/risk/opportunity), then size only if expected return compensates for downside — do not wait until after a loss",
          "Skip falsifiers and buy maximum size because upside looks large",
          "Sell automatically if price dips 1% regardless of value",
          "Treat a hoped-for catalyst as the entire thesis",
        ],
        correctIndex: 0,
        explanation:
          "Notes §§28.5–28.6: catalysts are mechanisms, not the thesis; define failure conditions before emotional pressure; price alone is not the sell rule.",
      },
    ],
  },
  {
    id: "m29",
    number: 29,
    title: "Behavioural Finance",
    mapLabel: "Hedge Booth",
    x: 50,
    y: 50,
    summary:
      "Understand loss aversion, FOMO, anchoring, overconfidence, herding, confirmation bias and the disposition effect — then audit your own trade history for behavioural weaknesses.",
    concepts: [
      "loss aversion & recovery math",
      "disposition effect (PGR − PLR)",
      "forecast error / APE",
      "anchoring & FOMO",
      "overconfidence & herding",
      "behavioural decision journal",
    ],
    outcome:
      "Review decisions on the $14,800 book with recovery math, a disposition indicator, and a journal rule that re-underwrites from today’s price — not purchase price.",
    lesson:
      "Portal 28 builds a disciplined thesis; Portal 29 asks whether you can keep it when prices move. Biases systematically distort gains, losses, probabilities and social cues. Loss aversion: Required gain after loss = 1/(1−L)−1 (e.g. 30% loss → ≈42.86% to recover) because the capital base shrank — protect against permanent impairment, but do not confuse panic volatility with a broken thesis. Disposition effect: PGR = RG/(RG+PG), PLR = RL/(RL+PL), indicator = PGR−PLR (e.g. 12/20=0.60, 3/12=0.25 → 0.35) signals selling winners faster than losers. Overconfidence: Absolute % error = |Actual−Forecast|/|Forecast| (e.g. $102m vs $120m → 15%) — calibrate size when misses are large. Use a decision journal: feeling vs evidence, disagreeing evidence, size from confidence vs analysis, would I buy today if I did not already own it?",
    scenario:
      "In Portfolio Lab you audit Highlands trades on the $14,800 book after a volatile week. Compute recovery math on a drawdown, measure any disposition pattern, check a forecast miss, and write one rule that stops purchase-price anchoring from running the next decision.",
    questions: [
      {
        id: "m29-q1",
        prompt:
          "In Yellow City Portal 29, why does behavioural finance matter even for investors who know the maths?",
        choices: [
          "Biases can systematically distort how evidence is interpreted under uncertainty and emotional pressure",
          "Emotion should always replace the written thesis",
          "Mathematics guarantees unbiased decisions",
          "Only FOMO matters; other biases are irrelevant",
        ],
        correctIndex: 0,
        explanation:
          "Notes §29.1: the goal is rules and reviews so emotion does not silently control capital allocation.",
      },
      {
        id: "m29-q2",
        prompt:
          "An investment falls 30%. Approximate gain required to return to the original value is:",
        choices: [
          "42.86%",
          "30%",
          "70%",
          "15%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 29.1: 1/(1−0.30)−1 = 1/0.70−1 ≈ 42.86%. Equal % gains do not restore a smaller capital base.",
      },
      {
        id: "m29-q3",
        prompt:
          "Realized gains 12, paper gains 8, realized losses 3, paper losses 9. Disposition indicator (PGR − PLR) is:",
        choices: [
          "0.35",
          "0.60",
          "0.25",
          "1.00",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 29.2: PGR=12/20=0.60; PLR=3/12=0.25; indicator=0.35 — winners realized faster than losers.",
      },
      {
        id: "m29-q4",
        prompt:
          "Forecast revenue $120m; actual $102m. Absolute percentage error is:",
        choices: [
          "15%",
          "18%",
          "102%",
          "0%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 29.3: |102−120|/120 = 15%. Large misses should reduce confidence or widen scenarios and may shrink size.",
      },
      {
        id: "m29-q5",
        prompt:
          "Best Portfolio Lab response after spotting anchoring and disposition pressure on the $14,800 book is:",
        choices: [
          "Re-underwrite from today’s price (would I buy if I did not already own it?) and set a rule that separates thesis evidence from purchase-price / break-even feelings",
          "Hold every loser until break-even regardless of economics",
          "Sell every winner immediately because locking a gain always feels good",
          "Increase size whenever confidence feels high, without tracking forecast error",
        ],
        correctIndex: 0,
        explanation:
          "Notes §§29.2–29.5: combine recovery math with thesis review; journal questions convert bias into operating rules.",
      },
    ],
  },
  {
    id: "m30",
    number: 30,
    title: "Portfolio Optimization",
    mapLabel: "Bias Drill",
    x: 50,
    y: 50,
    summary:
      "Understand expected return, risk-adjusted performance, correlations, concentration, risk budgets and capital efficiency — then propose an improved portfolio under realistic constraints.",
    concepts: [
      "weighted expected portfolio return",
      "two-asset variance / correlation",
      "Sharpe ratio",
      "risk budget vs capital weight",
      "optimization constraints",
      "portfolio as a system",
    ],
    outcome:
      "Improve the $14,800 Highlands book as a system: compute E(Rp), volatility with correlation, Sharpe, and a simple risk-budget check — then apply mandate constraints rather than maximizing return alone.",
    lesson:
      "Optimization improves the return–risk trade-off under constraints; it is not maximize forecast return at any cost. Inputs (returns, vols, correlations) are estimates — combine math with constraints, scenarios and judgment. E(Rp)=Σ wᵢE(Rᵢ) (e.g. 40%/9%, 25%/4%, 20%/6%, 15%/2% → 6.10%). Risk needs interaction: σp²=w₁²σ₁²+w₂²σ₂²+2w₁w₂σ₁σ₂ρ₁₂ (e.g. 60%/16%, 40%/10%, ρ=0.25 → σp≈11.29% < 16%). Sharpe=[E(Rp)−Rf]/σp (e.g. 8%, 3%, 10% → 0.50) — useful but incomplete (drawdown, liquidity, non-normal returns). Capital weight ≠ risk share: simplified risk share ≈ wσ/Σ(wσ) (e.g. B at 30%/20% can match A at 50%/12%). Constraints (max position, cash reserve, illiquidity, sector/FX, leverage, turnover) keep optimization realistic when forecasts are wrong.",
    scenario:
      "In Portfolio Lab you must propose an improved $14,800 allocation for Mandate Highlands. Compute expected return and two-asset volatility with correlation, check Sharpe and which sleeve drives risk, then change weights only inside stated constraints — not an unconstrained max-return bet.",
    questions: [
      {
        id: "m30-q1",
        prompt:
          "In Yellow City Portal 30, what does portfolio optimization mean professionally?",
        choices: [
          "Improve the trade-off between expected return and risk subject to real-world constraints — not maximize forecast return at any cost",
          "Accept any mathematical output without judgment because forecasts are certain",
          "Maximize expected return while ignoring volatility, liquidity and concentration",
          "Judge each holding only in isolation and never as a system",
        ],
        correctIndex: 0,
        explanation:
          "Notes §30.1: make the portfolio more efficient and deliberate; combine estimates with constraints and judgment.",
      },
      {
        id: "m30-q2",
        prompt:
          "Weights 40% equities @9%, 25% bonds @4%, 20% real estate @6%, 15% cash @2%. Expected portfolio return is:",
        choices: [
          "6.10%",
          "9.00%",
          "5.25%",
          "21.00%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 30.1: 3.60%+1.00%+1.20%+0.30% = 6.10%. Each asset contributes in proportion to capital weight.",
      },
      {
        id: "m30-q3",
        prompt:
          "60% Asset A (σ=16%), 40% Asset B (σ=10%), ρ=0.25. Approximate portfolio volatility is:",
        choices: [
          "11.29%",
          "16.00%",
          "13.00%",
          "26.00%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 30.2: variance 0.012736 → σp≈11.29%. Diversification works because correlation is imperfect.",
      },
      {
        id: "m30-q4",
        prompt:
          "E(Rp)=8%, Rf=3%, σp=10%. Sharpe ratio is:",
        choices: [
          "0.50",
          "0.80",
          "5.00",
          "0.10",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 30.3: (8%−3%)/10% = 0.50 excess return per unit of volatility — incomplete alone, but comparable when measured consistently.",
      },
      {
        id: "m30-q5",
        prompt:
          "On the $14,800 book, Asset B is only 30% of capital but 20% volatility while A is 50%/12%. Best optimization next step is:",
        choices: [
          "Check risk-budget share (B can rival A’s risk) and resize under constraints — do not assume largest capital weight is largest risk",
          "Ignore B because its capital weight is smaller than A’s",
          "Put 100% in the highest expected-return name with no max-position or cash reserve",
          "Add only ‘low-vol’ names without checking correlation",
        ],
        correctIndex: 0,
        explanation:
          "Notes Examples 30.4 + §30.6: capital ≠ risk; constraints and covariance thinking keep the improved portfolio realistic.",
      },
    ],
  },
  {
    id: "m31",
    number: 31,
    title: "Capital Rotation",
    mapLabel: "Journal Sprint",
    x: 50,
    y: 50,
    summary:
      "Understand opportunity cost, relative attractiveness, valuation changes and new opportunities — then decide where capital should remain versus redeploy.",
    concepts: [
      "opportunity cost",
      "relative expected-return advantage",
      "switching hurdle / net benefit",
      "relative valuation spread",
      "rotation decision framework",
      "deliberate inaction",
    ],
    outcome:
      "Redeploy capital on the $14,800 Highlands book only when a new opportunity clears the switching hurdle after costs, uncertainty, liquidity and portfolio fit — not because of boredom or purchase price.",
    lesson:
      "Capital has opportunity cost: every dollar held chooses that asset over alternatives. Rotation is deliberate redeployment when reward-to-risk changes. Decide forward from today’s price — purchase price must not dominate. Relative expected-return advantage = E(Rnew)−E(Rcurrent) (e.g. 9.0%−5.5%=3.5 pp). Switching hurdle: Net benefit ≈ Advantage − trading cost% − tax/other% (e.g. 3.5%−0.4%−1.0%≈2.1 pp); modest edges can vanish under forecast error. Relative P/E spread = multipleA−multipleB (e.g. 24×−17×=7×) — cheaper is not automatically better unless quality/growth/risk are comparable. Framework compares expected return, downside, valuation, thesis, catalyst, liquidity, correlation, costs and size capacity. Do not rotate constantly: require material change in attractiveness; deliberate inaction is often professional.",
    scenario:
      "In Portfolio Lab a Highlands holding on the $14,800 book offers ~5.5% expected return while a peer opportunity looks like ~9% at similar risk. Quantify the advantage, subtract switching costs, check relative valuation, then decide KEEP vs ROTATE with a written reason — not a boredom trade.",
    questions: [
      {
        id: "m31-q1",
        prompt:
          "In Yellow City Portal 31, why is holding capital in one asset an active decision?",
        choices: [
          "Every dollar held cannot be invested elsewhere — opportunity cost means choosing it over the best available alternative today",
          "Purchase price permanently locks the capital decision forever",
          "Rotation should ignore expected return and only follow recent price charts",
          "Opportunity cost only applies to cash, never to invested holdings",
        ],
        correctIndex: 0,
        explanation:
          "Notes §31.1: forward-looking reward-to-risk from today’s price — not original purchase price — drives rotation.",
      },
      {
        id: "m31-q2",
        prompt:
          "Current holding E(R)=5.5%; new opportunity E(R)=9.0% at similar risk. Relative expected-return advantage is:",
        choices: [
          "3.5 percentage points",
          "14.5%",
          "5.5%",
          "0%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 31.1: 9.0% − 5.5% = 3.5 pp. Rotation is still not automatic after costs and uncertainty.",
      },
      {
        id: "m31-q3",
        prompt:
          "Advantage is 3.5 pp; trading costs 0.4%; tax/other switching cost 1.0%. Approximate net benefit is:",
        choices: [
          "2.1 percentage points",
          "3.5 percentage points",
          "4.9 percentage points",
          "0.4 percentage points",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 31.2: 3.5% − 0.4% − 1.0% ≈ 2.1 pp. A modest edge can disappear under costs or forecast error.",
      },
      {
        id: "m31-q4",
        prompt:
          "Current holding at 24× earnings; alternative at 17× with similar growth and balance-sheet quality. P/E spread is:",
        choices: [
          "7×",
          "41×",
          "17×",
          "1×",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 31.3: 24× − 17× = 7×. Still verify quality, growth and risk before calling the cheaper name better.",
      },
      {
        id: "m31-q5",
        prompt:
          "Best Portfolio Lab rule for rotating the $14,800 book is:",
        choices: [
          "Rotate only when relative attractiveness changes materially and net benefit clears the switching hurdle — deliberate inaction is fine when the thesis still fits",
          "Trade every day so the book always feels active",
          "Always sell after any short-term price move regardless of expected return",
          "Ignore liquidity, taxes and correlation because expected return advantage alone is enough",
        ],
        correctIndex: 0,
        explanation:
          "Notes §§31.4–31.5: material change drives rotation; constant activity can destroy performance through costs and overreaction.",
      },
    ],
  },
  {
    id: "m32",
    number: 32,
    title: "Historical Market Simulator",
    mapLabel: "Committee Hall",
    x: 50,
    y: 50,
    summary:
      "Understand crisis environments resembling 1987, dot-com, 2008, COVID and the 2022 inflation/rate shock — and manage without knowing the historical outcome in advance.",
    concepts: [
      "information-limited simulation",
      "drawdown vs volatility",
      "recovery mathematics",
      "decision log under uncertainty",
      "hindsight bias",
      "process vs outcome scoring",
    ],
    outcome:
      "Run an information-limited crisis lab on the Highlands book: measure drawdown and recovery burden, log decisions with falsifiers before outcomes are revealed, and judge process — not hindsight.",
    lesson:
      "Historical simulation is a decision laboratory, not a memory test: reveal events sequentially and decide before the next stage. Environments stress liquidity, leverage, valuations, credit and simultaneous stock/bond pressure (1987, dot-com, 2008, COVID, 2022). Drawdown = (Trough−Peak)/Peak (e.g. $10.8m→$8.1m = −25%) — the loss investors actually experience, distinct from volatility. Recovery = Peak/Trough−1 (e.g. 10.8/8.1−1 ≈ 33.33% after a 25% loss). Do not automatically take more risk to ‘earn it back.’ Keep a decision log: information known, decision, reason, what would change your mind — then outcome later. Avoid hindsight bias: score process with information available at the time; a good process can have a bad outcome.",
    scenario:
      "Portfolio Lab runs a Highlands crisis sim without naming the year. After a peak-to-trough move, compute drawdown and recovery math on the book, write a decision log before the next reveal, and refuse hindsight scoring when the outcome appears.",
    questions: [
      {
        id: "m32-q1",
        prompt:
          "In Yellow City Portal 32, how should historical market simulation be run?",
        choices: [
          "As an information-limited decision lab — decide with only what is known so far, before the next stage is revealed",
          "As a memory test where the final historical outcome is shown first",
          "As a guarantee that past crises will repeat exactly",
          "As a reason to ignore drawdown limits because long-run returns eventually work",
        ],
        correctIndex: 0,
        explanation:
          "Notes §32.1: if the ending is known, the task becomes memory; stress relationships that change in crises.",
      },
      {
        id: "m32-q2",
        prompt:
          "A simulated fund peaks at $10.8m and later falls to $8.1m. Drawdown is:",
        choices: [
          "−25%",
          "−33.33%",
          "+25%",
          "−2.7%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 32.1: ($8.1m−$10.8m)/$10.8m = −25%. Drawdown is peak-to-trough loss experience, not volatility.",
      },
      {
        id: "m32-q3",
        prompt:
          "To recover from $8.1m back to the $10.8m peak, approximate return required is:",
        choices: [
          "33.33%",
          "25%",
          "75%",
          "8.1%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 32.2: $10.8m/$8.1m − 1 ≈ 33.33%. A 25% loss needs a larger subsequent gain because the base shrank.",
      },
      {
        id: "m32-q4",
        prompt:
          "What is hindsight bias in crisis evaluation?",
        choices: [
          "Treating the correct action as obvious after the outcome, understating the uncertainty that existed in real time",
          "Recording what was known before deciding",
          "Scoring process quality with information available at the time",
          "Distinguishing volatility from drawdown",
        ],
        correctIndex: 0,
        explanation:
          "Notes §32.5: judge whether the process was reasonable then; good decisions can have bad outcomes.",
      },
      {
        id: "m32-q5",
        prompt:
          "Best Portfolio Lab response mid-sim after a −25% drawdown on the Highlands book is:",
        choices: [
          "Log the decision with reason and falsifier before the next reveal; do not automatically raise risk just to recover the 33% required gain",
          "Max leverage immediately to earn back the peak this week",
          "Skip the journal because the ending will make the answer obvious later",
          "Ignore drawdown because long-run average return looks fine",
        ],
        correctIndex: 0,
        explanation:
          "Notes §§32.3–32.4: recovery burden rises after deep losses; response depends on remaining opportunity set and risk budget, with a written decision log.",
      },
    ],
  },
  {
    id: "m33",
    number: 33,
    title: "Global Investment Strategy",
    mapLabel: "Client Letter",
    x: 50,
    y: 50,
    summary:
      "Understand international markets, country risk, emerging vs developed markets, currency exposure and geopolitical risk — then build a global allocation with cross-border risks managed explicitly.",
    concepts: [
      "listing vs economic vs currency exposure",
      "home-currency return",
      "hedged vs unhedged FX",
      "country weight / concentration",
      "country-risk checklist",
      "developed vs emerging trade-offs",
    ],
    outcome:
      "Add or size a foreign sleeve on the Highlands book by separating local asset return from FX, stating hedge intent, and checking country concentration — not just collecting more country names.",
    lesson:
      "Global investing expands opportunity but adds FX, political, legal, capital-control and information risks. Diversification is not listing location alone — distinguish listing, revenue, currency and economic exposure. Home-currency return = (1+Local)(1+FX)−1 (e.g. +12% local and −8% FX → 3.04% home). Separate the asset thesis from currency exposure; state whether FX is intentional or hedged (hedging can cut volatility but is not free). Country weight = Country exposure / Portfolio (e.g. $3.2m/$10m = 32%) — also track economic exposure for multinationals. Use a country-risk checklist (politics, convertibility, inflation, fiscal, banks, trade, geopolitics, governance).",
    scenario:
      "Portfolio Lab proposes a foreign equity for the Highlands book. Compute home-currency return after an FX move, decide hedge vs unhedged with a written reason, measure country weight, and refuse ‘more countries = diversified’ without economic-exposure checks.",
    questions: [
      {
        id: "m33-q1",
        prompt:
          "In Yellow City Portal 33, why is owning more country listings not automatically diversification?",
        choices: [
          "Listing location can differ from revenue, currency and economic exposure — names in different countries may still share the same industry or shock",
          "Global investing never introduces new risks",
          "Only the stock ticker country matters for risk",
          "Emerging markets have no currency risk",
        ],
        correctIndex: 0,
        explanation:
          "Notes §33.1: understand connections — listing, revenue, FX and economic exposure — not more country labels alone.",
      },
      {
        id: "m33-q2",
        prompt:
          "Foreign stock +12% local; foreign currency −8% vs home. Home-currency return is:",
        choices: [
          "3.04%",
          "12%",
          "4%",
          "−8%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 33.1: (1.12)(0.92)−1 = 3.04%. Most of the local gain was offset by FX depreciation.",
      },
      {
        id: "m33-q3",
        prompt:
          "What is the professional point of choosing hedged vs unhedged foreign exposure?",
        choices: [
          "State whether currency risk is intentional; hedging can reduce unwanted FX volatility but has cost/basis risk and may remove FX gains",
          "Always hedge because FX never matters",
          "Never hedge because local return equals home return",
          "Leave FX unmanaged because overlooking it is fine",
        ],
        correctIndex: 0,
        explanation:
          "Notes §33.3: separate currency decision from asset decision; unmanaged FX should not exist by accident.",
      },
      {
        id: "m33-q4",
        prompt:
          "A $10m fund has $3.2m exposed to one country. Country weight is:",
        choices: [
          "32%",
          "3.2%",
          "68%",
          "10%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 33.2: $3.2m/$10m = 32%. Country limits help prevent accidental concentration.",
      },
      {
        id: "m33-q5",
        prompt:
          "Best Portfolio Lab next step before sizing a global sleeve into the Highlands book is:",
        choices: [
          "Separate asset thesis from FX, set hedge intent, check country weight plus the country-risk checklist (politics, convertibility, liquidity, governance)",
          "Buy every country ETF equally and skip FX math",
          "Assume developed-market listings remove all political risk",
          "Treat the lowest valuation emerging market as automatically safest",
        ],
        correctIndex: 0,
        explanation:
          "Notes §§33.2–33.5: manage cross-border risks explicitly; valuation discounts may reflect higher risk.",
      },
    ],
  },
  {
    id: "m34",
    number: 34,
    title: "The Fund Mandate",
    mapLabel: "Ethics Gate",
    x: 50,
    y: 50,
    summary:
      "Develop an Investment Policy Statement — return target, risk limits, liquidity, benchmarks, concentration and allocation constraints — and graduate from the $14,800 book to a simulated $10 million professional fund.",
    concepts: [
      "IPS as fund constitution",
      "scaling weights to dollars",
      "active / benchmark-relative return",
      "maximum position size",
      "liquidity reserve",
      "implementation vs allocation arithmetic",
    ],
    outcome:
      "Write mandate rules for a $10m Highlands fund: scale target weights to dollars, enforce max position and liquidity reserve, and judge performance vs benchmark — not personal preference.",
    lesson:
      "A professional fund is managed to the mandate, not personal preference. The IPS is the fund’s constitution: objective, return target, risk/drawdown limits, liquidity, benchmark, asset ranges, concentration, leverage, currency and review process. Scaling $14,800 → $10m: Dollar allocation = Fund × Weight (e.g. 35% equity → $3.5m) — arithmetic is familiar, but market impact, liquidity and governance grow. Active return = Rp − Rb (e.g. 8.4% − 7.1% = +1.3 pp) — absolute gain can still be poor relatively. Max position = Fund × Limit (e.g. 6% of $10m = $600k); monitor after price moves. Liquidity reserve = Fund × Required % (e.g. 12% → $1.2m) balances readiness vs capital efficiency.",
    scenario:
      "You graduate Portfolio Lab from the $14,800 book to a simulated $10m Highlands fund. Draft IPS limits, convert a 35% equity target to dollars, set a 6% single-name cap and 12% liquidity reserve, then score a period’s active return vs benchmark — refuse any trade that breaches the mandate.",
    questions: [
      {
        id: "m34-q1",
        prompt:
          "In Yellow City Portal 34, what is the role of the Investment Policy Statement?",
        choices: [
          "It is the fund’s constitution — defining objective, risk, liquidity, benchmark and limits so decisions follow the mandate, not personal preference after performance becomes uncomfortable",
          "It is optional marketing text that never constrains trades",
          "It only sets the stock ticker list and ignores risk and liquidity",
          "It replaces the need for a benchmark or review process",
        ],
        correctIndex: 0,
        explanation:
          "Notes §34.1: the move to $10m is about obligations and consistency with the IPS, not merely scale.",
      },
      {
        id: "m34-q2",
        prompt:
          "A $10m fund has a 35% strategic equity target. Dollar equity allocation is:",
        choices: [
          "$3.5 million",
          "$350,000",
          "$35 million",
          "$1.48 million",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 34.1: $10,000,000 × 0.35 = $3.5m. Same weight logic as $14,800, with larger implementation risk.",
      },
      {
        id: "m34-q3",
        prompt:
          "Fund returns 8.4%; benchmark returns 7.1%. Active return is:",
        choices: [
          "+1.3 percentage points",
          "15.5%",
          "8.4%",
          "−1.3 percentage points",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 34.2: 8.4% − 7.1% = +1.3 pp. Absolute return can still be weak relative performance if risk was excessive.",
      },
      {
        id: "m34-q4",
        prompt:
          "Fund value $10m; maximum single-stock weight 6%. Maximum dollar position is:",
        choices: [
          "$600,000",
          "$6,000,000",
          "$60,000",
          "$1,200,000",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 34.3: $10m × 0.06 = $600k. Monitor after market moves — winners can breach limits without new buys.",
      },
      {
        id: "m34-q5",
        prompt:
          "Mandate requires 12% of the $10m fund in cash/highly liquid instruments. Best Portfolio Lab action is:",
        choices: [
          "Hold at least $1.2m liquid reserve and refuse over-allocation to attractive but hard-to-sell assets that would breach liquidity",
          "Deploy every dollar into illiquid opportunities because cash always destroys return",
          "Ignore the reserve once the equity target is filled",
          "Treat the $14,800 starter book limits as optional forever after graduation",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 34.4: $10m × 0.12 = $1.2m. Liquidity balances readiness with capital efficiency under the mandate.",
      },
    ],
  },
  {
    id: "m35",
    number: 35,
    title: "Multi-Year Fund Simulation",
    mapLabel: "Case Week",
    x: 50,
    y: 50,
    summary:
      "Operate the $10m Highlands fund across several simulated years — research, buy/add/hold/trim/sell, hedge and rebalance within the mandate — and measure path-dependent compounding with geometric return, ending value and turnover.",
    concepts: [
      "path dependence",
      "geometric (compounded) return",
      "ending fund value",
      "portfolio turnover",
      "decision cadence (monitor vs trade)",
      "multi-year decision journal",
    ],
    outcome:
      "Run a multi-year $10m simulation: compute geometric return and ending value, score turnover, keep a decision journal, and separate continuous monitoring from disciplined review/trade cadence.",
    lesson:
      "Managing well once is not enough. Multi-year management is path dependent: the order of returns and events changes the capital base on which later gains compound. Geometric return = [Π(1+Rt)]^(1/n) − 1 respects compounding (e.g. +10%, −5%, +12% → growth 1.1704 → ≈5.38% annualized); arithmetic averages can overstate realized growth. Ending value = Beginning × Π(1+Rt) (e.g. $10m × 1.1704 = $11.704m) before flows/fees. Turnover ≈ lesser of purchases or sales / average fund value × 100% (e.g. $2.6m / $10.4m = 25%) — explain rotations vs cost. Cadence: monitor daily/weekly for breaches; review monthly/quarterly; annual mandate review; event-driven when theses break — monitor continuously without trading continuously.",
    scenario:
      "Your $10m Highlands fund enters a multi-year Portfolio Lab path with company events, rate moves and recessions. Keep the mandate, journal each material decision, then compute geometric return and ending value for +10%/−5%/+12%, estimate turnover when purchases are $3.0m and sales $2.6m on a $10.4m average book, and refuse continuous churn that is not thesis-driven.",
    questions: [
      {
        id: "m35-q1",
        prompt:
          "In Yellow City Portal 35, why is multi-year fund management path dependent?",
        choices: [
          "The sequence of returns, cash flows, rebalancing and opportunity changes affects the capital base and final outcome — not only the list of final asset returns",
          "Only the last year’s return matters for compounding",
          "Path dependence means the IPS can be ignored after year one",
          "Order of returns never affects ending wealth if the arithmetic average is fixed",
        ],
        correctIndex: 0,
        explanation:
          "Notes §35.1: a large early loss changes the base for later gains; process must stay usable as conditions evolve.",
      },
      {
        id: "m35-q2",
        prompt:
          "Annual returns are +10%, −5%, +12%. Approximate annualized geometric return is:",
        choices: [
          "5.38%",
          "17.04%",
          "5.67% (simple arithmetic mean)",
          "12%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 35.1: 1.10 × 0.95 × 1.12 = 1.1704; 1.1704^(1/3) − 1 ≈ 5.38%. Geometric return respects compounding.",
      },
      {
        id: "m35-q3",
        prompt:
          "Beginning fund $10m; same path +10%, −5%, +12% (growth factor 1.1704). Ending fund value is:",
        choices: [
          "$11.704 million",
          "$10.538 million",
          "$13.0 million",
          "$1.1704 million",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 35.2: $10,000,000 × 1.1704 = $11,704,000 before external flows or fees.",
      },
      {
        id: "m35-q4",
        prompt:
          "Purchases $3.0m, sales $2.6m, average fund value $10.4m. Approximate annual turnover is:",
        choices: [
          "25%",
          "56% ((3.0+2.6)/10.4)",
          "30% (3.0/10.4)",
          "2.5%",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 35.3: lesser of purchases/sales = $2.6m; $2.6m / $10.4m × 100% = 25%. High turnover can adapt — or raise costs.",
      },
      {
        id: "m35-q5",
        prompt:
          "Best Portfolio Lab cadence for the multi-year Highlands simulation is:",
        choices: [
          "Monitor continuously for material events and mandate breaches, but review and trade on a deliberate monthly/quarterly (and event-driven) cadence — journal why each material decision changed",
          "Trade every day because monitoring frequency must equal turnover",
          "Skip the journal once geometric return looks acceptable",
          "Replace the $10m mandate with the old $14,800 book rules mid-simulation",
        ],
        correctIndex: 0,
        explanation:
          "Notes §35.5–35.6: monitor ≠ trade continuously; cadence plus a multi-year decision journal keep process accountable before Portal 36’s committee defence.",
      },
    ],
  },
  {
    id: "m36",
    number: 36,
    title: "Capstone Defence Prep",
    mapLabel: "Defence Prep",
    x: 50,
    y: 50,
    summary: "Prepare the final mandate defence packet.",
    concepts: [
      "IPS",
      "risk limits",
      "crisis plan"
    ],
    outcome: "List the artefacts required for mandate defence.",
    lesson:
      "IPS, holdings with weights, risk dashboard, crisis playbook, and decision journal excerpts.",
    scenario:
      "Apply Module 36 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m36-q1",
        prompt: "In Module 36 (Capstone Defence Prep), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m36-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m36-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  }
];
