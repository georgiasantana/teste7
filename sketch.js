let edificios = []; // Array para armazenar os objetos dos edifícios da cidade.
let plantas = []; // Array para armazenar os objetos das plantas cultivadas nos telhados.
let agua = 100; // Variável que representa a quantidade de água disponível para as plantas, de 0 a 100.
let pontuacao = 0; // Variável para armazenar a pontuação do jogador.
let tempoRestante = 60; // Tempo restante de jogo em segundos, começa em 60.
let timerInterval; // Variável para armazenar o ID do intervalo do timer, usado para parar o tempo.
let estadoJogo = 'menu'; // Variável que controla o estado atual do jogo: 'menu', 'jogando' ou 'fim'.

// Sons (opcional, requer arquivos de áudio)
// let somPlantio; // Variável para carregar o som de plantio.
// let somColheita; // Variável para carregar o som de colheita.
// let somFimJogo; // Variável para carregar o som de fim de jogo.

function preload() {
  // Esta função é executada antes do setup(), ideal para carregar mídias como imagens e sons.
  // Se quiser adicionar sons, descomente e carregue aqui:
  // somPlantio = loadSound('assets/plant.mp3'); // Carrega o arquivo de som para plantio.
  // somColheita = loadSound('assets/harvest.mp3'); // Carrega o arquivo de som para colheita.
  // somFimJogo = loadSound('assets/gameOver.mp3'); // Carrega o arquivo de som para fim de jogo.
}

function setup() {
  // Esta função é executada uma vez no início do programa.
  createCanvas(800, 600); // Cria a tela do jogo com 800 pixels de largura por 600 de altura.
  imageMode(CENTER); // Define que as imagens (se usadas) serão desenhadas a partir do seu centro.

  // Gerar edifícios
  for (let i = 0; i < 5; i++) { // Loop para criar 5 edifícios.
    let w = random(80, 150); // Define uma largura aleatória para o edifício.
    let h = random(200, 400); // Define uma altura aleatória para o edifício.
    edificios.push({ // Adiciona um novo objeto de edifício ao array 'edificios'.
      x: i * (width / 5) + (width / 5) / 2, // Calcula a posição X do edifício para espaçamento uniforme.
      y: height - h / 2 - 50, // Calcula a posição Y do edifício para que ele fique acima da rua.
      largura: w, // Atribui a largura gerada ao edifício.
      altura: h, // Atribui a altura gerada ao edifício.
      cor: color(random(100, 200), random(100, 200), random(100, 200)) // Define uma cor aleatória para o edifício.
    });
  }

  // Configurações do timer
  //timerInterval = setInterval(contarTempo, 1000); // Esta linha está comentada; o timer é iniciado apenas quando o jogo começa.
}

function draw() {
  // Esta função é executada continuamente, cerca de 60 vezes por segundo (framerate padrão).
  background(135, 206, 235); // Define a cor de fundo do canvas (azul claro, representando o céu).

  if (estadoJogo === 'menu') { // Verifica se o estado atual do jogo é 'menu'.
    desenharMenu(); // Chama a função para desenhar a tela do menu.
  } else if (estadoJogo === 'jogando') { // Verifica se o estado atual do jogo é 'jogando'.
    desenharCenario(); // Desenha o cenário (rua).
    desenharEdificios(); // Desenha os edifícios.
    desenharPlantas(); // Desenha as plantas nos telhados.
    desenharUI(); // Desenha a interface do usuário (água, pontuação, tempo).
    checarFimJogo(); // Verifica se as condições para o fim do jogo foram atingidas.
  } else if (estadoJogo === 'fim') { // Verifica se o estado atual do jogo é 'fim'.
    desenharFimJogo(); // Chama a função para desenhar a tela de fim de jogo.
  }
}

