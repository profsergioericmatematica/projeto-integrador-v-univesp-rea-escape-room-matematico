/**
 * RECURSO EDUCACIONAL ABERTO - ESCAPE ROOM MATEMÁTICO
 * @file script.js
 * @description Gestão de estados, pontuação, validações de enigma e relatórios.
 * * ==============================================================================
 * 🛡️ PLANO DE EDGE CASES IMPLEMENTADO E TRATADO NESTE SCRIPT:
 * 1. Valores Negativos: Aceites pela barreira numérica, mas rejeitados pela lógica.
 * 2. Valores Gigantes: Absorvidos de forma segura sem rebentar o DOM (MAX_SAFE).
 * 3. Strings Vazias: Interceptadas via .trim() === '' antes da avaliação.
 * 4. Caracteres Especiais / XSS: Protegidos via sanitizarHTML() na impressão.
 * 5. Divisão por Zero: O cálculo em isFinite() anula retornos de 'Infinity'.
 * 6. Bypassing: Botões de avanço mantidos com 'display:none' via DOM isolation.
 * ==============================================================================
 */

// ========== ESTATÍSTICAS GLOBAIS (ESTENDIDAS) ========== 
const stats = {
    acertos: 0, erros: 0, dicasContador: 0, dicasRegistradas: [],
    errosDetalhados: {}, 
    acertosDetalhados: {},
    respostasCorretas: {},           // armazena o valor correto digitado
    attemptsPerField: {},            // tentativas e erros por campo
    eventTimeline: [],               // {type, campo, fase, valor, time}
    fases: {
        pitagoras:     { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        raiz20_simp:   { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        raiz20_formula:{ acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        raiz20_aprox:  { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        tirolesa_p1:   { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        tirolesa_p2:   { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        tirolesa_p3:   { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        tirolesa_p4:   { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f2_p1:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f2_p2:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f2_p3:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        circ_p1:       { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        circ_p2:       { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        circ_p3:       { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        fracoes:       { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        marceneiro:    { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        marceneiro_p2: { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f4_p1:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f4_p2:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f4_p3:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f4_p4:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        limites:       { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        raiz180_simp:  { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        reta:          { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        raiz180_aprox: { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f6_p1:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f6_p2:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        fita_p1:       { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        fita_p2:       { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f7_p1:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f7_p2:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        f7_p3:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 },
        fase8:         { acertos:0, erros:0, dicasUsadas:0, concluida:false, estrelas:0, camposCorretos:0, startTime:0, endTime:0 }
    }
};

// ========== MATRIZ PEDAGÓGICA ==========
const matrizPedagogica = [
    {
        titulo: "FASE 1 (PARTE 1) - O CANAL DE ÁGUA E A RAIZ DE 20",
        contexto: "O aluno deve calcular a parede inclinada de um canal (trapézio: topo=10m, fundo=6m, altura=4m), aplicar Pitágoras, simplificar a raiz e aproximar para decimal.",
        gabarito: "Catetos: 4 e 2 | Soma²: 20 | Raiz Simplificada: 2√5 | Aproximação Decimal: 4.5",
        campos: ['Fase 1 (Pitágoras) - Cateto 1', 'Fase 1 (Pitágoras) - Cateto 2', 'Fase 1 (Pitágoras) - Soma dos Quadrados', 'Fase 1 (Raiz 20) - Número de Fora', 'Fase 1 (Raiz 20) - Número de Dentro', 'Fase 1 (Aprox) - Raiz Exata 1', 'Fase 1 (Aprox) - Seu Número', 'Fase 1 (Aprox) - Quadrado Anterior', 'Fase 1 (Aprox) - Raiz Exata 2', 'Fase 1 (Raiz 20) - Medida Aproximada']
    },
    {
        titulo: "FASE 1 (PARTE 2) - O DESAFIO DA TIROLESA",
        contexto: "Instalar um cabo entre ഇരു torres (12m e 8m) com distância de 20m. Exige encontrar catetos por subtração, aplicar Pitágoras (√416) e aproximar o valor.",
        gabarito: "Cateto Vert: 4 | Cateto Horiz: 20 | Soma²: 416 | Raiz Simplificada: 4√26 | Aproximação Final: 20.4",
        campos: ['Tirolesa - Cateto Vertical', 'Tirolesa - Cateto Horizontal', 'Tirolesa - Soma dos Quadrados', 'Tirolesa (Simp) - Número de Fora', 'Tirolesa (Simp) - Número de Dentro', 'Tirolesa - Aproximação Final']
    },
    {
        titulo: "FASE 2 (PARTE 1) - TRIÂNGULO RETÂNGULO SIMPLES",
        contexto: "Fixação do Teorema de Pitágoras num triângulo retângulo direto da imagem.",
        gabarito: "Catetos: 12 e 9 | Soma²: 225 | Hipotenusa (√225): 15",
        campos: ['Fase 2 (Triângulo) - Cateto 1', 'Fase 2 (Triângulo) - Cateto 2', 'Fase 2 (Triângulo) - Soma dos Quadrados', 'Fase 2 (Triângulo) - Hipotenusa']
    },
    {
        titulo: "FASE 2 (PARTE 2) - TRIÂNGULO NA CIRCUNFERÊNCIA",
        contexto: "Entender que a hipotenusa de um triângulo inscrito é o diâmetro. Catetos dados: 6 e 4. Simplificar a raiz gerada e dividir por 2 para achar o raio.",
        gabarito: "Soma (Diâmetro²): 52 | Diâmetro (Simplificado): 2√13 | Raio (Metade): 13 (dentro da raiz)",
        campos: ['Circunferência - Soma AB²', 'Circunferência (Simp) - Número de Fora', 'Circunferência (Simp) - Número de Dentro', 'Circunferência - Cálculo do Raio']
    },
    {
        titulo: "FASE 3 - CONVERSÃO DE FRAÇÕES E O MARCENEIRO",
        contexto: "Converter decimais finitos e infinitos em frações. Depois, usar o conceito para calcular a área de uma tábua de 9m × 0,666...m.",
        gabarito: "0,5 = 5/10 | 0,555... = 5/9 | 0,75 = 75/100 | 0,333... = 3/9 | 0,666... = 6/9 | Área Final: 6",
        campos: ['Frações (0,5) - Numerador', 'Frações (0,5) - Denominador', 'Frações (0,555) - Numerador', 'Frações (0,555) - Denominador', 'Frações (0,75) - Numerador', 'Frações (0,75) - Denominador', 'Frações (0,333) - Numerador', 'Frações (0,333) - Denominador', 'Marceneiro (0,666) - Numerador', 'Marceneiro (0,666) - Denominador', 'Marceneiro - Cálculo da Área']
    },
    {
        titulo: "FASE 4 - POTÊNCIAS E DÍZIMAS MISTAS",
        contexto: "Resolver a expressão m × n, sabendo que m = √(1,777...) e n = (2/3)^-2. Exige conversão mista, extrair raiz de fração e inverter base de potência negativa.",
        gabarito: "Fração de 1,777... = 16/9 | m = 4/3 | n = 9/4 | Resultado Final: 3",
        campos: ['Potências (1,777) - Numerador', 'Potências (1,777) - Denominador', 'Potências (m) - Numerador', 'Potências (m) - Denominador', 'Potências (n) - Numerador', 'Potências (n) - Denominador', 'Potências - Resultado da Multiplicação']
    },
    {
        titulo: "FASE 5 - CERCANDO O IRRACIONAL (RETA NUMÉRICA E RAIZ 180)",
        contexto: "Estimar entre quais inteiros a √180 está. Simplificar a √180. Posicionar números irracionais/fracionários na reta e calcular um valor decimal cortado.",
        gabarito: "Limites: 13 (√169) e 14 (√196) | √180 Simplificada: 6√5 | Reta: √22=M, 25/99=O, 193/90=P | Medida do Cabo (6×2,236): 13.416 (aprox aceita 13.4 a 13.42)",
        campos: ['Limites - Raiz Baixa (169)', 'Limites - Raiz Alta (196)', 'Raiz 180 (Simp) - Número de Fora', 'Raiz 180 (Simp) - Número de Dentro', 'Reta Numérica - Posição √22', 'Reta Numérica - Posição 25/99', 'Reta Numérica - Posição 193/90', 'Raiz 180 - Medida do Cabo']
    },
    {
        titulo: "FASE 6 - GEOMETRIA 3D (CUBO) E COMPRIMENTO DE FITA",
        contexto: "Encontrar a aresta de um cubo de 512cm³ (raiz cúbica) e calcular 12 arestas. Depois, converter pedaços de fita (√144, 3/4 e √(9/4)) para decimal e calcular sobra.",
        gabarito: "Aresta: 8 | Arame Total: 96 | Fita Total: 12 | Fita Fração (3/4): 0.75 | Fita Raiz √(9/4): 1.5 | Sobra Final: 7.25",
        campos: ['Cubo - Medida da Aresta', 'Cubo - Arame Total', 'Fita - Conversão Total (√144)', 'Fita - Conversão Fração (3/4)', 'Fita - Conversão Raiz √(9/4)', 'Fita - Cálculo da Sobra Final']
    },
    {
        titulo: "FASE 7 - OPERAÇÕES COM TEMPO (SESSÃO DE CINEMA)",
        contexto: "Filme (216m) + Intervalo (10m). Somar os minutos, converter para horas inteiras e minutos restantes, e por fim somar ao horário de início (21h10).",
        gabarito: "Total Minutos: 226 | Conversão: 3 horas e 46 minutos | Término: 00h56",
        campos: ['Tempo - Total de Minutos', 'Tempo - Conversão de Horas Inteiras', 'Tempo - Conversão de Minutos Restantes', 'Tempo - Horário Final de Término']
    },
    {
        titulo: "FASE 8 (SECRETA) - A SALA DO ARQUITETO",
        contexto: "Desafio bônus sobre a sequência de Fibonacci e a Proporção Áurea. O aluno deve identificar o próximo termo da sequência.",
        gabarito: "Próximo termo: 21",
        campos: ['Fibonacci - Próximo Número']
    }
];

const obterDiagnostico = (campo, valorErrado) => `Verificar lógica de cálculo ou possível erro de digitação.`;

// ========== DICIONÁRIO DE DICAS FORMATADAS PARA O TXT ==========
const dicasFormatadasTxt = {
    "dica2-passo1": "🧠 Pista Lógica — Exemplo com √12:\nQue tal fatorar 12? Divida por 2 (dá 6), depois por 2 (dá 3), e por 3 (dá 1). Agora agrupe os fatores iguais em pares. O que acontece com cada par quando aplicamos a raiz? Teste com outro número, como 18, para entender o padrão. Depois volte à sua fatoração da √20 e veja quem forma par e quem fica sozinho.",
    "dica2-passo3": "🧠 Pista:\nVocê descobriu o valor decimal aproximado para a raiz. Considerando que existe um multiplicador aguardando do lado de fora, qual operação matemática deve uni-los para obtermos o comprimento real?",
    "dicaTirolesa4": "🧠 Pista:\nA Nota do Sistema acaba de revelar o valor exato em metros da raiz irracional que sobrou. Como você possuía um fator externo aguardando, qual é a operação final?",
    "dicaF2p1": "🧠 Pista:\nObserve o canto perfeitamente quadrado da figura (o ângulo de 90 graus). Se você fosse construir um quadrado perfeito encostado em cada uma das linhas que formam esse 'L', quais seriam as medidas iniciais desses dois lados?",
    "dicaF2p2": "🧠 Pista Lógica — Analogia do Construtor:\nImagine que um triângulo tivesse lados de tamanho 5 e 3. A área geométrica projetada seria 25 e 9. A lei universal manda juntar essas duas áreas (25 + 9 = 34). Como você aplica essa mesma lei com os valores do nosso holograma?",
    "dicaF2p3": "🧠 Pista:\nA soma total encontrada representa uma 'área gigante'. Qual operação matemática desfaz uma área para revelar apenas a medida reta do lado? Teste na calculadora valores análogos 'redondos' para cercar seu alvo exato!",
    "dicaCirc1": "🧠 Pista:\nEm outro cenário, com lados 3 e 5, as áreas formadas seriam 9 e 25 (total 34). De que forma essa exata lógica espacial atua nas linhas indicadas na nossa figura circular?",
    "dicaCirc2": "🧠 Pista Lógica — Exemplo com √24:\nFatore 24: 2³ × 3. Se agruparmos os fatores iguais em pares, ficamos com 2² × 2 × 3. Qual fator pode 'sair' da raiz por estar elevado ao quadrado? E qual precisa continuar lá dentro? Teste esse raciocínio com outro número, como 20, e depois aplique à sua fatoração da tela.",
    "dicaCirc3": "🧠 Pista:\nPense no multiplicador externo como 'caixas'. Se você divide '4 caixas de √3' por 2, fica com 2 caixas (o conteúdo √3 não muda). Aplique isso ao seu Diâmetro: ao dividir pela metade, o que acontece com a raiz e o fator de fora?",
    "dica3": "🧠 Pista Lógica — Exemplo com 0,8 e 0,888...:\nSe você lê \"0,8\" em voz alta, diz \"oito décimos\", ou seja, 8 partes de 10 (8/10). E se fossem duas casas, como \"0,85\", seriam 85 partes de 100.\nMas, se o número perde o limite e vira uma dízima como 0,888..., como poderíamos representá-lo? Lembra da aula anterior? 1/9 = 0,111…, 2/9 = 0,222… Será que existe uma conexão entre o dígito que se repete e o numerador de uma fração com denominador 9?\n🚩 Observe os seus quatro enigmas. Quais deles são finitos (base 10 ou 100) e quais são infinitos e repetitivos? Use essa pista para descobrir a base.",
    "dicaMarceneiroP1": "🧠 Pista:\nA largura da tábua apresenta o comportamento visual de eco infinito. Lembra da regra da base do infinito que você acabou de aplicar?\nSe o número 6 é o dígito que se repete, qual deve ser o seu denominador?",
    "dicaMarceneiro": "🧠 Pista Lógica — Analogia do Estoque:\nSe você tem 7 caixas com (5/7) de um produto em cada, o 7 multiplica e anula o 7 que divide, restando 5 inteiros. Observe a sua tábua: o comprimento e a base da fração não são o mesmo número? O que acontece entre eles?",
    "dicaF4p1": "🧠 Pista Lógica — Juntando Inteiros e Dízimas:\nQuantos nonos cabem in 1 inteiro? Se você já sabe transformar 0,777… em fração, como pode juntar essa parte com o 1 inteiro usando o mesmo denominador?\n🚩 Aplique esse raciocínio ao número 1,777… do desafio. Primeiro, escreva a parte decimal como fração. Depois, expresse o inteiro como uma fração com o mesmo denominador e some.",
    "dicaF4p2": "🧠 Pista Lógica — Operação Inversa:\nO expoente 0,5 pede a raiz quadrada. Lembre-se: √(a/b) = √a / √b. Então, extraia a raiz do numerador e do denominador da sua fração. Que número multiplicado por si mesmo dá o numerador? E o denominador?",
    "dicaF4p3": "🧠 Pista Lógica — O Espelho:\nUm expoente negativo inverte a fração. Por exemplo, (a/b)^-1 = b/a. Depois, a potência positiva se aplica normalmente. Experimente com (1/2)^-1 e veja o resultado. Agora aplique essa ideia ao seu (2/3)^-2, mas cuidado: o expoente não é apenas -1.",
    "dicaF4p4": "🧠 Pista Lógica — O Padrão de Cancelamento:\nNa multiplicação de frações, como (2/5) × (5/8), o 5 em cima e o 5 embaixo se anulam visualmente, sobrando 2/8.\n🚩 Olhe para as suas frações de 'm' e 'n'. Existe um cruzamento idêntico que permita esse cancelamento rápido?",
    "dica5": "🧠 Pista Lógica — Explorando Fronteiras:\nSabemos que um pátio de 100 azulejos tem lados de 10 e um de 400 tem lados de 20. Se as áreas são 169 e 196, em que espaço elas habitam?\n🚩 Teste multiplicar bases vizinhas na calculadora (11, 12...) até fechar a área perfeita!",
    "dica5-passo1": "🧠 Pista Lógica — Analogia do Passe Livre:\nPegue um número como 72. Fatore: 2³ × 3². Agora agrupe em pares: 2² × 3² × 2. Os fatores com expoente 2 podem sair da raiz (porque √(x²)=x), mas o que está sozinho não pode. Que tal fazer o mesmo com o 180? Quais fatores formam pares? Quais não?",
    "dicaReta": "🧠 Pista Lógica — A Moeda de Troca:\nPara estimar a posição de √8, pense que ela está entre √4 (2) e √9 (3). Para estimar 40/99, divida: 0,40.\n🚩 Faça o mesmo: estime a raiz exata vizinha da √22 e divida as frações. Quem grudou no zero e quem passou do 4?",
    "dicaRaiz180p2": "🧠 Pista Lógica — A Fusão Final:\nQuando temos uma expressão como 4√3, o valor real é obtido combinando o número de fora com a raiz já calculada. Qual operação matemática faz essa combinação? Use o valor decimal que você achou para a raiz e combine com o fator externo que estava esperando.",
    "dicaF6p1": "🧠 Pista Lógica — A Caixa Menor:\nImagine um cubo de 64 cm³. Que número multiplicado por si mesmo três vezes resulta em 64? (Teste 3×3×3 e 5×5×5 para cercar o valor). Agora faça o mesmo cerco para o volume de 512 cm³: quais números inteiros podem ser candidatos?",
    "dicaF6p2": "🧠 Pista Lógica — As Vigas do Quarto:\nImagine que o cubo é o quarto onde você está. Quantas vigas formam o chão? E o teto? E quantas colunas unem o chão ao teto?\n🚩 Conte fisicamente essas arestas estruturais e faça a operação para descobrir o fio inteiro.",
    "dicaFita1": "🧠 Pista Lógica — Tradução Universal:\nPara comparar medidas, traduza para 'dinheiro' (decimal puro). Se cortar 1/4 m, divide-se 1 por 4 (0,25). Numa √(16/9), tira-se a raiz de cima e de baixo (4/3) e divide a sobra.\n🚩 Aplique isso no seu Rolo Total e cortes!",
    "dicaFita2": "🧠 Pista Lógica — O Acúmulo de Retalhos:\nSe de 10m você tira fatias de 2m e 3m, você soma os retalhos (5m) e subtrai da origem.\n🚩 Reúna as fatias traduzidas do passo anterior em um grande montante. O que fazer com isso em relação à fita mestre?",
    "dicaF7p1": "🧠 Pista:\nConsidere uma viagem de 120 minutos que faz uma parada de 15. A experiência inteira contínua dura 135 minutos.\n🚩 Faça a consolidação unificando os dois blocos de tempo apresentados no nosso caso.",
    "dicaF7p2": "🧠 Pista Lógica — Caixas de Ovos:\nSe tem 130 ovos e embalagens que cabem 60. Duas embalagens guardam 120 ovos. Sobram 10.\n🚩 O tempo agrupa em blocos de 60 minutos. Quantas 'caixas' de horas você enche e quantos minutos sobram fragmentados?",
    "dicaF7p3": "🧠 Pista Lógica — A Catraca do Tempo:\nComeçar uma viagem às 22h com 3h de duração indicaria 25h. Como o relógio zera no 24, a marcação 'transborda' para 01h.\n🚩 Incorpore suas horas ao início (21). A barreira das 24h foi atravessada? Como o relógio resolve?"
};

// ========== AUXILIARES DE SEGURANÇA E HIGIENIZAÇÃO ==========

/**
 * @description Valida se a entrada do usuário é estritamente numérica, substituindo vírgulas por pontos. Previne travamentos matemáticos e ataques de injeção.
 * @param {any} valor - O valor bruto inserido pelo usuário.
 * @returns {boolean} Retorna verdadeiro se for número puro, falso caso contenha texto ou códigos.
 */
function validarEntradaNumerica(valor) {
    if (valor === null || valor === undefined || String(valor).trim() === '') return false;
    const valorTratado = String(valor).replace(',', '.');
    return !isNaN(Number(valorTratado));
}

/**
 * @description Sanitiza o input para evitar vulnerabilidades de Cross-Site Scripting (XSS) no relatório visual. Converte símbolos HTML perigosos em texto inofensivo.
 * @param {string} texto - A string possivelmente maliciosa inserida pelo usuário.
 * @returns {string} String higienizada, segura para injeção via innerHTML.
 */
function sanitizarHTML(texto) {
    if (!texto) return '';
    const mapa = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;'
    };
    const reg = /[&<>"'/]/ig;
    return String(texto).replace(reg, (match) => (mapa[match]));
}

// ========== FUNÇÕES DE REGISTRO ==========
function registrarAcertoCampo(fase, nomeAmigavelCampo, valorCorreto) {
    const f = stats.fases[fase];
    if (f && !f.concluida) {
        stats.acertosDetalhados[nomeAmigavelCampo] = true;
        stats.respostasCorretas[nomeAmigavelCampo] = valorCorreto;
        if (!stats.attemptsPerField[nomeAmigavelCampo]) { stats.attemptsPerField[nomeAmigavelCampo] = { attempts: 0, erros: 0, acertou: false }; }
        stats.attemptsPerField[nomeAmigavelCampo].attempts++;
        stats.attemptsPerField[nomeAmigavelCampo].acertou = true;
        stats.eventTimeline.push({ type: 'acerto', campo: nomeAmigavelCampo, fase, time: Date.now() });
    }
}

function registrarErroCampo(fase, nomeAmigavelCampo, valorErrado) {
    const f = stats.fases[fase];
    if (f && !f.concluida) {
        if (!stats.errosDetalhados[nomeAmigavelCampo]) { stats.errosDetalhados[nomeAmigavelCampo] = []; }
        const valorParaGuardar = (valorErrado === null || valorErrado === undefined || String(valorErrado).trim() === '') ? '[vazio]' : valorErrado;
        stats.errosDetalhados[nomeAmigavelCampo].push(valorParaGuardar);
        
        if (!stats.attemptsPerField[nomeAmigavelCampo]) { stats.attemptsPerField[nomeAmigavelCampo] = { attempts: 0, erros: 0, acertou: false }; }
        stats.attemptsPerField[nomeAmigavelCampo].attempts++;
        stats.attemptsPerField[nomeAmigavelCampo].erros++;
        
        stats.erros++; f.erros++;
        stats.eventTimeline.push({ type: 'erro', campo: nomeAmigavelCampo, fase, valor: valorParaGuardar, time: Date.now() });
    }
}

function contabilizarCampos(fase, acertosNaEtapa) {
    const f = stats.fases[fase];
    if (f && !f.concluida) { if (acertosNaEtapa > f.camposCorretos) { f.camposCorretos = acertosNaEtapa; } }
}

function registrarTentativa(fase, acerto) {
    const f = stats.fases[fase];
    if (!f || f.concluida) return;
    if (acerto) { 
        f.acertos++; stats.acertos++; f.concluida = true; f.endTime = Date.now(); f.estrelas = calcularEstrelas(f.erros, f.dicasUsadas); 
    } 
    if (f.startTime === 0) f.startTime = Date.now();
}

function calcularEstrelas(erros, dicas) {
    const p = erros + dicas;
    if (p === 0) return 3;
    if (p <= 2) return 2; 
    return 1;
}

function registrarDica(fase, dicaId, conteudo) {
    const f = stats.fases[fase];
    if (f && !f.concluida) { 
        const dicaJaUsada = stats.dicasRegistradas.some(d => d.dicaId === dicaId);
        if (!dicaJaUsada) {
            f.dicasUsadas++; stats.dicasContador++; 
            stats.dicasRegistradas.push({ fase, dicaId, conteudo, time: Date.now() });
            stats.eventTimeline.push({ type: 'dica', fase, dicaId, time: Date.now() });
        }
    }
}

function confirmarDica(idDica, faseAtual) {
    const dicaJaUsada = stats.dicasRegistradas.some(d => d.dicaId === idDica);
    if (dicaJaUsada) {
        const el = document.getElementById(idDica);
        if (el) el.style.display = 'block';
    } else {
        if (confirm("⚠️ Usar uma nova dica reduz a sua classificação por estrelas. Deseja continuar?")) {
            const el = document.getElementById(idDica);
            let conteudoFinal = "Dica solicitada";
            if (dicasFormatadasTxt[idDica]) { conteudoFinal = dicasFormatadasTxt[idDica]; } 
            else if (el) { conteudoFinal = el.innerText.replace(/\n+/g, '\n').replace(/\s{2,}/g, ' ').trim(); }
            registrarDica(faseAtual, idDica, conteudoFinal);
            if (el) el.style.display = 'block';
        }
    }
}

function obterTotalCamposCorretos() {
    let total = 0; 
    for (let campo in stats.acertosDetalhados) { 
        if (campo !== 'Fibonacci - Próximo Número') {
            total++; 
        }
    } 
    return total;
}

/**
 * @description Valida o enigma final sobre a Sequência de Fibonacci. Pedagogicamente encerra a jornada provando que a matemática rege a natureza.
 * @param {string} f8_resposta - ID do input que recebe o próximo termo da sequência áurea.
 * @returns {void} Atualiza o placar e libera a porta para o relatório final.
 */
function verificarFase8() {
    const valor = document.getElementById('f8_resposta').value.trim();
    const fb = document.getElementById('erro_f8');
    if (valor === '21') {
        const fase = 'fase8';
        const f = stats.fases[fase];
        if (!f.concluida) {
            f.acertos++;
            f.concluida = true;
            f.endTime = Date.now();
            stats.eventTimeline.push({ type: 'acerto', campo: 'Fibonacci - Próximo Número', fase, time: Date.now() });
        }
        fb.style.color = '#22c55e';
        fb.innerHTML = '✅ Perfeito! Você decifrou a linguagem da natureza! 🌟🌟🌟';
        document.getElementById('f8_parabens').style.display = 'block';
        gerarRelatorioVisual();
    } else {
        registrarErroCampo('fase8', 'Fibonacci - Próximo Número', valor);
        fb.style.color = '#f59e0b';
        fb.innerHTML = '🤔 Padrão ainda não reconhecido. Observe a espiral: cada novo número é a soma dos dois anteriores.';
    }
}

// ========== ANIMAÇÕES ==========

/**
 * @description Anima passo a passo a fatoração em números primos do número 20. Pedagogicamente, ajuda o aluno a visualizar a desconstrução temporal de um número composto.
 * @param {string} num1, div1, num2... - IDs das divs no HTML que recebem sequencialmente os números da fatoração.
 * @returns {void} Altera o DOM para mostrar a animação de divisão sucessiva.
 */
function animarFatoracao20() {
    // 1. Limpa o conteúdo de todas as células da tabela de fatoração antes de iniciar para garantir que a animação comece do zero.
    ['num1','div1','num2','div2','num3','div3','num4'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ''; });
    
    // 2. Prepara e esconde a área de resultados e o bloco de perguntas subsequente.
    const resultadoDiv = document.getElementById('resultadoFatoracao');
    const perguntasDiv = document.getElementById('perguntasFatoracao');
    if (resultadoDiv) { resultadoDiv.innerHTML = ''; }
    if (perguntasDiv) perguntasDiv.style.display = 'none';

    // 3. Define as etapas lógicas da divisão: 20 dividido por 2 dá 10; 10 dividido por 2 dá 5; 5 dividido por 5 dá 1.
    const etapas = [
        {id:'num1',valor:'20'},{id:'div1',valor:'2'},{id:'num2',valor:'10'},
        {id:'div2',valor:'2'},{id:'num3',valor:'5'},{id:'div3',valor:'5'},{id:'num4',valor:'1'}
    ];
    let i = 0;
    
    // 4. Função recursiva embutida para injetar cada número com um delay temporal (simulando a escrita manual de um professor).
    function proximo() {
        if (i < etapas.length) { 
            const el = document.getElementById(etapas[i].id); 
            if (el) el.textContent = etapas[i].valor; 
            i++; 
            // Pausa de 800ms antes de imprimir o próximo fator
            setTimeout(proximo, 800); 
        }
        else {
            // 5. Após a conclusão, exibe a equação final e revela as próximas interações do aluno
            if (resultadoDiv) { resultadoDiv.innerHTML = '20 = 2&sup2; &times; 5'; }
            if (perguntasDiv) perguntasDiv.style.display = 'block';
        }
    }
    // Inicia a cadeia de animação
    proximo();
}

function animarFatoracao52() {
    ['f52_num1','f52_div1','f52_num2','f52_div2','f52_num3','f52_div3','f52_num4'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ''; });
    const resultadoDiv = document.getElementById('resultadoFatoracao52');
    if (resultadoDiv) resultadoDiv.innerHTML = '';
    const etapas = [
        {id:'f52_num1',valor:'52'},{id:'f52_div1',valor:'2'},{id:'f52_num2',valor:'26'},
        {id:'f52_div2',valor:'2'},{id:'f52_num3',valor:'13'},{id:'f52_div3',valor:'13'},{id:'f52_num4',valor:'1'}
    ];
    let i = 0;
    function proximo() {
        if (i < etapas.length) { const el = document.getElementById(etapas[i].id); if (el) el.textContent = etapas[i].valor; i++; setTimeout(proximo, 800); }
        else { if (resultadoDiv) { resultadoDiv.innerHTML = '52 = 2&sup2; &times; 13'; } }
    }
    proximo();
}

// ========== NAVEGAÇÃO, TEMA E RELATÓRIOS ==========
function iniciarJogo() {
    const nomeInput = document.getElementById('nome_aluno');
    if (!nomeInput) {
        alert("Erro: campo de nome não encontrado.");
        return;
    }
    const nome = nomeInput.value.trim();
    if (nome === '') {
        alert("⚠️ Por favor, digite seu primeiro nome na caixa de identificação para iniciar!");
        nomeInput.focus();
        return;
    }
    document.getElementById('tela1').classList.remove('active');
    document.getElementById('fase1').classList.add('active');
    window.scrollTo(0, 0);
}

function alternarTema() {
    const body = document.body;
    body.classList.toggle('tema-claro');
    const btn = document.getElementById('btn-tema');
    if (body.classList.contains('tema-claro')) {
        btn.innerHTML = '🌙 Tema Escuro'; btn.style.background = '#e2e8f0'; btn.style.color = '#0f172a';
    } else {
        btn.innerHTML = '☀️ Tema Claro'; btn.style.background = '#334155'; btn.style.color = '#f8fafc';
    }
}

function obterClassificacao() {
    let totalEstrelas = 0; for (let key in stats.fases) { totalEstrelas += stats.fases[key].estrelas || 0; }
    let patente = "";
    if (totalEstrelas <= 19) patente = "Prisioneiro dos Números";
    else if (totalEstrelas <= 38) patente = "Aprendiz em Fuga";
    else if (totalEstrelas <= 57) patente = "Sobrevivente Lógico";
    else if (totalEstrelas <= 76) patente = "Especialista Matemático";
    else patente = "Mestre do Escapismo 🏆";
    return { total: totalEstrelas, patente: patente };
}

/**
 * @description Gera o relatório visual final de desempenho do aluno. Pedagogicamente essencial para promover a metacognição e fornecer dados precisos para a intervenção do professor.
 * @param {string} nome_aluno - ID do input do HTML contendo o nome fornecido pelo usuário.
 * @returns {void} Modifica o DOM inserindo o HTML do relatório final blindado contra XSS.
 */
function gerarRelatorioVisual() {
    // 1. Captura o contêiner principal onde o relatório visual será injetado e a div que listará as dicas
    const container = document.getElementById('relatorio-conteudo');
    const listaDicasDiv = document.getElementById('lista-dicas');
    
    // 2. Captura o nome bruto digitado pelo aluno na tela inicial. Se houver falha, assume 'Aluno Desconhecido'.
    let nomeAlunoRaw = document.getElementById('nome_aluno') ? document.getElementById('nome_aluno').value.trim() : 'Aluno Desconhecido';
    if(nomeAlunoRaw === '') nomeAlunoRaw = 'Aluno Desconhecido';
    
    // 3. SANITIZAÇÃO DE SEGURANÇA (XSS): Transforma caracteres especiais de HTML em texto inofensivo. Impede execução de scripts injetados.
    let nomeAluno = sanitizarHTML(nomeAlunoRaw);
    
    // 4. Formata a data atual e calcula o ranking geral (total de estrelas obtidas nas resoluções)
    let dataAtual = new Date().toLocaleString('pt-BR');
    let rank = obterClassificacao();

    // 5. Inicia a construção da string HTML com o cabeçalho do aluno e a patente conquistada
    let html = `<div style="background:#1e293b; padding:20px; border-radius:8px; margin-bottom:20px; text-align:center; border:2px solid #38bdf8;">
                    <p style="margin:0; font-size:20px; color:#f8fafc;"><strong>Aluno(a):</strong> <span style="color:#fde047;">${nomeAluno}</span></p>
                    <p style="margin:5px 0 0 0; font-size:16px; color:#94a3b8;"><strong>Finalizado em:</strong> ${dataAtual}</p>
                    <hr style="border-color:#334155; margin:15px 0;">
                    <h2 style="margin:0; color:#fbbf24; font-size:32px;">⭐ ${rank.total} / 96 Estrelas</h2> <p style="margin:10px 0 0 0; font-size:24px; color:#22c55e; font-weight:bold;">Patente: ${rank.patente}</p>
                </div>`;
                
    // 6. Calcula e exibe o resumo matemático do desempenho (etapas vs erros totais)
    let camposExatos = obterTotalCamposCorretos();
    const totalCampos = calcularTotalCampos(); 
    html += `<div style="text-align:center; margin-bottom:20px;">
                <p>Etapas Concluídas: <strong>${stats.acertos}/32</strong></p> <p>Total de Campos Preenchidos com Falha: <strong>${stats.erros}</strong></p>
                <p>Campos Certos Finais: <strong>${camposExatos}/${totalCampos}</strong></p> 
             </div>`;
                
    // 7. Loop de iteração nos erros: verifica todos os obstáculos nos quais o aluno inseriu dados incorretos
    if (Object.keys(stats.errosDetalhados).length > 0) {
        html += `<hr><h4 style="color:#ef4444;">🛑 Detalhamento de Erros por Campo</h4><ul style="text-align:left;">`;
        for (let [campo, valores] of Object.entries(stats.errosDetalhados)) {
            // SANITIZAÇÃO DE ARRAY: Todo input malicioso registrado como "erro" precisa ser desativado antes de ser impresso na tela
            const valoresSanitizados = valores.map(v => sanitizarHTML(v));
            html += `<li style="margin-bottom:8px;"><strong>${campo}:</strong> Errou ${valores.length} vez(es).<br><span style="color:#94a3b8; font-size:14px;">Tentativas falhas:</span> <span style="color:#f87171;">[ ${valoresSanitizados.join(' | ')} ]</span></li>`;
        }
        html += `</ul>`;
    }

    // 8. Injeta toda a estrutura montada de forma segura na interface principal
    container.innerHTML = html;
    
    // 9. Monta a lista formatada de dicas solicitadas pelo aluno ao longo da jornada
    let dh = '<ul>';
    if (stats.dicasRegistradas.length === 0) dh += '<li>Nenhuma dica foi utilizada.</li>';
    else {
        stats.dicasRegistradas.forEach(d => { 
            let textoTela = d.conteudo.replace(/\n/g, '<br>');
            dh += `<li style="margin-bottom: 10px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px;"><strong>Fase ${d.fase}</strong> (${d.dicaId}):<br> ${textoTela}</li>`; 
        });
    }
    // Finaliza injetando a lista de dicas no sub-container correspondente
    listaDicasDiv.innerHTML = dh + '</ul>';
}

function baixarRelatorio() {
    let camposExatos = obterTotalCamposCorretos();
    let rank = obterClassificacao();
    let nomeAluno = document.getElementById('nome_aluno') ? document.getElementById('nome_aluno').value.trim() : 'Aluno';
    if(nomeAluno === '') nomeAluno = 'Aluno';
    let nomeSemEspaco = nomeAluno.replace(/\s+/g, '_');
    
    let dataObj = new Date();
    let dataFormatada = dataObj.toLocaleDateString('pt-BR');
    let horaFormatada = dataObj.toLocaleTimeString('pt-BR');
    let dataNomeArquivo = dataObj.toISOString().slice(0, 10);
    let horaNomeArquivo = horaFormatada.replace(/:/g, '');
    
    const totalCampos = calcularTotalCampos();

    let t = "====================================================\n";
    t += "    RELATÓRIO PEDAGÓGICO - ESCAPE ROOM MATEMÁTICO\n";
    t += "====================================================\n\n";
    t += `ALUNO(A): ${nomeAluno}\n`;
    t += `DATA DE CONCLUSÃO: ${dataFormatada} às ${horaFormatada}\n`;
    t += `TOTAL DE ESTRELAS: ${rank.total} de 96\n`;
    t += `PATENTE ALCANÇADA: ${rank.patente}\n\n`;
    
    t += "----------------------------------------------------\n";
    t += "TOTAIS GERAIS DA JORNADA:\n";
    t += "----------------------------------------------------\n";
    t += `- Etapas Concluídas: ${stats.acertos}/32\n`;
    t += `- Campos Preenchidos Corretamente ao Final: ${camposExatos}/${totalCampos}\n`;
    t += `- Total de Erros de Preenchimento nos Campos: ${stats.erros}\n`;
    t += `- Quantidade de Campos Distintos que o aluno errou: ${Object.keys(stats.errosDetalhados).length}/${totalCampos}\n`;
    t += `- Total de Dicas Solicitadas: ${stats.dicasContador}\n\n`;
    
    t += "----------------------------------------------------\n";
    t += "ANÁLISE PEDAGÓGICA POR FASE (GABARITO VS DESEMPENHO)\n";
    t += "----------------------------------------------------\n";
    
    matrizPedagogica.forEach(bloco => {
        t += `>>> ${bloco.titulo}\n`;
        t += `[CONTEXTO]: ${bloco.contexto}\n`;
        t += `[GABARITO ESPERADO]: ${bloco.gabarito}\n`;
        t += `[ERROS DO ALUNO NESTA FASE]:\n`;
        let errosNesteBloco = false;
        bloco.campos.forEach(campo => {
            if (stats.errosDetalhados[campo]) {
                const valores = stats.errosDetalhados[campo];
                t += ` - ${campo}: Errou ${valores.length} vez(es) -> Valores: [ ${valores.join(' | ')} ]\n`;
                errosNesteBloco = true;
            }
        });
        if (!errosNesteBloco) {
            t += ` - Nenhum erro de campo. Desempenho perfeito.\n`;
        }
        t += "\n";
    });

    t += "----------------------------------------------------\n";
    t += "PERSISTÊNCIA E TENTATIVAS POR CAMPO\n";
    t += "----------------------------------------------------\n";
    for (let campo in stats.attemptsPerField) {
        const a = stats.attemptsPerField[campo];
        t += `${campo}:\n`;
        t += `   -> ${a.attempts} tentativa(s) de validação.\n`;
        t += `   -> ${a.erros} erro(s) cometido(s).\n`;
        t += `   -> Conseguiu acertar no final? ${a.acertou ? 'Sim' : 'Não'}\n\n`;
    }

    t += "----------------------------------------------------\n";
    t += "DETALHAMENTO DE DICAS UTILIZADAS:\n";
    t += "----------------------------------------------------\n";
    if (stats.dicasRegistradas.length === 0) {
        t += "Nenhuma dica foi utilizada pelo aluno.\n";
    } else {
        stats.dicasRegistradas.forEach(d => {
            t += `- Fase ${d.fase} (${d.dicaId}):\n${d.conteudo}\n\n`;
        });
    }

    let relatoCognitivo = document.getElementById('texto_metacognitivo') 
        ? document.getElementById('texto_metacognitivo').value.trim() 
        : '';
    if (relatoCognitivo === '') {
        relatoCognitivo = "O aluno optou por não deixar um registro metacognitivo.";
    }
    
    t += "\n----------------------------------------------------\n";
    t += "DIÁRIO DE BORDO (METACOGNIÇÃO):\n";
    t += "----------------------------------------------------\n";
    t += `${relatoCognitivo}\n`;

    t += "\n----------------------------------------------------\n";
    t += "PROGRESSÃO TEMPORAL (Ordem exata de cliques)\n";
    t += "----------------------------------------------------\n";
    if (stats.eventTimeline.length > 0) {
        stats.eventTimeline.forEach((ev, idx) => {
            const hora = new Date(ev.time).toLocaleTimeString('pt-BR');
            let det = ev.campo || ev.dicaId || ev.fase;
            if (ev.type === 'erro') det += ` (Digitou: ${ev.valor})`;
            t += `${idx+1}. [${hora}] ${ev.type.toUpperCase()}: ${det}\n`;
        });
    } else {
        t += "Nenhum evento registrado.\n";
    }

    const blob = new Blob([t], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Relatorio_${nomeSemEspaco}_${dataNomeArquivo}_${horaNomeArquivo}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);

    document.getElementById('btn_recomecar').style.display = 'inline-block';
}

function calcularTotalCampos() {
    let total = 0;
    matrizPedagogica.forEach(bloco => {
        if (bloco.titulo !== "FASE 8 (SECRETA) - A SALA DO ARQUITETO") {
            total += bloco.campos.length;
        }
    });
    return total;
}

function reiniciarJogo() { location.reload(); }
function mostrar(id) { document.getElementById(id).classList.remove('hidden'); }
function mudarTela(atual, proxima, idFaseAtual = null) {
    // PROTEÇÃO ANTI-BYPASS: Se foi passada a chave da fase atual, garante que ela está realmente concluída no sistema antes de deixar avançar.
    if (idFaseAtual && stats.fases[idFaseAtual] && !stats.fases[idFaseAtual].concluida) {
        alert("⚠️ Segurança do Laboratório: Não pode forçar as portas. Conclua o puzzle matemático primeiro!");
        return;
    }

    document.getElementById(atual).classList.remove('active'); 
    document.getElementById(proxima).classList.add('active'); 
    window.scrollTo(0, 0);
    
    if (proxima === 'tela_sucesso') gerarRelatorioVisual();
    if (proxima === 'fase1_pt2') {
        window.animacaoFatoracaoExecutada = false;
        setTimeout(function() { 
            if (!window.animacaoFatoracaoExecutada) { 
                window.animacaoFatoracaoExecutada = true; 
                animarFatoracao20(); 
            } 
        }, 200);
    }
}

// ========== CALCULADORA ==========

// 🟢 NOVO: Objeto com o contexto de cada botão da calculadora
const contextosCalculadora = {
    'soma_quadrados': 'Dica: Calcule o quadrado de cada cateto e some-os (a² + b²).',
    'raiz20_aprox': 'Dica: Multiplique o fator externo pelo valor decimal da raiz (ex: 2 × 2.23).',
    'f1_cabo2': 'Dica: Eleve os catetos da tirolesa ao quadrado e some-os.',
    'f1_caboAprox': 'Dica: Multiplique o fator de fora pela aproximação decimal da raiz.',
    'f2_soma': 'Dica: Some as áreas projetadas dos dois catetos.',
    'f2_hip': 'Dica: Encontre a raiz quadrada do total (que número vezes ele mesmo dá a soma?).',
    'circ_ab2': 'Dica: Aplique Pitágoras (a² + b²) para achar a medida do Diâmetro².',
    'circ_raio': 'Dica: Divida o fator externo do Diâmetro por 2 para obter o Raio.',
    'areaMarceneiro': 'Dica: Multiplique o comprimento (9) pela fração descoberta.',
    'f4_resultado': 'Dica: Multiplique a fração m pela fração n. Lembre-se de cortar nas diagonais!',
    'raiz180_fora': 'Dica: Extraia os fatores com potência 2 de dentro da raiz e multiplique-os fora.',
    'raiz180_aprox': 'Dica: Multiplique o fator externo pela raiz decimal aproximada de 180.',
    'f6_aresta': 'Dica: Extraia a raiz cúbica do volume (Que número vezes ele mesmo 3x dá 512?).',
    'f6_total': 'Dica: Um cubo possui 12 arestas (linhas). Multiplique a aresta por 12.',
    'fita_sobra': 'Dica: Converta para decimais, some os 3 retalhos e subtraia do rolo total.',
    'f7_minutos': 'Dica: Some os minutos de exibição do filme com o tempo de intervalo.'
};

let calcCurrentInput = '', calcDestino = null;

// 🟢 MODIFICADO: Função atualizada para puxar o contexto
function abrirCalculadora(id) { 
    calcDestino = id; 
    document.getElementById('calc-popup').classList.add('active'); 
    document.getElementById('overlay-calc').classList.add('active'); 
    calcCurrentInput = ''; 
    document.getElementById('calc-display').value = '0'; 
    
    // Atualiza o contexto visual
    const pContexto = document.getElementById('calc-contexto');
    if (pContexto) {
        if (id && contextosCalculadora[id]) {
            pContexto.innerHTML = contextosCalculadora[id];
            pContexto.style.display = 'block'; // Mostra a frase se houver contexto
        } else {
            pContexto.style.display = 'none';  // Esconde o espaço se for um cálculo livre genérico
        }
    }
}

function fecharCalculadora() { 
    document.getElementById('calc-popup').classList.remove('active'); 
    document.getElementById('overlay-calc').classList.remove('active'); 
}

function calcInput(v) {
    // 1. Limpa a tela de "Erro" ou o "0" inicial se o usuário começar a digitar um número puro
    if (calcCurrentInput === 'Erro' || (calcCurrentInput === '0' && v !== '.' && !['+', '-', '*', '/'].includes(v))) {
        calcCurrentInput = '';
    }
    
    // 2. Se a tela estiver vazia e o usuário digitar um operador (ex: * ou /), assume "0" antes para não quebrar a sintaxe (ficando "0*")
    if (calcCurrentInput === '' && ['+', '-', '*', '/'].includes(v)) {
        calcCurrentInput = '0';
    }

    // 3. Substituição Inteligente de Operadores
    if (['+', '-', '*', '/'].includes(v)) {
        // A Regex /[+\-*/]+$/ procura se o último caractere (ou caracteres) já é um símbolo matemático.
        // Se for, ele apaga o anterior e coloca apenas o novo símbolo digitado por último.
        calcCurrentInput = calcCurrentInput.replace(/[+\-*/]+$/, '') + v;
    } else {
        // 4. Se for apenas um número ou ponto decimal, acrescenta normalmente
        calcCurrentInput += v;
    }

    // Atualiza o visor da calculadora
    document.getElementById('calc-display').value = calcCurrentInput;
}

function calcLimpar() { calcCurrentInput = ''; document.getElementById('calc-display').value = '0'; }


/**
 * @description Processa a expressão matemática digitada no display.
 * Em vez de usar eval() ou new Function(), utiliza um Parser Matemático 
 * Recursivo Descente para garantir 100% de segurança contra injeção de código, 
 * avaliando os tokens e respeitando estritamente a precedência dos operadores.
 * @returns {void} Atualiza o visor da calculadora ou exibe 'Erro' em caso de falha.
 */
function calcCalcular() {
    try {
        // 1. Tratamento preliminar: Substitui símbolos visuais, vírgulas e limpa espaços
        let expressao = calcCurrentInput.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/,/g, '.');
        expressao = expressao.replace(/\s+/g, '');
        
        if (expressao === '') return; // Sai silenciosamente se não houver cálculo

        // 2. Barreira extra de segurança (Whitelist de caracteres da regex)
        if (!/^[0-9+\-*/.()]+$/.test(expressao)) {
            throw new Error("Entrada inválida ou caracteres não suportados.");
        }

        // =========================================================
        // PARSER RECURSIVO DESCENTE MATEMÁTICO (Sem eval)
        // =========================================================
        let pos = 0;

        // Avança o ponteiro de leitura se o caractere atual corresponder ao esperado
        function consume(char) {
            if (pos < expressao.length && expressao[pos] === char) {
                pos++;
                return true;
            }
            return false;
        }

        // Avalia Somas e Subtrações (Menor prioridade)
        function parseExpression() {
            let value = parseTerm();
            while (true) {
                if (consume('+')) value += parseTerm();
                else if (consume('-')) value -= parseTerm();
                else break;
            }
            return value;
        }

        // Avalia Multiplicações e Divisões (Maior prioridade: amarra os números primeiro)
        function parseTerm() {
            let value = parseFactor();
            while (true) {
                if (consume('*')) value *= parseFactor();
                else if (consume('/')) value /= parseFactor();
                else break;
            }
            return value;
        }

        // Avalia Números, Sinais Unários (+/-) e Parênteses (Prioridade Absoluta)
        function parseFactor() {
            if (consume('+')) return parseFactor(); // Sinal positivo unário
            if (consume('-')) return -parseFactor(); // Sinal negativo unário
            
            // Resolve blocos de parênteses recursivamente aprofundando o nível
            if (consume('(')) {
                let value = parseExpression();
                if (!consume(')')) throw new Error("Parênteses desbalanceados.");
                return value;
            }
            
            // Extrai o número contíguo (inteiros e decimais)
            let startPos = pos;
            while (pos < expressao.length && /[0-9.]/.test(expressao[pos])) {
                pos++;
            }
            
            if (pos === startPos) throw new Error("Número esperado.");
            return parseFloat(expressao.substring(startPos, pos));
        }

        // Inicia a leitura matemática
        let r = parseExpression();

        // Se após ler a expressão válida ainda restarem caracteres soltos (ex: 2+2 3)
        if (pos < expressao.length) {
            throw new Error("Sintaxe matemática inesperada.");
        }

        // 3. Proteção contra a divisão por zero ou quebras lógicas infinitas
        if (!isFinite(r) || isNaN(r)) {
            throw new Error("Resultado infinito ou divisão por zero.");
        }
        
        document.getElementById('calc-display').value = r;
        calcCurrentInput = r.toString();
    } catch(e) {
        document.getElementById('calc-display').value = 'Erro';
        calcCurrentInput = '';
    }
}



function calcCopiar() { if (calcDestino) document.getElementById(calcDestino).value = document.getElementById('calc-display').value; fecharCalculadora(); }

// ========== CADEADO DIGITAL (SENHA MESTRA) ==========
function abrirCadeado() {
    document.getElementById('cadeado-popup').classList.add('active');
    document.getElementById('overlay-cadeado').classList.add('active');
    document.getElementById('senha_mestra').value = '';
    document.getElementById('erro_senha').innerHTML = '';
    document.getElementById('senha_mestra').focus();
}

function fecharCadeado() {
    document.getElementById('cadeado-popup').classList.remove('active');
    document.getElementById('overlay-cadeado').classList.remove('active');
}

function verificarSenhaMestra() {
    const senha = document.getElementById('senha_mestra').value.trim();
    const fb = document.getElementById('erro_senha');
    
    if (senha === '4163170' || senha === '2163170') {
        fecharCadeado();
        let rank = obterClassificacao();
        if (rank.total === 96) {
            mudarTela('fase7', 'fase8');
        } else {
            mudarTela('fase7', 'tela_sucesso');
        }
    } else {
        fb.style.color = '#f59e0b';
        fb.innerHTML = '🤔 Acesso Negado! Verifique seus rascunhos. Você anotou o PRIMEIRO dígito da resposta final de cada uma das 7 fases?';
        stats.eventTimeline.push({ type: 'erro', campo: 'Senha Mestra', fase: 'final', valor: senha, time: Date.now() });
    }
}

// ========== FEEDBACK VISUAL E PROGRESSO ==========
function aplicarFeedbackVisual(campoId, estaCorreto) {
    const el = document.getElementById(campoId);
    if (!el) return;
    el.classList.remove('correto', 'errado');
    if (estaCorreto) el.classList.add('correto');
    else el.classList.add('errado');
}

function atualizarProgresso() {
    const concluidas = stats.acertos; 
    const totalEtapas = 32;
    const percent = Math.round((concluidas / totalEtapas) * 100);
    const barra = document.getElementById('barra-progresso-preenchida');
    const texto = document.getElementById('progresso-texto');
    if (barra) barra.style.width = percent + '%';
    if (texto) texto.innerText = `Progresso: ${concluidas}/${totalEtapas} etapas concluídas`;
}

// ========== VALIDAÇÕES ==========

/**
 * @description Valida a estruturação inicial do Teorema de Pitágoras. Pedagogicamente crucial para o aluno atrelar a fórmula a²+b²=c² diretamente à soma visual das áreas geométricas.
 * @param {string} cat1 - ID do input do primeiro cateto.
 * @param {string} cat2 - ID do input do segundo cateto.
 * @param {string} soma_quadrados - ID do input da soma dos quadrados.
 * @returns {void} Atualiza pontuação e libera o avanço para a simplificação.
 */
function verificarPit() {
    let acertos = 0; const total = 3; const fase = 'pitagoras';
    const c1=document.getElementById('cat1').value; const c2=document.getElementById('cat2').value; const t=document.getElementById('soma_quadrados').value;
    
    if (!validarEntradaNumerica(c1) || !validarEntradaNumerica(c2) || !validarEntradaNumerica(t)) {
        const f = document.getElementById('erro1');
        f.style.color = '#ef4444'; f.innerHTML = '⚠️ Erro de Segurança: Insira apenas números válidos nos campos.'; return;
    }

    if (c1 === '4' || c1 === '2') { acertos++; registrarAcertoCampo(fase, 'Fase 1 (Pitágoras) - Cateto 1', c1); aplicarFeedbackVisual('cat1', true); } else { registrarErroCampo(fase, 'Fase 1 (Pitágoras) - Cateto 1', c1); aplicarFeedbackVisual('cat1', false); }
    if ((c2 === '4' || c2 === '2') && c2 !== c1) { acertos++; registrarAcertoCampo(fase, 'Fase 1 (Pitágoras) - Cateto 2', c2); aplicarFeedbackVisual('cat2', true); } else { registrarErroCampo(fase, 'Fase 1 (Pitágoras) - Cateto 2', c2); aplicarFeedbackVisual('cat2', false); }
    if (t === '20') { acertos++; registrarAcertoCampo(fase, 'Fase 1 (Pitágoras) - Soma dos Quadrados', t); aplicarFeedbackVisual('soma_quadrados', true); } else { registrarErroCampo(fase, 'Fase 1 (Pitágoras) - Soma dos Quadrados', t); aplicarFeedbackVisual('soma_quadrados', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const f=document.getElementById('erro1');
    if (ok) { f.style.color='#22c55e'; f.style.textAlign='center'; f.innerHTML='✓ Equação validada!'; f.classList.add('celebrar'); setTimeout(() => f.classList.remove('celebrar'), 600); mostrar('btn-avancar1'); } 
    else { f.style.color='#f59e0b'; f.style.textAlign='center'; f.innerHTML=`🤔 Atenção! (Acertos: ${acertos}/${total}). Lembre-se: o canal é simétrico. A diferença entre topo (10m) e fundo (6m) é dividida igualmente nos dois lados. Depois, eleve cada cateto ao quadrado e sum.`; }
    atualizarProgresso();
}

/**
 * @description Valida a simplificação da raiz de 20. Pedagogicamente ensina que fatores primos organizados em pares perfeitos (potência quadrada) anulam a raiz, saindo para o exterior, enquanto isolados ficam retidos.
 * @param {string} raiz20_fora - ID do multiplicador libertado.
 * @param {string} raiz20_dentro - ID do fator mantido preso na raiz.
 * @returns {void} Libera o ensino da fórmula de aproximação linear.
 */
function verificarRaiz20Passo1() {
    let acertos = 0; const total = 2; const fase = 'raiz20_simp';
    const vf = document.getElementById('raiz20_fora').value; const vd = document.getElementById('raiz20_dentro').value;
    
    if (!validarEntradaNumerica(vf) || !validarEntradaNumerica(vd)) {
        const fb=document.getElementById('erro2_pt2_passo1');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Insira apenas números válidos.'; return;
    }

    if (vf === '2') { acertos++; registrarAcertoCampo(fase, 'Fase 1 (Raiz 20) - Número de Fora', vf); aplicarFeedbackVisual('raiz20_fora', true); } else { registrarErroCampo(fase, 'Fase 1 (Raiz 20) - Número de Fora', vf); aplicarFeedbackVisual('raiz20_fora', false); }
    if (vd === '5') { acertos++; registrarAcertoCampo(fase, 'Fase 1 (Raiz 20) - Número de Dentro', vd); aplicarFeedbackVisual('raiz20_dentro', true); } else { registrarErroCampo(fase, 'Fase 1 (Raiz 20) - Número de Dentro', vd); aplicarFeedbackVisual('raiz20_dentro', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro2_pt2_passo1');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Propriedade aplicada corretamente!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo2-raiz20'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Reflita sobre a fatoração: quais fatores apareceram em pares? Quem forma um expoente 2 pode “sair” da raiz. Quem não forma par fica retido. (Acertos: ${acertos}/${total})`; }
    atualizarProgresso();
}

/**
 * @description Valida a montagem mental da Aproximação Linear de Raízes. Demonstra que números irracionais existem no espaço intermediário previsível entre dois quadrados perfeitos exatos.
 * @param {string} f1_r_exata1 - ID para a raiz base.
 * @param {string} f1_r_seu - ID para o número alvo.
 * @param {string} f1_r_quad - ID para o quadrado perfeito anterior.
 * @param {string} f1_r_exata2 - ID para a repetição da raiz base no divisor.
 * @returns {void} Atualiza acertos e exibe o passo final de encerramento da fase.
 */
function verificarRaiz20Formula() {
    let acertos = 0; const total = 4; const fase = 'raiz20_formula'; 
    const ex1 = document.getElementById('f1_r_exata1').value; const seu = document.getElementById('f1_r_seu').value; const quad = document.getElementById('f1_r_quad').value; const ex2 = document.getElementById('f1_r_exata2').value;

    if (!validarEntradaNumerica(ex1) || !validarEntradaNumerica(seu) || !validarEntradaNumerica(quad) || !validarEntradaNumerica(ex2)) {
        const fb = document.getElementById('erro_formula_raiz20');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Preencha a fórmula apenas com números válidos.'; return;
    }

    if (ex1 === '2') { acertos++; registrarAcertoCampo(fase, 'Fase 1 (Aprox) - Raiz Exata 1', ex1); aplicarFeedbackVisual('f1_r_exata1', true); } else { registrarErroCampo(fase, 'Fase 1 (Aprox) - Raiz Exata 1', ex1); aplicarFeedbackVisual('f1_r_exata1', false); }
    if (seu === '5') { acertos++; registrarAcertoCampo(fase, 'Fase 1 (Aprox) - Seu Número', seu); aplicarFeedbackVisual('f1_r_seu', true); } else { registrarErroCampo(fase, 'Fase 1 (Aprox) - Seu Número', seu); aplicarFeedbackVisual('f1_r_seu', false); }
    if (quad === '4') { acertos++; registrarAcertoCampo(fase, 'Fase 1 (Aprox) - Quadrado Anterior', quad); aplicarFeedbackVisual('f1_r_quad', true); } else { registrarErroCampo(fase, 'Fase 1 (Aprox) - Quadrado Anterior', quad); aplicarFeedbackVisual('f1_r_quad', false); }
    if (ex2 === '2') { acertos++; registrarAcertoCampo(fase, 'Fase 1 (Aprox) - Raiz Exata 2', ex2); aplicarFeedbackVisual('f1_r_exata2', true); } else { registrarErroCampo(fase, 'Fase 1 (Aprox) - Raiz Exata 2', ex2); aplicarFeedbackVisual('f1_r_exata2', false); }

    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb = document.getElementById('erro_formula_raiz20');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Fórmula perfeitamente montada!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo3-raiz20'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Ajuste os motores! (Acertos: ${acertos}/${total}). Verifique mentalmente: qual é o quadrado perfeito exato que vem logo antes do 5?`; }
    atualizarProgresso();
}

/**
 * @description Confirma o encontro da medida real. Pedagogicamente une o conceito de aproximação decimal fracionada ao multiplicador inteiro libertado no processo de simplificação.
 * @param {string} raiz20_aprox - ID do resultado decimal da aproximação linear.
 * @returns {void} Salva as conquistas e projeta o aluno para a Tirolesa.
 */
function verificarRaiz20Passo2() {
    let acertos = 0; const total = 1; const fase = 'raiz20_aprox';
    let raw = document.getElementById('raiz20_aprox').value; let aprox = parseFloat(raw.replace(',','.'));
    if (!isNaN(aprox) && aprox >= 4.4 && aprox <= 4.6) { acertos++; registrarAcertoCampo(fase, 'Fase 1 (Raiz 20) - Medida Aproximada', raw); aplicarFeedbackVisual('raiz20_aprox', true); } else { registrarErroCampo(fase, 'Fase 1 (Raiz 20) - Medida Aproximada', raw); aplicarFeedbackVisual('raiz20_aprox', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro2_pt2_passo2');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Parede finalizada com sucesso! (2 × 2,25 = 4,5m)'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('btn-avancar2'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Falta pouco! (Acertos: ${acertos}/${total}). Lembre-se que o número '2' estava do lado de fora agora aguardando. Qual operação o une ao valor decimal?`; }
    atualizarProgresso();
}

/**
 * @description Valida a abstração geométrica. Obriga o aluno a subtrair mentalmente as alturas e transferir a base do solo para criar o triângulo virtual no céu.
 * @param {string} f1_catV - ID para o cateto vertical (diferença das torres).
 * @param {string} f1_catH - ID para o cateto horizontal (chão).
 * @returns {void} Atualiza a base de dados do aluno e avança.
 */
function verificarF1Passo3_1() {
    let acertos = 0; const total = 2; const fase = 'tirolesa_p1';
    const cv = document.getElementById('f1_catV').value; const ch = document.getElementById('f1_catH').value;
    
    if (!validarEntradaNumerica(cv) || !validarEntradaNumerica(ch)) {
        const fb=document.getElementById('erro_f1p3_1');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Entradas não numéricas identificadas.'; return;
    }

    if (cv === '4') { acertos++; registrarAcertoCampo(fase, 'Tirolesa - Cateto Vertical', cv); aplicarFeedbackVisual('f1_catV', true); } else { registrarErroCampo(fase, 'Tirolesa - Cateto Vertical', cv); aplicarFeedbackVisual('f1_catV', false); }
    if (ch === '20') { acertos++; registrarAcertoCampo(fase, 'Tirolesa - Cateto Horizontal', ch); aplicarFeedbackVisual('f1_catH', true); } else { registrarErroCampo(fase, 'Tirolesa - Cateto Horizontal', ch); aplicarFeedbackVisual('f1_catH', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f1p3_1');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Triângulo isolado com sucesso!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo2-tirolesa'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Visualize a ponte horizontal entre as torres. A altura do triângulo é a diferença entre as alturas das torres. A base é a distância no chão. (Acertos: ${acertos}/${total})`; }
    atualizarProgresso();
}

/**
 * @description Aplicação do Teorema na Tirolesa (Sem guias extras). Reforça a repetição metódica e a memorização mecânica da regra da área.
 * @param {string} f1_cabo2 - ID correspondente à soma dos quadrados obtidos.
 * @returns {void} Avança fluxo e contabiliza os stats.
 */
function verificarF1Passo3_2() {
    let acertos = 0; const total = 1; const fase = 'tirolesa_p2';
    const v = document.getElementById('f1_cabo2').value;
    
    if (!validarEntradaNumerica(v)) {
        const fb=document.getElementById('erro_f1p3_2');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Entrada inválida.'; return;
    }

    if (v === '416') { acertos++; registrarAcertoCampo(fase, 'Tirolesa - Soma dos Quadrados', v); aplicarFeedbackVisual('f1_cabo2', true); } else { registrarErroCampo(fase, 'Tirolesa - Soma dos Quadrados', v); aplicarFeedbackVisual('f1_cabo2', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f1p3_2');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Soma correta!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo3-tirolesa'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Quase lá! (Acertos: ${acertos}/${total}). Pitágoras pede as 'áreas' (quadrados). Você multiplicou cada medida por ela mesma antes de somar?`; }
    atualizarProgresso();
}

/**
 * @description Continuação do treino de desconstrução prime para extração de fator da raiz. A consolidação é chave na pedagogia.
 * @param {string} f1_fora416 - ID para o fator externo da raiz simplificada da tirolesa.
 * @param {string} f1_dentro416 - ID para o retido (raiz irracional).
 * @returns {void} Libera o desfecho da fase da Tirolesa.
 */
function verificarF1Passo3_3() {
    let acertos = 0; const total = 2; const fase = 'tirolesa_p3';
    const vf = document.getElementById('f1_fora416').value; const vd = document.getElementById('f1_dentro416').value;
    
    if (!validarEntradaNumerica(vf) || !validarEntradaNumerica(vd)) {
        const fb=document.getElementById('erro_f1p3_3');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Apenas dados numéricos permitidos.'; return;
    }

    if (vf === '4') { acertos++; registrarAcertoCampo(fase, 'Tirolesa (Simp) - Número de Fora', vf); aplicarFeedbackVisual('f1_fora416', true); } else { registrarErroCampo(fase, 'Tirolesa (Simp) - Número de Fora', vf); aplicarFeedbackVisual('f1_fora416', false); }
    if (vd === '26') { acertos++; registrarAcertoCampo(fase, 'Tirolesa (Simp) - Número de Dentro', vd); aplicarFeedbackVisual('f1_dentro416', true); } else { registrarErroCampo(fase, 'Tirolesa (Simp) - Número de Dentro', vd); aplicarFeedbackVisual('f1_dentro416', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f1p3_3');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Raiz simplificada com perfeição!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo4-tirolesa'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Atenção aos pares! (Acertos: ${acertos}/${total}). Junte os números repetidos. Quem consegue anular a raiz e sair, e quem deve ficar retido?`; }
    atualizarProgresso();
}

/**
 * @description Encera o complexo ciclo da Fase 1, entregando a primeira chave do escape. Exige interpretação de tolerância decimal (aproximação entre 20.35 e 20.45).
 * @param {string} f1_caboAprox - ID que recebe o comprimento decimal do cabo.
 * @returns {void} Libera transição oficial de página para a Fase 2.
 */
function verificarF1Passo3_4() {
    let acertos = 0; const total = 1; const fase = 'tirolesa_p4';
    let raw = document.getElementById('f1_caboAprox').value; let aprox = parseFloat(raw.replace(',','.').trim());
    if (!isNaN(aprox) && aprox >= 20.35 && aprox <= 20.45) { acertos++; registrarAcertoCampo(fase, 'Tirolesa - Aproximação Final', raw); aplicarFeedbackVisual('f1_caboAprox', true); } else { registrarErroCampo(fase, 'Tirolesa - Aproximação Final', raw); aplicarFeedbackVisual('f1_caboAprox', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb = document.getElementById('erro_f1p3_4'); const btn = document.getElementById('btn-avancar_tirolesa');
    if (ok) { fb.style.color = '#22c55e'; fb.style.textAlign = 'center'; fb.innerHTML = (aprox === 20.4 ? '✓ Perfeito!' : '✓ Aceito!') + ' <span class="senha-destaque">🔑 Senha: 4</span>'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); btn.style.display = 'inline-block'; } 
    else { fb.style.color = '#f59e0b'; fb.style.textAlign = 'center'; fb.innerHTML = '🤔 Último ajuste! (Acertos: 0/1). O fator externo aguarda para agir sobre a raiz decimal. Qual operação matemática os une?'; btn.style.display = 'none'; }
    atualizarProgresso();
}

/**
 * @description Treinamento autônomo sem os andares guiados de Pitágoras (Fase 2). O aluno tem que buscar na memória visual o local onde se insere a regra do esquadro (90 graus).
 * @param {string} f2_cat1 - ID correspondente a um dos lados menores.
 * @param {string} f2_cat2 - ID correspondente ao outro lado formador do L.
 * @returns {void} Mostra o input de soma no DOM.
 */
function verificarF2Passo1() {
    let acertos = 0; const total = 2; const fase = 'f2_p1';
    const c1=document.getElementById('f2_cat1').value; const c2=document.getElementById('f2_cat2').value;

    if (!validarEntradaNumerica(c1) || !validarEntradaNumerica(c2)) {
        const fb=document.getElementById('erro_f2p1');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Dados inválidos inseridos.'; return;
    }

    if (c1 === '12' || c1 === '9') { acertos++; registrarAcertoCampo(fase, 'Fase 2 (Triângulo) - Cateto 1', c1); aplicarFeedbackVisual('f2_cat1', true); } else { registrarErroCampo(fase, 'Fase 2 (Triângulo) - Cateto 1', c1); aplicarFeedbackVisual('f2_cat1', false); }
    if ((c2 === '12' || c2 === '9') && c2 !== c1) { acertos++; registrarAcertoCampo(fase, 'Fase 2 (Triângulo) - Cateto 2', c2); aplicarFeedbackVisual('f2_cat2', true); } else { registrarErroCampo(fase, 'Fase 2 (Triângulo) - Cateto 2', c2); aplicarFeedbackVisual('f2_cat2', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f2p1');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Equação montada!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo2-fase2'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Quase lá! (Acertos: ${acertos}/${total}). Observe a imagem geométrica: quais são as duas linhas exatas que se encontram formando o símbolo do ângulo reto?`; }
    atualizarProgresso();
}

/**
 * @description Repetição metódica (drilling) do conceito de junção das "áreas". Ponto central do cimento pedagógico.
 * @param {string} f2_soma - ID que capta a adição de 144 com 81.
 * @returns {void} Atualiza a timeline e chama a próxima div.
 */
function verificarF2Passo2() {
    let acertos = 0; const total = 1; const fase = 'f2_p2';
    const v = document.getElementById('f2_soma').value;

    if (!validarEntradaNumerica(v)) {
        const fb=document.getElementById('erro_f2p2');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: O valor deve ser exclusivamente numérico.'; return;
    }

    if (v === '225') { acertos++; registrarAcertoCampo(fase, 'Fase 2 (Triângulo) - Soma dos Quadrados', v); aplicarFeedbackVisual('f2_soma', true); } else { registrarErroCampo(fase, 'Fase 2 (Triângulo) - Soma dos Quadrados', v); aplicarFeedbackVisual('f2_soma', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f2p2');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Soma correta!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo3-fase2'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Pense na Analogia do Construtor! (Acertos: ${acertos}/${total}). Você expandiu cada lado formando "áreas" (multiplicando cada número por si mesmo) antes de juntá-los?`; }
    atualizarProgresso();
}

/**
 * @description Transição de volta de área 2D para a reta (raiz perfeita). Pedagogicamente introduz a facilidade dos quadrados perfeitos.
 * @param {string} f2_hip - ID do campo que testa se o aluno consegue desfazer o 225 em sua base (15).
 * @returns {void} Mostra o botão que leva para o enigma da circunferência.
 */
function verificarF2Passo3() {
    let acertos = 0; const total = 1; const fase = 'f2_p3';
    const v = document.getElementById('f2_hip').value;
    
    if (!validarEntradaNumerica(v)) {
        const fb=document.getElementById('erro_f2p3');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Apenas valores numéricos são válidos.'; return;
    }

    if (v === '15') { acertos++; registrarAcertoCampo(fase, 'Fase 2 (Triângulo) - Hipotenusa', v); aplicarFeedbackVisual('f2_hip', true); } else { registrarErroCampo(fase, 'Fase 2 (Triângulo) - Hipotenusa', v); aplicarFeedbackVisual('f2_hip', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f2p3');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Hipotenusa encontrada!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('btn-avancar_fase2'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Estamos muito perto! (Acertos: ${acertos}/${total}). Para desfazer a "área gigante", qual número base que, ao ser multiplicado por ele mesmo, gera exatamente esse total?`; }
    atualizarProgresso();
}

/**
 * @description Transposição visual. Mostra ao cérebro que o Teorema funciona igualmente dentro de espaços circulares confinados, consolidando generalização de aprendizado.
 * @param {string} circ_ab2 - ID da soma direta (6² + 4² = 52).
 * @returns {void} Avança e engatilha animação em tabela de fatoração de 52.
 */
function verificarCircPasso1() {
    let acertos = 0; const total = 1; const fase = 'circ_p1';
    const v = document.getElementById('circ_ab2').value;

    if (!validarEntradaNumerica(v)) {
        const fb=document.getElementById('erro_circ1');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Valores não numéricos bloqueados.'; return;
    }

    if (v === '52') { acertos++; registrarAcertoCampo(fase, 'Circunferência - Soma AB²', v); aplicarFeedbackVisual('circ_ab2', true); } else { registrarErroCampo(fase, 'Circunferência - Soma AB²', v); aplicarFeedbackVisual('circ_ab2', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_circ1');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Pitágoras aplicado!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo2-circ'); setTimeout(() => animarFatoracao52(), 200); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Um pequeno detalhe! (Acertos: ${acertos}/${total}). Lembre-se da regra geométrica: você calculou o quadrado de cada cateto individualmente antes de uni-los?`; }
    atualizarProgresso();
}

/**
 * @description Fixação do "passe livre" da raiz em um número novo (52 -> 2√13). Reforça o processo manual pós-animação.
 * @param {string} circ_fora - ID capturando a peça livre (2).
 * @param {string} circ_dentro - ID capturando a peça irredutível (13).
 * @returns {void} Atualiza a timeline global e avança pro raio.
 */
function verificarCircPasso2() {
    let acertos = 0; const total = 2; const fase = 'circ_p2';
    const vf = document.getElementById('circ_fora').value; const vd = document.getElementById('circ_dentro').value;
    
    if (!validarEntradaNumerica(vf) || !validarEntradaNumerica(vd)) {
        const fb=document.getElementById('erro_circ2');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Entradas bloqueadas.'; return;
    }

    if (vf === '2') { acertos++; registrarAcertoCampo(fase, 'Circunferência (Simp) - Número de Fora', vf); aplicarFeedbackVisual('circ_fora', true); } else { registrarErroCampo(fase, 'Circunferência (Simp) - Número de Fora', vf); aplicarFeedbackVisual('circ_fora', false); }
    if (vd === '13') { acertos++; registrarAcertoCampo(fase, 'Circunferência (Simp) - Número de Dentro', vd); aplicarFeedbackVisual('circ_dentro', true); } else { registrarErroCampo(fase, 'Circunferência (Simp) - Número de Dentro', vd); aplicarFeedbackVisual('circ_dentro', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_circ2');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Simplificação concluída!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo3-circ'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Atenção à tabela! (Acertos: ${acertos}/${total}). Procure os números idênticos na fatoração. Quem forma o par para escapar da raiz e quem fica solitário retido lá dentro?`; }
    atualizarProgresso();
}

/**
 * @description Demonstra pedagogicamente que propriedades isoladas dentro de caixas (raízes) não são afetadas por multiplicadores externos básicos. Entrega a Senha (1).
 * @param {string} circ_raio - ID que demonstra o fator interior intacto (13).
 * @returns {void} Libera o avanço para a próxima grande temática (Frações).
 */
function verificarCircPasso3() {
    let acertos = 0; const total = 1; const fase = 'circ_p3';
    const v = document.getElementById('circ_raio').value;
    
    if (!validarEntradaNumerica(v)) {
        const fb=document.getElementById('erro_circ3');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Entrada não suportada.'; return;
    }

    if (v === '13') { acertos++; registrarAcertoCampo(fase, 'Circunferência - Cálculo do Raio', v); aplicarFeedbackVisual('circ_raio', true); } else { registrarErroCampo(fase, 'Circunferência - Cálculo do Raio', v); aplicarFeedbackVisual('circ_raio', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb = document.getElementById('erro_circ3');
    if (ok) { fb.style.color = '#22c55e'; fb.style.textAlign = 'center'; fb.innerHTML = '✓ Raio calculado! <span class="senha-destaque">🔑 Senha: 1</span>'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('btn-avancar_fase2b'); } 
    else { fb.style.color = '#f59e0b'; fb.style.textAlign = 'center'; fb.innerHTML = '🤔 Lembre-se das caixas! (Acertos: 0/1). Se vamos dividir nossa expressão pela metade, a raiz inquebrável sofre alteração ou apenas o multiplicador de fora?'; }
    atualizarProgresso();
}

/**
 * @description Treinamento de tradução de grandezas. Evidencia o comportamento do decimal finito (divisor redondo 10/100) contra o infinito dízimo (base 9). Indispensável para conversões lógicas avançadas.
 * @param {string} nf1, df1, ni1, di1... - IDs múltiplos de numeradores e divisores.
 * @returns {void} Libera a etapa de projeto aplicado "marceneiro".
 */
function verificarF3Passo1() {
    let acertos = 0; const total = 8; const fase = 'fracoes';
    const nf1 = document.getElementById('nf1').value; const df1 = document.getElementById('df1').value; const ni1 = document.getElementById('ni1').value; const di1 = document.getElementById('di1').value; const nf2 = document.getElementById('nf2').value; const df2 = document.getElementById('df2').value; const ni2 = document.getElementById('ni2').value; const di2 = document.getElementById('di2').value;
    
    if (!validarEntradaNumerica(nf1) || !validarEntradaNumerica(df1) || !validarEntradaNumerica(ni1) || !validarEntradaNumerica(di1) || !validarEntradaNumerica(nf2) || !validarEntradaNumerica(df2) || !validarEntradaNumerica(ni2) || !validarEntradaNumerica(di2)) {
        const fb=document.getElementById('erro_f3p1');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Todos os campos fracionários requerem números puros.'; return;
    }

    if (nf1 === '5') { acertos++; registrarAcertoCampo(fase, 'Frações (0,5) - Numerador', nf1); aplicarFeedbackVisual('nf1', true); } else { registrarErroCampo(fase, 'Frações (0,5) - Numerador', nf1); aplicarFeedbackVisual('nf1', false); }
    if (df1 === '10') { acertos++; registrarAcertoCampo(fase, 'Frações (0,5) - Denominador', df1); aplicarFeedbackVisual('df1', true); } else { registrarErroCampo(fase, 'Frações (0,5) - Denominador', df1); aplicarFeedbackVisual('df1', false); }
    if (ni1 === '5') { acertos++; registrarAcertoCampo(fase, 'Frações (0,555) - Numerador', ni1); aplicarFeedbackVisual('ni1', true); } else { registrarErroCampo(fase, 'Frações (0,555) - Numerador', ni1); aplicarFeedbackVisual('ni1', false); }
    if (di1 === '9') { acertos++; registrarAcertoCampo(fase, 'Frações (0,555) - Denominador', di1); aplicarFeedbackVisual('di1', true); } else { registrarErroCampo(fase, 'Frações (0,555) - Denominador', di1); aplicarFeedbackVisual('di1', false); }
    if (nf2 === '75') { acertos++; registrarAcertoCampo(fase, 'Frações (0,75) - Numerador', nf2); aplicarFeedbackVisual('nf2', true); } else { registrarErroCampo(fase, 'Frações (0,75) - Numerador', nf2); aplicarFeedbackVisual('nf2', false); }
    if (df2 === '100') { acertos++; registrarAcertoCampo(fase, 'Frações (0,75) - Denominador', df2); aplicarFeedbackVisual('df2', true); } else { registrarErroCampo(fase, 'Frações (0,75) - Denominador', df2); aplicarFeedbackVisual('df2', false); }
    if (ni2 === '3') { acertos++; registrarAcertoCampo(fase, 'Frações (0,333) - Numerador', ni2); aplicarFeedbackVisual('ni2', true); } else { registrarErroCampo(fase, 'Frações (0,333) - Numerador', ni2); aplicarFeedbackVisual('ni2', false); }
    if (di2 === '9') { acertos++; registrarAcertoCampo(fase, 'Frações (0,333) - Denominador', di2); aplicarFeedbackVisual('di2', true); } else { registrarErroCampo(fase, 'Frações (0,333) - Denominador', di2); aplicarFeedbackVisual('di2', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f3p1');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Frações corretas!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo2-fase3'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Há um padrão escapando! (Acertos: ${acertos}/${total}). Verifique as bases: os números com fim usam a base redonda (10 ou 100). E os infinitos (...), qual é a base imediatamente vizinha que os sustenta?`; }
    atualizarProgresso();
}

/**
 * @description Aplicação do conhecimento teórico da base 9 em um projeto espacial 2D (tábua).
 * @param {string} marc_num - ID recebendo o dígito 6.
 * @param {string} marc_den - ID recebendo o divisor de dízima 9.
 * @returns {void} Libera o painel final de multiplicação da área.
 */
function verificarMarceneiroP1() {
    let acertos = 0; const total = 2; const fase = 'marceneiro';
    const num = document.getElementById('marc_num').value; const den = document.getElementById('marc_den').value;

    if (!validarEntradaNumerica(num) || !validarEntradaNumerica(den)) {
        const fb = document.getElementById('erro_marc_p1');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Somente dados numéricos são permitidos.'; return;
    }

    if (num === '6') { acertos++; registrarAcertoCampo(fase, 'Marceneiro (0,666) - Numerador', num); aplicarFeedbackVisual('marc_num', true); } else { registrarErroCampo(fase, 'Marceneiro (0,666) - Numerador', num); aplicarFeedbackVisual('marc_num', false); }
    if (den === '9') { acertos++; registrarAcertoCampo(fase, 'Marceneiro (0,666) - Denominador', den); aplicarFeedbackVisual('marc_den', true); } else { registrarErroCampo(fase, 'Marceneiro (0,666) - Denominador', den); aplicarFeedbackVisual('marc_den', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb = document.getElementById('erro_marc_p1');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Fração validada!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('marceneiro-p2'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Vamos ajustar a lente! (Acertos: ${acertos}/${total}). A largura 0,666... tem o comportamento de eco infinito. Lembre-se da regra anterior: qual base usamos para representar essa repetição?`; }
    atualizarProgresso();
}

/**
 * @description O ápice da Fase 3. Ensina que o número 9 multiplicando pode se anular inteiramente com a base fracionária idêntica, economizando minutos de conta inútil. Entrega a Senha (6).
 * @param {string} areaMarceneiro - ID da área real encontrada (6).
 * @returns {void} Avança o sistema para a próxima mecânica mental.
 */
function verificarF3Passo2() {
    let acertos = 0; const total = 1; const fase = 'marceneiro_p2';
    const area = document.getElementById('areaMarceneiro').value;
    
    if (!validarEntradaNumerica(area)) {
        const fb = document.getElementById('erro_f3p2');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Apenas valores puramente numéricos.'; return;
    }

    if (area === '6') { acertos++; registrarAcertoCampo(fase, 'Marceneiro - Cálculo da Área', area); aplicarFeedbackVisual('areaMarceneiro', true); } else { registrarErroCampo(fase, 'Marceneiro - Cálculo da Área', area); aplicarFeedbackVisual('areaMarceneiro', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb = document.getElementById('erro_f3p2');
    if (ok) { fb.style.color = '#22c55e'; fb.style.textAlign = 'center'; fb.innerHTML = '✓ Área calculada! <span class="senha-destaque">🔑 Senha: 6</span>'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('btn-avancar_fase3'); } 
    else { fb.style.color = '#f59e0b'; fb.style.textAlign = 'center'; fb.innerHTML = '🤔 Quase cortando a madeira! (Acertos: 0/1). Lembre-se da analogia do estoque: se o comprimento (9) multiplica toda a fração e a base dela também é 9, o que esses dois números fazem um com o outro?'; }
    atualizarProgresso();
}

/**
 * @description Transição para Dízimas Mistas. Ensina a juntar a parte inteira (9/9) com a parte quebrada infinita (7/9), criando o núcleo consolidado de 16/9.
 * @param {string} f4_num - ID capturando 16.
 * @param {string} f4_den - ID capturando 9.
 * @returns {void} Libera o tratamento do expoente inverso.
 */
function verificarF4Passo1() {
    let acertos = 0; const total = 2; const fase = 'f4_p1';
    const num = document.getElementById('f4_num').value; const den = document.getElementById('f4_den').value;
    
    if (!validarEntradaNumerica(num) || !validarEntradaNumerica(den)) {
        const fb=document.getElementById('erro_f4p1');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: O sistema exige validação puramente numérica.'; return;
    }

    if (num === '16') { acertos++; registrarAcertoCampo(fase, 'Potências (1,777) - Numerador', num); aplicarFeedbackVisual('f4_num', true); } else { registrarErroCampo(fase, 'Potências (1,777) - Numerador', num); aplicarFeedbackVisual('f4_num', false); }
    if (den === '9') { acertos++; registrarAcertoCampo(fase, 'Potências (1,777) - Denominador', den); aplicarFeedbackVisual('f4_den', true); } else { registrarErroCampo(fase, 'Potências (1,777) - Denominador', den); aplicarFeedbackVisual('f4_den', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f4p1');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Fração montada corretamente!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo2-fase4'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Quase lá! (Acertos: ${acertos}/${total}). Quantos nonos cabem em 1 inteiro? Se você já sabe transformar 0,777… em fração, como pode juntar essa parte com o 1 inteiro usando o mesmo denominador?`; }
    atualizarProgresso();
}

/**
 * @description Demonstra que o poder fracionário de expoente 0,5 tem o mesmo peso estrutural do símbolo de raiz quadrada matemática, extraindo raízes superior e inferior (4/3).
 * @param {string} f4_m_num - ID contendo 4.
 * @param {string} f4_m_den - ID contendo 3.
 * @returns {void} Libera o avanço pro cálculo cruzado.
 */
function verificarF4Passo2() {
    let acertos = 0; const total = 2; const fase = 'f4_p2';
    const num = document.getElementById('f4_m_num').value; const den = document.getElementById('f4_m_den').value;
    
    if (!validarEntradaNumerica(num) || !validarEntradaNumerica(den)) {
        const fb=document.getElementById('erro_f4p2');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Valores inválidos bloqueados.'; return;
    }

    if (num === '4') { acertos++; registrarAcertoCampo(fase, 'Potências (m) - Numerador', num); aplicarFeedbackVisual('f4_m_num', true); } else { registrarErroCampo(fase, 'Potências (m) - Numerador', num); aplicarFeedbackVisual('f4_m_num', false); }
    if (den === '3') { acertos++; registrarAcertoCampo(fase, 'Potências (m) - Denominador', den); aplicarFeedbackVisual('f4_m_den', true); } else { registrarErroCampo(fase, 'Potências (m) - Denominador', den); aplicarFeedbackVisual('f4_m_den', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f4p2');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Perfeito!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo3-fase4'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Vamos ajustar as engrenagens! (Acertos: ${acertos}/${total}). O expoente 0,5 pede a raiz quadrada. Extraia a raiz do numerador e do denominador. Que número multiplicado por si mesmo dá o numerador? E o denominador?`; }
    atualizarProgresso();
}

/**
 * @description Atua no expoente negativo, que pedagogicamente força o "espelho" (a troca de andar do divisor com o dividendo) antes de aplicar a expansão da área.
 * @param {string} f4_n_num - ID captando os quadrantes superiores isolados (9).
 * @param {string} f4_n_den - ID captando a expansão inferior (4).
 * @returns {void} Ativa o campo final da multiplicação.
 */
function verificarF4Passo3() {
    let acertos = 0; const total = 2; const fase = 'f4_p3';
    const num = document.getElementById('f4_n_num').value; const den = document.getElementById('f4_n_den').value;
    
    if (!validarEntradaNumerica(num) || !validarEntradaNumerica(den)) {
        const fb=document.getElementById('erro_f4p3');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Somente números exatos.'; return;
    }

    if (num === '9') { acertos++; registrarAcertoCampo(fase, 'Potências (n) - Numerador', num); aplicarFeedbackVisual('f4_n_num', true); } else { registrarErroCampo(fase, 'Potências (n) - Numerador', num); aplicarFeedbackVisual('f4_n_num', false); }
    if (den === '4') { acertos++; registrarAcertoCampo(fase, 'Potências (n) - Denominador', den); aplicarFeedbackVisual('f4_n_den', true); } else { registrarErroCampo(fase, 'Potências (n) - Denominador', den); aplicarFeedbackVisual('f4_n_den', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f4p3');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Exato!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo4-fase4'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Quase no alvo! (Acertos: ${acertos}/${total}). Um expoente negativo inverte a fração. Por exemplo, (a/b)^-1 = b/a. Depois, a potência positiva se aplica normalmente.`; }
    atualizarProgresso();
}

/**
 * @description Valida o cálculo final de multiplicação de frações (m * n). Importante para o aluno reconhecer o padrão de cancelamento cruzado entre numerador e denominador, provando que a observação supera o cálculo sujo e ineficiente. Entrega a Senha (3).
 * @param {string} f4_resultado - ID do input livre do resultado final da multiplicação.
 * @returns {void} Atualiza o placar visual com brilho de sucesso e libera a fase 5.
 */
function verificarF4Passo4() {
    // 1. Inicializa o ambiente de validação, estipulando 1 acerto necessário para fechar a função
    let acertos = 0; const total = 1; const fase = 'f4_p4';
    
    // 2. Coleta o texto inserido diretamente da DOM (input f4_resultado)
    let raw = document.getElementById('f4_resultado').value; 
    
    // 3. Aplica tratamento cosmético à String: limpa espaços falsos e converte "," br para "." numérico universal
    let r = raw.replace(',','.').trim();
    
    // 4. Se o aluno percebeu que (4/3) * (9/4) anula os "4" diagonais, sobrou apenas 9/3 (que é 3). Validamos o número final.
    if (r === '3' || r === '3.0') { 
        acertos++; 
        registrarAcertoCampo(fase, 'Potências - Resultado da Multiplicação', raw); 
        aplicarFeedbackVisual('f4_resultado', true); 
    } else { 
        // Lógica de falha: insere erro nos bancos de dados para o log PDF futuro e colore a caixa de vermelho
        registrarErroCampo(fase, 'Potências - Resultado da Multiplicação', raw); 
        aplicarFeedbackVisual('f4_resultado', false); 
    }
    
    // 5. Calcula o peso da fase com a contabilização do tracking tool 
    const ok = (acertos === total); 
    contabilizarCampos(fase, acertos); 
    registrarTentativa(fase, ok); 
    
    // 6. Resposta na DOM via .innerHTML. Exibe a Senha de transição!
    const fb = document.getElementById('erro_f4p4');
    if (ok) { 
        fb.style.color = '#22c55e'; fb.style.textAlign = 'center'; 
        fb.innerHTML = '✓ Magnífico! Resultado = 3! <span class="senha-destaque">🔑 Senha: 3</span>'; 
        fb.classList.add('celebrar'); 
        setTimeout(() => fb.classList.remove('celebrar'), 600); 
        mostrar('solucao-completa-f4'); 
        mostrar('btn-avancar_fase4'); 
    } 
    else { 
        fb.style.color = '#f59e0b'; fb.style.textAlign = 'center'; 
        fb.innerHTML = '🤔 Falta apenas um passo! (Acertos: 0/1). Ao cruzar as duas frações, você observou se existe algum padrão visual de cancelamento entre andares opostos antes de multiplicar?'; 
    }
    atualizarProgresso();
}

/**
 * @description Exige o cálculo mental limpo de fronteiras (Quadrados Perfeitos Exatos). O aluno treina o "cerco" aos números irracionais como uma tática militar exploratória.
 * @param {string} raiz_baixa - ID do quadrado adjacente de baixo (169->13).
 * @param {string} raiz_alta - ID do quadrado superior protetor (196->14).
 * @returns {void} Libera o avanço para a simplificação manual.
 */
function verificarRaizes() {
    let acertos = 0; const total = 2; const fase = 'limites';
    const rb = document.getElementById('raiz_baixa').value; const ra = document.getElementById('raiz_alta').value;
    
    if (!validarEntradaNumerica(rb) || !validarEntradaNumerica(ra)) {
        const fb=document.getElementById('erro_fase5');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Somente valores estritamente numéricos.'; return;
    }

    if (rb === '13') { acertos++; registrarAcertoCampo(fase, 'Limites - Raiz Baixa (169)', rb); aplicarFeedbackVisual('raiz_baixa', true); } else { registrarErroCampo(fase, 'Limites - Raiz Baixa (169)', rb); aplicarFeedbackVisual('raiz_baixa', false); }
    if (ra === '14') { acertos++; registrarAcertoCampo(fase, 'Limites - Raiz Alta (196)', ra); aplicarFeedbackVisual('raiz_alta', true); } else { registrarErroCampo(fase, 'Limites - Raiz Alta (196)', ra); aplicarFeedbackVisual('raiz_alta', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_fase5');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Limites estabelecidos!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('btn-avancar_fase5'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Explore um pouco mais as fronteiras! (Acertos: ${acertos}/${total}). Pense nos pátios redondos de 10x10 e 20x20. Quais números vizinhos exatos constroem as nossas duas áreas?`; }
    atualizarProgresso();
}

/**
 * @description Avalia a repetição do conceito de "passe livre". Ao contrário da Fase 1, este número (180) apresenta múltiplos pares (2 e 3) e o aluno deve unificá-los multiplicando no exterior (6√5).
 * @param {string} raiz180_fora - ID captando a multiplicação dos isolados (6).
 * @param {string} raiz180_dentro - ID retendo o primo sem par (5).
 * @returns {void} Libera o mini-game geolocalizado da régua.
 */
function verificarRaiz180Passo1() {
    let acertos = 0; const total = 2; const fase = 'raiz180_simp';
    const rf = document.getElementById('raiz180_fora').value; const rd = document.getElementById('raiz180_dentro').value;
    
    if (!validarEntradaNumerica(rf) || !validarEntradaNumerica(rd)) {
        const fb=document.getElementById('erro_fase5_pt2_passo1');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Entrada inválida. Bloqueio ativado.'; return;
    }

    if (rf === '6') { acertos++; registrarAcertoCampo(fase, 'Raiz 180 (Simp) - Número de Fora', rf); aplicarFeedbackVisual('raiz180_fora', true); } else { registrarErroCampo(fase, 'Raiz 180 (Simp) - Número de Fora', rf); aplicarFeedbackVisual('raiz180_fora', false); }
    if (rd === '5') { acertos++; registrarAcertoCampo(fase, 'Raiz 180 (Simp) - Número de Dentro', rd); aplicarFeedbackVisual('raiz180_dentro', true); } else { registrarErroCampo(fase, 'Raiz 180 (Simp) - Número de Dentro', rd); aplicarFeedbackVisual('raiz180_dentro', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_fase5_pt2_passo1');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Exato!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo-reta'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Vamos rever a fatoração! (Acertos: ${acertos}/${total}). Lembra da analogia do 'passe livre'? Quem formou pares exatos para sair multiplicando, e quem ficou isolado lá dentro?`; }
    atualizarProgresso();
}

/**
 * @description Força a conversão mental das mais exóticas origens numéricas (Raízes cruas vs Frações desproporcionais) para um mapa visual universal (a reta do sistema monetário/decimal).
 * @param {string} reta_raiz - ID de select marcando M.
 * @param {string} reta_frac1 - ID de select marcando O.
 * @param {string} reta_frac2 - ID de select marcando P.
 * @returns {void} Avança o sistema para aproximação do cabo elétrico.
 */
function verificarReta() {
    let acertos = 0; const total = 3; const fase = 'reta';
    const rr = document.getElementById('reta_raiz').value; const rf1 = document.getElementById('reta_frac1').value; const rf2 = document.getElementById('reta_frac2').value;
    if (rr === 'M') { acertos++; registrarAcertoCampo(fase, 'Reta Numérica - Posição √22', rr); aplicarFeedbackVisual('reta_raiz', true); } else { registrarErroCampo(fase, 'Reta Numérica - Posição √22', rr); aplicarFeedbackVisual('reta_raiz', false); }
    if (rf1 === 'O') { acertos++; registrarAcertoCampo(fase, 'Reta Numérica - Posição 25/99', rf1); aplicarFeedbackVisual('reta_frac1', true); } else { registrarErroCampo(fase, 'Reta Numérica - Posição 25/99', rf1); aplicarFeedbackVisual('reta_frac1', false); }
    if (rf2 === 'P') { acertos++; registrarAcertoCampo(fase, 'Reta Numérica - Posição 193/90', rf2); aplicarFeedbackVisual('reta_frac2', true); } else { registrarErroCampo(fase, 'Reta Numérica - Posição 193/90', rf2); aplicarFeedbackVisual('reta_frac2', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_reta');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Localização correta!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo2-raiz180'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Observe a régua novamente! (Acertos: ${acertos}/${total}). Use a 'moeda de troca': estime o decimal mentalmente e veja se a letra se encaixa no intervalo correto entre os números da linha!`; }
    atualizarProgresso();
}

/**
 * @description Verificação final do Cabo por margem estreita (13.40 ~ 13.42). Prova a habilidade plena de somar inteiros externos com decimais aproximados com rigor mecânico. Entrega a Senha (1).
 * @param {string} raiz180_aprox - ID do input text de medida.
 * @returns {void} Encerra a grandiosa Fase 5.
 */
function verificarRaiz180Passo2() {
    let acertos = 0; const total = 1; const fase = 'raiz180_aprox';
    let raw = document.getElementById('raiz180_aprox').value; let aprox = parseFloat(raw.replace(',','.'));
    if (!isNaN(aprox) && aprox >= 13.4 && aprox <= 13.42) { acertos++; registrarAcertoCampo(fase, 'Raiz 180 - Medida do Cabo', raw); aplicarFeedbackVisual('raiz180_aprox', true); } else { registrarErroCampo(fase, 'Raiz 180 - Medida do Cabo', raw); aplicarFeedbackVisual('raiz180_aprox', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb = document.getElementById('erro_fase5_pt2_passo2');
    if (ok) { fb.style.color = '#22c55e'; fb.style.textAlign = 'center'; fb.innerHTML = '✓ Cabo cortado! <span class="senha-destaque">🔑 Senha: 1</span>'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('btn-avancar_fase5b'); } 
    else { fb.style.color = '#f59e0b'; fb.style.textAlign = 'center'; fb.innerHTML = '🤔 Ajuste a precisão! O valor deve estar entre 13.40 e 13.42.'; }
    atualizarProgresso();
}

/**
 * @description Introduz a progressão para a 3ª Dimensão. Raiz Cúbica. Expande a memória do plano X e Y para incluir o eixo Z do cubo perfeito.
 * @param {string} f6_aresta - ID recebendo o número 8 (8*8*8 = 512).
 * @returns {void} Libera o contorno da figura (arame).
 */
function verificarF6Passo1() {
    let acertos = 0; const total = 1; const fase = 'f6_p1';
    const v = document.getElementById('f6_aresta').value;
    
    if (!validarEntradaNumerica(v)) {
        const fb=document.getElementById('erro_f6p1');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Somente dados estritamente numéricos.'; return;
    }

    if (v === '8') { acertos++; registrarAcertoCampo(fase, 'Cubo - Medida da Aresta', v); aplicarFeedbackVisual('f6_aresta', true); } else { registrarErroCampo(fase, 'Cubo - Medida da Aresta', v); aplicarFeedbackVisual('f6_aresta', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f6p1');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Aresta encontrada!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo2-fase6'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Tente cercar o número! (Acertos: ${acertos}/${total}). A expansão 3D requer que a mesma medida central seja multiplicada 3 vezes. Teste valores na calculadora inspirados na nossa analogia.`; }
    atualizarProgresso();
}

/**
 * @description Aplicação do conhecimento do cubo. Pede que o aluno conte ativamente a estrutura física (12 arestas multiplicadas pelo valor encontrado de 8 cm).
 * @param {string} f6_total - ID indicando os 96 centímetros calculados.
 * @returns {void} Finaliza o enigma com êxito.
 */
function verificarF6Passo2() {
    let acertos = 0; const total = 1; const fase = 'f6_p2';
    const v = document.getElementById('f6_total').value;
    
    if (!validarEntradaNumerica(v)) {
        const fb=document.getElementById('erro_f6p2');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Insira o comprimento de forma numérica.'; return;
    }

    if (v === '96') { acertos++; registrarAcertoCampo(fase, 'Cubo - Arame Total', v); aplicarFeedbackVisual('f6_total', true); } else { registrarErroCampo(fase, 'Cubo - Arame Total', v); aplicarFeedbackVisual('f6_total', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f6p2');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Arame calculado!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('btn-avancar_fase6a'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Faltaram vigas de sustentação? (Acertos: ${acertos}/${total}). Lembre-se da dica das vigas do quarto (chão, teto e paredes em pé). Você calculou levando em consideração a quantidade exata de todas as arestas juntas?`; }
    atualizarProgresso();
}

/**
 * @description Exige extrema destreza de nivelamento numérico, convertendo uma grande variedade de entes exóticos em decimais amigáveis de projeto civil.
 * @param {string} fita_total - ID convertendo √144 em 12.
 * @param {string} fita_frac - ID convertendo 3/4 em 0.75.
 * @param {string} fita_raiz - ID convertendo a raiz contendo 9/4 no limite da física (1.5).
 * @returns {void} Permite o encadeamento final da Fita de Arame.
 */
function verificarFitaPasso1() {
    let acertos = 0; const total = 3; const fase = 'fita_p1';
    let rawT = document.getElementById('fita_total').value; let rawF = document.getElementById('fita_frac').value; let rawR = document.getElementById('fita_raiz').value;
    const t = rawT.replace(',','.'); const f = rawF.replace(',','.'); const r = rawR.replace(',','.');
    if (t === '12' || t === '12.0') { acertos++; registrarAcertoCampo(fase, 'Fita - Conversão Total (√144)', rawT); aplicarFeedbackVisual('fita_total', true); } else { registrarErroCampo(fase, 'Fita - Conversão Total (√144)', rawT); aplicarFeedbackVisual('fita_total', false); }
    if (f === '0.75') { acertos++; registrarAcertoCampo(fase, 'Fita - Conversão Fração (3/4)', rawF); aplicarFeedbackVisual('fita_frac', true); } else { registrarErroCampo(fase, 'Fita - Conversão Fração (3/4)', rawF); aplicarFeedbackVisual('fita_frac', false); }
    if (r === '1.5') { acertos++; registrarAcertoCampo(fase, 'Fita - Conversão Raiz √(9/4)', rawR); aplicarFeedbackVisual('fita_raiz', true); } else { registrarErroCampo(fase, 'Fita - Conversão Raiz √(9/4)', rawR); aplicarFeedbackVisual('fita_raiz', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_fita1');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Conversões corretas!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo2-fita'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 A tradução escorregou! (Acertos: ${acertos}/${total}). Você extraiu a raiz superior e a raiz inferior do último pedaço antes de dividir tudo? E a estimativa do rolo total está correta?`; }
    atualizarProgresso();
}

/**
 * @description Fornece a Senha (7). Treino clássico de acúmulo de subtrações. Avalia organização e clareza mental do aluno.
 * @param {string} fita_sobra - ID para a sobra isolada de 7.25 metros.
 * @returns {void} Leva o jogador para o último mundo, O Tempo (Fase 7).
 */
function verificarFitaPasso2() {
    let acertos = 0; const total = 1; const fase = 'fita_p2';
    let raw = document.getElementById('fita_sobra').value; let s = raw.replace(',','.').trim();
    if (s === '7.25') { acertos++; registrarAcertoCampo(fase, 'Fita - Cálculo da Sobra Final', raw); aplicarFeedbackVisual('fita_sobra', true); } else { registrarErroCampo(fase, 'Fita - Cálculo da Sobra Final', raw); aplicarFeedbackVisual('fita_sobra', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb = document.getElementById('erro_fita2');
    if (ok) { fb.style.color = '#22c55e'; fb.style.textAlign = 'center'; fb.innerHTML = '✓ Sobraram 7,25 m! <span class="senha-destaque">🔑 Senha: 7</span>'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('btn-avancar_fase6b'); } 
    else { fb.style.color = '#f59e0b'; fb.style.textAlign = 'center'; fb.innerHTML = '🤔 Avalie o retalho acumulado! (Acertos: 0/1). Pela analogia, você unificou e consolidou todos os três cortes em uma soma antes de descontá-los do rolo principal?'; }
    atualizarProgresso();
}

/**
 * @description Consolida toda a extensão de minutos fracionados em um grande bloco puramente numérico (a primeira fase do tempo).
 * @param {string} f7_minutos - ID marcando 226 minutos.
 * @returns {void} Desbloqueia o método de desdobramento (divisão por 60).
 */
function verificarF7Passo1() {
    let acertos = 0; const total = 1; const fase = 'f7_p1';
    let v = document.getElementById('f7_minutos').value;
    
    if (!validarEntradaNumerica(v)) {
        const fb=document.getElementById('erro_f7p1');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Somente minutos numéricos valem aqui.'; return;
    }

    if (v === '226') { acertos++; registrarAcertoCampo(fase, 'Tempo - Total de Minutos', v); aplicarFeedbackVisual('f7_minutos', true); } else { registrarErroCampo(fase, 'Tempo - Total de Minutos', v); aplicarFeedbackVisual('f7_minutos', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f7p1');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Tempo total acumulado!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo2-fase7'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Cuidado para não fatiar a fita temporal! (Acertos: ${acertos}/${total}). A experiência vivida pelo passageiro exige que a duração pura e a pausa de intervalo sejam unificadas.`; }
    atualizarProgresso();
}

/**
 * @description Avalia a competência do aluno em agrupar dados e isolar os excessos que não alcançam uma cota integral de limite temporal (60).
 * @param {string} f7_horas - ID indicando 3 blocos inteiros.
 * @param {string} f7_minResto - ID indicando os 46 minutos residuais.
 * @returns {void} Avança o usuário em direção à engrenagem central do relógio civil.
 */
function verificarF7Passo2() {
    let acertos = 0; const total = 2; const fase = 'f7_p2';
    let h = document.getElementById('f7_horas').value; let m = document.getElementById('f7_minResto').value;
    
    if (!validarEntradaNumerica(h) || !validarEntradaNumerica(m)) {
        const fb=document.getElementById('erro_f7p2');
        fb.style.color = '#ef4444'; fb.innerHTML = '⚠️ Erro de Segurança: Entrada inválida detectada.'; return;
    }

    if (h === '3') { acertos++; registrarAcertoCampo(fase, 'Tempo - Conversão de Horas Inteiras', h); aplicarFeedbackVisual('f7_horas', true); } else { registrarErroCampo(fase, 'Tempo - Conversão de Horas Inteiras', h); aplicarFeedbackVisual('f7_horas', false); }
    if (m === '46') { acertos++; registrarAcertoCampo(fase, 'Tempo - Conversão de Minutos Restantes', m); aplicarFeedbackVisual('f7_minResto', true); } else { registrarErroCampo(fase, 'Tempo - Conversão de Minutos Restantes', m); aplicarFeedbackVisual('f7_minResto', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb=document.getElementById('erro_f7p2');
    if (ok) { fb.style.color='#22c55e'; fb.style.textAlign='center'; fb.innerHTML='✓ Conversão correta!'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('passo3-fase7'); } 
    else { fb.style.color='#f59e0b'; fb.style.textAlign='center'; fb.innerHTML=`🤔 Revise as 'caixas' do estoque! (Acertos: ${acertos}/${total}). Quantos blocos perfeitos de 60 minutos você conseguiu isolar? A quantia que escapou do bloco constrói os minutos fragmentados.`; }
    atualizarProgresso();
}

/**
 * @description Prova final das disciplinas temporais. Exige do aluno a assimilação de um ciclo de "catraca", somando 21 + 3 (passando o limite 24) resultando à meia noite (00). Entrega a Senha Final (0).
 * @param {string} f7_horario - ID onde o usuário tentará deduzir em string livre o resultado "00h56".
 * @returns {void} Libera o Cadeado Digital Mestre para conclusão do curso.
 */
function verificarF7Passo3() {
    let acertos = 0; const total = 1; const fase = 'f7_p3';
    let raw = document.getElementById('f7_horario').value; let h = raw.trim().toLowerCase().replace(/\s/g,'');
    if (h === '00h56' || h === '0h56' || h === '00:56') { acertos++; registrarAcertoCampo(fase, 'Tempo - Horário Final de Término', raw); aplicarFeedbackVisual('f7_horario', true); } else { registrarErroCampo(fase, 'Tempo - Horário Final de Término', raw); aplicarFeedbackVisual('f7_horario', false); }
    const ok = (acertos === total); contabilizarCampos(fase, acertos); registrarTentativa(fase, ok); const fb = document.getElementById('erro_f7p3');
    if (ok) { fb.style.color = '#22c55e'; fb.style.textAlign = 'center'; fb.innerHTML = '✓ A porta destravou! <span class="senha-destaque">🔑 Senha: 0</span>'; fb.classList.add('celebrar'); setTimeout(() => fb.classList.remove('celebrar'), 600); mostrar('btn-avancar_fase7'); } 
    else { fb.style.color = '#f59e0b'; fb.style.textAlign = 'center'; fb.innerHTML = '🤔 A engrenagem mecânica do tempo travou? (Acertos: 0/1). Observe a nossa catraca imaginária: quando o eixo das horas somadas ultrapassa a barreira do 24 diário, o que a regra civil diz que acontece?'; }
    atualizarProgresso();
}

// ========== TRAVAMENTO DO DIÁRIO DE BORDO ==========

/**
 * @description Garante que o aluno tenha registrado no mínimo algum texto metacognitivo para avaliação docente. Bloqueia o textarea logo depois e fornece feedback visual.
 * @param {string} texto_metacognitivo - ID da caixa de texto do diário.
 * @returns {void} Dispara a disponibilização do botão oficial "Baixar Relatório".
 */
function salvarDiarioBordo() {
    const textarea = document.getElementById('texto_metacognitivo');
    const btn = document.getElementById('btn_salvar_diario');
    const fb = document.getElementById('feedback_diario');

    if (textarea.value.trim() === '') {
        fb.style.color = '#f59e0b';
        fb.innerHTML = '🤔 Por favor, escreva algo sobre a sua experiência antes de salvar!';
        return;
    }

    textarea.readOnly = true;
    textarea.style.opacity = '0.7'; 
    textarea.style.cursor = 'not-allowed';
    
    // Adiciona o ícone de cadeado na label correspondente
    const label = document.querySelector('label[for="texto_metacognitivo"]');
    if (label && !label.innerHTML.includes('🔒')) {
        label.innerHTML += ' 🔒 <span style="font-size: 14px; color: #22c55e;">(Bloqueado e Salvo)</span>';
    }
    
    // Desabilita visual e logicamente o botão de salvar
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'not-allowed';
    btn.innerHTML = '🔒 Salvo';
    
    fb.style.color = '#22c55e';
    fb.innerHTML = '✅ Reflexão selada com sucesso! Os seus dados estão prontos para download.';
    document.getElementById('btn_baixar_relatorio').style.display = 'inline-block';
}