// =========================================================================
// 🧠 DICIONÁRIO PEDAGÓGICO DE ERROS (TUTOR INTELIGENTE - 62 ENTRADAS)
// =========================================================================
const diagnosticosErro = {
    // =============================================
    // FASE 1: PITÁGORAS E TIROLESA
    // =============================================
    'cat1': {
        '5': 'Você dividiu a largura do topo (10/2). Subtraia o fundo (6m) antes de dividir pela metade!',
        '3': 'Você dividiu a largura do fundo (6/2).',
        '10': 'Essa é a largura total do topo! Olhe apenas para a sombra do triângulo.',
        '6': 'Essa é a largura do fundo!'
    },
    'cat2': {
        '4': 'A altura é 4m e não sofre alteração. Ela já é o nosso cateto vertical!',
        '2': 'Você dividiu a altura pela metade. A altura não muda!'
    },
    'soma_quadrados': {
        '6': 'Você somou os catetos (4+2) sem elevá-los ao quadrado primeiro!',
        '12': 'Multiplicou os catetos? A regra é elevar ao quadrado (a² + b²).',
        '36': 'Reavalie os quadrados! O quadrado de 4 é 16, e de 2 é 4.',
        '16': 'Você só elevou o primeiro cateto (4²). Falta adicionar o segundo (2²).',
        '4': 'Você elevou só o segundo cateto (2²). Falta adicionar o primeiro (4²).',
        '18': 'Verifique: 4² = 16, 2² = 4. A soma é 20, não 18.'
    },
    'raiz20_fora': {
        '4': 'O 4 tem raiz exata, ele deve sair da raiz como 2!',
        '5': 'O 5 não formou par na fatoração, ele deve ficar preso dentro da raiz.',
        '10': '10 é metade do 20, mas aqui olhamos os fatores pares. O par de 2s que sai é 2.',
        '1': 'Se não saiu nenhum fator par, a raiz seria 1? Verifique a fatoração do 20.'
    },
    'raiz20_dentro': {
        '10': 'Você não terminou de fatorar o 10 por 2!',
        '2': 'O 2 formou um par (2²), ele tem passe livre para sair da raiz.',
        '20': 'Você não simplificou a raiz. Fatore o 20 e veja o que fica dentro.'
    },
    'f1_r_exata1': {
        '4': 'A raiz exata de 4 é 2. O número 4 é o Quadrado Perfeito, não a raiz!',
        '3': '3 é a raiz de 9, que já passou de 5.'
    },
    'f1_r_seu': {
        '20': 'O nosso número alvo agora é apenas o que sobrou dentro da raiz (o 5).',
        '4': 'O número alvo é 5, não 4. 4 é o quadrado perfeito anterior.',
        '25': '5² = 25, mas aqui estamos procurando o N (5) que está dentro da raiz.'
    },
    'f1_r_quad': {
        '2': 'Você colocou a raiz. Aqui precisamos da "Área" completa do quadrado anterior (4).',
        '9': 'O quadrado 9 vem DEPOIS do 5, queremos o que vem ANTES.',
        '16': '16 é o quadrado de 4, mas na fórmula precisamos do quadrado perfeito anterior ao 5, que é 4, não 16.'
    },
    'f1_r_exata2': {
        '4': 'Repita a raiz exata que você usou no começo da fórmula (2).',
        '3': 'Se a raiz anterior é 2, então 2*2 = 4. O valor correto é 2.'
    },
    'raiz20_aprox': {
        '2.25': 'Você encontrou o valor decimal da raiz, mas esqueceu de multiplicar pelo 2 que estava do lado de fora aguardando!',
        '4.5': 'Use ponto em vez de vírgula se estiver travando!'
    },
    'f1_catV': {
        '8': 'Você pegou a altura da torre menor. Queremos a DIFERENÇA entre as duas torres.',
        '12': 'Essa é a torre maior. O cateto é a subtração das duas.'
    },
    'f1_catH': {
        '10': 'Você dividiu o chão? O cabo cruza a distância total de 20m.',
        '2': 'Confundiu com a fase anterior? A distância horizontal é 20m.'
    },
    'f1_cabo2': {
        '24': 'Você apenas somou os lados (20+4). Pitágoras exige elevar ao quadrado antes!',
        '400': 'Esqueceu de somar o quadrado do cateto vertical (16)?',
        '20': 'Você somou os catetos em vez de elevar ao quadrado.',
        '400': 'Você elevou o 20 ao quadrado, mas esqueceu o 4² (16).'
    },
    'f1_fora416': {
        '2': 'Existem dois pares de 2 (2² e 2²). Ambos saem e se multiplicam fora da raiz (2x2=4).',
        '8': 'Você multiplicou demais os fatores externos.',
        '16': '16 é o quadrado de 4, mas aqui o fator que sai é 4, não 16.'
    },
    'f1_dentro416': {
        '13': 'Faltou o número 2 que não formou par. Dentro da raiz fica (2 x 13).',
        '52': 'Você deixou um 2 lá dentro que tinha par para sair!',
        '26': 'Você já simplificou? 26 = 2*13, então dentro fica 26 mesmo (já está correto).'
    },
    'f1_caboAprox': {
        '5.1': 'Você esqueceu de multiplicar a raiz quebrada pelo fator 4 que estava aguardando do lado de fora.',
        '20': 'Você arredondou para o inteiro. Use as casas decimais da aproximação (5,1 * 4).'
    },

    // =============================================
    // FASE 2: TRIÂNGULOS E CIRCUNFERÊNCIAS
    // =============================================
    'f2_cat1': {
        '15': 'Atenção! A linha vermelha inclinada é a Hipotenusa, não um cateto.'
    },
    'f2_cat2': {
        '15': 'A linha com interrogação não é um cateto. Os catetos encostam no ângulo reto.'
    },
    'f2_soma': {
        '21': 'Você somou 12+9 direto. Lembre de elevar ao quadrado primeiro (144 + 81)!',
        '108': 'Você multiplicou os lados. A regra é soma dos quadrados.',
        '144': 'Você calculou apenas 12². Falta somar 9² (81).'
    },
    'f2_hip': {
        '225': '225 é a "área" total. Que número vezes ele mesmo resulta em 225?',
        '112.5': 'Não divida por 2! Extraia a raiz quadrada.',
        '225': '225 é a área, a hipotenusa é a raiz de 225 = 15.'
    },
    'circ_ab2': {
        '10': 'Você somou 6+4. A regra exige somar as áreas (36 + 16).',
        '24': 'Você multiplicou os lados em vez de usar Pitágoras.',
        '36': 'Você só calculou 6². Falta adicionar 4² (16).'
    },
    'circ_fora': {
        '4': 'O número 4 tem raiz, ele deve sair como 2.',
        '13': 'O 13 não formou par na fatoração para poder sair.',
        '√52': 'Simplifique a raiz antes de responder. 52 = 4 * 13, então a raiz é 2√13.'
    },
    'circ_dentro': {
        '26': 'Você não dividiu o 26 por 2 na fatoração corretamente.',
        '4': 'O 4 tem passe livre para sair da raiz.'
    },
    'circ_raio': {
        '26': 'O raio é metade do Diâmetro. O conteúdo dentro da raiz não muda!',
        '52': 'Você usou a área original em vez da raiz simplificada.',
        '√13': 'Você colocou a raiz de 13, mas esqueceu que o 2 do lado de fora também é dividido por 2, resultando em 1√13.'
    },

    // =============================================
    // FASE 3: FRAÇÕES E MARCENEIRO
    // =============================================
    'nf1': {
        '1': 'Você colocou 1, mas a conversão direta de 0,5 pede 5 partes de 10.',
        '0': 'O numerador é o algarismo após a vírgula (o 5).',
        '50': '0,5 = 5/10, não 50/100? (ambos equivalem, mas o gabarito espera 5/10).',
        '2': '0,5 = 2/4? Não, 0,5 = 5/10.',
        '0,5': 'Use ponto em vez de vírgula para decimais, ou converta para fração (numerador/denominador).'
    },
    'df1': {
        '9': 'Para um decimal finito (que tem fim, como 0,5), a base é 10 ou 100. O 9 é só para dízimas infinitas.',
        '2': '1/2 é equivalente, mas o gabarito espera denominador 10 para 0,5.'
    },
    'ni1': {
        '55': 'Para dízimas, coloque no numerador apenas o período simples (o 5).',
        '0': 'Pegue o dígito que se repete após a vírgula.',
        '55': 'Use apenas o dígito que se repete (5).'
    },
    'di1': {
        '10': 'Para um decimal infinito (0,555...), a base construtora é o 9!',
        '100': '0,555... é infinito, logo a base é 9, não 100.',
        '99': '0,555... é 5/9. O denominador é 9, não 99.'
    },
    'nf2': {
        '7': 'A parte decimal tem duas casas (75).',
        '3': '3/4 é equivalente, mas o gabarito espera 75/100.'
    },
    'df2': {
        '99': '0,75 tem fim! Então usamos base 100.',
        '4': '3/4 é equivalente, mas o gabarito espera 100.'
    },
    'ni2': {
        '33': 'Coloque apenas o dígito unitário que se repete infinitamente (o 3).',
        '30': 'O 3 é o numerador correto. 0,333... = 3/9, não 30/100.',
        '1': '0,333... não é 1/10, é 1/3. Mas aqui pedimos a fração com denominador 9.',
        '10': 'Você confundiu numerador com denominador? O numerador é o 3.'
    },
    'di2': {
        '10': 'Dízima periódica (infinito). Use a base 9.',
        '100': 'Para dízimas periódicas, o denominador é 9, não 100.',
        '3': 'O denominador 3 daria 0,333... simplificando, mas pedimos a fração original com denominador 9.',
        '99': '0,333... não é 33/99, mas sim 3/9.'
    },
    'marc_num': {
        '0': 'O numerador é o dígito que se repete no eco infinito (o 6).',
        '66': 'Use apenas o período simples (6).'
    },
    'marc_den': {
        '10': 'É uma dízima infinita. Qual base devemos usar?',
        '100': 'Atenção ao comportamento infinito do 0,666...',
        '99': '0,666... = 6/9, não 66/99.'
    },
    'areaMarceneiro': {
        '54': 'Você esqueceu de dividir pelo denominador! Lembre do cancelamento.',
        '0.66': 'Você precisa multiplicar por 9.',
        '9': '9 * 6/9 = 6. Você multiplicou 9 por 6 e esqueceu de dividir por 9?',
        '54': '54 é o numerador antes de simplificar. A área final é 6.'
    },

    // =============================================
    // FASE 4: POTÊNCIAS E DÍZIMAS MISTAS
    // =============================================
    'f4_num': {
        '7': 'Você precisa SOMAR a parte inteira (9/9) com a fração da dízima (7/9).',
        '17': 'A soma de 9+7 é 16.',
        '14': '7 + 9 = 16, não 14. Lembre-se 1 inteiro = 9/9, somando com 7/9 dá 16/9.'
    },
    'f4_den': {
        '10': 'A dízima é periódica infinita, a base do denominador é 9.',
        '3': '0,777... = 7/9, então o denominador é 9.'
    },
    'f4_m_num': {
        '8': 'O expoente 0,5 tira a RAIZ quadrada. Qual número vezes ele mesmo dá 16?',
        '256': 'Você elevou ao quadrado em vez de tirar a raiz!',
        '16': '√16 = 4, você colocou o valor antes da raiz.'
    },
    'f4_m_den': {
        '4.5': 'Extraia a raiz de 9, não divida por 2.',
        '9': '√9 = 3, você colocou o valor antes da raiz.'
    },
    'f4_n_num': {
        '4': 'Você esqueceu de INVERTER a fração antes de aplicar o quadrado!',
        '2': 'Você inverteu, mas esqueceu de elevar o 3 ao quadrado.',
        '6': 'É 3x3, não 3x2.',
        '4': 'Você inverteu (3/2)² = 9/4, o numerador é 9.',
        '6': '3² = 9, não 6.'
    },
    'f4_n_den': {
        '9': 'Você esqueceu de inverter a base para remover o negativo.',
        '4': 'Lembre de elevar ao quadrado!',
        '9': 'Você inverteu (3/2)² = 9/4, o denominador é 4.'
    },
    'f4_resultado': {
        '36/12': 'Você precisa simplificar a fração final dividindo.',
        '12': 'Você somou? Lembre do padrão de cancelamento na multiplicação.',
        '4/3 * 9/4': 'A expressão está correta, mas simplifique para obter um número inteiro.'
    },

    // =============================================
    // FASE 5: IRRACIONAIS E RAIZ DE 180
    // =============================================
    'raiz_baixa': {
        '169': '169 é a área. Que número vezes ele mesmo construiu isso?',
        '14': '14x14 passa de 169.',
        '169': '169 é a área, a raiz é o lado.'
    },
    'raiz_alta': {
        '196': 'Faltou extrair a raiz exata de 196!',
        '15': '15 é 225. Procure um pouco antes.',
        '196': '196 é a área, a raiz é o lado.'
    },
    'raiz180_fora': {
        '36': 'Você não extraiu a raiz dos pares antes de multiplicar fora.',
        '2': 'O 3 também formou par e deve sair para multiplicar o 2.',
        '36': '36 é o quadrado de 6, mas você deve colocar o 6 fora.'
    },
    'raiz180_dentro': {
        '10': 'Faltou dividir o 10 por 2 na fatoração!',
        '15': 'Apenas o 5 ficou sozinho sem par.',
        '30': '180 = 6² * 5, então dentro fica 5.'
    },
    'reta_raiz': {
        'O': 'A raiz de 22 é quase 4,7. Onde fica isso na régua?',
        'P': '√22 ≈ 4.69, que está entre 4 e 5, então é M.'
    },
    'reta_frac1': {
        'M': '25 dividido por 99 é próximo de 0,25. Fica bem no começo!',
        'P': 'Divida na calculadora para ver que é menor que 1.',
        'P': '25/99 ≈ 0.25, próximo de 0, é O.'
    },
    'reta_frac2': {
        'M': '193/90 é um pouco mais que 2.',
        'O': '193 é o dobro de 90, então passa de 2.',
        'O': '193/90 ≈ 2.14, próximo de 2, é P.'
    },
    'raiz180_aprox': {
        '2.236': 'Você esqueceu de multiplicar a raiz pelo 6 que aguardava fora!',
        '13.3': 'Quase lá! Use mais casas decimais na raiz de 5 (≈2,236) antes de multiplicar por 6.',
        '13.5': 'A aproximação correta é 13.416, dentro da faixa aceita de 13.38 a 13.44.'
    },

    // =============================================
    // FASE 6: GEOMETRIA 3D E FITA
    // =============================================
    'f6_aresta': {
        '256': 'Você dividiu por 2. O volume 3D exige a Raiz Cúbica!',
        '64': '64 x 64 x 64 é gigantesco. Teste números de 1 a 10.',
        '16': 'Você calculou a área de uma face (8x2), mas a aresta é o lado único.',
        '512': '512 é o volume total, não a aresta,precisamos da medida de apenas UM lado.'
    },
    'f6_total': {
        '48': 'O quarto não tem só 6 quinas. São 12 arestas estruturais!',
        '64': 'Multiplique a aresta (8) por 12.',
        '48': 'Faltam as arestas laterais. O cubo tem 12 arestas.'
    },
    'fita_total': {
        '72': 'Raiz de 144 não é a metade de 144. Que número vezes ele mesmo dá 144?',
        '144': '144 é o quadrado, a raiz é 12.'
    },
    'fita_frac': {
        '3.4': 'Use a calculadora para dividir 3 por 4.'
    },
    'fita_raiz': {
        '2.25': 'Você apenas dividiu 9 por 4. Tem que tirar a raiz dos dois primeiro!',
        '4.5': 'Tire a raiz do 9 e a raiz do 4 separadamente antes de dividir.',
        '2.25': '√(9/4) = √9 / √4 = 3/2 = 1.5.'
    },
    'fita_sobra': {
        '4.75': 'Você somou os retalhos corretamente (4.75), mas faltou subtrair do rolo total de 12m.',
        '9.5': 'Lembre de converter e somar todos os três retalhos (2,5 + 0,75 + 1,5).',
        '9.5': 'A soma dos retalhos é 4.75, subtraindo de 12 dá 7.25.'
    },

    // =============================================
    // FASE 7: ESTRUTURA DO TEMPO
    // =============================================
    'f7_minutos': {
        '216': 'Você esqueceu de adicionar a pausa programada de 10 minutos.',
        '206': 'Você subtraiu os 10 minutos da pausa em vez de somar! O tempo de laboratório é o total gasto.',
        '236': 'Você adicionou 20 minutos em vez de 10. Reveja a soma de 216 + 10.',
        '206': 'Você subtraiu em vez de somar o intervalo.',
        '226min': 'Não precisa digitar "min", digite apenas o número!',
        '0': 'Você esqueceu de somar os minutos do filme com a pausa. O tempo total é maior que a duração do filme.'
    },
    'f7_horas': {
        '2': 'Em 226 minutos cabem mais do que apenas duas horas inteiras.',
        '4': '4 horas seriam 240 minutos (já passou do tempo do filme).',
        '2': '2 horas = 120, ainda sobram 106 minutos, que é mais de 1 hora.'
    },
    'f7_minResto': {
        '26': '3 horas são 180 minutos. Se você tem 226, quantos sobraram avulsos?',
        '60': 'Os restos nunca podem chegar a 60, senão viram outra hora.',
        '26': '226 - 180 = 46, não 26.'
    },
    'f7_horario': {
        '24h56': 'Quando bate 24h, o ciclo do dia zera para 00h.',
        '25h56': 'A catraca do relógio volta ao início à meia-noite.',
        '25h56': 'O relógio não passa de 24h, ele zera.'
    },

    // =============================================
    // FASE 8: FIBONACCI E PROPORÇÃO ÁUREA
    // =============================================
    'f8_resposta': {
        '34': 'Você pulou um número! Some os dois anteriores imediatamente vizinhos.',
        '14': 'A sequência não aumenta de 1 em 1.',
        '34': '34 é o próximo após 21? Não, 13+21=34? Na verdade é 21, pois 8+13=21.'
    },
    'f8_phi': {
        '161': 'Esqueceu a vírgula/ponto! A proporção é um número menor que 2.',
        '1.6': 'Falta precisão. Use duas casas decimais.',
        '161': 'Faltou a vírgula/ponto. O valor é 1.61.'
    }
};


