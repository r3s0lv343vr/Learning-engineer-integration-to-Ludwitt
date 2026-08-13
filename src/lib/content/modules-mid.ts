import type { ModuleQuest } from "@/lib/types";

/** Brick Exchange portals 10–18 (kept from prior syllabus core). */
export const MODULES_MID: ModuleQuest[] = [
  {
    id: "m10",
    number: 10,
    title: "Portfolio Construction",
    mapLabel: "Portfolio Plaza",
    x: 58,
    y: 28,
    summary:
      "Understand business models, revenue drivers, customers, competitors, market share and competitive advantage before deeper analysis.",
    concepts: [
      "company as an economic system",
      "revenue = price × quantity",
      "revenue growth",
      "market share",
      "competitive advantage",
      "company comparison scorecard",
    ],
    outcome:
      "Compare companies on the Blue City scorecard and select one for deeper analysis before deploying the $14,800 book.",
    lesson:
      "Blue City Portal 10 starts with the business, not the stock price. A company is an economic system: it sells something, incurs costs, invests capital, competes for customers and tries to keep enough value for owners. Identify what is sold, who pays, how often, what drives volume and price, and the main costs — financial statements are outputs of that system. Then quantify the engine. Revenue = Price × Quantity (same unit for price and quantity). A company selling 240,000 units at an $18 average selling price generates $4,320,000 of sales — scale, not profit. Revenue growth = (Revenue₁ − Revenue₀) / Revenue₀ × 100%; $48m to $54m is 12.5%, and growth still must be read against margins, cash flow and the price paid. Market share = Company sales / Total market sales × 100%; $900m in a $6bn market is 15%. A firm can grow while losing share if the market grows faster. Share is position, not profitability. Competitive advantage is evidence that customers, margins or returns can be defended (cost, switching costs, network effects, brand/pricing power, IP, distribution/data) — not merely a popular brand. Use the comparison scorecard (growth, gross margin, customer concentration, share trend, advantage evidence, capital needs, key risk) before picking a name for deeper work.",
    scenario:
      "Two Brick Exchange names are on the watchlist for your $14,800 Portfolio Lab. Before statements and valuation, map each economic system, compute revenue, growth and share from the notes examples, and ask whether any advantage looks durable. Which company deserves deeper analysis — and why is a calculated number not yet a buy?",
    questions: [
      {
        id: "m10-q1",
        prompt:
          "Before ratios and valuation, Blue City treats a company first as an economic system. What should you identify?",
        choices: [
          "What is sold, who pays, how often, what drives volume and price, and the main costs",
          "Only the last closing price and ticker symbol",
          "Only the number of shares outstanding",
          "Only whether the brand is popular",
        ],
        correctIndex: 0,
        explanation:
          "Financial statements are outputs of the operating system. Start with the business model — product or service, customer, frequency, volume and price drivers, and costs — not the stock quote.",
      },
      {
        id: "m10-q2",
        prompt:
          "A company sells 240,000 units at an average selling price of $18. Revenue = Price × Quantity. What is revenue, and what does that number prove?",
        choices: [
          "$4,320,000 of sales — the scale of sales, not profitability",
          "$18,000 of sales — and that the company is cheap",
          "$4,320,000 of net income — so owners are already rewarded",
          "$240,000 of sales — because quantity is the only driver",
        ],
        correctIndex: 0,
        explanation:
          "Revenue = $18 × 240,000 = $4,320,000. Price and quantity must use the same unit. The notes interpret this as sales scale; it does not show profit, cash or a purchase price.",
      },
      {
        id: "m10-q3",
        prompt:
          "Revenue rises from $48 million to $54 million. Growth = (Revenue₁ − Revenue₀) / Revenue₀ × 100%. What is the growth rate, and why is old revenue the denominator?",
        choices: [
          "12.5% — growth is measured relative to the starting base, in comparable periods",
          "12.5% — because $6m divided by new revenue $54m is the standard",
          "6% — the dollar change without dividing by the base",
          "11.1% — ($54m − $48m) / $54m",
        ],
        correctIndex: 0,
        explanation:
          "Change = $6m; $6m / $48m × 100% = 12.5%. The earlier-period revenue is the base. Growth still must be compared with margins, cash flow and the price paid for the stock.",
      },
      {
        id: "m10-q4",
        prompt:
          "A firm has $900 million of sales in a $6 billion market. Which reading matches the notes?",
        choices: [
          "15% market share — position in the defined market, not profitability; the firm can grow sales and still lose share if the market grows faster",
          "15% net margin — so the economics are already proven durable",
          "6.7% share — $6bn / $900m, and share equals a buy signal",
          "90% share — $900m is almost the whole market",
        ],
        correctIndex: 0,
        explanation:
          "Market share = $0.9bn / $6.0bn × 100% = 15%. Numerator and denominator must match units, geography, product and period. Share describes position; competitive advantage asks whether that position can persist.",
      },
      {
        id: "m10-q5",
        prompt:
          "Your $14,800 Portfolio Lab application for Portal 10 is to compare companies before selecting one for deeper analysis. What is the disciplined next step?",
        choices: [
          "Score both names on growth, share trend, advantage evidence, capital needs and key risk — then choose one for deeper work; a calculated number is not yet an investment decision",
          "Buy the cheaper ticker immediately with the full $14,800",
          "Skip the business model and jump to a price target",
          "Treat a popular brand as proof of durable advantage and deploy now",
        ],
        correctIndex: 0,
        explanation:
          "The notes’ scorecard compares growth, margins, concentration, share trend, advantage evidence, reinvestment need and key risk. Blue City’s rule: interpret every answer economically — a calculated number is not yet an investment decision.",
      },
    ],
  },
  {
    id: "m11",
    number: 11,
    title: "Macroeconomics for Investors",
    mapLabel: "Macro Desk",
    x: 44,
    y: 22,
    summary:
      "Read the income statement, balance sheet and cash-flow statement together — working capital, free cash flow and net debt — to see how money moves through a company.",
    concepts: [
      "three financial statements",
      "income statement layers",
      "accounting equation",
      "net working capital",
      "free cash flow",
      "net debt",
    ],
    outcome:
      "Trace how money moves through a company and refuse to treat accounting profit as cash before the $14,800 book goes further.",
    lesson:
      "Blue City Portal 11 translates the business model into the three statements. The income statement asks whether the company earned an accounting profit over a period (revenue, COGS, operating expenses, interest, tax, net income). The balance sheet asks what it owns and owes at a point in time (assets, liabilities, equity). The cash-flow statement asks where cash came from and went (operating, investing, financing). Build profit in layers: Gross profit = Revenue − COGS; Operating income = Gross profit − Operating expenses; then interest and tax to net income. Example: revenue $12.0m, COGS $7.2m, opex $2.4m, interest $0.3m, tax $0.42m → gross $4.8m, operating $2.4m, pre-tax $2.1m, net income $1.68m — profitable on paper, cash still unproven. Assets = Liabilities + Equity; $18m assets and $11m liabilities leave $7m book equity, which is not automatically market value. Net working capital = Current assets − Current liabilities; $5.4m − $3.9m = $1.5m — composition matters because inventory and receivables are not cash. Net income is not cash: accruals record activity when earned or incurred. Simplified FCF = CFO − Capex; $3.6m − $1.4m = $2.2m. If net income is $2.0m but receivables rise $0.9m and inventory $0.4m, approximate cash after those uses is $0.7m. Net debt = Debt − Cash; $9.0m − $2.5m = $6.5m, remembering not all cash may be available to repay. Link the statements: when revenue grows, ask receivables and inventory; when debt rises, ask where financing cash went; when capex rises, ask capacity versus maintenance.",
    scenario:
      "The name you shortlisted in Portal 10 now files statements. Build the income-statement layers, close the accounting equation, measure working capital and simplified FCF, and check whether profit converted to cash. For the $14,800 book: does money actually move through this company the way the earnings line suggests?",
    questions: [
      {
        id: "m11-q1",
        prompt:
          "The three statements answer different questions. Which pairing matches the notes?",
        choices: [
          "Income statement: profit over a period; balance sheet: own and owe at a point in time; cash-flow statement: where cash came from and went",
          "Income statement: assets today; balance sheet: cash only; cash-flow statement: next year’s share price",
          "All three statements measure the same thing — net income — on the same date",
          "The cash-flow statement replaces the need to read profit or the balance sheet",
        ],
        correctIndex: 0,
        explanation:
          "Think of three views of one company: period profit, point-in-time resources and obligations, and actual cash movement (operating, investing, financing).",
      },
      {
        id: "m11-q2",
        prompt:
          "Revenue $12.0m, COGS $7.2m, operating expenses $2.4m, interest $0.3m, tax $0.42m. What is net income, and what does it prove?",
        choices: [
          "$1.68m net income — accounting profit after the layers, not proof of cash",
          "$4.8m net income — because gross profit is the bottom line",
          "$2.4m net income — operating income already includes interest and tax",
          "$12.0m net income — revenue is what owners keep",
        ],
        correctIndex: 0,
        explanation:
          "Gross $4.8m − opex $2.4m = $2.4m operating; − interest $0.3m = $2.1m pre-tax; − tax $0.42m = $1.68m. The notes: profitable in accounting terms, but cash flow still needs examination.",
      },
      {
        id: "m11-q3",
        prompt:
          "Assets are $18m and liabilities are $11m. Current assets are $5.4m and current liabilities are $3.9m. Which reading is correct?",
        choices: [
          "Book equity $7m (not automatically market value) and NWC $1.5m (composition still matters)",
          "Book equity $29m and NWC $9.3m — add the lines, then treat both as cash",
          "Book equity $7m equals the market value of the shares, so NWC can be ignored",
          "NWC $1.5m means every current asset is immediately spendable cash",
        ],
        correctIndex: 0,
        explanation:
          "Equity = Assets − Liabilities = $18m − $11m = $7m, an accounting residual. NWC = $5.4m − $3.9m = $1.5m. Cash is usable now; inventory and receivables may not be.",
      },
      {
        id: "m11-q4",
        prompt:
          "CFO is $3.6m and capex is $1.4m. Separately, net income is $2.0m while receivables rise $0.9m and inventory $0.4m. What do the notes show?",
        choices: [
          "Simplified FCF $2.2m, and approximate cash after those working-capital uses $0.7m — strong profit can coexist with weak cash conversion",
          "FCF $5.0m and cash $2.0m — add capex and ignore working capital",
          "FCF equals net income $2.0m, so receivables never affect cash",
          "Both figures are $3.6m because CFO is the only number that matters",
        ],
        correctIndex: 0,
        explanation:
          "FCF = CFO − Capex = $3.6m − $1.4m = $2.2m under the simplified definition. $2.0m − $0.9m − $0.4m = $0.7m. Accrual profit is not the same as cash.",
      },
      {
        id: "m11-q5",
        prompt:
          "Your $14,800 Portfolio Lab application for Portal 11 is to assess how money moves through the company. What is the disciplined next step?",
        choices: [
          "Link the statements — if revenue grows, check receivables and inventory; if debt rises, ask where financing cash went; do not treat net income as deployable cash",
          "Deploy the full $14,800 because $1.68m of net income already proves cash generation",
          "Ignore the cash-flow statement once the income statement shows a profit",
          "Treat book equity of $7m as the price you should pay for the shares",
        ],
        correctIndex: 0,
        explanation:
          "The notes’ statement-linking habit keeps one economic story across profit, resources and cash. Companies pay obligations with cash, not accounting earnings. A calculated profit is not yet an investment decision.",
      },
    ],
  },
  {
    id: "m12",
    number: 12,
    title: "Earnings & Market News",
    mapLabel: "News Wire",
    x: 30,
    y: 30,
    summary:
      "Use margins, liquidity, leverage, ROE, ROIC and free-cash-flow quality to diagnose financial strengths, weaknesses and red flags.",
    concepts: [
      "profitability margins",
      "current and quick ratios",
      "debt-to-equity and interest coverage",
      "ROE and ROIC",
      "FCF conversion",
      "red-flag checklist",
    ],
    outcome:
      "Identify financial strengths, weaknesses and red flags on the company you are considering for the $14,800 book.",
    lesson:
      "Blue City Portal 12 turns the statements into ratios. Margins convert a profit layer into a percentage of revenue so different-sized firms can be compared: Gross margin = Gross profit / Revenue; Operating margin = Operating income / Revenue; Net margin = Net income / Revenue. On $20m revenue, $8m gross, $3m operating and $2m net income the layers are 40%, 15% and 10% — a 40% gross margin means $0.40 of each $1.00 of sales remains after direct costs. If revenue grows while operating margin falls, ask whether costs are outrunning sales or the firm is investing. Liquidity is a different question: a profitable company can still miss near-term payments. Current ratio = Current assets / Current liabilities; $6.0m / $4.0m = 1.50× — not a universal pass/fail. Quick ratio drops inventory: ($1.0m + $0.4m + $1.8m) / $4.0m = 0.80×. Leverage: D/E = Debt / Equity; $12m / $8m = 1.50× (debt is 150% of book equity). Interest coverage = EBIT / Interest; $4.5m / $1.0m = 4.5× — a falling trend often matters more than one print. ROE = Net income / Average equity; average of $10m and $14m is $12m, so $2.4m / $12m = 20% — high ROE can be leverage. ROIC uses NOPAT ≈ EBIT × (1 − tax): $5m × 0.75 = $3.75m; $3.75m / $20m = 18.75%. FCF conversion = FCF / Net income; $1.5m / $2.0m = 75%. Red flags include receivables racing ahead of revenue, profit up while operating cash falls, debt up as coverage weakens, and ROE high mainly because equity was shrunk.",
    scenario:
      "The statements from Portal 11 are now ratio-ready. Compute the margin stack, current vs quick liquidity, D/E and coverage, then ROE/ROIC and FCF conversion. For the $14,800 book: where is this company strong, where is it weak, and which red flags would stop you treating one attractive ratio as a buy?",
    questions: [
      {
        id: "m12-q1",
        prompt:
          "A 40% gross margin means which of the following, and why are net and operating margins read together?",
        choices: [
          "$0.40 of each $1.00 of revenue remains after direct costs; net margin is also shaped by interest and tax, so it is not a standalone operating-quality score",
          "The company keeps $0.40 of cash for every $1.00 of revenue, so liquidity is proven",
          "Owners automatically earn 40% on the share price",
          "Operating margin must equal 40% because all cost layers are the same",
        ],
        correctIndex: 0,
        explanation:
          "Gross margin is the first layer after COGS. Net margin comes after operating costs, financing and tax, so the notes compare it with operating margin rather than using it alone.",
      },
      {
        id: "m12-q2",
        prompt:
          "Revenue $20m, GP $8m, EBIT $3m, NI $2m. Current assets $6.0m and current liabilities $4.0m; quick assets $3.2m. Which set is correct?",
        choices: [
          "Margins 40% / 15% / 10%; current ratio 1.50×; quick ratio 0.80× — current is not a universal pass/fail, and dropping inventory shows tighter liquidity",
          "Margins 40% / 15% / 10% and both liquidity ratios 1.50× because inventory always counts as cash",
          "Margins 8% / 3% / 2% and current ratio 0.67×",
          "Only the current ratio matters; margins cannot be compared across companies",
        ],
        correctIndex: 0,
        explanation:
          "$8m/$20m, $3m/$20m, $2m/$20m. Current = $6.0m/$4.0m = 1.50×. Quick = $3.2m/$4.0m = 0.80×. Industry and asset quality still matter.",
      },
      {
        id: "m12-q3",
        prompt:
          "Debt $12m, equity $8m; EBIT $4.5m, interest $1.0m. Net income $2.4m on average equity $12m. EBIT $5m at a 25% tax rate on $20m invested capital. What do the notes show?",
        choices: [
          "D/E 1.50×, coverage 4.5×, ROE 20% (can be leverage-amplified), ROIC 18.75% after NOPAT $3.75m",
          "D/E 0.67×, coverage 1.0×, ROE 20% that cannot be affected by debt, ROIC 25%",
          "D/E 1.50× equals interest coverage, so ROE and ROIC can be skipped",
          "ROE 20% is the market return you will earn on the $14,800",
        ],
        correctIndex: 0,
        explanation:
          "$12m/$8m = 1.50×; $4.5m/$1.0m = 4.5×. ROE = $2.4m/$12m = 20%. NOPAT = $5m × 0.75 = $3.75m; ROIC = $3.75m/$20m = 18.75%. Compare ROIC with the cost of capital; decompose high ROE.",
      },
      {
        id: "m12-q4",
        prompt:
          "FCF is $1.5m and net income is $2.0m. For the $14,800 book, what is the Portal 12 application?",
        choices: [
          "FCF conversion is 75% — diagnose strengths, weaknesses and red flags (receivables racing sales, profit up while operating cash falls, coverage weakening); one ratio is not a buy",
          "75% conversion proves earnings quality forever, so deploy the full $14,800",
          "Ignore conversion because any positive net income is deployable cash",
          "A single 1.50× current ratio is a universal pass, so skip the red-flag list",
        ],
        correctIndex: 0,
        explanation:
          "$1.5m/$2.0m = 75% FCF conversion. One weak year can be timing; repeated weakness deserves investigation. The lab task is to identify strengths, weaknesses and red flags — not to treat a calculated ratio as an investment decision.",
      },
    ],
  },
  {
    id: "m13",
    number: 13,
    title: "Market Crashes",
    mapLabel: "Crash Corridor",
    x: 20,
    y: 40,
    summary:
      "Estimate value with P/E, PEG, P/B, EV/EBITDA, FCF yield, DCF and margin of safety — then set a defensible purchase price.",
    concepts: [
      "price vs value",
      "P/E and PEG",
      "price-to-book",
      "EV/EBITDA",
      "FCF yield",
      "DCF and terminal value",
      "margin of safety",
    ],
    outcome:
      "Estimate value and a defensible maximum purchase price before committing the $14,800 book.",
    lesson:
      "Blue City Portal 13: price is what the market asks; value is an estimate from expected economics. Valuation does not produce certainty — it makes the assumptions in the price explicit. P/E = Price / EPS; $48 / $3.20 = 15.0× means investors pay $15 per $1 of current annual EPS, not that they automatically earn 1/15. Derive EPS first when needed: $60m / 20m shares = $3.00, then $42 / $3.00 = 14.0×. PEG = P/E / expected EPS growth as a whole percent (12% entered as 12, not 0.12); 24 / 12 = 2.0 — a screen, not a model. P/B uses BVPS = Equity / Shares; $500m / 100m = $5.00, $7.50 / $5.00 = 1.50× book — more useful for asset-heavy firms. Simplified EV = Market cap + Debt − Cash; $900m + $300m − $100m = $1.10bn; EV/EBITDA = $1.10bn / $125m = 8.8×. EBITDA is not cash and can understate capex. FCF yield = FCF / Market cap; $72m / $900m = 8.0%. DCF: PV = CFₜ / (1+r)ᵗ. $110 next year at 10% is $100 today. Three explicit FCFs at 9% ($10m, $12m, $14m) sum to about $30.085m without a terminal value. Gordon TV: FCF₆ = $20m × 1.03 = $20.6m; TV₅ = $20.6m / (0.09 − 0.03) = $343.33m — r must exceed g. MOS = (Value − Price) / Value; ($60 − $45) / $60 = 25%. Maximum price = Value × (1 − required MOS); $80 × 0.80 = $64. Never compare multiples mechanically across unrelated companies.",
    scenario:
      "The company you diagnosed as financially healthy now has a market price. Build P/E, PEG, P/B, EV/EBITDA and FCF yield, then a simple DCF with a terminal-value check. For the $14,800 book: what is a defensible maximum purchase price after a required margin of safety — and which assumptions would make that margin fake?",
    questions: [
      {
        id: "m13-q1",
        prompt:
          "Portal 13 starts by separating price from value. Which statement matches the notes?",
        choices: [
          "Price is what the market currently asks; value is an estimate from expected economics — valuation frames the assumptions in the price, it does not produce certainty",
          "Price and value are the same number, so multiples are unnecessary",
          "Value is whatever last traded, and price is an accounting residual",
          "A 15× P/E guarantees you will earn 1/15 as a cash return",
        ],
        correctIndex: 0,
        explanation:
          "Financial health asked whether the company is sound. Valuation asks what price is justified. The output is only as good as the assumptions.",
      },
      {
        id: "m13-q2",
        prompt:
          "Share price $48 and EPS $3.20. Separately, P/E is 24× and expected EPS growth is 12%. What are P/E and PEG under the notes’ convention?",
        choices: [
          "P/E 15.0× (pay $15 per $1 of current EPS) and PEG 2.0 — enter 12, not 0.12; PEG is a shortcut, not a valuation model",
          "P/E 15.0× and PEG 2.0 using 0.12 in the denominator (24 / 0.12)",
          "P/E 3.20× and PEG 12, so growth is already a complete valuation",
          "P/E 15.0× means you automatically earn 6.67% with no further work",
        ],
        correctIndex: 0,
        explanation:
          "$48 / $3.20 = 15.0×. PEG = 24 / 12 = 2.0. Growth forecasts can be wrong and PEG ignores balance-sheet risk and cash-flow quality.",
      },
      {
        id: "m13-q3",
        prompt:
          "Equity $500m, 100m shares, price $7.50. Market cap $900m, debt $300m, cash $100m, EBITDA $125m. FCF $72m. Which reading is correct?",
        choices: [
          "P/B 1.50×; EV $1.10bn and EV/EBITDA 8.8×; FCF yield 8.0% — EBITDA is not cash, and yield still needs sustainability",
          "P/B 1.50× equals EV/EBITDA, so financing structure can be ignored",
          "EV is $900m because cash and debt cancel, and FCF yield is 72%",
          "P/B 1.50× is automatic mispricing for an intangible-heavy business",
        ],
        correctIndex: 0,
        explanation:
          "BVPS = $5.00; $7.50 / $5.00 = 1.50×. EV = $900m + $300m − $100m = $1.10bn; $1.10bn / $125m = 8.8×. $72m / $900m = 8.0%. Investigate a P/B premium; do not assume it is a bargain.",
      },
      {
        id: "m13-q4",
        prompt:
          "A $110 cash flow next year at 10% required return. Year-5 FCF $20m, g = 3%, r = 9%. What do the DCF notes show?",
        choices: [
          "PV of $110 is $100 today; FCF₆ = $20.6m and TV₅ = $343.33m — r must exceed g, and terminal value can dominate the DCF",
          "PV of $110 is $110 because next year is not discounted; TV = $20m / 0.09",
          "Grow Year-5 FCF is optional; TV₅ = $20m / (0.09 − 0.03) = $333.33m is the notes’ answer",
          "If r equals g the Gordon formula is safer because the denominator is zero",
        ],
        correctIndex: 0,
        explanation:
          "$110 / 1.10 = $100. FCF₆ = $20m × 1.03 = $20.6m; TV₅ = $20.6m / 0.06 = $343.33m. Forgetting the extra growth year understates terminal value. Small changes in r or g move estimated value a lot.",
      },
      {
        id: "m13-q5",
        prompt:
          "Estimated value $60 vs price $45, and separately value $80 with a required 20% MOS. For the $14,800 book, what is the Portal 13 application?",
        choices: [
          "MOS is 25%; maximum purchase price is $64 — estimate value and a defensible buy price; a large MOS is worthless if the value estimate is unrealistic, and multiples are not compared mechanically across unrelated firms",
          "MOS is 25% so any price below $60 is a buy with the full $14,800",
          "Maximum price is $80 because margin of safety is optional once DCF is done",
          "Compare this P/E to an unrelated company and buy the lower multiple automatically",
        ],
        correctIndex: 0,
        explanation:
          "($60 − $45) / $60 = 25%. $80 × 0.80 = $64. The lab task is a defensible purchase price. Growth, margins, cyclicality, accounting, leverage, capital intensity and risk can justify different multiples.",
      },
    ],
  },
  {
    id: "m14",
    number: 14,
    title: "Historical Crisis Simulator",
    mapLabel: "Crisis Archive",
    x: 12,
    y: 24,
    summary:
      "Use growth, value, quality, dividend, momentum, contrarian and GARP lenses — then size a position instead of treating every idea equally.",
    concepts: [
      "selection styles as lenses",
      "dividend yield and payout",
      "position sizing",
      "weight after price movement",
      "stock-selection worksheet",
    ],
    outcome:
      "Select a stock and set an appropriate position size in the $14,800 book using a written worksheet, not conviction alone.",
    lesson:
      "Blue City Portal 14: selection styles are lenses, not guarantees. Growth asks whether earnings/cash can compound (trap: paying too much). Value asks whether price is low vs normalized economics (trap: value trap). Quality asks whether the economics are durable (trap: overpaying). Dividend asks whether income is durable and covered (trap: yield from a collapsing price). Momentum asks whether trends persist (trap: reversal/crowd). Contrarian asks whether consensus is extreme (trap: early or wrong). GARP asks whether growth is available at a reasonable price (trap: forecast optimism). Dividend yield = Annual DPS / Price; $1.80 / $45 = 4.0% — a falling price can mechanically raise yield, so check sustainability. Payout = Dividends / Net income; $24m / $60m = 40%, so 60% of accounting profit is retained. Then size: Position value = Portfolio × target weight (8% as 0.08). On $14,800 that is $1,184; shares = $1,184 / $37 = 32. If the position rises to $1,360 while the book is $15,200, weight = 8.95% — a winner can become a larger risk without buying more. The worksheet: style, business model, financial health, at least two valuation methods, catalyst, what would falsify the thesis, maximum weight/dollars, and an exit/review rule.",
    scenario:
      "Valuation from Portal 13 produced a defensible price. Now choose a lens, test dividend coverage if income is part of the thesis, and convert an 8% rule into shares in the $14,800 book. After a gain, recompute weight. What would falsify the thesis — and what is the maximum position before you buy?",
    questions: [
      {
        id: "m14-q1",
        prompt:
          "Stock-selection styles are lenses, not guarantees. Which pairing matches the notes?",
        choices: [
          "Value’s trap is a value trap; dividend’s trap is a yield caused by a collapsing price; quality’s trap is overpaying for durability",
          "Growth has no trap if revenue is rising, and momentum never reverses",
          "GARP removes the need for a growth forecast, and contrarian is always right if you wait",
          "Every style answers the same question, so the worksheet can skip the thesis type",
        ],
        correctIndex: 0,
        explanation:
          "Each style has a primary question, typical evidence and a main trap. Paying too much for growth, overpaying for quality, crowded momentum and forecast-optimistic GARP are the other named traps.",
      },
      {
        id: "m14-q2",
        prompt:
          "Annual dividend $1.80 on a $45 share. Dividends $24m and net income $60m. What are yield and payout, and why is a high yield not automatically a bargain?",
        choices: [
          "4.0% yield and 40% payout (60% retained) — a falling price can mechanically raise yield, so coverage and the balance sheet still need a check",
          "4.0% yield and 40% payout, which guarantees the dividend forever",
          "40% yield and 4.0% payout because the formulas are reversed",
          "4.0% yield means owners earn 4% regardless of payout or cash",
        ],
        correctIndex: 0,
        explanation:
          "$1.80 / $45 = 4.0%. $24m / $60m = 40% payout. For cash-intensive firms, compare dividends with free cash flow as an extra sustainability test.",
      },
      {
        id: "m14-q3",
        prompt:
          "Portfolio $14,800, target weight 8%, share price $37. What position do the notes size?",
        choices: [
          "$1,184 and 32 shares — 8% is 0.08, so conviction is converted into a controlled weight rather than an arbitrary size",
          "$1,184 and 32 shares, so you should ignore rounding if fractional shares are unavailable",
          "$14,800 and 400 shares — the full book is the default size for a high-conviction idea",
          "$37 × 8 = $296, because weight is applied to the share price",
        ],
        correctIndex: 0,
        explanation:
          "$14,800 × 0.08 = $1,184; $1,184 / $37 = 32 shares exactly. If fractions are unavailable, round and then recompute actual value and weight.",
      },
      {
        id: "m14-q4",
        prompt:
          "The $1,184 position rises to $1,360 while the whole portfolio is $15,200. What is the new weight, and what does that mean?",
        choices: [
          "8.95% — a winner can become a larger risk exposure even without buying more shares",
          "8.00% — weight is fixed at the original target until you trade",
          "11.5% — $1,360 / $14,800, using the old book as the denominator",
          "32% — share count is the portfolio weight",
        ],
        correctIndex: 0,
        explanation:
          "$1,360 / $15,200 = 8.95%. Sizing is not finished at purchase; drift changes the risk you actually hold.",
      },
      {
        id: "m14-q5",
        prompt:
          "Your $14,800 Portfolio Lab application for Portal 14 is to select stocks and determine appropriate position sizes. What belongs on the worksheet before you buy?",
        choices: [
          "Style, business model, financial health, at least two valuation methods, catalyst, what would falsify the thesis, maximum weight/dollars, and an exit or review rule",
          "Only the ticker and last price — the lenses replace a written thesis",
          "A single multiple and maximum conviction, with no falsifier or size cap",
          "Deploy the full $14,800 in one name if PEG looks attractive",
        ],
        correctIndex: 0,
        explanation:
          "The notes’ worksheet turns analysis into a controlled buy: evidence, two valuation methods, a falsifier, a maximum position and a review rule. A calculated yield or weight is not yet an investment decision.",
      },
    ],
  },
  {
    id: "m15",
    number: 15,
    title: "Advanced Risk Management",
    mapLabel: "Risk Bastion",
    x: 26,
    y: 14,
    summary: "Returns are not enough — control downside.",
    concepts: ["beta", "Sharpe", "drawdown", "VaR", "stress tests"],
    outcome: "Manage the book inside explicit risk limits.",
    lesson:
      "Risk metrics quantify path pain and efficiency. Max drawdown, volatility, beta, and stress scenarios constrain how you pursue return. Alpha is excess return after risk/factor exposure.",
    scenario: "Hit risk limits even if recent returns look fine.",
    questions: [
      {
        id: "m15-q1",
        prompt: "Maximum drawdown measures:",
        choices: [
          "Average dividend",
          "Peak-to-trough decline over a period",
          "Only one-day moves",
          "Bid-ask spread",
        ],
        correctIndex: 1,
        explanation: "It captures the worst peak-to-trough loss path.",
      },
      {
        id: "m15-q2",
        prompt: "A high Sharpe ratio suggests:",
        choices: [
          "Return per unit of volatility looked attractive historically",
          "No future risk exists",
          "Leverage is infinite",
          "Beta is zero always",
        ],
        correctIndex: 0,
        explanation: "Sharpe is a historical efficiency snapshot, not a guarantee.",
      },
      {
        id: "m15-q3",
        prompt: "Stress testing is valuable because:",
        choices: [
          "It predicts exact future prices",
          "It reveals how the portfolio might behave in adverse scenarios",
          "It replaces diversification",
          "It is only for banks",
        ],
        correctIndex: 1,
        explanation: "Scenarios expose hidden concentrations before reality does.",
      },
    ],
  },
  {
    id: "m16",
    number: 16,
    title: "Building an Investment Thesis",
    mapLabel: "Thesis Forge",
    x: 42,
    y: 10,
    summary: "Write what you own, why, risks, and kill criteria.",
    concepts: ["mispricing", "catalysts", "sell discipline", "falsification"],
    outcome: "Defend formal theses for selected holdings.",
    lesson:
      "A thesis states the bet, the market's potential miss, catalysts, risks, and what would prove you wrong. Without falsifiers, you cannot sell with discipline.",
    scenario: "Draft theses for your top holdings with explicit kill switches.",
    questions: [
      {
        id: "m16-q1",
        prompt: "A falsification criterion is:",
        choices: [
          "A reason to never sell",
          "A pre-defined signal that the thesis is broken",
          "A tax form",
          "A candlestick color",
        ],
        correctIndex: 1,
        explanation: "It is your pre-committed 'wrong' detector.",
      },
      {
        id: "m16-q2",
        prompt: "Catalysts matter because:",
        choices: [
          "They may close the gap between price and value",
          "They guarantee timing",
          "They replace valuation",
          "They eliminate risk",
        ],
        correctIndex: 0,
        explanation: "Value can stay unrecognized without a path to recognition.",
      },
      {
        id: "m16-q3",
        prompt: "Sell discipline fails most often when:",
        choices: [
          "Rules were never defined and hope takes over",
          "You rebalance on schedule",
          "You size positions modestly",
          "You keep a journal",
        ],
        correctIndex: 0,
        explanation: "Hope is not a risk process.",
      },
    ],
  },
  {
    id: "m17",
    number: 17,
    title: "Journal & Bias Detection",
    mapLabel: "Bias Mirror",
    x: 58,
    y: 12,
    summary: "Your history becomes the curriculum.",
    concepts: ["confirmation bias", "disposition effect", "overconfidence"],
    outcome: "Correct recurring behavioural patterns with targeted scenarios.",
    lesson:
      "Journals expose patterns: selling winners too early, clinging to losers, seeking confirming news, overtrading after wins. Adaptation means changing behaviour, not just reading about biases.",
    scenario: "Review your Portfolio Lab history; face a personalised corrective scenario.",
    questions: [
      {
        id: "m17-q1",
        prompt: "The disposition effect is the tendency to:",
        choices: [
          "Sell winners too early and hold losers too long",
          "Only buy bonds",
          "Never trade",
          "Ignore taxes only",
        ],
        correctIndex: 0,
        explanation: "It is a classic behavioural leak around realizing gains/losses.",
      },
      {
        id: "m17-q2",
        prompt: "Confirmation bias shows up when you:",
        choices: [
          "Seek only evidence that supports your existing view",
          "Actively seek disconfirming data",
          "Use checklists",
          "Size small",
        ],
        correctIndex: 0,
        explanation: "You filter the world to protect the thesis.",
      },
      {
        id: "m17-q3",
        prompt: "A useful journal entry includes:",
        choices: [
          "Only the P&L number",
          "Thesis, evidence, emotions, and what would change your mind",
          "Only screenshots of green candles",
          "Nothing dated",
        ],
        correctIndex: 1,
        explanation: "Process detail enables later bias detection.",
      },
    ],
  },
  {
    id: "m18",
    number: 18,
    title: "Capstone: The Fund Mandate",
    mapLabel: "Fund Mandate",
    x: 78,
    y: 16,
    summary: "Graduate from $14,800 to a $10M professional mandate.",
    concepts: ["IPS", "constraints", "committee", "multi-year simulation"],
    outcome: "Integrate judgement, risk, and behaviour under mandate pressure.",
    lesson:
      "Module 18 expands the Portfolio Lab into a professional mandate: $10M AUM, 5-year horizon, 7–10% target return, 20% max drawdown, liquidity and concentration constraints. Write an IPS, face client pressure, survive a crisis exam, and defend process before committee.",
    scenario:
      "Present your $14,800 history, accept the mandate, build the fund, and endure multi-year shocks without abandoning process.",
    questions: [
      {
        id: "m18-q1",
        prompt: "An Investment Policy Statement (IPS) should define:",
        choices: [
          "Only a lucky ticker",
          "Objectives, constraints, risk limits, and governance rules before deploying capital",
          "Intraday scalps only",
          "A promise of no drawdowns",
        ],
        correctIndex: 1,
        explanation: "IPS is the constitution of the mandate.",
      },
      {
        id: "m18-q2",
        prompt: "A client demanding you chase a fashionable asset is a test of:",
        choices: [
          "Whether you abandon process for politics",
          "Your ability to ignore fiduciary duty",
          "Candlestick colors",
          "Tax lot software only",
        ],
        correctIndex: 0,
        explanation: "Stakeholder pressure is part of professional investing.",
      },
      {
        id: "m18-q3",
        prompt: "In the assessment framework, raw return weight is relatively:",
        choices: [
          "Dominant over all process scores",
          "Small versus reasoning, risk, research, and behaviour",
          "The only score that matters",
          "Ignored entirely",
        ],
        correctIndex: 1,
        explanation: "Syllabus weights return at 5% — process dominates mastery.",
      },
    ],
  }
];
