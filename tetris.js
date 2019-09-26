const cvs = document.getElementById('tela');
const VAZIO = "white";
const ctx = cvs.getContext('2d');
const SQ = SQUARESIZE = 20;
const LINHA = Math.floor(cvs.height / SQUARESIZE);
const COLUNA = Math.floor(cvs.width / SQUARESIZE);


let tabuleiro = [];


//Criando tabuleiro e preenchendo com blocos brancos
for(l = 0; l < LINHA; l++)
{
    tabuleiro[l] = [];
    for(c = 0; c < COLUNA; c++)
    {
        tabuleiro[l][c] = VAZIO;
    }
}


/*
    ******************************************************************
    * Funcoes - DESENHO
    ******************************************************************
 */

// Funcao que desenha o painel de jogo
function drawBoard()
{
    for(l = 0; l < LINHA; l++)
    {
        for(c = 0; c < COLUNA; c++)
        {
            drawSquare(c, l, tabuleiro[l][c]);
        }
    }
}
drawBoard();

// Funcao que desenha o quadrado do tetromino
function drawSquare(x,y,color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ,y * SQ, SQ, SQ);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x * SQ, y * SQ, SQ , SQ);
}

// Declaracao dos tetromino e cores
const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T,"yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

// Teste - Passando o bloco 'Z' e cor vermelha
let p = new Piece(PIECES[0][0], PIECES[0][1]);

// Funcao que desenha o tetromino no painel do jogo
function Piece(tetromino, color)
{
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];

    this.x = Math.floor(COLUNA / 2) - 1;
    this.y = 24;

}

// Prototipo = Acrescenta uma informacao (funcao) em uma outra funcao
// Funcao que preenche o tetromino
Piece.prototype.fill = function(color)
{
    for(l = 0; l < this.activeTetromino.length; l++)
    {
        for(c = 0; c < this.activeTetromino.length; c++)
        {
            if(this.activeTetromino[l][c])
            {
                drawSquare(c + this.x,l + this.y ,color);
            }
        }
    }
}

// Funcao preenche o tetromino com a cor desejada
Piece.prototype.draw = function () {
    this.fill(this.color);
}

// Funcao que apaga o tetromino
// Funcao é necessaria para que o tetromino nao fique "gigante"
Piece.prototype.unDraw = function()
{
    this.fill(VAZIO);
}

/*
    ******************************************************************
    * Funcoes - MOVIMENTO
    ******************************************************************
 */

// Funcao que movimenta tetromino para CIMA
Piece.prototype.moveDown = function () {
    if(!this.collision(0,-1, this.activeTetromino))
    {
        this.unDraw();
        this.y--;
        this.draw();
    }
}

// Funcao que movimenta tetromino para esquerda
Piece.prototype.moveLeft = function()
{
    if(!this.collision(-1,0, this.activeTetromino))
    {
        this.unDraw();
        this.x--;
        this.draw();
    }

}

// Funcao que movimenta tetromino para direita
Piece.prototype.moveRight = function()
{
    if(!this.collision(1,0, this.activeTetromino))
    {
        this.unDraw();
        this.x++;
        this.draw();
    }

}

// Funcao que realiza a troca de tetromino (faz rotacao)
Piece.prototype.rotate = function()
{
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;

    //
    if(this.collision(0, 0, nextPattern))
    {
        if(this.x > COLUNA/2)
        {
            // Parede da direita
            // kick = -1 move o tetromino para esquerda
            kick = -1;
        }
        else
        {
            // Parede da esquerda
            // kick = 1 move o tetromino para direita
            kick = 1;
        }
    }

    //
    if(!this.collision(kick, 0, nextPattern))
    {
        this.unDraw();

        this.x += kick;

        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
}

// Funcao de colisoes
Piece.prototype.collision = function(x, y, piece)
{
    for(l = 0; l < piece.length; l++)
    {
        for(c = 0; c < piece.length; c++)
        {
            //Se o quadrado estiver vazio nós o ignoramos, nao precisa verificar colisao
            if(!piece[l][c])
            {
                continue;
            }

            // Coordenadas do quadrado do tetromino apos movimento
            let novoX = this.x + c + x;
            let novoY = this.y + l + y;

            // Condicao que prende o tetromino dentro do painel
            if(novoX < 0 || novoX >= COLUNA || novoY >= LINHA)
            {
                return true;
            }

            // Funcao que impede que
            // novoY < 0
            // novoY > LINHA - 1
            if(novoY > LINHA - 1)
            {
                continue;
            }

            // Condicao que checa se JA HA um quadrado de um tetromino na posicao seguinte (apos o movimento)
            if(tabuleiro[novoY][novoX] !== VAZIO)
            {
                return true;
            }

        }
    }
    return false;
}

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
    else if(event.key === "ArrowUp")
    {
        p.rotate();
        dropStart = Date.now();
    }
    else if(event.key === "ArrowRight")
    {
        p.moveRight();
        dropStart = Date.now();
    }
    else if (event.key === "ArrowDown")
    {
        p.moveDown();
        dropStart = Date.now();
    }
}


//Mover a peça todo frame

let dropStart = Date.now();
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000)
    {
        p.moveDown();
        dropStart = Date.now();
    }

    requestAnimationFrame(drop);
}

drop();