// ========== MATRIZ PEDAGÓGICA ==========
const matrizPedagogica = [
    {
        titulo: "FASE 1 (PARTE 1) - O CANAL DE ÁGUA E A RAIZ DE 20",
        ids: ['pitagoras', 'raiz20_simp', 'raiz20_formula', 'raiz20_aprox'],
        contexto: "O aluno deve calcular a parede inclinada de um canal (trapézio: topo=10m, fundo=6m, altura=4m), aplicar Pitágoras, simplificar a raiz e aproximar para decimal.",
        gabarito: "Catetos: 4 e 2 | Soma²: 20 | Raiz Simplificada: 2√5 | Aproximação Decimal: 4.5",
        campos: ['Fase 1 (Pitágoras) - Cateto 1', 'Fase 1 (Pitágoras) - Cateto 2', 'Fase 1 (Pitágoras) - Soma dos Quadrados', 'Fase 1 (Raiz 20) - Número de Fora', 'Fase 1 (Raiz 20) - Número de Dentro', 'Fase 1 (Aprox) - Raiz Exata 1', 'Fase 1 (Aprox) - Seu Número', 'Fase 1 (Aprox) - Quadrado Anterior', 'Fase 1 (Aprox) - Raiz Exata 2', 'Fase 1 (Raiz 20) - Medida Aproximada']
    },
    {
        titulo: "FASE 1 (PARTE 2) - O DESAFIO DA TIROLESA",
        ids: ['tirolesa_p1', 'tirolesa_p2', 'tirolesa_p3', 'tirolesa_p4'],
        contexto: "Instalar um cabo entre duas torres (12m e 8m) com distância de 20m. Exige encontrar catetos por subtração, aplicar Pitágoras (√416) e aproximar o valor.",
        gabarito: "Cateto Vert: 4 | Cateto Horiz: 20 | Soma²: 416 | Raiz Simplificada: 4√26 | Aproximação Final: 20.4",
        campos: ['Tirolesa - Cateto Vertical', 'Tirolesa - Cateto Horizontal', 'Tirolesa - Soma dos Quadrados', 'Tirolesa (Simp) - Número de Fora', 'Tirolesa (Simp) - Número de Dentro', 'Tirolesa - Aproximação Final']
    },
    {
        titulo: "FASE 2 (PARTE 1) - TRIÂNGULO RETÂNGULO SIMPLES",
        ids: ['f2_p1', 'f2_p2', 'f2_p3'],
        contexto: "Fixação do Teorema de Pitágoras num triângulo retângulo direto da imagem.",
        gabarito: "Catetos: 12 e 9 | Soma²: 225 | Hipotenusa (√225): 15",
        campos: ['Fase 2 (Triângulo) - Cateto 1', 'Fase 2 (Triângulo) - Cateto 2', 'Fase 2 (Triângulo) - Soma dos Quadrados', 'Fase 2 (Triângulo) - Hipotenusa']
    },
    {
        titulo: "FASE 2 (PARTE 2) - TRIÂNGULO NA CIRCUNFERÊNCIA",
        ids: ['circ_p1', 'circ_p2', 'circ_p3'],
        contexto: "Entender que a hipotenusa de um triângulo inscrito é o diâmetro. Catetos dados: 6 e 4. Simplificar a raiz gerada e dividir por 2 para achar o raio.",
        gabarito: "Soma (Diâmetro²): 52 | Diâmetro (Simplificado): 2√13 | Raio (Metade): 13 (dentro da raiz)",
        campos: ['Circunferência - Soma AB²', 'Circunferência (Simp) - Número de Fora', 'Circunferência (Simp) - Número de Dentro', 'Circunferência - Cálculo do Raio']
    },
    {
        titulo: "FASE 3 - CONVERSÃO DE FRAÇÕES E O MARCENEIRO",
        ids: ['fracoes', 'marceneiro', 'marceneiro_p2'],
        contexto: "Converter decimais finitos e infinitos em frações. Depois, usar o conceito para calcular a área de uma tábua de 9m × 0,666...m.",
        gabarito: "0,5 = 5/10 | 0,555... = 5/9 | 0,75 = 75/100 | 0,333... = 3/9 | 0,666... = 6/9 | Área Final: 6",
        campos: ['Frações (0,5) - Numerador', 'Frações (0,5) - Denominador', 'Frações (0,555) - Numerador', 'Frações (0,555) - Denominador', 'Frações (0,75) - Numerador', 'Frações (0,75) - Denominador', 'Frações (0,333) - Numerador', 'Frações (0,333) - Denominador', 'Marceneiro (0,666) - Numerador', 'Marceneiro (0,666) - Denominador', 'Marceneiro - Cálculo da Área']
    },
    {
        titulo: "FASE 4 - POTÊNCIAS E DÍZIMAS MISTAS",
        ids: ['f4_p1', 'f4_p2', 'f4_p3', 'f4_p4'],
        contexto: "Resolver a expressão m × n, sabendo que m = √(1,777...) e n = (2/3)^-2. Exige conversão mista, extrair raiz de fração e inverter base de potência negativa.",
        gabarito: "Fração de 1,777... = 16/9 | m = 4/3 | n = 9/4 | Resultado Final: 3",
        campos: ['Potências (1,777) - Numerador', 'Potências (1,777) - Denominador', 'Potências (m) - Numerador', 'Potências (m) - Denominador', 'Potências (n) - Numerador', 'Potências (n) - Denominador', 'Potências - Resultado da Multiplicação']
    },
    {
        titulo: "FASE 5 - CERCANDO O IRRACIONAL (RETA NUMÉRICA E RAIZ 180)",
        ids: ['limites', 'raiz180_simp', 'reta', 'raiz180_aprox'],
        contexto: "Estimar entre quais inteiros a √180 está. Simplificar a √180. Posicionar números irracionais/fracionários na reta e calcular um valor decimal cortado.",
        gabarito: "Limites: 13 (√169) e 14 (√196) | √180 Simplificada: 6√5 | Reta: √22=M, 25/99=O, 193/90=P | Medida do Cabo (6×2,236): 13.416 (aprox aceita 13.38 a 13.44)",
        campos: ['Limites - Raiz Baixa (169)', 'Limites - Raiz Alta (196)', 'Raiz 180 (Simp) - Número de Fora', 'Raiz 180 (Simp) - Número de Dentro', 'Reta Numérica - Posição √22', 'Reta Numérica - Posição 25/99', 'Reta Numérica - Posição 193/90', 'Raiz 180 - Medida do Cabo']
    },
    {
        titulo: "FASE 6 - GEOMETRIA 3D (CUBO) E COMPRIMENTO DE FITA",
        ids: ['f6_p1', 'f6_p2', 'fita_p1', 'fita_p2'],
        contexto: "Encontrar a aresta de um cubo de 512cm³ (raiz cúbica) e calcular 12 arestas. Depois, converter pedaços de fita (√144, 3/4 e √(9/4)) para decimal e calcular sobra.",
        gabarito: "Aresta: 8 | Arame Total: 96 | Fita Total: 12 | Fita Fração (3/4): 0.75 | Fita Raiz √(9/4): 1.5 | Sobra Final: 7.25",
        campos: ['Cubo - Medida da Aresta', 'Cubo - Arame Total', 'Fita - Conversão Total (√144)', 'Fita - Conversão Fração (3/4)', 'Fita - Conversão Raiz √(9/4)', 'Fita - Cálculo da Sobra Final']
    },
    {
        titulo: "FASE 7 - OPERAÇÕES COM TEMPO (SESSÃO DE CINEMA)",
        ids: ['f7_p1', 'f7_p2', 'f7_p3'],
        contexto: "Filme (216m) + Intervalo (10m). Somar os minutos, converter para horas inteiras e minutos restantes, e por fim somar ao horário de início (21h10).",
        gabarito: "Total Minutos: 226 | Conversão: 3 horas e 46 minutos | Término: 00h56",
        campos: ['Tempo - Total de Minutos', 'Tempo - Conversão de Horas Inteiras', 'Tempo - Conversão de Minutos Restantes', 'Tempo - Horário Final de Término']
    },
    {
        titulo: "FASE 8 (SECRETA) - A SALA DO ARQUITETO",
        ids: ['fase8'],
        contexto: "Desafio bônus sobre a sequência de Fibonacci e a Proporção Áurea. O aluno deve identificar o próximo termo da sequência.",
        gabarito: "Próximo termo: 21",
        campos: ['Fibonacci - Próximo Número']
    }
];

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