function desenharMenu() {
  // Desenha a tela inicial do jogo (menu).
  background(50, 150, 200); // Define um fundo azul mais escuro para o menu.
  fill(255); // Define a cor de preenchimento para branco.
  textAlign(CENTER, CENTER); // Alinha o texto ao centro horizontal e verticalmente.
  textSize(48); // Define o tamanho da fonte para o título.
  text("Colheita Urbana", width / 2, height / 2 - 50); // Desenha o título do jogo.
  textSize(24); // Define o tamanho da fonte para as instruções menores.
  text("Clique para Iniciar", width / 2, height / 2 + 30); // Instrução para iniciar o jogo.
  textSize(16); // Define o tamanho da fonte para as dicas de jogabilidade.
  text("Plante em telhados vazios (clique)", width / 2, height / 2 + 80); // Dica de plantio.
  text("Clique em plantas verdes para colher", width / 2, height / 2 + 110); // Dica de colheita.
  text("Clique na torneira para encher a água", width / 2, height / 2 + 140); // Dica de recarga de água.
}

function desenharCenario() {
  // Desenha elementos de cenário que não são edifícios ou plantas.
  // Rua
  fill(80); // Define a cor da rua (cinza escuro).
  rect(0, height - 100, width, 100); // Desenha o retângulo que representa a rua.

  // Linhas da rua
  fill(255, 255, 0); // Define a cor das linhas da rua (amarelo).
  for (let i = 0; i < width; i += 40) { // Loop para desenhar várias linhas tracejadas na rua.
    rect(i, height - 55, 20, 5); // Desenha um pequeno retângulo para cada segmento de linha.
  }
}

function desenharEdificios() {
  // Desenha todos os edifícios no array 'edificios'.
  for (let edificio of edificios) { // Itera sobre cada objeto 'edificio' no array.
    push(); // Salva as configurações de transformação atuais (para isolar as transformações do edifício).
    translate(edificio.x, edificio.y); // Move a origem do desenho para o centro do edifício.
    rectMode(CENTER); // Define que retângulos serão desenhados a partir do seu centro.
    fill(edificio.cor); // Define a cor do preenchimento para a cor do edifício.
    rect(0, 0, edificio.largura, edificio.altura); // Desenha o corpo principal do edifício.

    // Janelas
    fill(255, 255, 150, 180); // Define a cor das janelas (amarelo claro com transparência).
    let numJanelasX = floor(edificio.largura / 30); // Calcula quantas janelas cabem horizontalmente.
    let numJanelasY = floor(edificio.altura / 40); // Calcula quantas janelas cabem verticalmente.
    for (let j = 0; j < numJanelasY; j++) { // Loop para desenhar as linhas de janelas verticalmente.
      for (let k = 0; k < numJanelasX; k++) { // Loop para desenhar as janelas horizontalmente.
        rect(k * 25 - (edificio.largura / 2) + 15, j * 30 - (edificio.altura / 2) + 15, 15, 15); // Desenha cada janela.
      }
    }

    // Telhado (parte superior)
    fill(70, 70, 70); // Define uma cor mais escura para o telhado.
    rect(0, -edificio.altura / 2, edificio.largura, 10); // Desenha uma pequena borda no topo do edifício, representando o telhado.

    pop(); // Restaura as configurações de transformação salvas.
  }
}

