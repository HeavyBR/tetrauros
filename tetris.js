//Pegando referências
var canvas = document.getElementById("tela");
var contexto = canvas.getContext("2d");
var btPausar = document.getElementById("btPausar");
var btNovo = document.getElementById("btNovo");

/*
TESTES!

contexto.fillStyle = "#FF0000";
contexto.fillRect(20,30,50,100);
*/

var numBlocosX = Math.floor(canvas.width / Bloco.largura);
var numBlocosY = Math.floor(canvas.height / Bloco.largura);
var tabuleiro  = null;
var peca;
var pausa = true;


function novoJogo() {
    if(!pausa)
    {
        //pausar();
    }

    //Criando a matriz (TABULEIRO), vazia, onde acontecerá o jogo!
    tabuleiro = new Array(numBlocosX);
    for(x = 0; x < numBlocosX; x++)
    {
        tabuleiro[x] = new Array(numBlocosY);
        for(y = 0; y < numBlocosY; y++)
        {
            tabuleiro[x][y] = null;
        }
    }
    //novaPeca();
    //criarIF();  == TESTE!
    //desenharTudo9();
    btNovo.disabled = false;
    btPausar.disabled = false;
    btPausar.innerHTML = "Iniciar";
}


function desenharTudo() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for(x = 0; x < numBlocosY; x++)
    {
        for(y = 0; y < numBlocosY; y++)
        {
            if(tabuleiro[x][y] != null)
            {
                Bloco.desenhar(contexto, x, y, tabuleiro[x][y]);
            }
        }
    }
    //peca.desenharBloco(contexto);
}

// CHAMANDO Funcao que dá inicio ao jogo
novoJogo();