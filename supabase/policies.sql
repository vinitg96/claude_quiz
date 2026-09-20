-- Quiz Claude Code — Row Level Security
-- Run this second, after schema.sql.
--
-- questions: public read-only, no client writes (seeded via seed.sql / SQL editor only).
-- game_sessions: public insert + public read (needed for the leaderboard), no update/delete.
-- Known MVP limitation: without auth, anyone with the anon key can insert arbitrary
-- game_sessions rows directly against the API. Accepted per PRD — this is a portfolio
-- project, not a competitive ranking system. Do not "fix" this with client-side checks.

alter table questions enable row level security;
alter table game_sessions enable row level security;

create policy "Public read questions"
  on questions
  for select
  using (true);

create policy "Public insert game_sessions"
  on game_sessions
  for insert
  with check (true);

create policy "Public read game_sessions"
  on game_sessions
  for select
  using (true);