function desenharPlantas() {
  // Desenha todas as plantas no array 'plantas'.
  for (let planta of plantas) { // Itera sobre cada objeto 'planta' no array.
    push(); // Salva as configurações de transformação.
    translate(planta.x, planta.y); // Move a origem do desenho para a posição da planta.
    rectMode(CENTER); // Define que retângulos serão desenhados a partir do seu centro.

    // Base da planta (terra)
    fill(139, 69, 19); // Define a cor da base da planta (marrom, representando terra).
    rect(0, 0, planta.largura + 10, planta.altura / 2 + 5); // Desenha a base onde a planta está crescendo.

    // Estágios da planta
    if (planta.estagio === 'semente') { // Se a planta está no estágio de semente.
      fill(100); // Cor cinza para a semente.
      ellipse(0, 0, 5, 5); // Desenha uma pequena elipse para representar a semente.
    } else if (planta.estagio === 'broto') { // Se a planta está no estágio de broto.
      fill(100, 150, 80); // Cor verde-claro para o broto.
      rect(0, -5, 3, 10); // Desenha o caule do broto.
      ellipse(-3, -10, 5, 5); // Desenha uma pequena folha.
      ellipse(3, -10, 5, 5); // Desenha outra pequena folha.
    } else if (planta.estagio === 'madura') { // Se a planta está no estágio madura.
      fill(50, 150, 50); // Cor verde forte para a planta madura.
      rect(0, -10, 5, 20); // Desenha o caule mais desenvolvido.
      ellipse(-5, -20, 8, 15); // Desenha uma folha maior.
      ellipse(5, -20, 8, 15); // Desenha outra folha maior.
      fill(255, 215, 0); // Cor amarela para o fruto (ex: milho).
      ellipse(0, -25, 10, 15); // Desenha o fruto da planta.
    }

    pop(); // Restaura as configurações de transformação salvas.
  }
}

function desenharUI() {
  // Desenha a interface do usuário (UI) na tela.
  // Barra de Água
  fill(0, 0, 0, 150); // Fundo da barra (preto com transparência).
  rect(10, 10, 200, 20, 5); // Desenha o fundo da barra de água.
  fill(0, 100, 255); // Cor da água (azul).
  rect(10, 10, map(agua, 0, 100, 0, 200), 20, 5); // Desenha a barra de água, cujo comprimento varia com a quantidade de água.
  fill(255); // Cor do texto (branco).
  textSize(14); // Tamanho do texto.
  textAlign(LEFT, CENTER); // Alinhamento do texto.
  text(`Água: ${floor(agua)}%`, 15, 20); // Exibe o nível de água atual.

  // Torneira para recarregar água
  fill(150); // Cor do corpo da torneira (cinza).
  rect(220, 5, 30, 20, 3); // Desenha o corpo principal da torneira.
  fill(200); // Cor do bico da torneira (cinza claro).
  ellipse(235, 35, 15, 15); // Desenha o bico da torneira.
  fill(0); // Cor da gota (preto).
  triangle(235, 30, 230, 45, 240, 45); // Desenha uma gota d'água simbolizando a recarga.

  // Pontuação
  fill(0); // Cor do texto (preto).
  textSize(24); // Tamanho do texto.
  textAlign(RIGHT, TOP); // Alinhamento do texto.
  text(`Pontuação: ${pontuacao}`, width - 10, 10); // Exibe a pontuação atual do jogador.

  // Tempo
  fill(0); // Cor do texto (preto).
  textSize(24); // Tamanho do texto.
  textAlign(CENTER, TOP); // Alinhamento do texto.
  text(`Tempo: ${ceil(tempoRestante)}s`, width / 2, 10); // Exibe o tempo restante do jogo.
}

