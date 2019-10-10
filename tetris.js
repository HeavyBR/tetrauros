let SCORE = document.getElementById('score');
let deletedLINES = document.getElementById('deletedLines');
let TIME = document.getElementById('time');
let STAGE = document.getElementById('stage');

const canvas = document.getElementById('tela');
let largura = canvas.offsetWidth - 4; // - 4 exclui os dois pixel de borda de cada lado
let altura = canvas.offsetHeight - 4;
const ctx = canvas.getContext('2d');
const AREA_BLOCO = 20;
const VELOCIDADE = 1600;
let LINHA = Math.floor((altura) / AREA_BLOCO);
let COLUNA = Math.floor((largura) / AREA_BLOCO);

var dificuldadeDoJogo = VELOCIDADE;
var pausado = false;
var audioLinhaCompleta = new Audio('linha.mp3');
var audioGameOver = new Audio('gameOver.wav')
var gameOver = false;
var score = 0;
var deadLINES = 0;
var stage = 1;
var controle = 0;
var temporizador = 0;
var statusContador = 0;
var tempo;

const VAZIO = "BLACK"; // Cor de fundo do canvas
timer = NaN;
let tabuleiro = [];



let p; //objeto peca

function iniciar()
{
    iniciarContador();
    controle++;

    CriaTabuleiro();
    p = pecaAleatoria();
    Tabuleiro.desenhar();
    clearInterval(timer);
    timer = setInterval(drop, dificuldadeDoJogo)

    gameOver = false;
    score = 0;
    deadLINES = 0;
    stage = 1;
    SCORE.innerHTML = score;
    deletedLINES.innerHTML = deadLINES;
    STAGE.innerHTML = stage;

    M.toast({
        html: 'Jogo iniciado',
        classes: 'green darken-1 rounded'
    });

}


function pausar()
{
    btPausarReference = document.getElementById("btPausar");
    if(!pausado)
    {
        pausarContador();
        btPausarReference.innerHTML = "Continuar";
        M.toast({
        html: 'Jogo pausado para DEBUG',
        classes: 'purple darken-1 rounded'
        });
        pausado = true;
    }
    else
    {
        iniciarContador();
        btPausarReference.innerHTML = "Pausar"
        pausado = false;
    }
}


function reiniciar()
{
    if(controle >= 1)
    {
        dificuldadeDoJogo = VELOCIDADE;
        resetarContador();
        var opcao = confirm("Deseja reiniciar o jogo?");
        if(opcao !== true)
        {
            var opcao2 = confirm("Recarregar pagina?");
            if(opcao2 !== true)
            {

            } else
            {
                location.reload();
            }
        } else
        {
            iniciar();
        }
    }
}

function fimJogo()
{
    gameOver = true;
    clearInterval(timer);
    resetarContador();
    reiniciar();
}



function contadorTempo() {
    TIME.innerHTML = temporizador;
    tempo = setTimeout(contadorTempo, 1000);
    temporizador++;
}

function iniciarContador() {
    if (!statusContador) {
        statusContador = 1;
        contadorTempo();
    }
}

function pausarContador() {
    clearTimeout(tempo);
    statusContador = 0;
}

function resetarContador() {
    clearTimeout(tempo);
    temporizador = 0;
    statusContador = 0;
}





//Criando tabuleiro e preenchendo com blocos brancos
const CriaTabuleiro = () =>
{
    for (let l = 0; l < LINHA; l++) //ok
    {
        tabuleiro[l] = [];
        for (let c = 0; c < COLUNA; c++)
        {
            tabuleiro[l][c] = VAZIO;
        }
    }
};
//CriaTabuleiro();


//Mover a peça todo frame
function drop()
{
    if(!pausado)
    {
         p.moveUp();
    }
}


// Classe peca, possui funcoes de: desenhar, apagar, preencher, movimentos e trava
class Peca
{
    constructor(tetromino, cor)
    {
        this.cor = cor;
        this.tetromino = tetromino;
        this.posicaoDaPeca = 0;
        this.pecaAtiva = this.tetromino[this.posicaoDaPeca];
        this.x = Math.floor(COLUNA / 2) - 1;
        this.y = LINHA - 1;
    }


    desenhar = () =>
    {
        this.preencher(this.cor);
    };

    apagar = () =>
    {
        this.preencher(VAZIO);
    };

