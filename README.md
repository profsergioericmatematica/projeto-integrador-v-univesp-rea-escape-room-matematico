## 🧩 Escape Room Matemático

Recurso Educacional Aberto (REA) focado na Educação Baseada em Evidências. Projeto Integrador V | Universidade Virtual do Estado de São Paulo - UNIVESP (2026)

## 📖 Sobre o Projeto

Este projeto consiste em uma intervenção pedagógica digital gamificada (Escape Room) desenvolvida para diagnosticar e sanar defasagens em habilidades matemáticas essenciais, com base nos descritores da Prova Paulista.

O aluno assume o papel de um prisioneiro em um laboratório de matemática pura. Guiado por uma Inteligência Artificial (Tutor Virtual), ele precisa resolver enigmas geométricos e algébricos para escapar. Ao invés de premiar o simples acerto mecânico, o sistema exige e avalia a compreensão da essência visual e lógica dos números.

## ✨ Principais Funcionalidades

📊 Relatório Pedagógico (Learning Analytics): O sistema capta a telemetria completa da sessão (tempo, acertos, erros específicos por campo, dicas utilizadas e linha do tempo de eventos). Ao final, gera um relatório textual () local — sem envio de dados para servidores, garantindo total adequação à LGPD..txt

🧮 Calculadora Virtual Segura: Uma calculadora in-app construída com um Recursive Descent Parser personalizado, protegida contra injeções e falhas lógicas (como a divisão por zero).

👁️ Acessibilidade e UX (WCAG 2.1): Suporte a preferência de movimento reduzido, touch targets ampliados (mínimo de 48px) e Temas Claro/Escuro rigorosamente testados para alto contraste (AA/AAA).

📝 Diário de Bordo (Metacognição): Antes de gerar o relatório, o aluno é instigado a responder três perguntas sobre seu próprio processo de raciocínio, promovendo o fechamento cognitivo.

## 📚 Matriz Curricular (BNCC)
O jogo percorre uma progressão transdisciplinar focada no Ensino Médio:

Fase 1 e 2: Teorema de Pitágoras, triângulos em circunferências e simplificação de radicais (EM13MAT308).

Fase 3: O Finito e o Infinito (conversão de dízimas periódicas e frações) (EM13MAT101).

Fase 4: Potências fracionárias, dízimas mistas e expoentes negativos (EM13MAT304).

Fase 5: Números irracionais e posicionamento na reta numérica real (EM13MAT101).

Fase 6: Geometria 3D, volume do cubo e tradução universal de grandezas (EM13MAT309).

Fase 7: Operações com grandezas de tempo e lógica modular de base 60 e 24 (EM13MAT101).

Fase 8 (Secreta): Sequência de Fibonacci e Proporção Áurea (EM13MAT315, EM13MAT502).

## 🧠 Dicionário de Diagnósticos (Tutor Inteligente)

A plataforma foi construída com um motor de tutoria inteligente, fundamentado em um dicionário que contém mais de 60 mensagens de erro exclusivas (). Em vez de um feedback genérico ("Resposta incorreta"), o sistema mapeia o input incorreto e entrega uma intervenção pedagógica direcionada à falha conceitual exata do aluno.diagnosticosErro

Exemplo Prático: Se o aluno inserir o valor  no campo da base do triângulo (quando deveria ser ), a interface exibirá: "Você dividiu a largura do topo (10/2). Subtraia o fundo (6m) antes de dividir pela metade!". Isso garante que a aplicação permaneça ofereça suporte contextualizado, guiando o aluno construtivamente.54

## 🛡️ Plano de Testes e Resolução de Edge Cases

Para garantir a estabilidade da aplicação em ambiente escolar, foram mapeados e tratados os 6 principais cenários de exceção (casos limite).

Cenário 1: Inserção de Valores Negativos
Ação: Inserir um número negativo (ex: ) em um campo geométrico.-5

Resolução: A função absorve o valor sem quebrar a aplicação. A lógica de negócio recusa a resposta, o campo é destacado em vermelho e a falha é registrada na telemetria (). A arquitetura trata números inválidos como falha natural de jogo.validarEntradaNumericastats.errosDetalhados

Cenário 2: Valores Absurdamente Altos (Overflow)
Ação: Colar um número colossal (ex: ).999999999999999999

Resolução: O JavaScript trata o input dentro de seu limite de segurança. Como a string gerada não corresponde ao gabarito, a resposta é rejeitada sem distorcer o layout CSS (protegido por ). Não há travamento do DOM.max-width

