const cvs = document.getElementById('tela');
const VAZIO = "white";
const ctx = cvs.getContext('2d');
const SQ = SQUARESIZE = 20;
const LINHA = Math.floor(cvs.height / SQUARESIZE);
const COLUNA = Math.floor(cvs.width / SQUARESIZE);;



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
