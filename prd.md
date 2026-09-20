# PRD — Quiz Claude Code (Verdadeiro ou Falso)

## 1. Visão Geral

Aplicação web de quiz interativo, no formato **Verdadeiro ou Falso**, com perguntas sobre **Claude Code** (a CLI/ferramenta da Anthropic), cobrindo do nível iniciante ao avançado.

**Propósito de negócio:** projeto de **portfólio / demonstração técnica**, mostrando capacidade full-stack (frontend React + backend/BaaS Supabase), boas práticas de UI/UX, modelagem de dados e deploy.

## 2. Objetivos

- Demonstrar domínio técnico em desenvolvimento full-stack moderno (React + Supabase).
- Entregar uma experiência de quiz fluida, divertida e visualmente polida.
- Servir como vitrine pública, compartilhável, com ranking global para gerar engajamento.
- Ser um material de estudo indireto sobre Claude Code (conteúdo educativo correto e atualizado).

## 3. Público-alvo

- Recrutadores e revisores técnicos avaliando o portfólio do autor.
- Desenvolvedores curiosos sobre Claude Code que queiram testar seus conhecimentos.
- O próprio autor, como ferramenta de fixação de conceitos.

## 4. Escopo do Produto (MVP)

### 4.1 Fluxo principal do usuário

1. **Tela inicial**: usuário informa um **nickname** (sem senha, sem cadastro) e escolhe o **nível de dificuldade** (Iniciante, Intermediário, Avançado) ou modo "Misto" (todas as dificuldades).
2. **Tela de quiz**: perguntas verdadeiro/falso apresentadas uma a uma.
   - Cada pergunta tem um **cronômetro** (ex: 15-20s por pergunta).
   - Usuário responde clicando em "Verdadeiro" ou "Falso".
   - **Feedback imediato** após cada resposta: indica se acertou/errou, mostra a resposta correta e uma breve explicação/justificativa.
   - Pontuação é acumulada (ex: pontos base por acerto + bônus por velocidade de resposta).
3. **Tela de resultado**: ao final do quiz, exibe pontuação total, número de acertos/erros, tempo total, e salva o resultado no Supabase.
4. **Tela de ranking**: leaderboard global (top N jogadores por pontuação) + histórico pessoal do nickname usado (últimas tentativas daquele usuário, mesmo sem login, via localStorage + Supabase).

### 4.2 Funcionalidades incluídas no MVP

- [x] Níveis de dificuldade (iniciante / intermediário / avançado / misto)
- [x] Pontuação com feedback imediato por pergunta
- [x] Cronômetro por pergunta
- [x] Ranking global público (Supabase) + histórico local do usuário
- [x] Identificação leve via nickname (sem senha/autenticação)
- [x] Banco de ~30 perguntas (10 por nível) versionado como seed data

### 4.3 Fora de escopo (MVP)

- Autenticação real (login/senha, OAuth)
- Edição de perguntas via interface administrativa (CRUD de perguntas é feito diretamente no banco/seed, não por UI)
- Multiplayer em tempo real
- Internacionalização (i18n) — conteúdo apenas em português (Brasil)
- Modo mobile app nativo (apenas web responsivo)

## 5. Requisitos Funcionais

| ID | Requisito |
|----|-----------|
| RF01 | O sistema deve permitir que o usuário informe um nickname antes de iniciar o quiz. |
| RF02 | O sistema deve permitir a escolha de nível de dificuldade: Iniciante, Intermediário, Avançado ou Misto. |
| RF03 | O sistema deve apresentar perguntas de verdadeiro/falso uma de cada vez. |
| RF04 | Cada pergunta deve ter um cronômetro visível (ex: 15-20 segundos); se o tempo esgotar, a resposta é considerada errada automaticamente. |
| RF05 | Após cada resposta, o sistema deve exibir feedback imediato (correto/incorreto) com a explicação da resposta certa. |
| RF06 | O sistema deve calcular e acumular pontuação ao longo do quiz (acerto = pontos base; bônus proporcional ao tempo restante). |
| RF07 | Ao final do quiz, o sistema deve exibir um resumo com pontuação total, acertos, erros e tempo total. |
| RF08 | O sistema deve persistir o resultado da partida (nickname, pontuação, nível, data) no banco de dados (Supabase). |
| RF09 | O sistema deve exibir um ranking global com os melhores resultados (top 10 ou top 20). |
| RF10 | O sistema deve exibir o histórico de tentativas do nickname atual (via correlação local + Supabase). |
| RF11 | O banco de perguntas deve conter ao menos 30 perguntas, distribuídas em 10 por nível de dificuldade, cobrindo tópicos variados sobre Claude Code. |

## 6. Requisitos Não Funcionais

