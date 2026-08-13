---
name: author-portal
description: Author or upgrade one Questfolio portal (module quest) with lesson, scenario, and 3–5 successive quiz questions while preserving the standard portal shell and frozen map fields. Use when the user asks to complete, expand, or rewrite a portal / module quest.
disable-model-invocation: true
---

# Author Portal (`/author-portal`)

Repeatable factory for one portal at a time. Preserve the learner portal shell; change content only.

## Source of truth (mandatory)

Author from this stack, in order:

1. **User-fed notes for this run** — pasted text, uploaded PDF/PPT, or paths the user provides. This is primary.
2. **That city’s curriculum** — Library Classroom slides + city study notes already in repo (for Blue City: Analysis & Asset Selection).
3. **Existing module stub** — only for frozen map fields (`id`, `number`, `mapLabel`, `x`, `y`) and structure.

Do **not**:
- invent a different subject than the fed notes/curriculum
- keep mismatched stub themes if they conflict with the city curriculum (rewrite `summary` / `lesson` / `scenario` / `questions` to match; ask before changing `title` / `mapLabel`)
- copy another city’s curriculum (especially Coral/Purple → Blue)

If notes and curriculum conflict, **ask the user** which wins before writing.

## Required inputs

Before editing, confirm (ask if missing):

1. `areaId` — `coral-ledger-bay` | `brick-exchange` | `signal-quay` | `mandate-highlands`
2. `moduleId` — e.g. `m12`
3. Target question count — **3, 4, or 5** (default **5**)
4. **Notes package** — required unless user says “use repo classroom/notes only”:
   - pasted excerpt, and/or
   - uploaded file, and/or
   - repo path (e.g. `public/library/brick-exchange/blue-city-analysis-asset-selection-notes.pdf`)
5. Which curriculum slice this portal covers (e.g. “statements & working capital”, “P/E & MoS”)
6. Branch — prefer existing working branch; do not touch map coords

Also load shared constraints: `.cursor/skills/questfolio-shared/SKILL.md`.

## Hard constraints

- **Do not** change portal shell UI (`QuestClient`, quest page chrome).
- **Do not** change map identity fields unless user explicitly asks: `id`, `number`, `title` (ask before renaming), `mapLabel`, `x`, `y`.
- Prefer editing content fields: `summary`, `concepts`, `outcome`, `lesson`, `scenario`, `questions`.
- **Do not** copy Coral Ledger Bay / Purple City curriculum into another city.
- Ground every lesson/scenario/question in the fed notes + city curriculum (formulas, definitions, worked ideas).
- Admin overlays may later replace text fields; keep quiz `questions` solid in base content.
- Rewards are **not** authored per portal — they come from `completeModule` / `applyAnswer` in `src/lib/game-state.ts`. Do not invent per-portal reward fields.

## File map

| Area | Modules | Content file |
|---|---|---|
| Coral Ledger Bay | m1–m9 | `src/lib/content/modules-purple.ts` |
| Brick Exchange | m10–m18 | `src/lib/content/modules-mid.ts` |
| Signal Quay | m19–m27 | `src/lib/content/modules-extra.ts` |
| Mandate Highlands | m28–m36 | `src/lib/content/modules-extra.ts` |

Registry: `src/lib/content/modules.ts` concatenates the arrays — usually no edit needed.

Types: `ModuleQuest` / `QuizQuestion` in `src/lib/types.ts`.

Shell (do not redesign): `src/app/quest/[id]/QuestClient.tsx`.

## Portal shape (required)

```ts
{
  id: "mN",
  number: N,
  title: "...",          // keep unless user asks rename
  mapLabel: "...",       // keep — map chip text
  x, y,                  // FROZEN
  summary: "...",
  concepts: ["...", "..."],
  outcome: "...",        // what the learner should be able to decide/do
  lesson: "...",         // teach content (aligned to classroom if city has one)
  scenario: "...",       // decision frame before the quiz chain
  questions: [ /* 3–5 */ ]
}
```

Each question:

```ts
{
  id: "mN-qK",
  prompt: "...",
  choices: ["A", "B", "C", "D"],  // exactly 4 choices
  correctIndex: 0,                 // 0–3
  explanation: "...",              // teach why, not just "correct"
}
```

## Blue City curriculum anchors (Brick Exchange)

When `areaId = brick-exchange`, default curriculum is **Blue City Analysis & Asset Selection**:

- Classroom: `src/lib/content/classroom-blue.ts`
- Notes PDF: `public/library/brick-exchange/blue-city-analysis-asset-selection-notes.pdf`
- Teaching deck PDF: `public/library/brick-exchange/blue-city-analysis-asset-selection-teaching-deck.pdf`
- Portals: `m10`–`m18` in `modules-mid.ts`

Map portal skills onto that curriculum (companies → statements → ratios → valuation → selection). If the user feeds notes for a specific slice, that slice wins for this portal.

For other cities later: use **that city’s** fed notes + that city’s classroom/notes files the same way.

## Authorship recipe (follow in order)

1. **Ingest notes** the user fed (and open the city classroom/notes paths). Extract the teaching points for this portal only.
2. **Read** the existing module object for frozen fields.
3. **Keep** `id`, `number`, `mapLabel`, `x`, `y` unchanged.
4. **Rewrite** `summary`, `concepts`, `lesson`, `scenario`, `outcome` from the notes/curriculum slice (ignore mismatched stub topics).
5. **Author 3–5 successive questions** from those notes:
   - Q1: definition / distinguish (from notes)
   - Q2: formula or mechanism (from notes)
   - Q3: interpret numbers / worked case (from notes)
   - Q4 (if used): decision under constraint
   - Q5 (if used): portfolio/lab action tying to `$14,800` when relevant
6. Use city-native examples derived from the fed material; never paste another city’s storyline.
7. Ensure one unambiguous `correctIndex`; distractors plausible but wrong.
8. Typecheck; smoke `/quest/mN` via demo launch when possible.
9. Commit like: `feat(portal): author m12 from Blue City notes`.

## Quality bar

- Traceable to fed notes + city curriculum (not generic trivia).
- Questions are successive; lesson + scenario + questions teach the same slice.
- No map/layout/icon edits; no shell redesign; no cross-city copy.

## Done definition

- Target module has 3–5 complete `QuizQuestion`s.
- Content fields updated; frozen map fields untouched.
- Committed (and pushed if on a cloud/PR branch).
- Brief report: module id, question count, files changed, what was frozen.
---
