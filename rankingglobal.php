<!DOCTYPE html>
<html lang = "pt">
<head>

	<?php 
        session_start();
        if((!isset($_SESSION['user']) == true) and (!isset($_SESSION['password']) == true))
        {
            unset($_SESSION['user']);
            unset($_SESSION['password']);
            header('location:login.php');
        } 
        $logado = $_SESSION['user'];
    ?>
	<meta charset="UTF-8"/>
    <title>Tetrauros - Tela Ranking Global</title>
    <!-- Compiled and minified CSS -->
    <!-- link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" -->
    <link rel="stylesheet" href="styles.css" type="text/css">
    <style>
        @import url('https://fonts.googleapis.com/css?family=Black+Ops+One|Press+Start+2P|Saira+Stencil+One&display=swap');
    </style>
</head>

<body>
	<div class="corpo">
		<?php 
			include "valoresServidor.php";

			try {
				$user = $_SESSION['user'];

				$conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$conn->exec('SET @row_number := 0;');
				$busca = 	'
								SELECT 
								    (@row_number := @row_number + 1) AS num, username
								FROM partida 
								ORDER BY pontos DESC
							';
				$SQL = $conn->query($busca);	
				echo "<h1>Melhor classificação de ". $logado . ": ";
				while($row = $SQL->fetch(PDO::FETCH_ASSOC)) {
					if($row['username'] == $logado) {
						echo $row['num'] . " posição </h1>";
						break;
					}
				}
			?>

				<button class="grande" onclick="window.location.href='index.php'">Voltar ao Jogo</button>
				<button class="grande" onclick="window.location.href='desconexao.php'">Desconectar</button>

			<?php

				$SQL = $conn->query("SELECT * FROM partida ORDER BY pontos DESC LIMIT 10");
				echo "<h1>Ranking Global</h1>";
				echo "Usuario | Pontos | Nível | Duração | Linha removidas | Data";
				while($row = $SQL->fetch(PDO::FETCH_ASSOC)) {
					echo "<p>" . $row["username"] . " | " . 
								 $row["pontos"] . " | " . 
								 $row["nivel"] . " | " . 
								 $row["duracao"] . " | " . 
								 $row["linhas"] . " | " . 
								 $row["data"] . "</p>";
				}

				$SQL = $conn->query("SELECT * FROM partida WHERE username = '$logado' ORDER BY pontos DESC LIMIT 10");
				echo "<h1>Ranking Jogador</h1>";
				echo "Usuario | Pontos | Nível | Duração | Linha removidas | Data";
				while($row = $SQL->fetch(PDO::FETCH_ASSOC)) {
					echo "<p>" . $row["username"] . " | " . 
								 $row["pontos"] . " | " . 
								 $row["nivel"] . " | " . 
								 $row["duracao"] . " | " . 
								 $row["linhas"] . " | " . 
								 $row["data"] . "</p>";
				}	
			}
			catch(PDOException $e) {
				echo "Ocorreu um erro: " . $e->getMessage();
			}
		?>
	</div>
</body>		
</html>