    preencher = (cor) =>
    {
        for (let l = 0; l < this.pecaAtiva.length; l++)
        {
            for (let c = 0; c < this.pecaAtiva.length; c++)
            {
                if (this.pecaAtiva[l][c])
                {
                    desenharBloco(c + this.x, l + this.y, cor);
                }
            }
        }
    };


    moveUp = () =>
    {
        if (!this.collision(0, -1, this.pecaAtiva))
        {
            this.apagar();
            this.y--;
            this.desenhar();
        }
        // Quando colidir, deve "travar" e gerar nova peca!
        else
        {
            this.lock();
            p = pecaAleatoria();
        }
    };
    moveLeft = () =>
    {
        if (!this.collision(-1, 0, this.pecaAtiva))
        {
            this.apagar();
            this.x--;
            this.desenhar();
        }
    };

    moveRight = () =>
    {
        if (!this.collision(1, 0, this.pecaAtiva))
        {
            this.apagar();
            this.x++;
            this.desenhar();
        }
    };
    collision = (x, y, peca) =>
    {
        for (let l = 0; l < peca.length; l++)
        {
            for (let c = 0; c < peca.length; c++)
            {
                //Se o quadrado estiver vazio nós o ignoramos, nao precisa verificar colisao
                if (!peca[l][c])
                {
                    continue;
                }

                // Coordenadas do quadrado do tetromino apos movimento
                let proxX = this.x + c + x;
                let proxY = this.y + l + y;

                // Condicao que prende o tetromino dentro do painel
                if (proxX < 0 || proxX >= COLUNA || proxY < 0)
                {
                    return true;
                }

                // Funcao que impede que
                if (proxY > LINHA - 1)
                {
                    continue;
                }
                // Condicao que checa se JA HA um quadrado de um tetromino na posicao seguinte (apos o movimento)
                //25 24
                if (tabuleiro[proxY][proxX] !== VAZIO)
                {
                    return true;
                }
            }
        }
        return false;
    };
    lock = () =>
    {
        for (let l = 0; l < this.pecaAtiva.length; l++)
        {
            for (let c = 0; c < this.pecaAtiva.length; c++)
            {
                // Pular os quadrados vazios
                if (!this.pecaAtiva[l][c])
                {
                    continue;
                }
                // Peca passar a borda inferior - GAME OVER!
                if (this.y + l > LINHA - 1) //ESSA
                {
                    audioGameOver.play();
                    M.toast({
                    html: 'Game Over',
                    classes: 'whitedarken-1 rounded'
                    });

                    // Parar a funcao "requestAnimationFrame(drop);"

                    fimJogo();
                    break;
                }
                tabuleiro[this.y + l][this.x + c] = this.cor;
            }
        }
        // Remover linhas completas
        for (let l = LINHA - 1; l >= 0; l--)
        {
            let linhaCompleta = true;
            for (let c = COLUNA - 1; c >= 0; c--)
            {
                // linhaCompleta = 1;
                // tabuleiro[l][c] != VAZIO --> 0 se qudrado esta vazio; 1 se quadrado esta completo
                // 1 * 1 = true
                // 1 * 0 = false
                linhaCompleta = (linhaCompleta && (tabuleiro[l][c] !== VAZIO));
            }
            if (linhaCompleta)
            {
                // "j" deve receber "l" para remover somente a linha que está cheia
                for (let j = l; j < LINHA - 1; j++)
                {
                    for (let i = 0; i < COLUNA; i++)
                    {
                        tabuleiro[j][i] = tabuleiro[j + 1][i];
                    }
                }
                for (let i = 0; i < COLUNA; i++)
                {
                    tabuleiro[LINHA - 1][i] = VAZIO;
                }
                score += 10;
                deadLINES += 1;
                dificuldadeDoJogo -= 40
                if(deadLINES == 5 || deadLINES == 10 || deadLINES == 15 || deadLINES == 20 || deadLINES == 25 || deadLINES == 30 || deadLINES == 35 || deadLINES == 40)
                {
                    stage +=1;
                    M.toast({html: 'DIFICULDADE AUMENTADA!!',classes: 'red darken-1 rounded'})
                }
                clearInterval(timer);
                timer = setInterval(drop, dificuldadeDoJogo)
                audioLinhaCompleta.play();
            }
        }

        // Atualizar tabuleiro
        Tabuleiro.desenhar();
        // Atualizar Informacoes
        SCORE.innerHTML = score;
        deletedLINES.innerHTML = deadLINES;
        STAGE.innerHTML = stage;
    };

