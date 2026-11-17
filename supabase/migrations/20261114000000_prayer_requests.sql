create extension if not exists pgcrypto;

create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  whatsapp text,
  email text,
  category text not null default 'outros',
  request_message text not null,
  status text not null default 'recebido',
  created_at timestamptz not null default now(),
  consent_at timestamptz
);

alter table public.prayer_requests add column if not exists whatsapp text;
alter table public.prayer_requests add column if not exists email text;
alter table public.prayer_requests add column if not exists category text;
alter table public.prayer_requests add column if not exists request_message text;
alter table public.prayer_requests add column if not exists status text;
alter table public.prayer_requests add column if not exists created_at timestamptz;
alter table public.prayer_requests add column if not exists consent_at timestamptz;

alter table public.prayer_requests drop constraint if exists prayer_requests_status_check;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'prayer_requests'
      and column_name = 'request'
  ) then
    execute 'update public.prayer_requests set request_message = coalesce(request_message, request)';
    execute 'alter table public.prayer_requests alter column request drop not null';
  end if;
end $$;

update public.prayer_requests
set category = 'outros'
where category is null
  or category not in (
    'familia',
    'saude',
    'vida_espiritual',
    'financeiro',
    'libertacao',
    'outros'
  );

update public.prayer_requests
set status = case status
  when 'new' then 'recebido'
  when 'read' then 'em_oracao'
  when 'prayed' then 'concluido'
  else 'recebido'
end
where status is null
  or status not in ('recebido', 'em_oracao', 'concluido');

alter table public.prayer_requests alter column name set not null;
alter table public.prayer_requests alter column category set not null;
alter table public.prayer_requests alter column category set default 'outros';
alter table public.prayer_requests alter column request_message set not null;
alter table public.prayer_requests alter column status set not null;
alter table public.prayer_requests alter column status set default 'recebido';
alter table public.prayer_requests alter column created_at set not null;
alter table public.prayer_requests alter column created_at set default now();

alter table public.prayer_requests drop constraint if exists prayer_requests_name_check;
alter table public.prayer_requests drop constraint if exists prayer_requests_request_message_check;
alter table public.prayer_requests drop constraint if exists prayer_requests_whatsapp_check;
alter table public.prayer_requests drop constraint if exists prayer_requests_email_check;
alter table public.prayer_requests drop constraint if exists prayer_requests_category_check;
alter table public.prayer_requests drop constraint if exists prayer_requests_status_check;

alter table public.prayer_requests
  add constraint prayer_requests_name_check
  check (char_length(btrim(name)) between 2 and 80);

alter table public.prayer_requests
  add constraint prayer_requests_request_message_check
  check (char_length(btrim(request_message)) between 10 and 2000);

alter table public.prayer_requests
  add constraint prayer_requests_whatsapp_check
  check (whatsapp is null or char_length(whatsapp) <= 24);

alter table public.prayer_requests
  add constraint prayer_requests_email_check
  check (email is null or char_length(email) <= 160);

alter table public.prayer_requests
  add constraint prayer_requests_category_check
  check (
    category in (
      'familia',
      'saude',
      'vida_espiritual',
      'financeiro',
      'libertacao',
      'outros'
    )
  );

alter table public.prayer_requests
  add constraint prayer_requests_status_check
  check (status in ('recebido', 'em_oracao', 'concluido'));

create index if not exists prayer_requests_created_at_idx
  on public.prayer_requests (created_at desc);

create index if not exists prayer_requests_status_idx
  on public.prayer_requests (status);

create index if not exists prayer_requests_category_idx
  on public.prayer_requests (category);

create index if not exists prayer_requests_name_lower_idx
  on public.prayer_requests (lower(name));

alter table public.prayer_requests enable row level security;
alter table public.prayer_requests force row level security;

revoke all on table public.prayer_requests from anon, authenticated;
grant all on table public.prayer_requests to service_role;

comment on table public.prayer_requests is
  'Pedidos de oração enviados pelo site. Acesso somente pelo servidor com service_role; RLS sem políticas para anon/authenticated.';

comment on column public.prayer_requests.consent_at is
  'Data e hora do consentimento registrado no envio do formulário.';
