## 🧠 Dicionário de Diagnósticos (Tutor Inteligente)

A plataforma foi aprimorada com um **motor de tutoria inteligente**, fundamentado em um dicionário que contém mais de 60 mensagens de erro exclusivas (`diagnosticosErro`). Em vez de um feedback genérico (como "Resposta incorreta"), o sistema mapeia o input incorreto e entrega uma intervenção pedagógica direcionada à falha conceitual exata do aluno.

**Exemplo Prático:** Se o aluno inserir o valor `5` no campo `cat1` (referente à base do triângulo), a interface exibirá a seguinte orientação:
*"Você dividiu a largura do topo (10/2). Subtraia o fundo (6m) antes de dividir pela metade!"*

Essa arquitetura garante que a aplicação permaneça estável e ofereça suporte contextualizado, mesmo que o aluno insira dados totalmente inesperados.

---

## 🛡️ Plano de Testes e Resolução de *Edge Cases*

Abaixo estão detalhados os seis principais cenários de exceção (*edge cases*) mapeados e devidamente tratados no **Escape Room: Fundamentos Matemáticos Visuais**. O objetivo destas travas é garantir a integridade dos dados, a segurança contra vulnerabilidades e a fluidez da experiência do usuário (UX).

### Cenário 1: Inserção de Valores Negativos

* **Comportamento do Usuário:** Inserir um número negativo (ex: `-5`) em um campo que exige grandezas absolutas (como medidas de distância ou geometria).
* **Resolução do Sistema:** A função `validarEntradaNumerica` absorve o valor sem quebrar a aplicação (pois `-5` é matematicamente um número). Contudo, a lógica de negócio do enigma recusa a resposta. O campo é destacado em vermelho (feedback visual), o erro é devidamente registrado na telemetria interna (`stats.errosDetalhados`) e a execução do código continua intacta.
* **Brecha Residual:** Nenhuma. O sistema entende números matematicamente inválidos para o contexto como uma falha natural de jogo.

### Cenário 2: Valores Absurdamente Altos (*Overflow*)

* **Comportamento do Usuário:** Colar um número colossal (ex: `999999999999999999`).
* **Resolução do Sistema:** O JavaScript trata o *input* dentro do seu limite de segurança (`Number.MAX_SAFE_INTEGER`), convertendo-o para notação científica ou `Infinity`. Como a string processada jamais baterá com o gabarito estrito da função de avaliação, a resposta é imediatamente rejeitada. A interface gráfica absorve o impacto sem distorcer o layout CSS, graças ao parâmetro `max-width: 100%`.
* **Brecha Residual:** Nenhuma. O sistema absorve o estresse numérico sem causar congelamentos na *thread* principal.

### Cenário 3: Submissão de Strings Vazias ou Apenas Espaços

* **Comportamento do Usuário:** Clicar no botão "Validar" sem preencher o campo ou preenchendo-o apenas com a tecla de espaço.
* **Resolução do Sistema:** A cláusula `if (String(valor).trim() === '')` na função `validarEntradaNumerica` intercepta a ação instantaneamente. A submissão é bloqueada para não poluir o relatório JSON final com dados inúteis. Um alerta visual é acionado, instruindo o aluno a inserir um valor numérico válido.
* **Brecha Residual:** Nenhuma. A telemetria permanece limpa de falsos positivos.

### Cenário 4: Injeção de Caracteres Especiais e *Cross-Site Scripting* (XSS)

* **Comportamento do Usuário:** Tentar comprometer o sistema inserindo código malicioso (ex: `<script>alert('hack')</script>`) ou emojis nos campos.
* **Resolução do Sistema:** A aplicação conta com uma defesa em duas camadas. Nos campos matemáticos, a barreira `!isNaN(Number(valorTratado))` rejeita impiedosamente qualquer string não numérica. No campo de texto livre ("Nome do Aluno"), a função global `sanitizarHTML` converte automaticamente caracteres sensíveis (como `<` e `>`) em entidades HTML seguras (`&lt;`). Isso garante que o *payload* malicioso seja impresso no relatório final apenas como texto inofensivo, impossibilitando a execução de scripts pelo navegador.
* **Brecha Residual:** Nenhuma. O código hostil é neutralizado de forma segura e eficaz.

