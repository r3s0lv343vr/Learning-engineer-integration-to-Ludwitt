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
    summary:
      "Evaluate a whole-company acquisition: enterprise value, normalized earnings, financing, DSCR and due diligence — not just the seller’s equity price.",
    concepts: [
      "equity value vs enterprise value",
      "normalized EBITDA",
      "acquisition multiple",
      "deal financing",
      "DSCR",
      "due diligence",
    ],
    outcome:
      "Evaluate and negotiate a simulated whole-company acquisition before treating it as a use of the $14,800 book.",
    lesson:
      "Blue City Portal 15: a public-stock investor may buy a small equity claim; an acquirer evaluates control of the whole operating business. Enterprise value = Equity value + Debt − Cash. Seller wants $4.0m for equity with $1.2m debt and $0.3m cash → EV = $4.9m — the operating business costs more than the equity cheque. Private accounts may include owner-specific or one-off items. Normalized EBITDA = Reported EBITDA + valid add-backs − missing recurring costs. $700,000 + $80,000 legal add-back − $60,000 below-market owner salary = $720,000. Each adjustment needs evidence or normalization inflates value. Then EV = Normalized EBITDA × selected multiple; $720,000 × 5.5 = $3.96m — defend both the earnings base and the multiple with quality, growth, concentration, cyclicality and comps. Financing: Debt = Price × debt %; $4.0m × 0.60 = $2.4m debt and $1.6m equity cheque. More debt lowers the immediate equity cheque and raises future service. DSCR = Cash available for debt service / Required debt service; $600,000 / $400,000 = 1.50× — a lower ratio leaves less room for a downturn. Due diligence covers revenue quality, earnings sustainability, working-capital need, liens/legal, customers, operations, assets, whether the business runs without the seller, and deal terms. A cheap multiple can hide a fragile business. Whole-company deals concentrate capital, add financing risk and often reduce liquidity.",
    scenario:
      "A Brick Exchange seller wants $4.0m for equity. Rebuild EV, normalize EBITDA, apply a 5.5× multiple, then size 60% debt and test DSCR. For the $14,800 book this is a simulated control deal: which diligence questions would stop you treating a cheap multiple as a yes?",
    questions: [
      {
        id: "m15-q1",
        prompt:
          "A public-stock investor may buy a small equity claim. An acquirer evaluates the whole operating business. Seller wants $4.0m equity; debt $1.2m; cash $0.3m. What is EV, and why is it not the equity cheque?",
        choices: [
          "$4.9m — EV = equity + debt − cash, so assumed financing claims make the operating business cost more than the $4.0m paid to owners",
          "$4.0m — equity price is already enterprise value",
          "$5.5m — add cash instead of subtracting it",
          "$2.5m — subtract debt and ignore cash",
        ],
        correctIndex: 0,
        explanation:
          "$4.0m + $1.2m − $0.3m = $4.9m. EV bridges what equity owners receive to the value of the operating company across the capital structure.",
      },
      {
        id: "m15-q2",
        prompt:
          "Reported EBITDA $700,000. Valid one-time legal add-back $80,000. Owner salary is $60,000 below market. What is normalized EBITDA, and what is the trap?",
        choices: [
          "$720,000 — add evidenced one-offs and deduct missing recurring costs; aggressive add-backs can overstate value",
          "$780,000 — add both the legal item and the salary gap as add-backs",
          "$700,000 — never adjust private-company accounts",
          "$640,000 — subtract the legal expense again because it already hit EBITDA",
        ],
        correctIndex: 0,
        explanation:
          "$700,000 + $80,000 − $60,000 = $720,000. Normalization estimates sustainable economics. Each adjustment needs evidence.",
      },
      {
        id: "m15-q3",
        prompt:
          "Normalized EBITDA is $720,000 and the selected multiple is 5.5×. What EV do the notes get, and where is the real work?",
        choices: [
          "$3.96m — the arithmetic is easy; the work is defending the normalized base and the multiple with quality, growth, risk and comps",
          "$3.96m, so any 5.5× deal is automatically cheap",
          "$720,000 — the multiple is ignored once earnings are normalized",
          "$4.9m — reuse the seller’s equity-plus-debt EV instead of the multiple",
        ],
        correctIndex: 0,
        explanation:
          "$720,000 × 5.5 = $3.96m. The multiple should reflect business quality, growth, customer concentration, cyclicality and comparable transactions.",
      },
      {
        id: "m15-q4",
        prompt:
          "Purchase price $4.0m with 60% lender financing. Cash available for debt service $600,000; annual principal + interest $400,000. What do financing and DSCR show?",
        choices: [
          "$2.4m debt and $1.6m equity; DSCR 1.50× — leverage cuts the upfront cheque and creates fixed service; a lower DSCR leaves less room for a downturn",
          "$2.4m equity and $1.6m debt; DSCR 0.67×, which the notes call a comfortable cushion",
          "100% debt is safer because DSCR is then undefined",
          "DSCR 1.50× means cash equals debt service with no cushion",
        ],
        correctIndex: 0,
        explanation:
          "$4.0m × 0.60 = $2.4m debt; equity = $1.6m. DSCR = $600,000 / $400,000 = 1.50×. Keep the cash-available definition consistent across deals. Fees or working-capital needs can raise the real cash required at close.",
      },
      {
        id: "m15-q5",
        prompt:
          "Your $14,800 Portfolio Lab application for Portal 15 is to evaluate and negotiate a simulated whole-company acquisition. What is the disciplined next step?",
        choices: [
          "Run diligence on revenue quality, sustainable earnings, working-capital need, legal/debt, customers, operations and whether the business runs without the seller — a cheap multiple can hide a fragile, illiquid, concentrated bet",
          "Sign because 5.5× looks cheaper than public comps, and skip diligence as administrative",
          "Fund the $4.9m EV entirely from the $14,800 book",
          "Treat headline profit as normalized EBITDA and waive warranties",
        ],
        correctIndex: 0,
        explanation:
          "The notes: due diligence is part of valuation. Whole-company acquisition concentrates capital, introduces financing risk and often reduces liquidity. A calculated EV is not yet a deal decision.",
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
    summary:
      "Underwrite rental income, NOI, cap rates, vacancy, LTV, cash-on-cash return and REITs — then compare a property with liquid alternatives.",
    concepts: [
      "gross potential rent and vacancy",
      "NOI before financing",
      "cap rate and implied value",
      "LTV and leverage",
      "cash-on-cash return",
      "REITs vs direct property",
    ],
    outcome:
      "Underwrite a property and compare it with liquid alternatives before using the $14,800 book.",
    lesson:
      "Blue City Portal 16 underwrites property instead of trusting the listing price. Gross potential rent assumes full occupancy: 4 × $1,500 × 12 = $72,000. Vacancy loss = $72,000 × 5% = $3,600, so effective rental income is $68,400. NOI = Effective gross income − operating expenses and is before financing, taxes and capital structure so different mortgages stay comparable. EGI $70,000 − opex $26,000 = $44,000 NOI. Cap rate = NOI / Property value; $44,000 / $550,000 = 8.0% — an unlevered income yield that excludes appreciation, financing, taxes and major capex. Value = NOI / cap rate; $60,000 / 0.075 = $800,000 — a lower required cap rate raises value for the same NOI. Loan = Price × LTV; $600,000 × 70% = $420,000 loan and $180,000 equity — leverage magnifies equity gains and losses; closing costs can raise cash needed. Cash-on-cash = (NOI − debt service) / cash invested; ($54,000 − $30,000) / $180,000 = 13.33% — an equity cash yield, not total return. Appreciation from $600,000 to $630,000 is 5.0% and is not cash until sale or refinance. Direct property is typically illiquid and concentrated; REITs are exchange-traded, professionally managed and usually more diversified, with less investor control.",
    scenario:
      "A four-unit Brick Exchange listing shows $1,500 per unit. Build GPR, vacancy, NOI and an 8% cap rate, then size 70% LTV and cash-on-cash. For the $14,800 book: is this a direct property you can actually underwrite, or does a REIT (or another liquid sleeve) fit the mandate better?",
    questions: [
      {
        id: "m16-q1",
        prompt:
          "Four units rent for $1,500 per month; expected vacancy is 5%. Effective gross income including other income is $70,000 and operating expenses are $26,000. Which reading matches the notes?",
        choices: [
          "GPR $72,000, vacancy loss $3,600, effective rent $68,400, NOI $44,000 — NOI is before financing so different mortgages stay comparable",
          "GPR $72,000 is already cash collected, and NOI subtracts the mortgage",
          "NOI $44,000 includes income tax and is therefore a levered equity yield",
          "Vacancy is ignored because GPR assumes collection",
        ],
        correctIndex: 0,
        explanation:
          "4 × $1,500 × 12 = $72,000 theoretical rent. $72,000 × 0.05 = $3,600 vacancy. $70,000 − $26,000 = $44,000 NOI. Keep debt service out of NOI.",
      },
      {
        id: "m16-q2",
        prompt:
          "NOI $44,000 on a $550,000 price. Separately, NOI $60,000 at a 7.5% market cap rate. What do the notes show?",
        choices: [
          "8.0% cap rate and $800,000 implied value — a lower required cap rate produces a higher value for the same NOI; cap rate excludes appreciation, financing, taxes and major capex",
          "8.0% cap rate equals cash-on-cash, so leverage can be ignored",
          "Value = $60,000 × 0.075 = $4,500",
          "Cap rate is a universal pass/fail: anything above 8% is a buy",
        ],
        correctIndex: 0,
        explanation:
          "$44,000 / $550,000 = 8.0%. $60,000 / 0.075 = $800,000. Compare cap rates with similar properties, locations, growth and risk.",
      },
      {
        id: "m16-q3",
        prompt:
          "Property price $600,000 at 70% LTV. What loan and equity do the notes size, and what does leverage do?",
        choices: [
          "$420,000 loan and $180,000 equity — leverage magnifies both equity gains and losses; fees, taxes, repairs and reserves can raise cash invested",
          "$180,000 loan and $420,000 equity, because LTV is the down-payment percent",
          "$600,000 loan — 70% LTV means the bank funds the full price",
          "Equity is $0 if the cap rate is 8%",
        ],
        correctIndex: 0,
        explanation:
          "$600,000 × 0.70 = $420,000; equity = $180,000 before extra closing cash. Cap rate is unlevered; LTV is the financing layer.",
      },
      {
        id: "m16-q4",
        prompt:
          "NOI $54,000, annual debt service $30,000, cash invested $180,000. The property then rises from $600,000 to $630,000. Which reading is correct?",
        choices: [
          "Cash-on-cash 13.33% and 5.0% appreciation — CoC is an equity cash yield, not total return; appreciation is not cash until sale or refinance",
          "Cash-on-cash 13.33% already includes the 5% appreciation",
          "CoC = $54,000 / $180,000 = 30% because debt service stays in NOI",
          "5.0% appreciation is immediately spendable cash to the equity holder",
        ],
        correctIndex: 0,
        explanation:
          "Cash flow = $24,000; $24,000 / $180,000 = 13.33%. ($630,000 − $600,000) / $600,000 = 5.0%. A leveraged equity percentage change may be larger, but costs and debt still matter.",
      },
      {
        id: "m16-q5",
        prompt:
          "Your $14,800 Portfolio Lab application for Portal 16 is to underwrite a property and compare it with liquid alternatives. What is the disciplined next step?",
        choices: [
          "Complete the rent-to-NOI, cap-rate, LTV and CoC stack, then compare direct property (illiquid, more control, concentrated) with a REIT (exchange-traded, less control, usually more diversified) — do not fund a $180,000 down payment from $14,800",
          "Buy the four-unit building with the full $14,800 because the cap rate is 8%",
          "Treat a REIT as identical to direct property because both mention real estate",
          "Skip vacancy and NOI and use the listing price as value",
        ],
        correctIndex: 0,
        explanation:
          "The notes’ lab task is underwrite-and-compare. Direct property is usually low-liquidity and concentrated; REITs are market-priced and more liquid. A calculated cap rate is not yet an investment decision.",
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
    summary:
      "Read currency pairs, pips, spreads and leverage — then research and size a simulated FX position instead of treating the quote as a stock ticker.",
    concepts: [
      "base vs quote currency",
      "percentage FX move",
      "pips and bid-ask spread",
      "notional vs equity leverage",
      "macro FX drivers",
      "hedging vs speculation",
    ],
    outcome:
      "Research and size a simulated currency position that the $14,800 book can survive if the pair moves against you.",
    lesson:
      "Blue City Portal 17: a quote compares two currencies. EUR/USD = 1.1000 means one euro costs 1.10 dollars — EUR is base, USD is quote. Quote-currency value = base amount × rate: €8,000 × 1.1000 = $8,800. The other way, divide: $10,000 / 1.2500 = €8,000. Percentage change = (new − old) / old; 1.1000 to 1.1550 is 5.0% — the euro strengthened vs the dollar, not “both currencies rose.” For many four-decimal majors, one pip is 0.0001. GBP/USD 1.2700 to 1.2765 is 65 pips. Spread = ask − bid; 1.1051 − 1.1048 = 0.0003 = 3 pips of immediate friction. Notional = equity × leverage; $1,000 at 5× is $5,000 notional. Approximate P/L = notional × % move; a 2% adverse move is −$100, or 10% of the $1,000 equity. Drivers: rate differentials, central-bank policy, inflation, growth, external balances, risk sentiment and geopolitics. A hedge reduces a defined currency risk on another asset; it has costs and can remove favorable FX gains. It is not a new speculative bet.",
    scenario:
      "You are sizing a simulated EUR or GBP pair for the $14,800 book. Convert both ways, measure a 5% move and a 65-pip print, pay the 3-pip spread, then apply 5× to a $1,000 sleeve. If the pair drops 2%, what happens to equity — and is this a hedge or a speculation?",
    questions: [
      {
        id: "m17-q1",
        prompt:
          "EUR/USD = 1.1000. Convert €8,000 to dollars. Separately, EUR/USD = 1.2500 and you convert $10,000 to euros. Which pairing matches the notes?",
        choices: [
          "$8,800 and €8,000 — multiply base × rate to get quote currency; divide quote amount by the rate to get base",
          "$8,800 both ways — always multiply, never divide",
          "€8,800 and $8,000 — EUR is the quote currency in EUR/USD",
          "$8,000 and €10,000 — the rate is ignored once the pair is named",
        ],
        correctIndex: 0,
        explanation:
          "EUR is base and USD is quote. €8,000 × 1.1000 = $8,800. $10,000 / 1.2500 = €8,000. Unit analysis (USD ÷ USD/EUR) prevents multiplying in both directions.",
      },
      {
        id: "m17-q2",
        prompt:
          "EUR/USD rises from 1.1000 to 1.1550. GBP/USD moves from 1.2700 to 1.2765 with a 0.0001 pip. What do the notes show?",
        choices: [
          "A 5.0% rise (euro stronger vs the dollar) and 65 pips — the old rate is the base, and pip size must match the pair’s convention",
          "A 5.0% rise meaning both EUR and USD strengthened, and 65% not 65 pips",
          "A 15.5% rise using the new rate as the denominator, and 0.65 pips",
          "Pips replace percentage change, so the 5.0% figure can be ignored",
        ],
        correctIndex: 0,
        explanation:
          "(1.1550 − 1.1000) / 1.1000 = 5.0%. (1.2765 − 1.2700) / 0.0001 = 65 pips. JPY pairs often use a different pip convention.",
      },
      {
        id: "m17-q3",
        prompt:
          "EUR/USD bid 1.1048 and ask 1.1051. What is the spread, and what does it mean?",
        choices: [
          "0.0003, or 3 pips — the gap between the immediate buy and sell quotes; a wider spread makes a round trip more expensive",
          "3.00, because you subtract the last two digits only",
          "Zero, because majors have no trading friction",
          "65 pips, reused from the GBP example",
        ],
        correctIndex: 0,
        explanation:
          "1.1051 − 1.1048 = 0.0003; 0.0003 / 0.0001 = 3 pips. The spread is an immediate trading cost, not a forecast.",
      },
      {
        id: "m17-q4",
        prompt:
          "You allocate $1,000 of equity at 5× leverage. The currency then moves 2% against you. What do the notes show?",
        choices: [
          "$5,000 notional and −$100 P/L — a 10% loss on the $1,000 equity before costs, because P/L is driven by notional, not the deposit alone",
          "−$20 P/L — apply 2% only to the $1,000 equity",
          "$5,000 notional and −$5,000, because leverage implies total loss on any move",
          "No loss until you convert back to euros",
        ],
        correctIndex: 0,
        explanation:
          "$1,000 × 5 = $5,000 notional. $5,000 × (−0.02) = −$100, which is 10% of the equity sleeve. Leverage magnifies both gains and losses.",
      },
      {
        id: "m17-q5",
        prompt:
          "Your $14,800 Portfolio Lab application for Portal 17 is to research and size a simulated currency position. What is the disciplined next step?",
        choices: [
          "State the pair, drivers (rates, policy, inflation, growth, flows, risk), hedge vs speculation, spread cost and a notional the $14,800 book can survive — do not treat a 5× sleeve as a free 2% bet",
          "Put the full $14,800 on 5× EUR/USD because the euro rose 5% in the example",
          "Skip pips and spreads; only the headline percentage matters",
          "Call any FX trade a hedge even if you have no foreign asset to protect",
        ],
        correctIndex: 0,
        explanation:
          "A hedge reduces a defined currency risk and can also remove favorable FX gains. The lab task is research-and-size, not maximum leverage. A calculated pip or P/L is not yet an investment decision.",
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
    summary:
      "Compare stock, private-business, property and forex opportunities in one language — then allocate remaining capital and defend the choices.",
    concepts: [
      "cross-asset comparison",
      "scenario-weighted expected return",
      "opportunity cost",
      "capital allocation arithmetic",
      "committee defense",
    ],
    outcome:
      "Allocate remaining capital in the $14,800 book among competing Blue City opportunities and defend the process.",
    lesson:
      "Blue City Portal 18 is the investment committee. A stock, private business, property and FX position generate returns differently — do not pick the largest headline percentage. Compare expected reward, downside, liquidity, evidence quality, valuation, financing, horizon and portfolio fit. Stocks: earnings, dividends, valuation; usually liquid. Private business: cash flow, growth, exit; low liquidity, high control, concentration/execution/debt risk. Real estate: rent, NOI, appreciation; illiquid directly, more liquid via REIT. Forex: rate moves and carry; liquid majors, leverage and policy risk. Expected return = Σ (probabilityᵢ × returnᵢ) with probabilities as decimals summing to 1. Stock: 0.30×30% + 0.50×10% + 0.20×(−20%) = 10% — a planning estimate, not a guarantee. Property: 0.25×18% + 0.55×8% + 0.20×(−12%) = 6.5%. A lower E(R) can still win on downside, liquidity or diversification. Incremental expected return = 10% − 6.5% = 3.5 percentage points — not an automatic buy. The notes’ arithmetic example (not a recommended book): $6,000 remaining after Purple City holdings split 35% / 20% / 30% / 15% → $2,100 stock, $1,200 private-business sim, $1,800 real-estate, $900 FX equity. Dollars and weights must reconcile. Committee defense: how it makes money, strongest evidence, health, valuation, entry price, size, worst downside, liquidity/financing, best alternative, and what would make you reject, reduce or exit. Arithmetic is not the conclusion — match claims, track units, and interpret against risk and evidence.",
    scenario:
      "Four Brick Exchange files sit in front of the committee: a public stock, a simulated acquisition, a property (or REIT), and an FX sleeve. Compute scenario-weighted expected returns, the 3.5-point gap, and a $6,000 remaining-capital split. For the $14,800 book: which mix do you defend, and what evidence would make you cut a sleeve?",
    questions: [
      {
        id: "m18-q1",
        prompt:
          "Cross-asset comparison needs a common language. Which statement matches the notes?",
        choices: [
          "Do not choose the largest headline percentage — compare expected reward, downside, liquidity, evidence quality, valuation, financing, horizon and portfolio fit",
          "Always buy the asset with the highest single-scenario return",
          "Public stock, private business, property and FX all share the same return engine, so one multiple works",
          "Liquidity can be ignored if expected return is positive",
        ],
        correctIndex: 0,
        explanation:
          "Return sources differ: earnings/dividends vs cash-flow/exit vs rent/NOI vs FX/carry. Key risks differ too — valuation, concentration/debt, vacancy/rates, and macro/leverage/policy.",
      },
      {
        id: "m18-q2",
        prompt:
          "Stock scenarios: 30% of +30%, 50% of +10%, 20% of −20%. Property: 25% of +18%, 55% of +8%, 20% of −12%. What are the expected returns?",
        choices: [
          "Stock 10% and property 6.5% — probability-weighted planning estimates, not guaranteed outcomes; a lower E(R) can still be attractive on downside, liquidity or diversification",
          "Stock 20% and property 14% — average the three returns without probabilities",
          "Stock 10% guaranteed, so property can be discarded",
          "Both 0% because one scenario is negative",
        ],
        correctIndex: 0,
        explanation:
          "0.30×30% + 0.50×10% + 0.20×(−20%) = 10%. 0.25×18% + 0.55×8% + 0.20×(−12%) = 6.5%. Probabilities are decimals and should sum to 1.00.",
      },
      {
        id: "m18-q3",
        prompt:
          "Stock E(R) is 10% and property E(R) is 6.5%. What is incremental expected return, and what does it settle?",
        choices: [
          "3.5 percentage points — an expected-return advantage, not an automatic win, because risk, liquidity and confidence in the estimates may differ",
          "3.5% growth of the property, so the stock is always inferior",
          "16.5% — add the two expected returns",
          "Zero — opportunity cost only applies inside one asset class",
        ],
        correctIndex: 0,
        explanation:
          "10% − 6.5% = 3.5 percentage points. Capital committed to one asset cannot fund the best rejected alternative. The gap is a comparison input, not the decision.",
      },
      {
        id: "m18-q4",
        prompt:
          "The notes’ arithmetic example (not a recommended allocation) splits $6,000 remaining capital 35% stock, 20% private-business sim, 30% real estate, 15% FX equity. Which check is correct?",
        choices: [
          "$2,100 + $1,200 + $1,800 + $900 = $6,000 — dollars must reconcile to deployable capital and weights to 100% unless cash is left unallocated",
          "$2,100 + $1,200 + $1,800 + $900 = $6,000, so this mix is the official $14,800 policy",
          "Weights can sum to 150% if conviction is high",
          "Skip the dollar check once percentages look round",
        ],
        correctIndex: 0,
        explanation:
          "$6,000 × 0.35 / 0.20 / 0.30 / 0.15. The notes label this a demonstration of arithmetic after Purple City holdings, not a prescribed book.",
      },
      {
        id: "m18-q5",
        prompt:
          "Your $14,800 Portfolio Lab application for Portal 18 is to allocate capital among competing opportunities and defend the choices. What belongs in the committee defense?",
        choices: [
          "How it makes money, strongest evidence, health, valuation, entry, size, worst downside, liquidity/financing, best alternative, and what would make you reject, reduce or exit — a calculated E(R) is not yet a buy",
          "Only the 10% stock expected return, then deploy the full $14,800 in that name",
          "The $10M IPS and 20% max-drawdown mandate from a different syllabus",
          "Skip alternatives and falsifiers if the allocation table adds to $6,000",
        ],
        correctIndex: 0,
        explanation:
          "The notes’ ten-point defense is the Blue City close. Separate calculation from interpretation. The core skill is connecting economics, numbers, valuation, risk and portfolio fit — not finding a single best number.",
      },
    ],
  },
];
