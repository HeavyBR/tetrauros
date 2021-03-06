<!DOCTYPE html>
<html lang="pt">
<head>

   <?php 
        session_start();
        if((!isset($_SESSION['user'])) and (!isset($_SESSION['password'])))
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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
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
                            <div id="rankingJogador" value = "">Pontos | Nivel | Tempo | Linhas<br/><br/>
                                                     ------------<br/>
                                                     ------------<br/>
                                                     ------------</div><br/>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="3" id="opcoes">
                    
                    <button class="grande" type="button" id="btAlterar" onclick="window.location.href='alteracoes.php'">Alterar Dados</button>

                    <button class="normal" type="button" onclick="iniciar()" id="btIniciar">Iniciar</button>
                    <button class="normal" type="button" onclick="reiniciar()" id="btNovo">Reiniciar</button>
                    <button class="normal" type="button"  onclick="pausar()" id="btPausar">Pausar</button>

                    <button class="grande" id="btRanking" onclick="window.location.href='rankingglobal.php'">Ranking Global</button>
                    
                    <br/>
                    
                    <button class="grande" type="button" onclick="redimensionarJogo()" id="btRedimensionar">Redimensionar Jogo</button>
                    <button class="grande" id="btDesconectar" onclick="window.location.href='desconexao.php'">Desconectar</button>

       
                </td>
            </tr>
        </table>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="tetris.js"></script>
</body>

</html>

<?php
		include "valoresServidor.php";
        if(isset($_GET['pontos']))
        {/*
        http://localhost/index.php?pontos=0&nivel=1&minuto=0&segundo=10&linhas=undefined
        */

            try {
                $conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $nome = $conn->quote(strval($_SESSION['user']));
                $pontos = intval($_GET['pontos']);
                $nivel = intval($_GET['nivel']);
                $duracao = intval($_GET['minuto']) + intval($_GET['segundo']);
                $linhas = intval($_GET['linhas']);
                date_default_timezone_set('America/Sao_Paulo');
                $data = $conn->quote(date('Y-m-d H:i:s'));
                $SQL = $conn->query("INSERT INTO partida (username,pontos,nivel,duracao,linhas,data) VALUES ($nome,$pontos,$nivel,$duracao,$linhas,$data)");

            }
            catch(PDOException $e) {
                echo "Ocorreu um erro: " . $e->getMessage();
            }

        }

