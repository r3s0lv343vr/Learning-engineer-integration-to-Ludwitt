# AI Investment Learning Simulator

Quest-style investing lab for the Hult Cohort Developer Program (Week 4 · Ludwitt learning).

Guide a small warrior across a Zelda-inspired quest map with Duolingo-like progression: hearts, gold bars, syllabus modules, side quests, wealth chests, Portfolio Lab ($14,800), stock/forex candles, and financial news.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- Ludwitt Creator OAuth + hosted-data storage
- Optional cohort JWT launch bridge + events API

## Local setup

```bash
npm install
cp .env.example .env.local
# fill LUDWITT_* after Create app in the Ludwitt portal
npm run dev
```

Open http://localhost:3000

- **Demo quest** (no Ludwitt keys): `/api/demo-launch`
- **Ludwitt sign-in**: `/auth/login` → `/auth/callback`
- **Health**: `GET /api/health`

## Ludwitt registration values

| Field | Value |
|-------|--------|
| Name | AI Investment Learning Simulator |
| Slug | `ai-investment-learning-simulator` |
| Tier | Hosted storage |
| Collections | `progress`, `portfolio`, `sessions`, `event_log` |
| Redirect URIs | `http://localhost:3000/auth/callback` and `https://ai-investment-learning-r3s0lv343vr.vercel.app/auth/callback` |

Registered app (Creator / hosted storage):

- `LUDWITT_APP_ID` / `client_id`: `le_b752d5261268d3c7607fa2`
- Slug: `ai-investment-learning-simulator`
- Keep `LUDWITT_CLIENT_SECRET` only in Vercel / `.env.local` — never commit it
- Offline docs: `.ludwitt/` (fetched from Ludwitt LE docs)
- Scopes: `profile credits:read credits:spend data:read data:write`
- OAuth callback stores access + refresh tokens (httpOnly sealed cookie) and refreshes before expiry
- Hosted collections used: `progress`, `portfolio`, `sessions`, `event_log`
- AI mentor: `POST /api/ai/mentor` → Ludwitt `/api/v1/ai/messages` (gates on `spendableCents`, handles 402)
- Credits: `GET /api/credits` → Ludwitt `/api/v1/credits/balance`

## Scripts

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Game rules (progression)

- Start with **5 hearts** and **$14,800**
- **5 correct answers** → +1 heart (capped) and +1 gold bar
- **4 consecutive wrong** → −1 heart
- **0 hearts** → Detention (resit missed questions)
- Side quests adjust capital; super chests award **3 / 5 / 10** gold bars

## Syllabus

Built from *AI Investment Simulator Learning Syllabus* — 18 modules + Portfolio Lab + Module 18 fund mandate.
