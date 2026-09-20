# Quiz Claude Code — Verdadeiro ou Falso

Quiz interativo de Verdadeiro ou Falso sobre o Claude Code (a CLI da Anthropic), com níveis de dificuldade, cronômetro por pergunta, pontuação com bônus de velocidade e ranking global. Projeto de portfólio full-stack (React + Supabase). Veja `prd.md` para a especificação completa do produto.

## Stack

- React + Vite (SPA) + React Router
- Tailwind CSS
- Supabase (Postgres + REST/JS SDK), sem backend próprio

## Pré-requisitos

- Node.js 20+ e npm

## 1. Instalar dependências

```bash
npm install
```

## 2. Configurar o Supabase

O projeto Supabase precisa ser criado manualmente (não existe um ainda):

1. Crie uma conta e um projeto gratuito em [supabase.com](https://supabase.com).
2. No projeto criado, abra o **SQL Editor** e rode, **nesta ordem**:
   1. `supabase/schema.sql` — cria as tabelas `questions` e `game_sessions`.
   2. `supabase/policies.sql` — habilita RLS e as políticas de acesso público.
   3. `supabase/seed.sql` — popula as 30 perguntas do quiz.
3. Em **Project Settings → API**, copie a **Project URL** e a chave **anon public** (nunca a `service_role`).
4. Copie o arquivo de exemplo e preencha as variáveis:
   ```bash
   cp .env.example .env
   ```
   ```
   VITE_SUPABASE_URL=<sua-project-url>
   VITE_SUPABASE_ANON_KEY=<sua-anon-key>
   ```

## 3. Rodar em desenvolvimento

```bash
npm run dev
```

## 4. Build de produção

```bash
npm run build
```

Gera os arquivos estáticos em `dist/`.

## Outros comandos

```bash
npm run lint     # oxlint
npm run preview  # serve o build de dist/ localmente
```

## Deploy

Hospedagem recomendada: [Vercel](https://vercel.com) ou [Netlify](https://netlify.com) para o frontend (o Supabase já roda na nuvem deles).

1. Importe o repositório no Vercel/Netlify.
2. Build command: `npm run build`; output directory: `dist`.
3. Configure as mesmas variáveis de ambiente (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) no dashboard da hospedagem.
4. Como é uma SPA com rotas client-side, o rewrite para `index.html` já está configurado neste repositório (`vercel.json` para Vercel, `public/_redirects` para Netlify) — não é necessário configurar manualmente.

## Limitações conhecidas do MVP

- Sem autenticação: identidade é só um nickname informado pelo usuário, sem senha.
- O ranking pode ser manipulado via chamadas diretas à API do Supabase, já que não há autenticação nem validação server-side além das constraints do banco. Aceito como limitação conhecida — este é um projeto de portfólio, não um sistema competitivo.
- O histórico pessoal é correlacionado por string de nickname (via localStorage), não por identidade real.
