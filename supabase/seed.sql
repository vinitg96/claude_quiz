-- Quiz Claude Code — seed data (30 questions, 10 per difficulty)
-- Run this third, after schema.sql and policies.sql.

insert into questions (question_text, correct_answer, explanation, difficulty, topic) values
-- Iniciante
('Claude Code é instalado via npm, usando o pacote @anthropic-ai/claude-code.', true,
 'A instalação padrão é feita com "npm install -g @anthropic-ai/claude-code", que disponibiliza o comando claude no terminal.',
 'iniciante', 'Instalação'),

('Claude Code é executado exclusivamente em um navegador web, sem necessidade de instalação local.', false,
 'Claude Code é uma ferramenta de linha de comando (CLI) instalada localmente e executada diretamente no terminal do usuário.',
 'iniciante', 'CLI'),

('Basta digitar "claude" no terminal, dentro da pasta do projeto, para iniciar uma sessão interativa.', true,
 'O comando claude, executado no diretório do projeto, abre uma sessão interativa com acesso ao contexto daquela pasta.',
 'iniciante', 'Comandos básicos'),

('Claude Code funciona apenas dentro do VS Code; não existe forma de usá-lo em um terminal puro.', false,
 'Claude Code roda nativamente em qualquer terminal; integrações com editores como VS Code e JetBrains são complementares, não obrigatórias.',
 'iniciante', 'CLI'),

('O comando "/help" lista os comandos disponíveis dentro de uma sessão do Claude Code.', true,
 '"/help" exibe a lista de slash commands e atalhos disponíveis na sessão atual.',
 'iniciante', 'Comandos básicos'),

('Depois de instalado, o Claude Code funciona 100% offline, sem precisar de conexão com a internet durante o uso.', false,
 'O uso normal do Claude Code depende de comunicação com a API da Anthropic pela internet.',
 'iniciante', 'Conceitos de CLI'),

('O comando "/clear" apaga o histórico da conversa atual, reiniciando o contexto da sessão.', true,
 '"/clear" limpa o contexto acumulado da sessão, começando uma conversa nova do zero.',
 'iniciante', 'Comandos básicos'),

('Claude Code consegue apenas sugerir código em texto; ele não tem permissão para criar ou editar arquivos diretamente.', false,
 'Claude Code pode ler, criar e editar arquivos, além de executar comandos no terminal, sempre respeitando as permissões configuradas pelo usuário.',
 'iniciante', 'O que é Claude Code'),

('Claude Code foi desenvolvido pela Anthropic, a mesma empresa responsável pelos modelos de linguagem Claude.', true,
 'Claude Code é um produto oficial da Anthropic, construído para uso com os modelos Claude.',
 'iniciante', 'O que é Claude Code'),

('Para encerrar uma sessão do Claude Code é possível usar o comando "/exit" ou o atalho Ctrl+C.', true,
 'Ambas as formas encerram a sessão interativa em andamento.',
 'iniciante', 'Comandos básicos'),

-- Intermediário
('O arquivo CLAUDE.md, na raiz do repositório, é lido automaticamente pelo Claude Code para fornecer contexto sobre o projeto.', true,
 'CLAUDE.md é carregado por convenção como memória/contexto do projeto, orientando o comportamento do agente naquele repositório.',
 'intermediario', 'Configuração'),

('O arquivo settings.json pode ser usado para configurar permissões, hooks e outras preferências do Claude Code em um projeto.', true,
 'settings.json centraliza configurações como permissões, hooks e demais preferências do Claude Code.',
 'intermediario', 'Configuração'),

('Hooks permitem executar comandos automaticamente antes ou depois do uso de uma ferramenta, como nos eventos PreToolUse e PostToolUse.', true,
 'Hooks interceptam eventos do ciclo de vida do agente, como o uso de ferramentas, permitindo automações antes ou depois dessas ações.',
 'intermediario', 'Hooks'),

('Comandos slash personalizados só podem ser criados pela equipe da Anthropic; usuários não podem definir os seus próprios.', false,
 'Usuários podem criar seus próprios slash commands como arquivos Markdown dentro de .claude/commands.',
 'intermediario', 'Slash commands'),

('As permissões do Claude Code usam um modelo de listas de allow e deny para controlar quais ações o agente pode executar sem pedir confirmação.', true,
 'Regras de permissão definem o que é permitido, negado ou exige confirmação antes de ser executado.',
 'intermediario', 'Permissões'),

