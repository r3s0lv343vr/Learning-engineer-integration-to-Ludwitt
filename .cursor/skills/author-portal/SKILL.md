---
name: author-portal
description: Author or upgrade one Questfolio portal (module quest) with lesson, scenario, and 3–5 successive quiz questions while preserving the standard portal shell and frozen map fields. Use when the user asks to complete, expand, or rewrite a portal / module quest.
disable-model-invocation: true
---

# Author Portal (`/author-portal`)

Repeatable factory for one portal at a time. Preserve the learner portal shell; change content only.

## Required inputs

Before editing, confirm (ask if missing):

1. `areaId` — `coral-ledger-bay` | `brick-exchange` | `signal-quay` | `mandate-highlands`
2. `moduleId` — e.g. `m12`
3. Target question count — **3, 4, or 5** (default: Coral-quality **5**; existing Brick stubs are often 3 — upgrade only if asked)
4. Source material — notes/PPT/syllabus path or pasted brief (optional but preferred)
5. Branch — prefer existing working branch; do not touch map coords

Also load shared constraints: `.cursor/skills/questfolio-shared/SKILL.md` (or `@questfolio-shared` if available).

## Hard constraints

- **Do not** change portal shell UI (`QuestClient`, quest page chrome).
- **Do not** change map identity fields unless user explicitly asks: `id`, `number`, `title` (ask before renaming), `mapLabel`, `x`, `y`.
- Prefer editing content fields: `summary`, `concepts`, `outcome`, `lesson`, `scenario`, `questions`.
- **Do not** copy Coral Ledger Bay / Purple City curriculum into another city.
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

## Authorship recipe (follow in order)

1. **Read** the existing module object and nearest city classroom/notes for theme alignment.
2. **Keep** `id`, `number`, `mapLabel`, `x`, `y` unchanged.
3. **Rewrite/upgrade** `summary`, `concepts`, `lesson`, `scenario`, `outcome` for that portal’s skill only.
4. **Author 3–5 successive questions** that form a chain:
   - Q1: definition / distinguish
   - Q2: formula or mechanism
   - Q3: interpret numbers / case
   - Q4 (if used): decision under constraint
   - Q5 (if used): portfolio/lab action tying to `$14,800` book when relevant
5. Use city-native examples (Brick = statements/ratios/valuation; do not paste BayCo Purple copy).
6. Ensure one unambiguous `correctIndex`; distractors plausible but wrong.
7. Typecheck touched files; smoke `/quest/mN` via demo launch when possible.
8. Commit with message like: `feat(portal): author m12 Brick Exchange successive quiz`.

## Quality bar

- Questions are successive (later Qs assume earlier concepts), not random trivia.
- Lesson + scenario + questions teach the same skill.
- No map/layout/icon edits.
- No shell redesign.
- No cross-city curriculum copy.

## Done definition

- Target module has 3–5 complete `QuizQuestion`s.
- Content fields updated; frozen map fields untouched.
- Committed (and pushed if on a cloud/PR branch).
- Brief report: module id, question count, files changed, what was frozen.
---
