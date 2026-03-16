# Achadinhos do Zero

Vitrine de afiliados mobile-first em Next.js, Tailwind CSS e Supabase.

## Rodando o projeto

1. Instale as dependencias:

```bash
npm install
```

2. Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

3. Rode o projeto:

```bash
npm run dev
```

## Supabase

Execute o schema em `supabase/schema.sql` para criar a tabela `produtos`.

## Estrutura

- `app/page.tsx`: home server-side que busca os produtos.
- `components/*`: UI mobile-first para header, busca, filtros e cards.
- `lib/supabase/products.ts`: funcao que consulta os produtos no Supabase.
- `lib/mock-products.ts`: fallback local para demonstracao sem backend.
