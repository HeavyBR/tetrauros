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
	<title>Tetrauros - Tela de Cadastro</title>
</head>

<body>
	<?php 
		include "valoresServidor.php";

		$form = "<form action = 'cadastro.php' method = 'POST'>
					<p>Nome Completo: <input type = 'text' name = 'nome_completo'></p>
					<p>Data de Nascimento: <input type = 'date' name = 'data_nascimento'</p>
					<p>CPF: <input type = 'text' name = 'cpf'</p>
					<p>Telefone: <input type = 'text' name = 'telefone'</p>
					<p>Email: <input type = 'email' name = 'email'</p>
					<p>Username: <input type = 'text' name = 'username'</p>
					<p>Senha: <input type = 'password' name = 'password'</p>
					<input type = 'submit' value = 'Cadastrar'/>
				</form>";
				
				if (isset($_POST["username"]))
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
</body>		
</html>
