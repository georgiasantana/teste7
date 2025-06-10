// Declaração de variáveis globais
let edificios = []; // Array para armazenar os edifícios
let plantas = []; // Array para armazenar as plantas
let agua = 100; // Nível inicial de água (0 a 100)
let pontuacao = 0; // Pontuação inicial do jogador
let tempoRestante = 60; // Tempo restante do jogo em segundos
let timerInterval; // Variável para armazenar o intervalo do temporizador
let estadoJogo = 'menu'; // Estado atual do jogo: 'menu', 'jogando' ou 'fim'

// Função preload para carregar recursos antes do início do jogo
function preload() {
  // Se desejar adicionar sons, descomente e carregue aqui:
  // somPlantio = loadSound('assets/plant.mp3');
  // somColheita = loadSound('assets/harvest.mp3');
  // somFimJogo = loadSound('assets/gameOver.mp3');
}

// Função setup para configurar o ambiente inicial do jogo
function setup() {
  createCanvas(800, 600); // Cria uma tela de 800x600 pixels
  imageMode(CENTER); // Define o modo de desenho de imagens para o centro

  // Gerar edifícios
  for (let i = 0; i < 5; i++) {
    let w = random(80, 150); // Largura aleatória do edifício
    let h = random(200, 400); // Altura aleatória do edifício
    edificios.push({
      x: i * (width / 5) + (width / 5) / 2, // Posição x do edifício
      y: height - h / 2 - 50, // Posição y do edifício, acima da rua
      largura: w, // Largura do edifício
      altura: h, // Altura do edifício
      cor: color(random(100, 200), random(100, 200), random(100, 200)) // Cor aleatória
    });
  }

  // Configurações do timer
  // O timer será iniciado ao começar o jogo
}

// Função draw para desenhar a tela do jogo continuamente
function draw() {
  background(135, 206, 235); // Cor de fundo azul (céu)

  if (estadoJogo === 'menu') {
    desenharMenu(); // Desenha o menu inicial
  } else if (estadoJogo === 'jogando') {
    desenharCenario(); // Desenha o cenário (rua)
    desenharEdificios(); // Desenha os edifícios
    desenharPlantas(); // Desenha as plantas
    desenharUI(); // Desenha a interface do usuário
    checarFimJogo(); // Verifica se o jogo terminou
  } else if (estadoJogo === 'fim') {
    desenharFimJogo(); // Desenha a tela de fim de jogo
  }
}

// Função para desenhar o menu inicial
function desenharMenu() {
  background(50, 150, 200); // Cor de fundo azul mais escura para o menu
  fill(255); // Cor branca para o texto
  textAlign(CENTER, CENTER); // Alinhamento central do texto
  textSize(48); // Tamanho do título
  text("Colheita Urbana", width / 2, height / 2 - 50); // Título do jogo
  textSize(24); // Tamanho do subtítulo
  text("Clique para Iniciar", width / 2, height / 2 + 30); // Instrução para iniciar
  textSize(16); // Tamanho das instruções
  text("Plante em telhados vazios (clique)", width / 2, height / 2 + 80); // Instrução de plantio
  text("Clique em plantas verdes para colher", width / 2, height / 2 + 110); // Instrução de colheita
  text("Clique na torneira para encher a água", width / 2, height / 2 + 140); // Instrução para recarregar água
}

// Função para desenhar o cenário (rua e linhas)
function desenharCenario() {
  fill(80); // Cor cinza para a rua
  rect(0, height - 100, width, 100); // Desenha a rua

  fill(255, 255, 0); // Cor amarela para as linhas da rua
  for (let i = 0; i < width; i += 40) {
    rect(i, height - 55, 20, 5); // Desenha as linhas da rua
  }
}

