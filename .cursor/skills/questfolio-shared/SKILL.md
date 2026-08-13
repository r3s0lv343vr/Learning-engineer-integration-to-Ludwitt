---
name: questfolio-shared
description: Shared Questfolio hard constraints for map freeze, library classroom shell, portal shell, and trade swords. Use alongside /author-portal or /author-sword, or when continuing city content work.
disable-model-invocation: true
---

# Questfolio Shared Constraints

Load this whenever authoring portals, swords, classrooms, or map-adjacent content.

## Cities

| `areaId` | Name | Alias | Modules | Accent |
|---|---|---|---|---|
| `coral-ledger-bay` | Coral Ledger Bay | Purple City | 1–9 | `#7c4dff` |
| `brick-exchange` | Brick Exchange | Blue City | 10–18 | `#2196f3` |
| `signal-quay` | Signal Quay | — | 19–27 | `#43a047` |
| `mandate-highlands` | Mandate Highlands | — | 28–36 | `#c6922e` |

Source: `src/lib/content/areas.ts`.

## Map freeze (default)

Do **not** change unless the user explicitly asks:

- Map layout / poster art
- Portal, chest, sword, library **icon art**
- Marker **coordinates** (`x`/`y`) in modules, trades, libraries, chests
- Files of concern: `QuestMap.tsx`, `map-layout.ts`, `MapIcons.tsx`, `public/maps/*`, `public/icons/*`

## Library classroom shell

- Shared room: `src/components/LibraryClassroom.tsx`
- Cities differ by **theme colour + content only**
- Content: `classroom.ts`, `classroom-blue.ts`, stubs for other cities
- Shelf: `libraries.ts`
- Do **not** copy Purple City / Coral curriculum into other cities
- Slides panel must show slide titles; board shell stays fixed

## Portal shell

- Route `/quest/[id]` + `QuestClient.tsx`
- Successive quiz challenges from `questions[]`
- Rewards via `completeModule` / `applyAnswer` (not per-module reward fields)
- Admin overlays additive only (`resolve-portal.ts`); do not redesign quest UI
- Do not alter map identity fields (`id`, `number`, `mapLabel`, `x`, `y`) unless asked

## Trade sword shell

- Route `/trade/[id]` + `TradeClient.tsx`
- Coral reference multi-step chains: `trades-coral.ts`
- Other cities: stubs in `trades.ts` until authored
- Rewards via `resolveTradePath` + `applyTradeAreaResult`
- Keep sword coordinates frozen

## Starting book

Simulator reference capital: **$14,800**.

## Delivery habits

- Prefer content edits over architecture edits
- One portal or one sword per skill invocation unless user asks for a batch
- Commit focused diffs; smoke with `/api/demo-launch/...` when validating learner flows
---