### Cenário 5: Divisão por Zero na Calculadora Virtual

* **Comportamento do Usuário:** Tentar realizar uma operação matemática impossível, como `5 / 0 =`, na calculadora integrada.
* **Resolução do Sistema:** Para evitar o retorno de `Infinity` (o padrão do JavaScript) e não gerar confusão cognitiva, o *Parser Recursivo Descente* da calculadora utiliza a verificação `!isFinite(r)`. Ao detectar a divisão por zero, o algoritmo lança uma exceção controlada (*Throw Error*), que é capturada pelo bloco `catch`, limpando o visor e exibindo imediatamente a mensagem amigável **"Erro"**.
* **Brecha Residual:** Nenhuma. Protege contra colapsos lógicos matemáticos.

### Cenário 6: Tentativa de Burlar as Fases (*Bypass* via Manipulação do DOM)

* **Comportamento do Usuário:** Abrir as ferramentas de desenvolvedor do navegador (F12), remover a classe CSS `hidden` do botão "Avançar" e tentar pular o enigma sem o resolver.
* **Resolução do Sistema:** A segurança do fluxo não depende da interface visual. A função responsável pela transição (`mudarTela()`) exige uma chave de validação e cruza esse dado diretamente com o estado global da aplicação em segundo plano (`stats.fases[id].concluida`). Se o sistema detectar que a fase não foi genuinamente resolvida no *backend* do JS, a navegação é abortada e um alerta de segurança é disparado no ecrã: *"⚠️ Segurança do Laboratório: Não pode forçar as portas. Conclua o puzzle matemático primeiro!"*
* **Brecha Residual:** Nenhuma. A nível de interface de usuário (UI), a aplicação encontra-se blindada contra adulterações diretas no DOM.

---

## 🧪 Testes de Bancada e Validação Funcional (QA)

Para garantir a precisão da telemetria, do cálculo dinâmico de penalidades e da geração dos relatórios, a arquitetura foi submetida a três baterias de testes de bancada focados em extremos de usabilidade.

* **Teste 1: Execução Perfeita (*Golden Master*)**
* **Cenário:** O aluno simulado acertou todos os 60 campos na primeira tentativa e concluiu as 32 etapas sem solicitar nenhuma dica.
* **Resultado:** O relatório confirmou a pontuação máxima de **96 estrelas** e atribuiu a patente suprema de **"Mestre do Escapismo 🏆"**. Este teste ratificou a estabilidade e fluidez do "caminho feliz" (*Happy Path*) da aplicação.




* **Teste 2: Uso Massivo de Dicas (Teste de Penalidade)**
* **Cenário:** Resolução de todos os enigmas sem erros de digitação nos *inputs*, porém com a solicitação extrema de todas as 32 dicas disponíveis no sistema.
* **Resultado:** O sistema contabilizou perfeitamente a penalidade por dependência assistencial. A pontuação sofreu redução (deduzindo o peso das dicas), consolidando **64 estrelas**, o que rebaixou a patente do usuário para **"Especialista Matemático"**. A telemetria registrou com exatidão a linha do tempo (cruzando os momentos em que a dica foi pedida e a submissão que ocorreu imediatamente após).




* **Teste 3: Erro Sistemático (Uma falha por campo)**
* **Cenário:** O usuário errou intencionalmente todos os 60 campos exata vez antes de inserir as respostas corretas, sem solicitar dicas.
* **Resultado:** A lógica matemática de penalidade foi validada com absoluto sucesso. O motor de cálculo deduziu a pontuação proporcional aos erros cometidos por fase, entregando o resultado final exato de **59 estrelas**. Isso confirma que o rastreamento do objeto de estado (`stats.errosDetalhados`) processa de forma íntegra a persistência do aluno em caso de erro continuado.