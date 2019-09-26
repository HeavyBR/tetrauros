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


function drawBoard()
{
    for(l = 0; l < LINHA; l++)
    {
        for(c = 0; c < COLUNA; c++)
        {
            drawSquare(c,l,tabuleiro[l][c]);
        }
    }
}

drawBoard();

//Functions
function drawSquare(x,y,color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ,y * SQ, SQ, SQ);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x * SQ, y * SQ, SQ , SQ);
}

const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T,"yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];


let p = new Piece(PIECES[0][0], PIECES[0][1]);

function Piece(tetromino, color)
{
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];

    this.x = Math.floor(COLUNA / 2) - 1;
    this.y = 24;

}

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

Piece.prototype.draw = function () {
    this.fill(this.color);
}

Piece.prototype.unDraw = function()
{
    this.fill(VAZIO);
}

Piece.prototype.moveLeft = function()
{
    if(!this.collision(-1,0,this.activeTetromino))
    {
        this.unDraw();
        this.x--;
        this.draw();
    }

}

Piece.prototype.moveRight = function()
{
    if(!this.collision(1,0, this.activeTetromino))
    {
        this.unDraw();
        this.x++;
        this.draw();
    }

}

Piece.prototype.moveDown = function () {

        this.unDraw();
        this.y--;
        this.draw();

}

Piece.prototype.rotate = function()
{
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];

    if(!this.collision((0,0,nextPattern)))
    {
        this.unDraw();
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
}

//CONTROLANDO AS PEÇAS
document.addEventListener("keydown", CONTROL);

function CONTROL(event)
{
    if(event.keyCode == 37)
    {
        p.moveLeft();
    }
    else if(event.keyCode == 38)
    {
        p.rotate();
    }
    else if(event.keyCode == 39)
    {
        p.moveRight();
    }
    else if (event.keyCode == 40)
    {
        p.moveDown();
    }
}

//Colisão
Piece.prototype.collision = function(x,y,piece)
{
    for(l = 0; l < piece.length; l++)
    {
        for(c = 0; c < piece.length; c++)
        {
            //Se o quadrado estiver vazio nós o ignoramos
            if(!piece[l][c])
            {
                continue;
            }

            let novoX = this.x + c + x;
            let novoY = this.y + l + y;

            if(novoX < 0 || novoX >= COLUNA || novoY >= LINHA)
            {
                return true;
            }

            if(novoY > COLUNA - 1 )
            {
                continue;
            }

            if(board[novoY][novoX] != VAZIO)
            {
                return true;
            }

        }
    }
    return false;
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