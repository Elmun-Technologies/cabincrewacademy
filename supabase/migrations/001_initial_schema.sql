-- Cabin Crew Academy Supabase Schema

create table if not exists profiles (
  id uuid references auth.users primary key,
  email text not null,
  full_name text not null default '',
  age integer default 21,
  height integer default 163,
  languages text[] default '{English}',
  target_airline text default 'Etihad Airways',
  onboarding_complete boolean default false,
  readiness_score integer default 0,
  created_at timestamptz default now()
);

create table if not exists user_xp (
  user_id uuid references profiles(id) primary key,
  total_xp integer default 0,
  level integer default 1,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_active_date date,
  start_date date default current_date
);

create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  phase_id text not null,
  lesson_id text not null,
  status text default 'in_progress',
  score integer default 0,
  completed_at timestamptz,
  unique(user_id, phase_id, lesson_id)
);

create table if not exists user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  badge_id text not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

create table if not exists daily_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  date date not null,
  minutes_spent integer default 0,
  challenge_completed boolean default false,
  plan_completed boolean default false,
  plan_json jsonb,
  unique(user_id, date)
);

create table if not exists flight_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  date date not null,
  content text not null,
  mood text default 'good',
  created_at timestamptz default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  type text not null,
  name text not null,
  file_url text,
  status text default 'uploaded',
  created_at timestamptz default now()
);

create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  quiz_id text not null,
  score integer not null,
  answers_json jsonb,
  created_at timestamptz default now()
);

create table if not exists game_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  game_type text not null,
  score integer not null,
  personal_best integer default 0,
  played_at timestamptz default now()
);

alter table profiles enable row level security;
alter table user_xp enable row level security;
alter table user_progress enable row level security;
alter table user_badges enable row level security;
alter table daily_sessions enable row level security;
alter table flight_logs enable row level security;
alter table documents enable row level security;

create policy "Users can manage own profile" on profiles for all using (auth.uid() = id);
create policy "Users can manage own xp" on user_xp for all using (auth.uid() = user_id);
create policy "Users can manage own progress" on user_progress for all using (auth.uid() = user_id);
create policy "Users can manage own badges" on user_badges for all using (auth.uid() = user_id);
create policy "Users can manage own sessions" on daily_sessions for all using (auth.uid() = user_id);
create policy "Users can manage own logs" on flight_logs for all using (auth.uid() = user_id);
create policy "Users can manage own documents" on documents for all using (auth.uid() = user_id);
