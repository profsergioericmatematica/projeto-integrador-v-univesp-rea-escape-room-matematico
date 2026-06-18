# 🧩 REA: Escape Room Matemático – Fundamentos Visuais

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue)
![Tecnologias](https://img.shields.io/badge/Tecnologias-HTML5%20|%20CSS3%20|%20Vanilla%20JS-orange)

---

## 🎯 O que é este site?

Este é um **Recurso Educacional Aberto (REA)** interativo que utiliza a mecânica de *Escape Room* para ensinar e diagnosticar habilidades matemáticas essenciais. Foi desenvolvido para o **Projeto Integrador V** da UNIVESP, com base em dados reais da Prova Paulista (1º Bimestre de 2026).

O aluno assume o papel de um prisioneiro em um laboratório de matemática pura e, guiado por uma assistente I.A., precisa resolver uma série de enigmas que envolvem:
- Teorema de Pitágoras
- Simplificação de radicais
- Conversão de dízimas periódicas
- Operações com potências e frações
- Geometria espacial (cubo e volume)
- Cálculo de tempo (sistema 24h)

**Mas o grande diferencial está na coleta de dados:**  
O sistema registra cada tentativa, erro, dica utilizada e tempo de resposta. Ao final, o aluno (ou o professor) pode baixar um **relatório detalhado em formato `.txt`** com todas essas informações, permitindo uma análise precisa das dificuldades individuais.

---

## 🚀 Funcionalidades principais

- 🧠 **Jornada progressiva** – 8 fases, 32 etapas de validação, com dificuldade crescente.
- 📊 **Relatório pedagógico automático** – Gera um arquivo de texto com:
  - Cronologia exata de cada ação (erros, acertos, dicas).
  - Mapa de calor dos campos com mais erros.
  - Patente final (ex: *Mestre do Escapismo*).
- ⭐ **Sistema de estrelas** – Penaliza erros e uso de dicas, incentivando a reflexão antes de pedir ajuda.
- 🧮 **Calculadora integrada** – Ferramenta auxiliar que mantém o aluno imerso.
- ✍️ **Diário de bordo metacognitivo** – O aluno registra o raciocínio usado no desafio mais difícil, travando a edição ao salvar.
- 🔒 **Fase secreta (Easter Egg)** – Acessível apenas para quem obtém 100% de acertos sem dicas; aborda a sequência de Fibonacci e a Proporção Áurea.

---

## 📚 Trilha de conhecimento (visão geral das fases)

| Fase | Tema principal | Conceitos trabalhados |
|------|---------------|------------------------|
| 1    | Geometria e Tirolesa | Teorema de Pitágoras, fatoração de √20, aproximação linear |
| 2    | Triângulos e Circunferência | Pitágoras, diâmetro como hipotenusa, raio |
| 3    | Finito e Infinito | Decimais finitos e dízimas → frações, área |
| 4    | Potências e Dízimas | Frações mistas, raiz de fração, expoente negativo |
| 5    | Números Irracionais | Raiz de 180, reta numérica, simplificação |
| 6    | Geometria 3D | Volume do cubo, aresta, perímetro total |
| 7    | Tempo | Soma de minutos, conversão para horas, relógio de 24h |
| 8    | (Secreta) Fibonacci | Sequência de Fibonacci, espiral áurea |

---

## 💻 Como usar (aluno)

1. Acesse o arquivo `index.html` em qualquer navegador moderno.
2. Digite seu nome na tela inicial e clique em **Iniciar Aula de Fuga**.
3. Resolva os enigmas, utilizando dicas (com penalidade) ou a calculadora quando necessário.
4. Ao final, insira a senha mestra (anote os números-chave que aparecem ao concluir cada fase).
5. Na tela de sucesso, escreva seu diário de bordo e clique em **Salvar Reflexão**.
6. Clique em **Baixar Relatório** para obter o arquivo com todos os dados da sua jornada.

## 👩‍🏫 Como usar (professor)

- O relatório gerado oferece um diagnóstico individualizado, mostrando:
  - Quais conceitos o aluno dominou e quais ainda apresentam fragilidades.
  - Padrões de erro (ex: erra sempre a simplificação de raízes).
  - Quantas dicas foram necessárias, indicando nível de autonomia.
- Os dados são processados **localmente** no navegador – não há armazenamento em servidor, garantindo conformidade com a LGPD.

---

## 🛠️ Tecnologias utilizadas

- HTML5, CSS3, JavaScript (Vanilla)
- Design responsivo (mobile-first)
- Suporte a tema claro/escuro

---

## 👥 Equipe de desenvolvimento

- Antonio Antunes Junior  
- Giovani Machado de Lima  
- Lilian Maria de Souza Lino  
- Priscilla Santiago Zamorra  
- Renata Helena Arantes e Oliveira  
- Rodrigo Aires de Medeiros Correa  
- Sergio Eric Reis de Oliveira  
- Vitor Correa Uberti  

## 📄 Licença

Este projeto é distribuído sob a licença **MIT** – veja o arquivo LICENSE para mais detalhes. © 2026.