| ID | Requisito |
|----|-----------|
| RNF01 | Aplicação deve ser responsiva (mobile-first ou ao menos totalmente utilizável em mobile e desktop). |
| RNF02 | Tempo de carregamento inicial da página deve ser inferior a 3 segundos em conexão padrão. |
| RNF03 | Interface deve seguir boas práticas de acessibilidade básica (contraste, foco de teclado, labels). |
| RNF04 | Código deve ser organizado em componentes reutilizáveis, com separação clara entre lógica de dados (Supabase) e apresentação (UI). |
| RNF05 | Credenciais do Supabase (chaves de API) não devem ser expostas de forma insegura; usar variáveis de ambiente e Row Level Security (RLS) adequado. |
| RNF06 | O projeto deve ser publicável em hospedagem estática/serverless (ex: Vercel, Netlify) com deploy simples. |

## 7. Especificação Técnica

### 7.1 Stack

- **Frontend**: React + Vite (SPA), com React Router para navegação entre telas (Home → Quiz → Resultado → Ranking).
- **Estilização**: CSS Modules ou Tailwind CSS (a definir na implementação — recomendação: Tailwind para velocidade).
- **Backend/BaaS**: Supabase (Postgres gerenciado + API REST/JS SDK automática).
- **Hospedagem sugerida**: Vercel ou Netlify para o frontend; Supabase cloud para o banco.

### 7.2 Modelagem de dados (Supabase / Postgres)

**Tabela `questions`**
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid (PK) | Identificador único |
| question_text | text | Enunciado da pergunta |
| correct_answer | boolean | `true` (Verdadeiro) ou `false` (Falso) |
| explanation | text | Explicação exibida após resposta |
| difficulty | text (enum: `iniciante`, `intermediario`, `avancado`) | Nível da pergunta |
| topic | text | Tópico/categoria (ex: "CLI", "MCP", "Hooks", "Skills") |
| created_at | timestamptz | Data de criação |

**Tabela `game_sessions`** (resultados de partidas)
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid (PK) | Identificador único da sessão |
| nickname | text | Apelido informado pelo jogador |
| difficulty | text | Nível jogado (ou "misto") |
| score | integer | Pontuação total obtida |
| correct_count | integer | Número de acertos |
| total_questions | integer | Total de perguntas respondidas |
| duration_seconds | integer | Tempo total da partida |
| played_at | timestamptz | Data/hora da partida |

**RLS (Row Level Security)**:
- `questions`: leitura pública (`SELECT`), sem escrita via cliente (inserções via seed/admin apenas).
- `game_sessions`: inserção pública (`INSERT`) permitida para qualquer usuário anônimo; leitura pública (`SELECT`) para exibir ranking; sem `UPDATE`/`DELETE` público.

### 7.3 Arquitetura de telas (rotas)

- `/` — Home (nickname + seleção de dificuldade)
- `/quiz` — Tela do quiz em andamento
- `/resultado` — Resumo da partida finalizada
- `/ranking` — Leaderboard global + histórico do nickname atual

### 7.4 Regras de pontuação (sugestão)

- Acerto: **+100 pontos base**
- Bônus de velocidade: até **+50 pontos** proporcional ao tempo restante no cronômetro (ex: `bônus = round(50 * tempo_restante / tempo_total)`)
- Erro ou tempo esgotado: **0 pontos** na pergunta
- Pontuação final = soma de todas as perguntas

### 7.5 Seed de perguntas

O PRD não lista as 30 perguntas em detalhe — elas devem ser geradas pelo Claude Code como **seed data** (arquivo SQL de inserção ou script de seed via Supabase JS), cobrindo tópicos como:
- **Iniciante**: instalação, comandos básicos, o que é Claude Code, conceitos de CLI.
- **Intermediário**: slash commands, hooks, arquivos de configuração (CLAUDE.md, settings.json), permissões.
- **Avançado**: MCP servers, subagentes, Agent SDK, automações, integração com CI/CD.

Cada pergunta deve ter enunciado claro, resposta (verdadeiro/falso) tecnicamente correta e explicação curta e precisa.

## 8. Métricas de Sucesso

- Quiz funcional end-to-end (nickname → perguntas → resultado → ranking) sem bugs críticos.
- Ranking e histórico persistindo corretamente no Supabase.
- Deploy público acessível via URL, pronto para ser incluído em portfólio/LinkedIn.
- Código organizado e legível, servindo como amostra de qualidade técnica.

## 9. Riscos e Considerações

- **Conteúdo desatualizado**: Claude Code evolui rapidamente; perguntas devem citar a versão/período de referência quando relevante, evitando afirmações que fiquem obsoletas rapidamente.
- **Abuso do ranking**: sem autenticação, é possível enviar resultados falsos via API diretamente. Mitigação: aceitar como limitação conhecida do MVP (não é um sistema competitivo sério, é portfólio).
- **Exposição de chaves Supabase**: usar apenas a chave `anon` pública no frontend, nunca a `service_role`.

## 10. Próximos Passos (pós-MVP, fora de escopo inicial)

- Painel administrativo para gerenciar perguntas via UI.
- Compartilhamento de resultado em redes sociais.
- Modo "desafio diário" com perguntas fixas por dia.
- Suporte a múltiplos idiomas.
