---
name: author-sword
description: Author or upgrade one Questfolio trade sword into a 3–5 step scenario chain with data blocks, decisions, capitalPct compounding, and gold reward wiring while keeping sword map coordinates and icons frozen. Use when the user asks to complete or expand a trade sword.
disable-model-invocation: true
---

# Author Trade Sword (`/author-sword`)

Repeatable factory for one sword at a time. Preserve sword shell + map placement; author scenario chain + rewards parameters only.

## Required inputs

Before editing, confirm (ask if missing):

1. `areaId` — city owning the sword
2. `tradeId` — e.g. `tr-ex-ledger`
3. Step count — **3, 4, or 5** (default **4**)
4. Theme brief — what investment skill the chain teaches
5. Source material — optional notes/PPT/calc pack
6. Branch — prefer existing working branch

Also load shared constraints: `.cursor/skills/questfolio-shared/SKILL.md`.

## Hard constraints

- **Do not** change sword map `x` / `y` or sword icon art.
- **Do not** redesign `TradeClient` shell unless user explicitly asks.
- Coral Ledger Bay already has multi-step chains in `trades-coral.ts` — treat as the **reference implementation**, not content to copy into other cities.
- Other cities currently ship single-step stubs in `src/lib/content/trades.ts` — upgrade by adding `steps` in the same shape as Coral.
- Keep trade `id` and coordinates stable.

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

## Authorship recipe (follow in order)

1. **Read** the existing sword stub and a Coral reference sword (`tr-bay-seed` is a good template).
2. **Keep** `id`, `x`, `y` frozen.
3. Design a **3–5 part investment chain** for this city’s skill, e.g. Brick:
   - Part 1: evidence / statements
   - Part 2: ratio or multiple calc
   - Part 3: valuation / peer decision
   - Part 4: size / risk
   - Part 5 (optional): review / falsifier / IC language
4. Each part must include usable `data` (not flavor-only): at least one of `table`, `calc`, `metrics`, `news`.
5. Wire `capitalPct` so disciplined paths trend modestly positive and reckless paths negative; avoid every path being gain.
6. Set `goldReward: 1` (or 2 only if user asks for a boss sword).
7. Ensure `tradeHasSteps` path works: `choices: []` + populated `steps`.
8. Typecheck; smoke `/trade/{id}` via demo launch when possible.
9. Commit: `feat(sword): multi-step chain for tr-ex-ledger`.

## Quality bar

- Feels like an investment decision chain, not a trivia quiz.
- Numbers in `data` are used by at least one correct choice.
- Map coordinates/icons untouched.
- No Coral story copy-paste into Brick/Quay/Highlands.
- Reward path uses existing resolver — no custom reward hacks in the client.

## Done definition

- Sword has 3–5 `steps`, each with data + choices + `capitalPct`.
- `goldReward` set; frozen coords untouched.
- Committed/pushed as appropriate.
- Report: trade id, step count, reward params, files changed, frozen fields confirmed.
---
