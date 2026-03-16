create table if not exists public.produtos (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  titulo text not null,
  numero_achado integer not null unique,
  link_afiliado text not null,
  url_imagem text not null,
  categoria text not null
);

create index if not exists produtos_categoria_idx
  on public.produtos (categoria);

create index if not exists produtos_created_at_idx
  on public.produtos (created_at desc);
