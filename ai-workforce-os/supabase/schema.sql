create extension if not exists "uuid-ossp";

create table if not exists workspaces (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key,
  workspace_id uuid references workspaces(id) on delete cascade,
  full_name text,
  email text unique,
  role text not null default 'owner',
  created_at timestamptz not null default now()
);

create table if not exists agents (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  slug text not null,
  provider text not null,
  model text not null,
  system_prompt text not null,
  config jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists knowledge_sources (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  kind text not null,
  status text not null default 'ready',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists knowledge_chunks (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  source_id uuid not null references knowledge_sources(id) on delete cascade,
  content text not null,
  embedding vector(1536),
  created_at timestamptz not null default now()
);

create table if not exists conversations (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  channel text not null,
  contact_name text not null,
  contact_external_id text,
  status text not null default 'open',
  revenue_potential numeric(12,2) not null default 0,
  last_message text,
  created_at timestamptz not null default now()
);

create table if not exists workflows (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  trigger text not null,
  action text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  provider text not null default 'stripe',
  external_customer_id text,
  external_subscription_id text,
  plan_code text not null,
  status text not null default 'trialing',
  created_at timestamptz not null default now()
);

alter table workspaces enable row level security;
alter table profiles enable row level security;
alter table agents enable row level security;
alter table knowledge_sources enable row level security;
alter table knowledge_chunks enable row level security;
alter table conversations enable row level security;
alter table workflows enable row level security;
alter table subscriptions enable row level security;

create policy "workspace members can read profiles"
on profiles for select using (true);
