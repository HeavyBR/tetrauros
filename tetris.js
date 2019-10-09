let SCORE = document.getElementById('score');
let deletedLINES = document.getElementById('deletedLines');

const canvas = document.getElementById('tela');
let largura = canvas.offsetWidth - 4; // - 4 exclui os dois pixel de borda de cada lado
let altura = canvas.offsetHeight - 4;
const ctx = canvas.getContext('2d');
const AREA_BLOCO = 20;
let LINHA = Math.floor((altura) / AREA_BLOCO);
let COLUNA = Math.floor((largura) / AREA_BLOCO);

const VAZIO = "BLACK"; // Cor de fundo do canvas

let tabuleiro = [];

//Criando tabuleiro e preenchendo com blocos brancos
const CriaTabuleiro = () => {
    for(let l = 0; l < LINHA; l++) //ok
    {
        tabuleiro[l] = [];
        for(let c = 0; c < COLUNA; c++)
            {
                tabuleiro[l][c] = VAZIO;
            }
    }
};
CriaTabuleiro();

class Peca
{
    constructor(tetromino, cor){
        this.cor = cor;
        this.tetromino = tetromino;
        this.posicaoDaPeca = 0;
        this.pecaAtiva = this.tetromino[this.posicaoDaPeca];
        this.x = Math.floor(COLUNA / 2) - 1;
        this.y = LINHA - 1;
    }


    draw = function()
    {
        this.fill(this.cor);
    };



}

/*
    ******************************************************************
    * Funcoes - DESENHO
    ******************************************************************
 */


// Funcao que desenha o quadrado do tetromino
function desenharBloco(x,y,color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x * AREA_BLOCO,y * AREA_BLOCO, AREA_BLOCO, AREA_BLOCO);
    ctx.strokeStyle = "#141414"; // Cor das linhas do canvas
    ctx.strokeRect(x * AREA_BLOCO, y * AREA_BLOCO, AREA_BLOCO , AREA_BLOCO);
}

// Declaracao dos tetromino e cores
const PIECES = [
    [L, "orange"],
    [J, "blue"],
    [T,"purple"],
    [O, "yellow"],
    [I, "cyan"],
    [U, "green"],
];

// ++++++++++++++++++++++
//  Gerar peça aleatoria
// ++++++++++++++++++++++
function pecaAleatoria()
{
    let a = (Math.floor(Math.random() * PIECES.length));
    return new Peca(PIECES[a][0], PIECES[a][1]);
}

let p = pecaAleatoria();

// Prototipo = Acrescenta uma informacao (funcao) em uma outra funcao
// Funcao que preenche o tetromino
Peca.prototype.fill = function(color)
{
    for(let l = 0; l < this.pecaAtiva.length; l++)
    {
        for(let c = 0; c < this.pecaAtiva.length; c++)
        {
            if(this.pecaAtiva[l][c])
            {
               desenharBloco(c + this.x, l + this.y, color);
            }
        }
    }
};

// Funcao preenche o tetromino com a cor desejada

//Peca.draw()

// Funcao que apaga o tetromino
// Funcao é necessaria para que o tetromino nao fique "gigante"
Peca.prototype.unDraw = function()
{
    this.fill(VAZIO);
};

/*
    ******************************************************************
    * Funcoes - MOVIMENTO
    ******************************************************************
 */

// Funcao que movimenta tetromino para CIMA
Peca.prototype.moveDown = function ()
{
    if(!this.collision(0, -1, this.pecaAtiva))
    {
        this.unDraw();
        this.y--;
        this.draw();
    }
    // Quando colidir, deve "travar" e gerar nova peca!
    else
    {
        this.lock();
        p = pecaAleatoria();
    }
};

// Funcao que movimenta tetromino para eAREA_BLOCOuerda
Peca.prototype.moveLeft = function()
{
    if(!this.collision(-1, 0, this.pecaAtiva))
    {
        this.unDraw();
        this.x--;
        this.draw();
    }

};

// Funcao que movimenta tetromino para direita
Peca.prototype.moveRight = function()
{
    if(!this.collision(1, 0, this.pecaAtiva))
    {
        this.unDraw();
        this.x++;
        this.draw();
    }
};

// Funcao que realiza a troca de tetromino (faz rotacao)
Peca.prototype.rotate = function()
{
    // Criar ciclo de 0 a 3, impedindo a chamada de uma peca que nao exista!
    let nextPattern = this.tetromino[(this.posicaoDaPeca + 1) % this.tetromino.length];
    let kick = 0;

    // Condicao que permite a rotacao perto da parede
    if(this.collision(0, 0, nextPattern))
    {
        // Se o X for maior que a metade do numero de colunas,
        //estamos na parede da direta!
        if(this.x > COLUNA/2)
        {
            // Parede da direita
            // kick = -1 move o tetromino para eAREA_BLOCOuerda
            kick = -1;
        }
        // Se o X for menor que a metade do numero de colunas,
        //estamos na parede da eAREA_BLOCOuerda!
        else
        {
            // Parede da eAREA_BLOCOuerda
            // kick = 1 move o tetromino para direita
            kick = 1;
        }
    }

    //
    if(!this.collision(kick, 0, nextPattern))
    {
        this.unDraw();
        this.x += kick;
        this.posicaoDaPeca = (this.posicaoDaPeca + 1) % this.tetromino.length;
        this.pecaAtiva = this.tetromino[this.posicaoDaPeca];
        this.draw();
    }
};

