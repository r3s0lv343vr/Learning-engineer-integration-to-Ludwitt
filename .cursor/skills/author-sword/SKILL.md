---
name: author-sword
description: Author or upgrade one Questfolio trade sword into a 3–5 step scenario chain with data blocks, decisions, capitalPct compounding, and gold reward wiring while keeping sword map coordinates and icons frozen. Use when the user asks to complete or expand a trade sword.
disable-model-invocation: true
---

# Author Trade Sword (`/author-sword`)

Repeatable factory for one sword at a time. Preserve sword shell + map placement; author scenario chain + rewards parameters only.

## Source of truth (mandatory)

Author from this stack, in order:

1. **User-fed notes for this run** — pasted text, uploaded PDF/PPT, or paths the user provides. Primary.
2. **That city’s curriculum** — classroom + study notes (Blue City = Analysis & Asset Selection).
3. **Coral sword code** — structure/reference only (`steps`, `data`, `capitalPct`, rewards), **not** Coral story/content.
4. **Existing sword stub** — keep `id`, `x`, `y`; replace single-step prompt/choices with a notes-based chain.

If notes are missing, ask for them (or explicit permission to use repo classroom/notes only) before writing.

## Required inputs

Before editing, confirm (ask if missing):

1. `areaId` — city owning the sword
2. `tradeId` — e.g. `tr-ex-ledger`
3. Step count — **3, 4, or 5** (default **4**)
4. **Notes package** — required unless user says “use repo classroom/notes only”
5. Curriculum slice this sword practices (e.g. “acid-test + liquidity decision”, “EV/EBITDA comps”)
6. Branch — prefer existing working branch

Also load shared constraints: `.cursor/skills/questfolio-shared/SKILL.md`.

## Hard constraints

- **Do not** change sword map `x` / `y` or sword icon art.
- **Do not** redesign `TradeClient` shell unless user explicitly asks.
- Coral Ledger Bay chains in `trades-coral.ts` are the **mechanical template only** — never copy Coral narratives into other cities.
- Other cities currently ship single-step stubs in `src/lib/content/trades.ts` — upgrade by adding `steps` in the same shape as Coral.
- Keep trade `id` and coordinates stable.
- Every step’s `data` and choices must come from the fed notes/curriculum math and decision logic.

## File map

| Piece | Path |
|---|---|
| Coral multi-step swords | `src/lib/content/trades-coral.ts` |
| Other-city stubs + resolver | `src/lib/content/trades.ts` |
| Types (`TradeArea`, `TradeStep`, …) | exported from `trades-coral.ts` via `trades.ts` |
| UI shell | `src/app/trade/[id]/TradeClient.tsx` |
| Reward apply | `applyTradeAreaResult` in `src/lib/game-state.ts` |
| Path resolve | `resolveTradePath` / `resolveLegacyTradeChoice` in `trades.ts` |
| API | `POST /api/state` action `trade_area` |

## Sword shape (multi-step target)

```ts
trade({
  id: "tr-ex-…",
  areaId: "brick-exchange",
  title: "…",
  summary: "…",
  risk: "low" | "medium" | "high",
  capitalDeltaGain: number,   // legacy fallback for single-step / display
  capitalDeltaLoss: number,   // legacy fallback
  goldReward: 1,              // awarded on successful resolve path
  x, y,                       // FROZEN
  prompt: "Complete the … chain.",
  choices: [],                // empty when using steps
  steps: [ /* 3–5 TradeStep */ ],
})
```

Each step:

```ts
{
  id: "ledger-1",
  title: "Part 1 · …",
  narrative: "…",
  data: [ /* table | news | calc | metrics */ ],
  choices: [
    // prefer choice(id, label, outcome, capitalPct, feedback)
  ],
}
```

## Reward / parameter rules (must match resolver)

From `resolveTradePath`:

- Each choice `capitalPct` is fractional, e.g. `0.02` = +2%, `-0.015` = −1.5%.
- **\|capitalPct\| ≤ 0.08** per choice (server rejects larger).
- Capital compounds: `capital = capital * (1 + capitalPct)` each step.
- Final delta clamped to **±18%** of starting capital.
- `goldReward` granted only when final outcome is gain **and** `gainSteps >= lossSteps`.
- Every choice needs stable `id` (used in `choiceIds` path).
- Provide **2–3 choices per step** (one clear disciplined gain path; one or two loss/trap paths).

Legacy single-step fallback still uses `capitalDeltaGain` / `capitalDeltaLoss` + `choices` when `steps` absent — when upgrading, set `steps` and leave fallback deltas sensible.

## Blue City curriculum anchors (Brick Exchange)

Default curriculum: **Blue City Analysis & Asset Selection**

- `classroom-blue.ts`
- `public/library/brick-exchange/blue-city-analysis-asset-selection-notes.pdf`
- `public/library/brick-exchange/blue-city-analysis-asset-selection-teaching-deck.pdf`

Sword chains should practice analysis decisions from those notes (statements, ratios, comps, DCF/selection), using figures the user fed when provided.

## Authorship recipe (follow in order)

1. **Ingest** user-fed notes + city curriculum; list the calc/decision beats for this sword.
2. **Read** existing stub + one Coral sword for **structure only** (`tr-bay-seed`).
3. **Keep** `id`, `x`, `y` frozen.
4. Build a **3–5 part chain** from the notes slice, e.g.:
   - Part 1: evidence / statements from notes
   - Part 2: ratio or multiple calc from notes
   - Part 3: valuation / peer decision from notes
   - Part 4: size / risk / mandate
   - Part 5 (optional): falsifier / review language
5. Each part needs usable `data` drawn from notes (table/calc/metrics/news) — not flavor-only.
6. Wire `capitalPct` so disciplined paths trend modestly positive and reckless paths negative.
7. Set `goldReward: 1` (or 2 if user asks).
8. `choices: []` + populated `steps` so `tradeHasSteps` works.
9. Typecheck; smoke `/trade/{id}`; commit `feat(sword): multi-step tr-ex-ledger from Blue City notes`.

## Quality bar

- Traceable to fed notes + city curriculum.
- Investment decision chain; numbers in `data` used by correct choices.
- Map coords/icons untouched; no Coral story copy; existing reward resolver only.

## Done definition

- Sword has 3–5 `steps`, each with data + choices + `capitalPct`.
- `goldReward` set; frozen coords untouched.
- Committed/pushed as appropriate.
- Report: trade id, step count, reward params, files changed, frozen fields confirmed.
---
