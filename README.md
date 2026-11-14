# IPAD — Igreja Pentecostal Aliança com Deus

Site institucional da Igreja Pentecostal Aliança com Deus, em São Bernardo,
Maranhão. Desenvolvido com Next.js (App Router), React, TypeScript e Tailwind
CSS, com foco em experiência mobile, acessibilidade, SEO e performance.

## Stack

- Next.js 16 (App Router, `proxy.ts`, Server Actions)
- React 19 e TypeScript
- Tailwind CSS 4 (via `@tailwindcss/turbopack`)
- `lucide-react` para ícones, `zod` para validação, `jose` para sessão JWT
- `sharp` para preparação dos ativos de imagem
- Armazenamento dos pedidos de oração em JSON local ou Supabase

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Scripts disponíveis:

| Script | Descrição |
| --- | --- |
| `npm run dev` | Ambiente de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificação de tipos |
| `npm run images:prepare` | Regenera logos, recortes e imagens OG |
| `npm run admin:hash -- "senha"` | Gera o hash da senha do admin |

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha os valores.

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Produção | URL canônica, sitemap e Open Graph |
| `ADMIN_SESSION_SECRET` | Produção | Assinatura da sessão admin (32+ caracteres) |
| `ADMIN_PASSWORD_HASH` | Produção | Hash scrypt da senha do painel |
| `RATE_LIMIT_SALT` | Recomendada | Sal para anonimizar IPs no rate limit |
| `SUPABASE_URL` | Opcional | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Opcional | Chave secreta do Supabase (server-side) |
| `PRAYER_TABLE` | Opcional | Nome da tabela (padrão `prayer_requests`) |

Também é aceito `NEXT_PUBLIC_SUPABASE_URL` como alternativa a `SUPABASE_URL`.

### Acesso administrativo

Gere o hash da senha:

```bash
npm run admin:hash -- "uma-senha-forte"
```

Copie a linha `ADMIN_PASSWORD_HASH=...` para o `.env.local` e defina um
`ADMIN_SESSION_SECRET` com pelo menos 32 caracteres. Acesse `/admin/login`.

- Em desenvolvimento, se `ADMIN_PASSWORD_HASH` não estiver definido, a senha
  temporária é `ipad-admin`.
- Em produção, sem `ADMIN_PASSWORD_HASH` e `ADMIN_SESSION_SECRET`, o acesso é
  bloqueado.
- A sessão usa cookie `httpOnly` e expira em 8 horas.

O `src/proxy.ts` faz a checagem otimista das rotas `/admin`; cada página e
Server Action também valida a sessão no servidor.

## Pedidos de oração

O formulário fica em `/pedido-de-oracao` e envia para
`POST /api/pedido-de-oracao`. A rota valida com Zod, aplica limite de tentativas
e grava o pedido.

### Armazenamento local

Sem Supabase configurado, os pedidos são gravados em
`.data/prayer-requests.json`, ignorado pelo Git. Esse modo serve para
desenvolvimento: em ambientes serverless (como a Vercel), o sistema de arquivos
não é persistente.

### Supabase (recomendado em produção)

Crie a tabela no SQL Editor:

```sql
create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  whatsapp text,
  request text not null,
  wants_contact boolean not null default false,
  status text not null default 'new'
    check (status in ('new', 'read', 'prayed')),
  created_at timestamptz not null default now()
);

alter table public.prayer_requests enable row level security;
revoke all on public.prayer_requests from anon, authenticated;
```

A aplicação usa a `service_role` apenas no servidor. Nunca exponha essa chave
com o prefixo `NEXT_PUBLIC_`.

## Conteúdo

Os textos e dados do site ficam centralizados em `src/data/`:

- `site.ts` — nome, endereço, WhatsApp, redes sociais, navegação e SEO
- `about.ts` — história, missão, valores e linha do tempo
- `pastors.ts` — pastores e mensagem pastoral
- `ministries.ts` — ministérios
- `services.ts` — programação de cultos
- `events.ts` — eventos (vazio até a confirmação)
- `testimonials.ts` — testemunhos (vazio até a confirmação)
- `gallery.ts` — fotos e categorias
- `videos.ts` — vídeos do YouTube (vazio até a criação do canal)

### Pendências de conteúdo antes de publicar

- Substituir o WhatsApp de exemplo (`5598999999999` / `(98) 99999-9999`).
- Confirmar o endereço completo e atualizar o mapa.
- Confirmar horários dos cultos (atualmente “Horário a confirmar”).
- Confirmar o Instagram e adicionar Facebook/YouTube oficiais, se existirem.
- Adicionar fotos oficiais dos pastores em `src/data/pastors.ts` e os arquivos
  em `public/images/pastores/`.
- Revisar a Política de Privacidade com o responsável legal da igreja.

As fotos dos pastores usam monogramas elegantes com o aviso “Retrato em breve”
para não inventar imagens ou informações.

## Imagens

Os originais ficam em `assets/source/` (`logo1.png` e `igreja.jpeg`). Para
regenerar os ativos otimizados:

```bash
npm run images:prepare
```

O script gera logo em WebP/PNG, ícones do app, recortes da foto da igreja e as
imagens Open Graph/Twitter em `public/images/` e `src/app/`.

## Estrutura principal

```
src/
  app/
    (site)/          páginas públicas
    admin/           login e painel protegido
    api/             rota do formulário de oração
    layout.tsx       fontes, metadata global e JSON-LD
    sitemap.ts       sitemap
    robots.ts        robots
    manifest.ts      PWA manifest
  components/        layout, UI, cards, home, galeria, formulário e admin
  data/              conteúdo do site
  lib/               SEO, validação, WhatsApp, autenticação, storage e rate limit
  proxy.ts           proteção otimista de /admin
  types/             tipos compartilhados
```

## Deploy na Vercel

1. Envie o projeto para um repositório Git e importe na Vercel.
2. Configure as variáveis de ambiente da tabela acima.
3. Defina `NEXT_PUBLIC_SITE_URL` com o domínio final (ex.: `https://ipad.org.br`).
4. Configure o Supabase para persistir os pedidos de oração.
5. Faça o deploy e valide `/admin/login`, `/sitemap.xml`, `/robots.txt` e o
   envio do formulário.

## Qualidade

Antes de publicar, rode:

```bash
npm run lint
npm run typecheck
npm run build
```

O site foi construído com navegação por teclado, foco visível, textos
alternativos, contraste alto, `prefers-reduced-motion`, formulário validado e
metadados por página. Teste os principais fluxos em 320 px, 375 px, 414 px,
768 px, 1024 px e 1440 px.
