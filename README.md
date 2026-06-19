# 🧩 REA: Escape Room Matemático – Fundamentos Visuais

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue)
![Tecnologias](https://img.shields.io/badge/Tecnologias-HTML5%20|%20CSS3%20|%20Vanilla%20JS-orange)
![Acessibilidade](https://img.shields.io/badge/Acessibilidade-WCAG%202.1%20AA-brightgreen)

---

## 🎯 O que é este projeto?

Este é um **Recurso Educacional Aberto (REA)** interativo que utiliza a mecânica de *Escape Room* para ensinar e diagnosticar habilidades matemáticas essenciais. Foi desenvolvido para o **Projeto Integrador V** da UNIVESP, com base nos descritores de defasagem da **Prova Paulista (1º Bimestre de 2026)**.

O aluno assume o papel de um prisioneiro em um laboratório de matemática pura e, guiado por uma assistente I.A., precisa resolver uma série de enigmas geométricos e algébricos.

**O grande diferencial (Data-Driven):** O sistema atua como uma ferramenta diagnóstica passiva. Ele registra cada tentativa, erro, dica utilizada e tempo de resposta. Ao final, gera um **relatório completo em formato `.txt`** para o professor, permitindo uma análise granular das dificuldades metacognitivas de cada aluno.

---

## 📁 Estrutura de Diretórios

O projeto foi organizado de forma modular para facilitar a manutenção e o deploy estático:

```text
/ (Raiz)
├── index.html                  # Estrutura semântica e interface do Escape Room
├── README.md                   # Documentação do projeto
├── LICENSE                     # Licença MIT
├── testes_edge_cases.md        # Documentação de testes de resiliência e segurança
│
├── script/
│   └── script.js               # Lógica de jogo, validações, parser e geração de relatórios
│
├── style/
│   └── style.css               # Estilização responsiva e regras de acessibilidade visual
│
└── testes de bancada/          # Exemplos reais de relatórios gerados pelo sistema
    ├── Relatorio_Teste_de_Bancada_número_1...txt (100% acertos / sem dicas)
    ├── Relatorio_Teste_de_Bancada_número_2...txt (Uso de todas as dicas)
    └── Relatorio_Teste_de_Bancada_número_3...txt (1 erro em cada campo)
```

## 🚀 Funcionalidades e Maturidade Técnica

## 🧠 Motor Pedagógico

Jornada progressiva: 8 fases e 32 etapas de validação com dificuldade crescente.

Sistema de Estrelas e Patentes: Penaliza o uso indiscriminado de dicas e erros sucessivos, classificando o aluno de Prisioneiro dos Números até Mestre do Escapismo.

Diário de Bordo Metacognitivo: O aluno é convidado a registrar o seu raciocínio final. Ao salvar, a interface é selada visualmente (🔒).

🌟 Como as Estrelas são calculadas?

O jogo possui 32 etapas de validação no total. Cada etapa pode render até 3 estrelas, o que significa que a pontuação máxima do laboratório é de 96 estrelas. A distribuição por etapa funciona assim:

| Desempenho | Estrelas | Condição |
| :--- | :--- | :--- |
| ⭐⭐⭐ Excelente | 3 estrelas | 0 erros e 0 dicas (acertou de primeira) |
| ⭐⭐ Regular | 2 estrelas | Soma de erros + dicas = 1 ou 2 |
| ⭐ Insuficiente | 1 estrela | Soma de erros + dicas ≥ 3 |

🎖️ As 5 Patentes de Fuga
A soma das estrelas de todas as etapas no final do jogo define a patente do aluno. Cada patente reflete um nível de maturidade cognitiva e autonomia matemática:

1. 🪦 Prisioneiro dos Números (0 a 19 Estrelas)
   
Diagnóstico: O aluno apresentou dependência quase total das dicas e cometeu múltiplos erros por etapa. Reflete uma grave defasagem nos conceitos fundamentais (como operações básicas e compreensão visual da geometria).

Ação Pedagógica: Requer intervenção direta e retomada da base matemática. O aluno ainda está "preso" na decoreba e não consegue visualizar a lógica.

2. 🏃 Aprendiz em Fuga (20 a 38 Estrelas)
   
Diagnóstico: O aluno conseguiu compreender a dinâmica em algumas fases mais fáceis, mas ainda tropeça fortemente quando os conceitos exigem abstração (como frações e raízes não exatas). Utilizou muitas dicas para conseguir avançar.

Ação Pedagógica: Precisa de reforço na tradução da linguagem matemática para o mundo real. Entende a teoria superficialmente, mas falha na aplicação.

3. 🧩 Sobrevivente Lógico (39 a 57 Estrelas)
   
Diagnóstico: É o nível intermediário. O aluno sobreviveu ao laboratório com um misto de acertos autônomos e alguns escorregões (especialmente nas fases 3D ou de Tempo). Sabe se virar, mas a sua precisão ainda oscila.

Ação Pedagógica: O foco deve ser em lapidar a atenção aos detalhes (sinais, leitura atenta das unidades de medida) e reduzir a impulsividade ao validar as respostas.

4. 🧪 Especialista Matemático (58 a 76 Estrelas)
   
Diagnóstico: Um excelente desempenho. O aluno tem grande clareza espacial e lógica, resolvendo a maioria dos enigmas de primeira. Os erros cometidos foram pontuais ou por distração, e o uso de dicas foi estratégico e raro.

Ação Pedagógica: Aluno autônomo. Pode ser estimulado com desafios maiores ou atuar como monitor/tutor para auxiliar colegas das patentes iniciais.

5. 🏆 Mestre do Escapismo (77 a 96 Estrelas)
   
Diagnóstico: A elite do laboratório. O aluno dominou completamente a linguagem dos números, demonstrando precisão cirúrgica, raciocínio rápido e zero (ou quase zero) dependência de dicas. Visualiza perfeitamente a matemática no espaço.

Ação Pedagógica: Alcançou o topo da taxonomia proposta. Como recompensa extra no sistema, apenas alunos que gabaritam o jogo de forma quase perfeita costumam decifrar o padrão sem ajudas para aceder à Sala do Arquiteto (Fase 8).

Nota ao Professor: Esta estrutura, além de engajar o aluno, dá ao professor uma escala muito clara de "temperatura" sobre a turma, permitindo intervenções personalizadas com base em dados concretos.

## 🛡️ Segurança e Resiliência (Edge Cases)

Parser Matemático Customizado: A calculadora virtual não utiliza as funções perigosas eval() ou new Function(). Foi implementado um Recursive Descent Parser que garante o cálculo correto da precedência matemática e elimina vetores de ataque (RCE).

Proteção Anti-Bypass: O avanço de fases é validado duplamente no Front-end, impedindo que alunos usem as ferramentas de desenvolvedor (F12) para forçar botões ocultos.

Sanitização de Dados (XSS): Entradas de texto livres (como o nome do aluno) são higienizadas, convertendo tags HTML em texto inofensivo antes da geração dos relatórios.

(Mais detalhes no arquivo testes_edge_cases.md).

## ♿ Acessibilidade (WCAG 2.1)

Leitores de Tela: Uso de aria-labels, aria-describedby interligando inputs aos enunciados, e SVGs descritos textualmente nos bastidores (<desc>).

Navegação por Teclado: Implementação de focus-visible para destacar campos ativados via Tab (outline acessível).

Sensibilidade ao Movimento: Uso da media query prefers-reduced-motion para desativar animações automáticas em utilizadores com distúrbios vestibulares.

Alto Contraste: Tema claro/escuro nativo com taxas de contraste validadas para dislexia e fadiga visual.

## 📚 Trilha de Conhecimento e Detalhamento das Fases

O laboratório está estruturado para quebrar a mecânica da memorização "marrada", obrigando o aluno a observar a "forma geométrica" da matemática.

## 🌊 Fase 1: Dissecando a Geometria (O Canal e a Tirolesa)

O que é ensinado na fase: A fundação visual do Teorema de Pitágoras, a decomposição em fatores primos, e métodos de aproximação linear de números irracionais.

Etapa 1 (Dedução Espacial e Pitágoras): Como ensinado: O aluno deduz catetos ocultos olhando para a simetria de um canal trapezoidal. Ensina-se que "elevar ao quadrado" é literalmente calcular a área de um quadrado desenhado naquele lado.

Etapa 2 (Simplificação Algébrica): Como ensinado: Através da fatoração animada do número 20. O sistema ensina a "Regra do Passe Livre" (raízes quadradas anulam expoentes quadrados). Pares saem multiplicando, solitários ficam retidos.

Etapa 3 (Aproximação Linear): Como ensinado: O aluno monta uma fórmula com frações que busca a "distância" entre dois quadrados perfeitos exatos vizinhos.

Etapa 4 (O Desafio da Tirolesa): Como ensinado: O aluno aplica todo o ciclo (achar catetos subtraindo torres, elevar, simplificar e aproximar) autonomamente.

## 📐 Fase 2: Triângulos e Circunferência

O que é ensinado na fase: A aplicação do Teorema de Pitágoras sem guias passo a passo, e a lei geométrica do triângulo retângulo inscrito no círculo.

Etapa 1 (Triângulo Puro): Como ensinado: Localização visual dos catetos através do símbolo de 90 graus (o "Esquadro"). O aluno aplica a soma das áreas.

Etapa 2 (O Diâmetro Inquebrável): Como ensinado: O triângulo está inscrito num círculo. Prova-se que a hipotenusa atravessa perfeitamente o centro, convertendo-se no Diâmetro total.

Etapa 3 (O Raio como Divisão Segura): Como ensinado: Ao dividir o Diâmetro simplificado por 2 para achar o Raio, ensina-se algebricamente que divisores externos só afetam multiplicadores externos (as "caixas"), e não o que está confinado dentro da raiz.

## 📏 Fase 3: O Finito e o Infinito

O que é ensinado na fase: A transformação mecânica de casas decimais em frações (com limites ou dízimas).

Etapa 1 (Reconhecimento de Padrão): Como ensinado: Decimais exatos operam em base 10 (ou potências de 10). Dízimas infinitas repetitivas ancoram-se obrigatoriamente em divisores com a base 9.

Etapa 2 (Projeto do Marceneiro): Como ensinado: Pede o cálculo de Área misturando um inteiro e uma dízima. Demonstra o padrão do cancelamento em cruz: o "9" que multiplica o comprimento anula o "9" da base da largura fracionada.

## ⚡ Fase 4: Potências e Dízimas Mistas

O que é ensinado na fase: Operações matemáticas combinadas de alto nível e desmistificação dos "Sustos Visuais" (expoentes esquisitos).

Etapa 1 (Dízima Mista): Como ensinado: Transforma-se 1,777... desdobrando-o na junção de um inteiro exato (9/9) com o "eco" decimal (7/9), gerando a fração 16/9.

Etapa 2 (Expoente Fracionário): Como ensinado: Expoente "0,5" é mecanicamente desmascarado como a tradicional raiz quadrada aplicada nos dois andares da fração.

Etapa 3 (Expoente Negativo): Como ensinado: Aborda o conceito do "Espelho". O sinal negativo inverte o numerador e denominador; em seguida, a potência ao quadrado expande a área.

Etapa 4 (Corte em Diagonais): Como ensinado: Ao multiplicar m × n, o aluno é incentivado a não realizar o cálculo enorme, mas usar a visão (cancelamento de andares opostos) e encontrar a resposta limpa instantaneamente.

## 🎯 Fase 5: Cercando o Irracional

O que é ensinado na fase: A exploração territorial dos números que quebram, o tratamento da raiz de 180, e o nivelamento monetário em reta numérica.

Etapa 1 (As Fronteiras): Como ensinado: Para entender raízes soltas, o aluno investiga na calculadora quais vizinhos possuem áreas exatas (169 e 196), enclausurando a resposta.

Etapa 2 (Passe Livre Composto): Como ensinado: Na simplificação do 180, ensina-se que múltiplos números podem sair da raiz simultaneamente. Ao saírem, eles fundem-se por multiplicação externa.

Etapa 3 (A Régua Decimal): Como ensinado: Para posicionar raízes irracionais e frações grotescas (193/90) em uma fita geométrica, traduz-se todos os valores bizarros para um referencial monetário comum (decimais na calculadora).

## 📦 Fase 6: Geometria 3D e A Sobra da Fita

O que é ensinado na fase: Operações volumétricas de espaço, propriedades estruturais das arestas e consolidação de subtrações consecutivas.

Etapa 1 (O Volume Reverso): Como ensinado: Diferente das áreas 2D (Quadrado), a expansão tridimensional gerada pelo volume exige raiz cúbica (multiplicação de três eixos).

Etapa 2 (Visão Espacial - Arame): Como ensinado: Imaginar o cubo transparente como a estrutura da "sua sala" (4 no teto, 4 no piso, 4 colunas verticais), evitando esquecer vigas durante o contorno do arame.

Etapa 3 (Nivelamento Físico): Como ensinado: O aluno transforma pedaços soltos descritos de formas absurdas (√144, √(9/4), 3/4) para decimais universais antes de lidar com uma subtração na obra civil.

Etapa 4 (Cálculo de Retalhos): Como ensinado: Em vez de descontar fita por fita de forma arriscada, consolida-se todo o "lixo" gerado em uma soma única, descontando-o uma única vez da origem bruta.

## ⏱️ Fase 7: A Estrutura do Tempo

O que é ensinado na fase: Trabalhar fora do sistema decimal confortável, respeitando as bases 60 e o relógio cíclico 24h.

Etapa 1 (Ação Contínua): Como ensinado: Consolidar filmes e intervalos em um grande bloco de vida crua, traduzido em minutos absolutos.

Etapa 2 (A Caixa de Ovos): Como ensinado: Dividindo os minutos, extraem-se os blocos completos de "embalagens de 60" (Horas fechadas), enquanto a fração de divisão que sobra forma os minutos residuais.

Etapa 3 (A Catraca): Como ensinado: Somar as horas calculadas ao horário inicial da noite e lidar com o transbordo ("overflow") quando o ponteiro supera a marca civil das 24 horas, zerando o contador do dia.

## 🌀 Fase 8 (Secreta): A Sala do Arquiteto

O que é ensinado na fase: A observação da lei áurea da biologia. Acessível apenas para os mestres lógicos.

Etapa Única: Como ensinado: Através do desenho de uma espiral áurea baseada em quadrados expansivos, o aluno prova ser um observador nato ao perceber a Sequência de Fibonacci (cada termo é forjado pela união dos dois termos antecessores).

## 💻 Como usar (Aluno)

Faça o download ou clone o repositório.

Abra o arquivo index.html em qualquer navegador web atual (Chrome, Edge, Firefox, Safari). Não requer instalação de servidor.

Insira o seu nome e inicie a "Aula de Fuga".

Use a calculadora (🧮) contextualizada para rascunhos mentais.

Anote as Senhas-chave fornecidas ao final de cada fase concluída.

Destranque o cadeado digital final, registre a sua experiência e clique em Baixar Relatório.

## 👩‍🏫 Como usar (Professor)

A ferramenta foi desenhada para a Educação Baseada em Evidências. Ao recolher os relatórios .txt dos seus alunos, terá um mapa exato de onde ocorrem as falhas lógicas (ex: o aluno entende o Teorema de Pitágoras, mas erra sistematicamente na fatoração da raiz).

Privacidade (LGPD): Todo o processamento é feito localmente no navegador (Client-side). Nenhum dado do aluno transita pela internet ou é armazenado em bases de dados de terceiros.

Dica: Verifique a pasta testes de bancada para visualizar exemplos reais dos relatórios diagnósticos gerados pelo sistema.

## 🛠️ Tecnologias Utilizadas

HTML5 (Semântica e SVGs Interativos)

CSS3 (Responsividade Mobile-first, Animações e Temas)

JavaScript (Vanilla/ES6) (Manipulação de DOM, Parser Matemático, Blob API para relatórios)

## 👥 Equipe de Desenvolvimento

Antonio Antunes Junior

Giovani Machado de Lima

Lilian Maria de Souza Lino

Priscilla Santiago Zamorra

Renata Helena Arantes e Oliveira

Rodrigo Aires de Medeiros Correa

Sergio Eric Reis de Oliveira

Vitor Correa Uberti

## 📄 Licença
E
ste projeto é um Recurso Educacional Aberto distribuído sob a licença MIT – livre para uso, cópia, modificação e distribuição, seja para fins académicos ou comerciais. Consulte o arquivo LICENSE para mais detalhes. © 2026.
