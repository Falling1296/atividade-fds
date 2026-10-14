const perguntas = [
  {
    pergunta: "Quanto é 8 × 7?",
    opcoes: ["54", "56", "64", "48"],
    correta: 1
  },
  {
    pergunta: "Quanto é 100 ÷ 4?",
    opcoes: ["20", "30", "25", "40"],
    correta: 2
  },
  {
    pergunta: "Qual fração representa metade?",
    opcoes: ["1/3", "1/4", "2/3", "1/2"],
    correta: 3
  },
  {
    pergunta: "Quanto é 35 + 27?",
    opcoes: ["52", "62", "72", "60"],
    correta: 1
  },
  {
    pergunta: "Quantos lados tem um hexágono?",
    opcoes: ["5", "6", "7", "8"],
    correta: 1
  }
];

let indice = 0;
let pontos = 0;
let respondeu = false;

const inicio = document.getElementById("inicio");
const jogo = document.getElementById("jogo");
const resultado = document.getElementById("resultado");
const pergunta = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");
const feedback = document.getElementById("feedback");
const progresso = document.getElementById("progresso");
const proxima = document.getElementById("proxima");
const pontuacao = document.getElementById("pontuacao");
const mensagem = document.getElementById("mensagem");

document.getElementById("comecar")
  .addEventListener("click", iniciar);

document.getElementById("reiniciar")
  .addEventListener("click", iniciar);

proxima.addEventListener("click", avancar);

function iniciar() {
  indice = 0;
  pontos = 0;

  inicio.hidden = true;
  resultado.hidden = true;
  jogo.hidden = false;

  mostrarPergunta();
}

function mostrarPergunta() {
  respondeu = false;

  const atual = perguntas[indice];

  progresso.textContent =
    `Pergunta ${indice + 1} de ${perguntas.length} | Pontos: ${pontos}`;

  pergunta.textContent = atual.pergunta;
  alternativas.replaceChildren();
  feedback.textContent = "";
  proxima.hidden = true;

  atual.opcoes.forEach((opcao, i) => {
    const botao = document.createElement("button");

    botao.textContent = opcao;
    botao.addEventListener("click", () => verificar(i));

    alternativas.appendChild(botao);
  });
}

function verificar(escolha) {
  if (respondeu) return;

  respondeu = true;

  const atual = perguntas[indice];
  const botoes = alternativas.querySelectorAll("button");

  botoes.forEach(botao => {
    botao.disabled = true;
  });

  if (escolha === atual.correta) {
    pontos++;

    feedback.textContent = "✅ Resposta correta! +1 ponto";
    botoes[escolha].style.backgroundColor = "#16803c";
  } else {
    feedback.textContent =
      `❌ Resposta incorreta. Correta: ${atual.opcoes[atual.correta]}`;

    botoes[escolha].style.backgroundColor = "#c62828";
    botoes[atual.correta].style.backgroundColor = "#16803c";
  }

  progresso.textContent =
    `Pergunta ${indice + 1} de ${perguntas.length} | Pontos: ${pontos}`;

  proxima.hidden = false;

  proxima.textContent =
    indice === perguntas.length - 1
      ? "Ver resultado 🏆"
      : "Próxima pergunta ➡️";
}

function avancar() {
  if (!respondeu) return;

  indice++;

  if (indice < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  jogo.hidden = true;
  resultado.hidden = false;

  pontuacao.textContent =
    `Você acertou ${pontos} de ${perguntas.length} perguntas!`;

  if (pontos === 5) {
    mensagem.textContent =
      "🏆 Perfeito! Você acertou todas as perguntas!";
  } else if (pontos >= 4) {
    mensagem.textContent =
      "🌟 Excelente! Você mandou muito bem!";
  } else if (pontos >= 2) {
    mensagem.textContent =
      "👏 Muito bem! Continue praticando!";
  } else {
    mensagem.textContent =
      "💪 Não desista! Pratique e tente novamente!";
  }
}