Cenário 3: Submissão de Strings Vazias ou Apenas Espaços
Ação: Clicar em "Validar" com o campo em branco ou preenchido com espaços.

Resolução: A verificação bloqueia a submissão instantaneamente, prevenindo a inserção de "lixo" no relatório JSON final. Um alerta visual instrui o aluno a inserir um valor válido.trim() === ''

Cenário 4: Injeção de Caracteres Especiais e XSS
Ação: Tentar injetar código (ex: ).<script>alert('hack')</script>

Resolução: Dupla camada. O rejeita strings em campos numéricos. No campo textual ("Nome"), a função global converte tags HTML em entidades seguras (). O código malicioso é inofensivamente impresso no relatório final, impossibilitando sua execução.!isNaNsanitizarHTML&lt;

Cenário 5: Divisão por Zero na Calculadora Virtual
Ação: Tentar calcular na calculadora do sistema.5 / 0 =

Resolução: O Parser personalizado utiliza a verificação . Ao detectar divisão por zero, lança uma exceção controlada, capturada pelo bloco , exibindo a mensagem "Erro" no visor em vez de quebrar a thread com um retorno .!isFinite(r)catchInfinity

Cenário 6: Burlar as Fases via Manipulação do DOM
Ação: Remover a classe CSS via DevTools (F12) para forçar o avanço.hidden

Resolução: A segurança não depende da interface. A função cruza o evento com o estado global (). Se a fase não foi genuinamente resolvida, a navegação é abortada e um alerta de segurança é disparado.mudarTela()stats.fases[id].concluida

## 🧪 Testes de Bancada e Validação Funcional (QA)

A arquitetura de gamificação (Estrelas, Patentes e Penalidades) foi submetida a três baterias estritas de QA manual para validar a telemetria do professor.

Teste 1: Execução Perfeita (Mestre Dourado)

Cenário: O aluno simulado acertou todos os 60 campos na primeira tentativa sem solicitar dicas.

Resultado: O relatório confirmou a pontuação de 96 estrelas e a patente de "Mestre do Escapismo 🏆", ratificando o Happy Path.

Teste 2: Uso Massivo de Dicas (Teste de Penalidade)

Cenário: Resolução sem erros de digitação, porém solicitando todas as 32 dicas do sistema.

Resultado: O sistema aplicou a penalidade perfeitamente, consolidando 64 estrelas e rebaixando a patente para "Especialista Matemático". A linha do tempo rastreou com exatidão a intercalação entre pedidos de dica e acertos.

Teste 3: Erro Sistemático (Uma falha por campo)

Cenário: O usuário errou intencionalmente cada um dos 60 campos exata vez antes de acertar, sem usar dicas.

Resultado: O motor de cálculo deduziu corretamente as penalidades, entregando 59 estrelas, comprovando a estabilidade do array de persistência de erros.

## 🚀 Como Executar (Instalação)

O REA foi desenhado para ser universalmente acessível e resiliente. Não exige build steps (Node.js, Webpack, etc.) ou servidores web, garantindo execução offline em laboratórios escolares com infraestrutura restrita.

Faça o download ou clone este repositório.

Extraia os arquivos para qualquer massa.

Dê um duplo clique no arquivo .index.html

O projeto abrirá nativamente no seu navegador padrão.

## 📂 Estrutura de Diretórios

Texto simples
/
├── index.html        # Estrutura principal da interface, modais e SVGs inline.
├── style/
│   └── style.css     # Estilos de interface, acessibilidade (WCAG), temas e animações.
└── script/
    ├── dados.js      # Base de dados: Dicionário de erros cognitivos e dicas.
    └── script.js     # Motor lógico: Validações, parser matemático e telemetria (Learning Analytics).

## 👥 Equipe de Desenvolvimento (UNIVESP)

Antonio Antunes Júnior

Giovani Machado de Lima

Lilian Maria de Souza Lino

Priscilla Santiago Zamorra

Renata Helena Arantes e Oliveira

Rodrigo Aires de Medeiros Correa

Sergio Eric Reis de Oliveira

Vitor Correa Uberti

## 📜 Licença
Este projeto está licenciado sob a MIT License - veja o arquivo para mais detalhes. O uso, modificação e distribuição em ambientes educacionais e de pesquisa são altamente encorajados.LICENSE