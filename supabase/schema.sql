create extension if not exists pgcrypto with schema extensions;

create table if not exists public.produtos (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  titulo text not null,
  numero_achado integer not null unique,
  link_afiliado text not null,
  url_imagem text not null,
  categoria text not null,
  preco text null
);

alter table public.produtos
  add column if not exists preco text null;

create index if not exists produtos_categoria_idx
  on public.produtos (categoria);

create index if not exists produtos_created_at_idx
  on public.produtos (created_at desc);

create table if not exists public.site_clicks (
  id bigint generated always as identity primary key,
  clicked_at timestamp with time zone not null default timezone('utc'::text, now()),
  button_key text not null,
  button_label text not null,
  page_path text null,
  product_id bigint null references public.produtos (id) on delete set null,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists site_clicks_clicked_at_idx
  on public.site_clicks (clicked_at desc);

create index if not exists site_clicks_button_key_idx
  on public.site_clicks (button_key, clicked_at desc);

create index if not exists site_clicks_product_id_idx
  on public.site_clicks (product_id, clicked_at desc);

create table if not exists public.admin_users (
  id uuid primary key default extensions.gen_random_uuid(),
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  username text not null unique,
  display_name text null,
  password_hash text not null,
  is_active boolean not null default true,
  last_login_at timestamp with time zone null
);

create index if not exists admin_users_username_idx
  on public.admin_users (username);

alter table public.produtos enable row level security;
alter table public.site_clicks enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public can read products" on public.produtos;
create policy "Public can read products"
  on public.produtos
  for select
  using (true);

create or replace view public.product_click_stats as
select
  p.id,
  p.created_at,
  p.titulo,
  p.numero_achado,
  p.link_afiliado,
  p.url_imagem,
  p.categoria,
  p.preco,
  count(sc.id)::bigint as total_clicks,
  count(sc.id) filter (where sc.button_key = 'product_card_select')::bigint as preview_clicks,
  count(sc.id) filter (
    where sc.button_key in ('product_card_affiliate', 'product_modal_affiliate')
  )::bigint as affiliate_clicks,
  max(sc.clicked_at) as last_clicked_at
from public.produtos p
left join public.site_clicks sc
  on sc.product_id = p.id
group by
  p.id,
  p.created_at,
  p.titulo,
  p.numero_achado,
  p.link_afiliado,
  p.url_imagem,
  p.categoria,
  p.preco;

create or replace view public.button_click_stats as
select
  sc.button_key,
  sc.button_label,
  count(sc.id)::bigint as total_clicks,
  max(sc.clicked_at) as last_clicked_at,
  max(sc.page_path) as sample_path
from public.site_clicks sc
group by
  sc.button_key,
  sc.button_label;

create or replace function public.verify_admin_login(
  p_username text,
  p_password text
)
returns table (
  id uuid,
  username text,
  display_name text
)
language sql
security definer
set search_path = public, extensions
as $$
  select
    admin.id,
    admin.username,
    coalesce(nullif(admin.display_name, ''), admin.username) as display_name
  from public.admin_users as admin
  where admin.username = lower(trim(p_username))
    and admin.is_active = true
    and admin.password_hash = extensions.crypt(trim(p_password), admin.password_hash)
  limit 1;
$$;

revoke all on function public.verify_admin_login(text, text) from public;
revoke all on function public.verify_admin_login(text, text) from anon;
revoke all on function public.verify_admin_login(text, text) from authenticated;
grant execute on function public.verify_admin_login(text, text) to service_role;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'product-images',
  'product-images',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
  on storage.objects
  for select
  using (bucket_id = 'product-images');
