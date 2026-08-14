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
    title: "Scenario Trees",
    mapLabel: "Scenario Tree",
    x: 50,
    y: 50,
    summary: "Build bull/base/bear paths with probabilities.",
    concepts: [
      "scenarios",
      "expected value",
      "tails"
    ],
    outcome: "Write three scenarios for one holding.",
    lesson:
      "E[R] = Σ p_i R_i. Force yourself to price the ugly path, not only the base case.",
    scenario:
      "Apply Module 28 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m28-q1",
        prompt: "In Module 28 (Scenario Trees), the best first step is to:",
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
        id: "m28-q2",
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
        id: "m28-q3",
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
  },
  {
    id: "m29",
    number: 29,
    title: "Hedging Instincts",
    mapLabel: "Hedge Booth",
    x: 50,
    y: 50,
    summary: "Use hedges to reshape risk, not to gamble twice.",
    concepts: [
      "hedge",
      "basis risk",
      "cost of hedge"
    ],
    outcome: "Choose when a hedge is insurance vs speculation.",
    lesson:
      "A hedge reduces an existing exposure. If it adds new directional risk, it is another bet.",
    scenario:
      "Apply Module 29 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m29-q1",
        prompt: "In Module 29 (Hedging Instincts), the best first step is to:",
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
        id: "m29-q2",
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
        id: "m29-q3",
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
  },
  {
    id: "m30",
    number: 30,
    title: "Behavioural Fire Drill",
    mapLabel: "Bias Drill",
    x: 50,
    y: 50,
    summary: "Catch common biases under time pressure.",
    concepts: [
      "loss aversion",
      "anchoring",
      "FOMO"
    ],
    outcome: "Name the bias in a chase-the-rally vignette.",
    lesson:
      "Anchoring on entry price, FOMO after headlines, and loss aversion delaying cuts destroy process.",
    scenario:
      "Apply Module 30 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m30-q1",
        prompt: "In Module 30 (Behavioural Fire Drill), the best first step is to:",
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
        id: "m30-q2",
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
        id: "m30-q3",
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
  },
  {
    id: "m31",
    number: 31,
    title: "Journal Sprint",
    mapLabel: "Journal Sprint",
    x: 50,
    y: 50,
    summary: "Log decisions with falsifiers in under five minutes.",
    concepts: [
      "decision journal",
      "falsifier",
      "review cadence"
    ],
    outcome: "Write a mini journal entry for a trade.",
    lesson:
      "Date, thesis, size, risks, falsifier, review date. Future-you needs the receipt.",
    scenario:
      "Apply Module 31 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m31-q1",
        prompt: "In Module 31 (Journal Sprint), the best first step is to:",
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
        id: "m31-q2",
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
        id: "m31-q3",
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
  },
  {
    id: "m32",
    number: 32,
    title: "Committee Simulation",
    mapLabel: "Committee Hall",
    x: 50,
    y: 50,
    summary: "Defend a recommendation under hostile questions.",
    concepts: [
      "process defence",
      "uncertainty",
      "alternatives"
    ],
    outcome: "Answer a sceptical IC question without bluffing.",
    lesson:
      "Committees reward clarity about what you know, what you don't, and what would change your mind.",
    scenario:
      "Apply Module 32 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m32-q1",
        prompt: "In Module 32 (Committee Simulation), the best first step is to:",
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
        id: "m32-q2",
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
        id: "m32-q3",
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
  },
  {
    id: "m33",
    number: 33,
    title: "Client Letter Craft",
    mapLabel: "Client Letter",
    x: 50,
    y: 50,
    summary: "Explain performance and process in plain language.",
    concepts: [
      "communication",
      "attribution",
      "expectations"
    ],
    outcome: "Draft three sentences on a down month.",
    lesson:
      "Clients need honesty on drivers and adherence to IPS — not jargon theatre.",
    scenario:
      "Apply Module 33 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m33-q1",
        prompt: "In Module 33 (Client Letter Craft), the best first step is to:",
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
        id: "m33-q2",
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
        id: "m33-q3",
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
  },
  {
    id: "m34",
    number: 34,
    title: "Ethics Under Pressure",
    mapLabel: "Ethics Gate",
    x: 50,
    y: 50,
    summary: "Refuse mandate breaches cleanly.",
    concepts: [
      "fiduciary duty",
      "IPS",
      "conflicts"
    ],
    outcome: "Respond to a breach request.",
    lesson:
      "Document, refuse non-compliant orders, offer compliant alternatives. Career > one trade.",
    scenario:
      "Apply Module 34 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m34-q1",
        prompt: "In Module 34 (Ethics Under Pressure), the best first step is to:",
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
        id: "m34-q2",
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
        id: "m34-q3",
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
  },
  {
    id: "m35",
    number: 35,
    title: "Integrated Case Week",
    mapLabel: "Case Week",
    x: 50,
    y: 50,
    summary: "Pull research, valuation, and risk into one case.",
    concepts: [
      "integration",
      "checklist",
      "decision"
    ],
    outcome: "Produce a one-page buy/hold/sell with risks.",
    lesson:
      "Integration is the skill: statements → ratios → valuation → portfolio fit → falsifiers.",
    scenario:
      "Apply Module 35 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m35-q1",
        prompt: "In Module 35 (Integrated Case Week), the best first step is to:",
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
        id: "m35-q2",
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
        id: "m35-q3",
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
