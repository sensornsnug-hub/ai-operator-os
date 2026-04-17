create extension if not exists "uuid-ossp";

create table if not exists workspaces (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  niche text,
  company_name text,
  support_email text,
  default_locale text not null default 'pt-BR',
  supported_locales text[] not null default array['pt-BR'],
  default_destination_label text not null default 'Destination',
  supported_intent_labels text[] not null default array['Buy','Quote','Book','Support'],
  timezone text not null default 'America/Bahia',
  primary_color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
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

create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  channel text not null,
  source text,
  destination text,
  intent text,
  status text not null default 'new',
  phone text,
  email text,
  language text not null default 'pt-BR',
  value_estimate numeric(12,2) not null default 0,
  payload jsonb not null default '{}'::jsonb,
  next_follow_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists lead_events (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  lead_id uuid not null references leads(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists follow_up_queue (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  lead_id uuid not null references leads(id) on delete cascade,
  channel text not null,
  scheduled_for timestamptz not null,
  status text not null default 'pending',
  attempt_count integer not null default 0,
  payload jsonb not null default '{}'::jsonb,
  last_error text,
  processed_at timestamptz,
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

create table if not exists workspace_integrations (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  provider text not null,
  status text not null default 'missing',
  external_account_id text,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, provider)
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

create index if not exists idx_leads_workspace_id on leads(workspace_id);
create index if not exists idx_follow_up_queue_workspace_status on follow_up_queue(workspace_id, status, scheduled_for);
create index if not exists idx_workspace_integrations_workspace_id on workspace_integrations(workspace_id);

alter table workspaces enable row level security;
alter table profiles enable row level security;
alter table agents enable row level security;
alter table knowledge_sources enable row level security;
alter table knowledge_chunks enable row level security;
alter table conversations enable row level security;
alter table leads enable row level security;
alter table lead_events enable row level security;
alter table follow_up_queue enable row level security;
alter table workflows enable row level security;
alter table workspace_integrations enable row level security;
alter table subscriptions enable row level security;

create policy "workspace members can read profiles"
on profiles for select using (true);

create policy "workspace members can read workspaces"
on workspaces for select using (true);

create policy "workspace members can read leads"
on leads for select using (true);

create policy "workspace members can manage queue"
on follow_up_queue for all using (true) with check (true);
