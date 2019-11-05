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

	<meta charset = "UTF-8">
	<title>Tetrauros - Tela Ranking Global</title>
</head>

<body>

	<?php 
		include "valoresServidor.php";

		try {
			$user = $_SESSION['user'];
			$biscoito = $_COOKIE['dados'];
			$biscoito = json_decode($biscoito);
			$conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			$nome = $conn->quote(strval($_SESSION['user']));
			$pontos = intval($biscoito->PONTOS);
			$nivel = intval($biscoito->NIVEL);
			$duracao = intval($biscoito->MINUTO) + intval($biscoito->SEGUNDO);
			$linhas = intval($biscoito->LINHAS);
			date_default_timezone_set('America/Sao_Paulo');
			$data = $conn->quote(date('Y-m-d H:i:s'));
			$SQL = $conn->query("INSERT INTO partida (username,pontos,nivel,duracao,linhas,data) VALUES ($nome,$pontos,$nivel,$duracao,$linhas,$data)");



			$SQL = $conn->query("SELECT * FROM partida ORDER BY pontos DESC LIMIT 10");
			echo "<h1>Melhor posição no ranking: </h1>";
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

			$SQL = $conn->query("SELECT * FROM partida WHERE username = '$user' ORDER BY pontos DESC");
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
</body>		
</html>
