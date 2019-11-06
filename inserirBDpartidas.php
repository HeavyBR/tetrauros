<!DOCTYPE html>
<html lang = "pt">
<head>
	<meta charset = "UTF-8">
	<title>Tetrauros - Tela Ranking Global</title>
</head>

<body>
	<?php 
		include "valoresServidor.php";

		try {
			$conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			


			$mbrow = "$nome" . "," . "$data_nasc" . "," . "$cpf" . "," . "$telefone" . "," . "$email" . "," . "$username" . "," .  "$password";

			$SQL = $conn->query("INSERT INTO partida VALUES (" . $mbrow . ")");

			
		}
		catch(PDOException $e) {
			echo "Ocorreu um erro: " . $e->getMessage();
		}	
	?>	
</body>		
</html>