function mousePressed() {
  // Esta função é chamada automaticamente quando o botão do mouse é pressionado.
  if (estadoJogo === 'menu') { // Se o jogo está no menu.
    estadoJogo = 'jogando'; // Muda o estado do jogo para 'jogando'.
    timerInterval = setInterval(contarTempo, 1000); // Inicia o timer do jogo para contar o tempo a cada segundo.
    setInterval(crescerPlantas, 2000); // Inicia o processo de crescimento das plantas a cada 2 segundos.
    setInterval(consumirAgua, 1000); // Inicia o consumo de água a cada segundo.
    return; // Sai da função para evitar processar outros cliques.
  }

  if (estadoJogo === 'jogando') { // Se o jogo está em andamento.
    // Clicou na torneira para recarregar água?
    if (mouseX > 220 && mouseX < 250 && mouseY > 5 && mouseY < 40) { // Verifica se o clique foi na área da torneira.
      agua = min(100, agua + 20); // Aumenta a água em 20, mas não permite passar de 100.
      // if (somPlantio) somPlantio.play(); // Descomente para tocar som de recarregar se houver.
      return; // Já tratou o clique, sai da função.
    }

    // Clicou em um telhado para plantar?
    for (let edificio of edificios) { // Itera sobre cada edifício.
      // Verifica se o clique está no telhado do prédio (parte superior).
      let telhadoX1 = edificio.x - edificio.largura / 2; // Coordenada X esquerda do telhado.
      let telhadoX2 = edificio.x + edificio.largura / 2; // Coordenada X direita do telhado.
      let telhadoY1 = edificio.y - edificio.altura / 2 - 10; // Coordenada Y superior do telhado (considerando a borda).
      let telhadoY2 = edificio.y - edificio.altura / 2; // Coordenada Y inferior do telhado.

      if (mouseX > telhadoX1 && mouseX < telhadoX2 && mouseY > telhadoY1 && mouseY < telhadoY2) { // Se o clique foi dentro da área do telhado.
        // Verifica se já tem uma planta neste telhado
        let temPlanta = false; // Flag para verificar se já existe uma planta.
        for (let planta of plantas) { // Itera sobre as plantas existentes.
          if (dist(planta.x, planta.y, mouseX, edificio.y - edificio.altura / 2 - 20) < 30) { // Verifica a distância de cliques próximos a plantas existentes.
            temPlanta = true; // Marca que já existe uma planta.
            break; // Sai do loop, pois uma planta foi encontrada.
          }
        }
        if (!temPlanta && agua >= 10) { // Se não tem planta no local e tem água suficiente.
          plantas.push({ // Adiciona uma nova planta ao array 'plantas'.
            x: mouseX, // Posição X da planta é onde o mouse clicou.
            y: edificio.y - edificio.altura / 2 - 20, // Posição Y da planta (no telhado).
            largura: random(20, 30), // Largura aleatória da planta.
            altura: random(30, 40), // Altura aleatória da planta.
            estagio: 'semente', // Estágio inicial da planta.
            saude: 100 // Saúde inicial da planta.
          });
          agua -= 10; // Custo de água para plantar.
          // if (somPlantio) somPlantio.play(); // Descomente para tocar som de plantio.
          return; // Já tratou o clique, sai da função.
        } else if (agua < 10) { // Se não tem água suficiente para plantar.
          // console.log("Sem água suficiente para plantar!"); // Feedback no console (poderia ser visual no jogo).
        }
      }
    }

    // Clicou em uma planta madura para colher?
    for (let i = plantas.length - 1; i >= 0; i--) { // Itera sobre as plantas de trás para frente (seguro para remover itens).
      let planta = plantas[i]; // Pega a planta atual.
      // Verifica se o clique está na área da planta madura
      let plantaAreaX1 = planta.x - planta.largura / 2; // Coordenada X esquerda da área da planta.
      let plantaAreaX2 = planta.x + planta.largura / 2; // Coordenada X direita da área da planta.
      let plantaAreaY1 = planta.y - planta.altura; // Coordenada Y superior da área da planta.
      let plantaAreaY2 = planta.y; // Coordenada Y inferior da área da planta.

      if (planta.estagio === 'madura' && mouseX > plantaAreaX1 && mouseX < plantaAreaX2 && mouseY > plantaAreaY1 && mouseY < plantaAreaY2) { // Se a planta está madura e o clique está na sua área.
        pontuacao += 10; // Aumenta a pontuação em 10.
        plantas.splice(i, 1); // Remove a planta colhida do array.
        // if (somColheita) somColheita.play(); // Descomente para tocar som de colheita.
        return; // Já tratou o clique, sai da função.
      }
    }
  } else if (estadoJogo === 'fim') { // Se o jogo está na tela de fim de jogo.
    // Reiniciar o jogo no final
    estadoJogo = 'menu'; // Volta o estado do jogo para o menu.
    reiniciarJogo(); // Chama a função para resetar as variáveis do jogo.
  }
}

