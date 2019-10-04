const cvs = document.getElementById('tela');
const VAZIO = "white";
const ctx = cvs.getContext('2d');
const AREA_BLOCO = 20;
const LINHA = Math.floor(cvs.height / AREA_BLOCO);
const COLUNA = Math.floor(cvs.width / AREA_BLOCO);

console.log(LINHA)  // 25
console.log(COLUNA) // 17

let tabuleiro = [];


const CriaTabuleiro = () => {
    for(l = 0; l < LINHA; l++) //ok
    {
        tabuleiro[l] = [];
        for(c = 0; c < COLUNA; c++)
            {
                tabuleiro[l][c] = VAZIO;
            }
    }
}

CriaTabuleiro();


class Peca
{
    constructor(tetromino, cor){
        this.cor = cor
        this.tetromino = tetromino
        this.posicaoDaPeca = 0
        this.pecaAtiva = this.tetromino[this.posicaoDaPeca]
        this.x = Math.floor(COLUNA / 2) - 1 
        this.y = LINHA - 1
    }


    draw = function () 
    {
        this.fill(this.cor);
    };



}


//Criando tabuleiro e preenchendo com blocos brancos


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
    ctx.strokeStyle = "black";
    ctx.strokeRect(x * AREA_BLOCO, y * AREA_BLOCO, AREA_BLOCO , AREA_BLOCO);
};

// Declaracao dos tetromino e cores
const PIECES = [
    [L, "red"],
    [J, "green"],
    [T,"purple"],
    [O, "yellow"],
    [I, "cyan"],
    [U, "orange"],
    /*
    [S, "purple"],
    [Z, "orange"]
    */
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


// Funcao que desenha o tetromino no painel do jogo
/*function Piece(tetromino, color)
{
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];

    this.x = Math.floor(COLUNA / 2) - 1;
    this.y = LINHA - 1;

};*/

// Prototipo = Acrescenta uma informacao (funcao) em uma outra funcao
// Funcao que preenche o tetromino
Peca.prototype.fill = function(color)
{
    for(l = 0; l < this.pecaAtiva.length; l++)
    {
        for(c = 0; c < this.pecaAtiva.length; c++)
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
    for(l = 0; l < peca.length; l++)
    {
        for(c = 0; c < peca.length; c++)
        {
            //Se o quadrado estiver vazio nós o ignoramos, nao precisa verificar colisao
            if(!peca[l][c])
            {
                continue;
            }

            // Coordenadas do quadrado do tetromino apos movimento
            let novoX = this.x + c + x;
            let novoY = this.y + l + y;

            // Condicao que prende o tetromino dentro do painel
            if(novoX < 0 || novoX >= COLUNA || novoY < 0)
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
            console.log(novoY);
            // Condicao que checa se JA HA um quadrado de um tetromino na posicao seguinte (apos o movimento)
            //25 24
            if(tabuleiro[novoY][novoX] !== VAZIO)
            {
                return true;
            }

        }
    }
    return false;
};

Peca.prototype.lock = function()
{
    for(l = 0; l < this.pecaAtiva.length; l++)
    {
        for(c = 0; c < this.pecaAtiva.length; c++)
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
    for(l = LINHA - 1; l >= 0; l--)
    {
        let linhaCompleta = true;
        for(c = COLUNA - 1; c >= 0; c--)
        {
            // linhaCompleta = 1;
            // tabuleiro[l][c] != VAZIO --> 0 se qudrado esta vazio; 1 se quadrado esta completo
            // 1 * 1 = true 
            // 1 * 0 = false 
            console.log(l)
            linhaCompleta = linhaCompleta && (tabuleiro[l][c] != VAZIO);
            console.log(linhaCompleta)
        }
        if(linhaCompleta)
        {
            for(let j = 0; j < LINHA - 1; j++)
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
        }
    }
    Tabuleiro.desenhar()
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
};



let dropStart = Date.now();
var gameOver = false;

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
};



// Funcao que desenha o painel de jogo
var Tabuleiro  = {
    desenhar: function(){
       for(l = 0; l < LINHA; l++)
        {
            for(c = 0; c < COLUNA; c++)
            {
               desenharBloco(c, l, tabuleiro[l][c]);
            }
        }
    }
}

Tabuleiro.desenhar()

drop();