// Função para desenhar os edifícios
function desenharEdificios() {
  for (let edificio of edificios) {
    push(); // Salva o estado atual de desenho
    translate(edificio.x, edificio.y); // Move a origem para a posição do edifício
    rectMode(CENTER); // Define o modo de desenho de retângulos para o centro
    fill(edificio.cor); // Define a cor do edifício
    rect(0, 0, edificio.largura, edificio.altura); // Desenha o edifício

    // Desenha as janelas do edifício
    fill(255, 255, 150, 180); // Cor amarela clara com transparência
    let numJanelasX = floor(edificio.largura / 30); // Número de janelas na horizontal
    let numJanelasY = floor(edificio.altura / 40); // Número de janelas na vertical
    for (let j = 0; j < numJanelasY; j++) {
      for (let k = 0; k < numJanelasX; k++) {
        rect(k * 25 - (edificio.largura / 2) + 15, j * 30 - (edificio.altura / 2) + 15, 15, 15); // Desenha cada janela
      }
    }

    // Desenha o telhado do edifício
    fill(70, 70, 70); // Cor mais escura para o telhado
    rect(0, -edificio.altura / 2, edificio.largura, 10); // Desenha a borda do telhado

    pop(); // Restaura o estado de desenho anterior
  }
}

// Função para desenhar as plantas
function desenharPlantas() {
  for (let planta of plantas) {
    push(); // Salva o estado atual de desenho
    translate(planta.x, planta.y); // Move a origem para a posição da planta
    rectMode(CENTER); // Define o modo de desenho de retângulos para o centro

    // Desenha a base da planta (terra)
    fill(139, 69, 19); // Cor marrom para a terra
    rect(0, 0, planta.largura + 10, planta.altura / 2 + 5); // Desenha a base

    // Desenha os diferentes estágios da planta
    if (planta.estagio === 'semente') {
      fill(100); // Cor cinza para a semente
      ellipse(0, 0, 5, 5); // Desenha a semente
    } else if (planta.estagio === 'broto') {
      fill(100, 150, 80); // Cor verde clara para o broto
      rect(0, -5, 3, 10); // Desenha o caule
      ellipse(-3, -10, 5, 5); // Desenha a folha esquerda
      ellipse(3, -10, 5, 5); // Desenha a folha direita
    } else if (planta.estagio === 'madura') {
      fill(50, 150, 50); // Cor verde forte para a planta madura
      rect(0, -10, 5, 20); // Desenha o caule
      ellipse(-5, -20, 8, 15); // Desenha a folha esquerda
      ellipse(5, -20, 8, 15); // Desenha a folha direita
      fill(255, 215, 0); // Cor dourada para o fruto (ex: milho)
      ellipse(0, -25, 10, 15); // Desenha o fruto
    }

    pop(); // Restaura o estado de desenho anterior
  }
}

// Função para desenhar a interface do usuário (UI)
function desenharUI() {
  // Desenha a barra de água
  fill(0, 0, 0, 150); // Fundo da barra com transparência
  rect(10, 10, 200, 20, 5); // Desenha o fundo da barra
  fill(0, 100, 255); // Cor azul para representar a água
  rect(10, 10, map(agua, 0, 100, 0, 200), 20, 5); // Desenha a quantidade de água atual
  fill(255); // Cor branca para o texto
  textSize(14); // Tamanho do texto
  textAlign(LEFT, CENTER); // Alinhamento do texto à esquerda
  text(`Água: ${floor(agua)}%`, 15, 20); // Exibe a porcentagem de água

  // Desenha a torneira para recarregar água
  fill(150); // Cor cinza para o corpo da torneira
  rect(220, 5, 30, 20, 3); // Desenha o corpo da torneira
  fill(200); // Cor mais clara para o bico da torneira
  ellipse(235, 35, 15, 15); // Desenha o bico
  fill(0); // Cor preta para a gota d'água
  triangle(235, 30, 230, 45, 240, 45); // Desenha a gota d'água

  // Exibe a pontuação
  fill(0); // Cor preta para o texto
  textSize(24); // Tamanho do texto
  textAlign(RIGHT, TOP); // Alinhamento do texto à direita
  text(`Pontuação: ${pontuacao}`, width - 10, 10); // Exibe a pontuação atual

  // Exibe o tempo restante
  fill(
::contentReference[oaicite:0]{index=0}
 