// Funcao de colisoes
Peca.prototype.collision = function(x, y, peca)
{
    for(let l = 0; l < peca.length; l++)
    {
        for(let c = 0; c < peca.length; c++)
        {
            //Se o quadrado estiver vazio nós o ignoramos, nao precisa verificar colisao
            if(!peca[l][c])
            {
                continue;
            }

            // Coordenadas do quadrado do tetromino apos movimento
            let proxX = this.x + c + x;
            let proxY = this.y + l + y;

            // Condicao que prende o tetromino dentro do painel
            if(proxX < 0 || proxX >= COLUNA || proxY < 0)
            {
                return true;
            }

            // Funcao que impede que
            if(proxY > LINHA - 1)
            {
                continue;
            }
            // Condicao que checa se JA HA um quadrado de um tetromino na posicao seguinte (apos o movimento)
            //25 24
            if(tabuleiro[proxY][proxX] !== VAZIO)
            {
                return true;
            }
        }
    }
    return false;
};

let score = 0;
let deadLINES = 0;
Peca.prototype.lock = function()
{
    for(let l = 0; l < this.pecaAtiva.length; l++)
    {
        for(let c = 0; c < this.pecaAtiva.length; c++)
        {
            // Pular os quadrados vazios
            if(!this.pecaAtiva[l][c])
            {
                continue;
            }
            // Peca passar a borda inferior - GAME OVER!
            if(this.y + l > LINHA - 1) //ESSA
            {
                alert("Game Over Baby!");
                // Parar a funcao "requestAnimationFrame(drop);"
                gameOver = true;
                break;
            }
            tabuleiro[this.y + l][this.x + c] = this.cor;
        }
    }
    // Remover linhas completas
    for(let l = LINHA - 1; l >= 0; l--)
    {
        let linhaCompleta = true;
        for(let c = COLUNA - 1; c >= 0; c--)
        {
            // linhaCompleta = 1;
            // tabuleiro[l][c] != VAZIO --> 0 se qudrado esta vazio; 1 se quadrado esta completo
            // 1 * 1 = true
            // 1 * 0 = false
            linhaCompleta = (linhaCompleta && (tabuleiro[l][c] !== VAZIO));
            console.log(linhaCompleta)
        }
        if(linhaCompleta)
        {
            // "j" deve receber "l" para remover somente a linha que está cheia
            for(let j = l; j < LINHA - 1; j++)
            {
                for(let i = 0; i < COLUNA; i++)
                {
                    tabuleiro[j][i] = tabuleiro[j + 1][i];
                }
            }
            for(let i = 0; i < COLUNA; i++)
            {
                tabuleiro[LINHA - 1][i] = VAZIO;
            }
            score += 10;
            deadLINES += 1;

        }
    }
    // Atualizar tabuleiro
    Tabuleiro.desenhar();
    // Atualizar Informacoes
    SCORE.innerHTML = score;
    deletedLINES.innerHTML = deadLINES;
};

// Variavel que obtem a tecla clicada pelo usuario
document.addEventListener("keydown", CONTROL);

// Funcao que move a peça de acordo com o clique
function CONTROL(event)
{
    if(event.key === "ArrowLeft")
    {
        p.moveLeft();
        dropStart = Date.now();
    }
    else if(event.key === "ArrowDown")
    {
        p.rotate();
        dropStart = Date.now();
    }
    else if(event.key === "ArrowRight")
    {
        p.moveRight();
        dropStart = Date.now();
    }
    else if (event.key === "ArrowUp")
    {
        p.moveDown();
        dropStart = Date.now();
    }
}

let dropStart = Date.now();
let gameOver = false;

//Mover a peça todo frame
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000)
    {
        p.moveDown();
        dropStart = Date.now();
    }
    if(!gameOver)
    {
        requestAnimationFrame(drop);
    }
}



// Funcao que desenha o painel de jogo
var Tabuleiro  = {
    desenhar: function(){
       for(let l = 0; l < LINHA; l++)
        {
            for(let c = 0; c < COLUNA; c++)
            {
               desenharBloco(c, l, tabuleiro[l][c]);
            }
        }
    }
};

Tabuleiro.desenhar();
drop();


function redimensionarJogo() {
    if(canvas.offsetWidth == "204" && canvas.offsetHeight == "404"){
        alert("Tem certeza que deseja redimensionar o jogo para que fique MENOR?");
        //iniciarJogo();
        canvas.height = "200";
        canvas.width = "100";
        LINHA = Math.floor(canvas.height / AREA_BLOCO);
        COLUNA = Math.floor(canvas.width / AREA_BLOCO);
        CriaTabuleiro();
        Tabuleiro.desenhar();
    } else {
        alert("Tem certeza que deseja redimensionar o jogo para que fique MAIOR?");
        canvas.height = "400";
        canvas.width = "200";
        LINHA = Math.floor(canvas.height / AREA_BLOCO);
        COLUNA = Math.floor(canvas.width / AREA_BLOCO);
        CriaTabuleiro();
        Tabuleiro.desenhar();
    }
}