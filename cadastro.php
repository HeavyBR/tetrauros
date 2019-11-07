<!DOCTYPE html>
<html lang = "pt">
<head>
	<meta charset = "UTF-8">
	<title>Tetrauros - Tela de Cadastro</title>
    <!-- Compiled and minified CSS -->
    <!-- link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" -->
    <link rel="stylesheet" href="styles.css" type="text/css">
    <style>
        @import url('https://fonts.googleapis.com/css?family=Black+Ops+One|Press+Start+2P|Saira+Stencil+One&display=swap');
    </style>
</head>

<body>
	<div class="corpo_menor">
		<h1 id="titulo">Tetrauros - Cadastro</h1>
		<?php 
			include "valoresServidor.php";

			$form = "<form action = 'cadastro.php' method = 'POST'>
						<p>Nome Completo: <input type = 'text' name = 'nome_completo'></p>
						<p>Data de Nascimento: <input type = 'date' name = 'data_nascimento'</p>
						<p>CPF: <input type = 'text' name = 'cpf'</p>
						<p>Telefone: <input type = 'text' name = 'telefone'</p>
						<p>Email: <input type = 'email' name = 'email'</p>
						<p>Username: <input type = 'text' name = 'username'</p>
						<p>Senha: <input type = 'password' name = 'password'</p><br/><br/>
						<input class='grande' type = 'submit' value = 'Cadastrar'/>
					</form>";
					
					if (isset($_POST["username"]) and ($_POST["username"]!="") and ($_POST["nome_completo"]!="") and ($_POST["cpf"]!="") and ($_POST["telefone"]!="") and ($_POST["email"]!="") and ($_POST["password"]!="") and ($_POST["data_nascimento"]!="") and ($_POST["username"]!=""))
					{
						try
						{
							$conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
							$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
							
							$username = $conn->quote($_POST["username"]);
							$nome = $conn->quote($_POST["nome_completo"]);
							$data_nasc =  $conn->quote($_POST["data_nascimento"]);
							$cpf =  $conn->quote($_POST["cpf"]);
							$telefone =  $conn->quote($_POST["telefone"]);
							$email =  $conn->quote($_POST["email"]);
							$password =  $conn->quote($_POST["password"]);

							$SQL = "SELECT username FROM usuario where username = $username";
							echo $SQL;
							$resultado = $conn->query($SQL);
							if($resultado->rowCount() == 0)
							{
								$mbrow = "$nome" . "," . "$data_nasc" . "," . "$cpf" . "," . "$telefone" . "," . "$email" . "," . "$username" . "," .  "$password";

								$sql = "INSERT INTO usuario VALUES(" . $mbrow . ")";
								$conn->query($sql);

								header("location: login.php");
								die('Não ignore meu cabeçalho...');
							}
							else
							{
								echo "Erro";
							}


						}
						catch(PDOException $e)
						{
							echo "Ocorreu um erro: " . $e->getMessage();
						}	
					}
					else
					{		
						echo $form;
					}
		?>
	</div>
</body>		
</html>