function crescerPlantas() {
  // Função responsável por fazer as plantas progredirem de estágio.
  if (estadoJogo !== 'jogando') return; // Se o jogo não está em andamento, não executa a função.

  for (let planta of plantas) { // Itera sobre cada planta.
    if (agua > 0 && planta.saude > 0) { // Plantas só crescem se tiver água e saúde.
      if (planta.estagio === 'semente') { // Se a planta é uma semente.
        if (random() < 0.3) { // 30% de chance de virar broto.
          planta.estagio = 'broto'; // Muda o estágio para broto.
        }
      } else if (planta.estagio === 'broto') { // Se a planta é um broto.
        if (random() < 0.2) { // 20% de chance de virar madura.
          planta.estagio = 'madura'; // Muda o estágio para madura.
        }
      }
    } else {
      // Planta murcha se não tiver água
      planta.saude -= 5; // Reduz a saúde da planta se não houver água ou saúde.
      if (planta.saude <= 0) { // Se a saúde da planta chegou a zero.
        // Planta morre e desaparece (a remoção ocorre no filtro abaixo).
        // Poderíamos adicionar uma animação de "murchando" aqui.
      }
    }
  }
  // Remove plantas mortas
  plantas = plantas.filter(planta => planta.saude > 0); // Filtra o array, removendo plantas com saúde <= 0.
}

function consumirAgua() {
  // Função que consome água do recurso do jogador.
  if (estadoJogo !== 'jogando') return; // Se o jogo não está em andamento, não executa a função.

  if (plantas.length > 0) { // Se houver plantas cultivadas.
    agua -= plantas.length * 0.5; // Reduz a água com base no número de plantas (cada planta consome 0.5 de água).
    agua = max(0, agua); // Garante que a quantidade de água não seja menor que zero.
  }
}

function contarTempo() {
  // Função que diminui o tempo restante do jogo.
  if (estadoJogo !== 'jogando') return; // Se o jogo não está em andamento, não executa a função.

  tempoRestante--; // Decrementa o tempo restante em 1.
}

function checarFimJogo() {
  // Função que verifica as condições para o fim do jogo.
  if (tempoRestante <= 0) { // Se o tempo restante chegou a zero ou menos.
    estadoJogo = 'fim'; // Muda o estado do jogo para 'fim'.
    clearInterval(timerInterval); // Para o timer de contagem de tempo.
    // if (somFimJogo) somFimJogo.play(); // Descomente para tocar som de fim de jogo.
  }
}

function desenharFimJogo() {
  // Desenha a tela de fim de jogo.
  background(200, 50, 50); // Fundo vermelho para indicar o fim do jogo.
  fill(255); // Cor do texto (branco).
  textAlign(CENTER, CENTER); // Alinhamento do texto.
  textSize(48); // Tamanho do texto para o título "Fim de Jogo!".
  text("Fim de Jogo!", width / 2, height / 2 - 50); // Desenha o título.
  textSize(32); // Tamanho do texto para a pontuação final.
  text(`Sua Pontuação Final: ${pontuacao}`, width / 2, height / 2 + 10); // Exibe a pontuação final do jogador.
  textSize(24); // Tamanho do texto para a instrução de reiniciar.
  text("Clique para jogar novamente", width / 2, height / 2 + 80); // Instrução para reiniciar o jogo.
}

function reiniciarJogo() {
  // Função para resetar todas as variáveis do jogo para um novo início.
  plantas = []; // Limpa o array de plantas.
  agua = 100; // Reseta a água para o valor inicial.
  pontuacao = 0; // Reseta a pontuação.
  tempoRestante = 60; // Reseta o tempo.
  clearInterval(timerInterval); // Garante que qualquer timer anterior seja parado para evitar duplicação.
}