('Só pode existir um único settings.json, localizado na pasta do usuário (home); não é possível ter configurações específicas por projeto.', false,
 'Existem múltiplos níveis de configuração (usuário, projeto, local), incluindo um settings.json específico por projeto.',
 'intermediario', 'Configuração'),

('Um hook do tipo PreToolUse pode impedir que uma ferramenta seja executada, dependendo da lógica definida pelo usuário.', true,
 'PreToolUse roda antes da ferramenta ser executada e pode bloquear sua execução conforme a lógica configurada.',
 'intermediario', 'Hooks'),

('Comandos slash customizados precisam ser escritos em JSON; arquivos Markdown não são um formato aceito para esse fim.', false,
 'Comandos slash customizados são escritos como arquivos Markdown (.md), não em JSON.',
 'intermediario', 'Slash commands'),

('O plan mode do Claude Code executa as edições nos arquivos imediatamente, sem esperar aprovação do usuário.', false,
 'No plan mode o agente explora e planeja a solução sem aplicar mudanças, aguardando revisão e aprovação do usuário.',
 'intermediario', 'Conceitos'),

('O comando "/model" permite trocar o modelo Claude utilizado durante a sessão atual.', true,
 '"/model" permite selecionar qual modelo Claude será usado na sessão em andamento.',
 'intermediario', 'Comandos básicos'),

-- Avançado
('MCP (Model Context Protocol) é um protocolo aberto que permite ao Claude Code se conectar a ferramentas e fontes de dados externas, como bancos de dados ou APIs.', true,
 'MCP padroniza a forma como agentes como o Claude Code se conectam a ferramentas e dados externos.',
 'avancado', 'MCP'),

('Subagentes são instâncias especializadas, cada uma podendo ter seu próprio prompt de sistema, conjunto de ferramentas permitidas e contexto isolado do agente principal.', true,
 'Subagentes rodam com prompt, ferramentas e contexto próprios, isolados do agente principal.',
 'avancado', 'Subagentes'),

('O Claude Agent SDK permite construir agentes autônomos próprios reaproveitando o mesmo runtime usado internamente pelo Claude Code, com SDKs oficiais como TypeScript e Python.', true,
 'O Agent SDK expõe o mesmo agent loop usado pelo Claude Code para uso programático, com SDKs oficiais em TypeScript e Python.',
 'avancado', 'Agent SDK'),

('Servidores MCP só podem rodar localmente via stdio; o protocolo não oferece suporte a servidores remotos via HTTP/SSE.', false,
 'MCP também suporta servidores remotos via HTTP/SSE, além dos servidores locais via stdio.',
 'avancado', 'MCP'),

('O modo headless ("claude -p") permite executar o Claude Code de forma não interativa, útil em scripts e automações.', true,
 'A flag -p (print) executa uma tarefa e retorna a resposta sem abrir uma sessão interativa, sendo ideal para scripts.',
 'avancado', 'Automação'),

('Não é possível integrar o Claude Code a pipelines de CI/CD; ele foi projetado apenas para uso manual e interativo no terminal.', false,
 'Existem integrações oficiais, como GitHub Actions, que permitem usar o Claude Code em pipelines de CI/CD, por exemplo para revisão automática de PRs.',
 'avancado', 'CI/CD'),

('Subagentes compartilham obrigatoriamente o mesmo histórico de conversa do agente principal, sem qualquer isolamento de contexto.', false,
 'Cada subagente roda com seu próprio contexto isolado, preservando a janela de contexto do agente principal.',
 'avancado', 'Subagentes'),

('O Agent SDK obriga o desenvolvedor a reimplementar do zero toda a lógica de uso de ferramentas, sem reaproveitar nada do Claude Code.', false,
 'O SDK expõe o mesmo agent loop/runtime usado pelo Claude Code, incluindo gerenciamento de contexto e uso de ferramentas.',
 'avancado', 'Agent SDK'),

('Um servidor MCP pode expor tanto tools (ferramentas) quanto resources (recursos/dados) para serem usados por um cliente como o Claude Code.', true,
 'MCP define tools e resources como primitivas que um servidor pode expor a um cliente.',
 'avancado', 'MCP'),

('Hooks e permissões definidos em settings.json podem ser combinados com o modo headless para criar automações mais seguras e auditáveis em pipelines de CI/CD.', true,
 'Combinar hooks e permissões com o modo headless é uma base recomendada para automações controladas e auditáveis.',
 'avancado', 'Automação');
