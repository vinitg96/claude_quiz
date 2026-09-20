# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # serve the dist/ build locally
npm run lint      # oxlint
```

No test suite exists (explicitly out of scope for the MVP). Supabase schema/policies/seed are plain SQL in `supabase/`, run manually in the Supabase SQL editor — see `README.md` for the exact setup steps and required `.env` vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

## Product overview

A Portuguese-language (pt-BR only, no i18n) True-or-False quiz web app about **Claude Code** (the Anthropic CLI), used as a full-stack portfolio piece. Users pick a nickname (no auth) and a difficulty, answer timed true/false questions with immediate feedback, then see a score summary and a public leaderboard. Full requirements and scoring rules are in `prd.md` — the summary below covers only what's needed to navigate the architecture.

## Stack

- React + Vite (SPA, plain JS/JSX, no TypeScript) + React Router.
- Tailwind CSS **v4**, wired via the `@tailwindcss/vite` plugin (`vite.config.js`) — no `tailwind.config.js`/PostCSS config; `src/index.css` just does `@import 'tailwindcss';`. Don't reintroduce a v3-style PostCSS setup.
- Supabase (Postgres + JS SDK) as the only backend — no custom server.
- Hosting: static/serverless (Vercel or Netlify). SPA rewrites are already in place (`vercel.json`, `public/_redirects`) — needed because routes are client-side only.

## Architecture

### State management — deliberately minimal
No Redux/Zustand/Context, no React Query/SWR. Each page fetches what it needs with a one-off Supabase call in a `useEffect` + local `useState`. Data crosses pages via `navigate(path, { state })` (see `src/pages/Quiz.jsx` → `/resultado`), not global state. `localStorage` is used only for `qcc_nickname` and `qcc_last_difficulty` (keys in `src/lib/constants.js`) — nickname prefill and personal-history correlation, nothing else. If a page's `location.state` is missing (e.g. direct refresh on `/resultado`), it redirects to `/` rather than trying to reconstruct state — accepted UX tradeoff, not a bug to fix with persistence.

### Routes (screens)
- `/` — Home: nickname input + difficulty selection (Iniciante / Intermediário / Avançado / Misto)
- `/quiz` — active quiz, one question at a time, with per-question timer
- `/resultado` — end-of-game summary (score, correct/incorrect count, total time)
- `/ranking` — global leaderboard (top N) + current nickname's personal history

### Data flow
- No authentication; identity is a client-supplied `nickname` string, correlated with `localStorage` for personal history lookups.
- Questions are read-only from the client (`questions` table, public `SELECT`, no client writes — seeding is via `supabase/seed.sql`, not the UI).
- Game results are write-only inserts from the client (`game_sessions` table, public `INSERT`, public `SELECT` for the leaderboard, no `UPDATE`/`DELETE`). `src/pages/Quiz.jsx` calls `insertGameSession` exactly once, on the last question, guarded by a ref (`isSubmittingRef`) — don't move this call into `Resultado.jsx` or an effect, since that risks duplicate inserts on refresh/re-render. This also means the leaderboard is spoofable via direct API calls — accepted as a known MVP limitation (PRD §9), not something to "fix" with client-side validation.
- Use only the Supabase `anon` public key in the frontend, never `service_role`.

### Data model (Supabase/Postgres) — see `supabase/schema.sql`
**`questions`**: `id` (uuid PK), `question_text`, `correct_answer` (boolean), `explanation`, `difficulty` (enum: `iniciante`/`intermediario`/`avancado`), `topic`, `created_at`.

**`game_sessions`**: `id` (uuid PK), `nickname`, `difficulty` (includes `"misto"`), `score`, `correct_count`, `total_questions`, `duration_seconds`, `played_at`.

### Scoring rules (`src/lib/scoring.js` — implement exactly as specified)
- Correct answer: +100 base points.
- Speed bonus: up to +50 points, proportional to time remaining — `bonus = round(50 * tempo_restante / tempo_total)`.
- Wrong answer or timeout: 0 points for that question.
- Final score = sum across all questions.

### Quiz round composition (`src/lib/constants.js`)
Single-difficulty rounds use all 10 questions for that level. `misto` is not defined by the PRD, so it's implemented as 4 questions sampled per level (12 total, shuffled) — `MISTO_PER_LEVEL`. Change this constant, not ad-hoc logic in `questionsService.js`, if the mix should change.

### Timer (`src/hooks/useCountdown.js`)
Resets when `resetKey` (the current question's id) changes, ticks via `setTimeout`, and freezes when `paused` (set once the user has answered, so the clock used for the speed bonus is exact and doesn't keep running after an answer). The reset-on-key-change is done synchronously during render (React's "adjusting state when a prop changes" pattern), not in a `useEffect` — keep it that way, an effect-based reset was tried and flagged by lint (`react/set-state-in-effect`) as an extra unnecessary render.

### Seed data
`supabase/seed.sql` has the 30 authored questions (10 per difficulty). Claude Code evolves quickly, so seed content avoids phrasing that goes stale — no version-pinned claims (PRD §9). If asked to add/edit questions, edit `supabase/seed.sql` directly and re-run it in the Supabase SQL editor; there's no admin UI or seed script by design.
