<!DOCTYPE html>
<html lang="pt">
<head>

   <?php 
        session_start();
        if((!isset($_SESSION['user']) == true) and (!isset($_SESSION['password']) == true))
        {
            unset($_SESSION['user']);
            unset($_SESSION['password']);
            header('location: login.php');
        } 
        $logado = $_SESSION['user'];
    ?>

    <meta charset="UTF-8"/>
    <title>JS - Tetrauros</title>
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <link rel="stylesheet" href="styles.css" type="text/css">
    <style>
        @import url('https://fonts.googleapis.com/css?family=Black+Ops+One|Press+Start+2P|Saira+Stencil+One&display=swap');
    </style>
</head>
<body>
<div class="corpo">
    <table>
        <tr>
            <td colspan="3">
                <h1 id="titulo">
                    JS - Tetrauros
                </h1>
            </td>
        </tr>
        <tr>
            <td colspan="3" id="proxPeca">
                <h6>Proxima Peca</h6>
                <canvas height="40" id="CanvasNextPiece" width="140"></canvas>
            </td>
        </tr>
        <tr>
            <td class="lateral">
                <div class="informacoes">
                    <h4>Informacoes</h4>
                        Linhas deletadas:  <div id="deletedLines">0</div><br/>
                        Dificuldade:          <div id="stage">1</div><br/>
                        Pontuacao:          <div id="score">0</div><br/>
                        Tempo:           <div id="minuto">0</div>min<div id="segundo">0</div>s<br/>
                </div>
            </td>
            <td class="meio">
                <canvas id="tela" width=200 height=400></canvas>
            </td>
            <td class="lateral">
                <div class="ranking">
                    <h4>Ranking</h4>
                        <div id="rankingJogador" value = ""> Jogador | Pontos | Nivel | Tempo | Linhas<br/><br/>
                                                 ------------<br/>
                                                 ------------<br/>
                                                 ------------</div><br/>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="3" id="opcoes">
                <button class="grande" type="button" onclick="" id="btAlterar"><a href='alteracoes.php'>Alterar Dados</a></button>

                <button class="normal" type="button" onclick="iniciar()" id="btIniciar">Iniciar</button>
                <button class="normal" type="button" onclick="reiniciar()" id="btNovo">Reiniciar</button>
                <button class="normal" type="button"  onclick="pausar()" id="btPausar">Pausar</button>

                <button class="grande" type="button"  id="btRanking"><a href='rankingglobal.php'>Ranking Global</a></button>
                
                <br/>
                
                <button class="grande" type="button" onclick="redimensionarJogo()" id="btRedimensionar">Redimensionar Jogo</button>
                <button class="grande" type="button"  id="btDesconectar"><a href='desconexao.php'>Desconectar</a></button>
   
            </td>
        </tr>
    </table>
</div>
    <script src="tetris.js"></script>
</body>

</html>
