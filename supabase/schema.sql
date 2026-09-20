-- Quiz Claude Code — schema
-- Run this first in the Supabase SQL editor.

create extension if not exists pgcrypto;

create table questions (
  id uuid primary key default gen_random_uuid(),
  question_text text not null,
  correct_answer boolean not null,
  explanation text not null,
  difficulty text not null check (difficulty in ('iniciante', 'intermediario', 'avancado')),
  topic text not null,
  created_at timestamptz not null default now()
);

create table game_sessions (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(nickname) between 1 and 30),
  difficulty text not null check (difficulty in ('iniciante', 'intermediario', 'avancado', 'misto')),
  score integer not null check (score >= 0),
  correct_count integer not null check (correct_count >= 0),
  total_questions integer not null check (total_questions > 0),
  duration_seconds integer not null check (duration_seconds >= 0),
  played_at timestamptz not null default now(),
  check (correct_count <= total_questions)
);

create index idx_questions_difficulty on questions (difficulty);
create index idx_game_sessions_score on game_sessions (score desc);
create index idx_game_sessions_nickname on game_sessions (nickname);