// ========== CALCULADORA ==========

// 🟢 NOVO: Objeto com o contexto de cada botão da calculadora
const contextosCalculadora = {
    'soma_quadrados': 'Dica: Calcule o quadrado de cada cateto e some-os (a² + b²).',
    'raiz20_aprox': 'Dica: Multiplique o fator externo pelo valor decimal da raiz.',
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
    'f6_aresta': 'Dica: Extraia a raiz cúbica do volume (Que número vezes ele mesmo 3 vezes que dá 512?).',
    'f6_total': 'Dica: Um cubo possui 12 arestas (linhas). Multiplique a aresta por 12.',
    'fita_sobra': 'Dica: Converta para decimais, some os 3 retalhos e subtraia do rolo total.',
    'f7_minutos': 'Dica: Some os minutos de exibição do filme com o tempo de intervalo.',

    // 🟢 NOVOS: Contextos para as calculadoras genéricas de rascunho
    'ctx_raiz20_simp': 'Dica: Divida 20 por números primos (2, 3, 5...). Qual deles forma par?',
    'ctx_tirolesa_catetos': 'Dica: A base é igual ao chão. A altura é a diferença entre as duas torres.',
    'ctx_tirolesa_simp': 'Dica: Fatore 416 por 2 várias vezes. Agrupe em pares para tirá-los da raiz.',
    'ctx_f2_catetos': 'Dica: Os catetos são sempre as duas retas que formam o ângulo de 90 graus.',
    'ctx_circ_simp': 'Dica: Fatore 52. Qual número forma um par (potência 2) para sair da raiz?',
    'ctx_f3_fracoes': 'Dica: Finitos (divida por 10, 100...). Infinitos com repetição (divida por 9, 99...).',
    'ctx_marc_fracao': 'Dica: Como tem repetição infinita (0,666...), o denominador deve usar a base 9.',
    'ctx_f4_fracao': 'Dica: Some o inteiro (9/9) com a fração gerada pela dízima.',
    'ctx_f4_raiz': 'Dica: Expoente 0,5 equivale à raiz quadrada. Tire a raiz do número de cima e do de baixo.',
    'ctx_f4_inverte': 'Dica: O sinal negativo inverte a fração. O "2" eleva a parte de cima e de baixo ao quadrado.',
    'ctx_limites_raizes': 'Dica: Teste multiplicações exatas. Que número vezes ele mesmo dá 169? E 196?',
    'ctx_reta_associa': 'Dica: Divida as frações na calculadora (ex: 25 ÷ 99) para descobrir a posição decimal.',
    'ctx_fita_converte': 'Dica: Em √(9/4), tire a raiz de 9 e a raiz de 4 separadamente. Depois divida.',
    'ctx_f7_horas': 'Dica: Divida o total de minutos por 60 para descobrir quantas horas inteiras cabem.',
    'ctx_f7_final': 'Dica: Some as horas ao horário inicial. Se passar das 24h, o ciclo do relógio zera.'
};