    rotate = () =>
    {
        // Criar ciclo de 0 a 3, impedindo a chamada de uma peca que nao exista!
        let proximoModelo = this.tetromino[(this.posicaoDaPeca + 1) % this.tetromino.length];
        let ajuste = 0;

        // Condicao que permite a rotacao perto da parede
        if (this.collision(0, 0, proximoModelo))
        {
            // Se o X for maior que a metade do numero de colunas,
            //estamos na parede da direta!
            if (this.x > COLUNA / 2)
            {
                // Parede da direita
                // ajuste = -1 move o tetromino para eAREA_BLOCOuerda
                ajuste = -1;
            }
            // Se o X for menor que a metade do numero de colunas,
            //estamos na parede da eAREA_BLOCOuerda!
            else
            {
                // Parede da eAREA_BLOCOuerda
                // ajuste = 1 move o tetromino para direita
                ajuste = 1;
            }
        }

        //
        if (!this.collision(ajuste, 0, proximoModelo))
        {
            this.apagar();
            this.x += ajuste;
            this.posicaoDaPeca = (this.posicaoDaPeca + 1) % this.tetromino.length;
            this.pecaAtiva = this.tetromino[this.posicaoDaPeca];
            this.desenhar();
        }
    };
}

/*
 ******************************************************************
 * Funcoes - DESENHO
 ******************************************************************
 */


// Funcao que desenha o quadrado do tetromino
function desenharBloco(x, y, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x * AREA_BLOCO, y * AREA_BLOCO, AREA_BLOCO, AREA_BLOCO);
    ctx.strokeStyle = "#141414"; // Cor das linhas do canvas
    ctx.strokeRect(x * AREA_BLOCO, y * AREA_BLOCO, AREA_BLOCO, AREA_BLOCO);
}

// Declaracao dos tetromino e cores
const PIECES = [
    [L, "orange"],
    [J, "blue"],
    [T, "purple"],
    [O, "yellow"],
    [I, "cyan"],
    [U, "green"],
];

// ++++++++++++++++++++++
//  Gerar peça aleatoria
// ++++++++++++++++++++++
function pecaAleatoria()
{
    let aleatorio = (Math.floor(Math.random() * PIECES.length));
    // Gero um numeric aleatório que vai de 0 (inclusivo) até 1 (exclusivo)
    // Multiplico pelo tamanho do vetor de peças
    // Arredondo para um "inteiro", pois o math.random gera um numeric qualquer (com casas decimais)

    //Busca um tipo de tetromino, depois pega alguma variação de sua rotação
    return new Peca(PIECES[aleatorio][0], PIECES[aleatorio][1]);
}


// Variavel que obtem a tecla clicada pelo usuario
document.addEventListener("keydown", CONTROL);

// Funcao que move a peça de acordo com o clique
function CONTROL(event)
{
    if (event.key === "ArrowLeft")
    {
        p.moveLeft();
        dropStart = Date.now();
    }
    else if (event.key === "ArrowDown")
    {
        p.rotate();
        dropStart = Date.now();
    }
    else if (event.key === "ArrowRight")
    {
        p.moveRight();
        dropStart = Date.now();
    }
    else if (event.key === "ArrowUp")
    {
        p.moveUp();
        dropStart = Date.now();
    }
}

// Funcao que desenha o painel de jogo
var Tabuleiro = {
    desenhar: function ()
    {
        for (let l = 0; l < LINHA; l++)
        {
            for (let c = 0; c < COLUNA; c++)
            {
                desenharBloco(c, l, tabuleiro[l][c]);
            }
        }
    }
};

function redimensionarJogo()
{
    if (canvas.offsetWidth == "204" && canvas.offsetHeight == "404")
    {
        alert("Tem certeza que deseja redimensionar o jogo para que fique MENOR?");
        //iniciarJogo();
        canvas.height = "200";
        canvas.width = "100";
        LINHA = Math.floor(canvas.height / AREA_BLOCO);
        COLUNA = Math.floor(canvas.width / AREA_BLOCO);
        CriaTabuleiro();
        Tabuleiro.desenhar();
    }
    else
    {
        alert("Tem certeza que deseja redimensionar o jogo para que fique MAIOR?");
        canvas.height = "400";
        canvas.width = "200";
        LINHA = Math.floor(canvas.height / AREA_BLOCO);
        COLUNA = Math.floor(canvas.width / AREA_BLOCO);
        CriaTabuleiro();
        Tabuleiro.desenhar();
    }

}

