<!DOCTYPE html>
<html lang = "pt">
<head>
	<meta charset = "UTF-8">
	<title>Tetrauros - Tela de Alterações</title>
</head>

<body>
	<?php 
		$BD = "tetrauros";
		$sname = "localhost";
		$uname = "root";
		$pwd = "";

		$formNome = "<form action = 'alteracoes.php' method = 'POST'>
						<p>Nome completo: <input type = 'text' name = 'nome_completo'</p>
						<p>Novo nome completo: <input type = 'text' name = 'novo_nome'</p>
						<input type = 'submit' value = 'Alterar'/>
					</form>";
		$formTelefone = "<form action = 'alteracoes.php' method = 'POST'>
							<p>Telefone: <input type = 'text' name = 'telefone'</p>
							<p>Novo telefone: <input type = 'text' name = 'novo_telefone'</p>
							<input type = 'submit' value = 'Alterar'/>
						</form>";
		$formEmail = "<form action = 'alteracoes.php' method = 'POST'>
						<p>Email: <input type = 'email' name = 'email'</p>
						<p>Novo email: <input type = 'email' name = 'novo_email'</p>
						<input type = 'submit' value = 'Alterar'/>
					</form>";
		$formSenha = "<form action = 'alteracoes.php' method = 'POST'>
						<p>Senha: <input type = 'password' name = 'senha'</p>
						<p>Nova senha: <input type = 'password' name = 'nova_senha'</p>
						<input type = 'submit' value = 'Alterar'/>
					</form>";
				
				if (isset($_POST["nome_completo"]) && isset($_POST["novo_nome"]))
				{
					try
					{
						$conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
						$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

						$nome = $_POST["nome_completo"];
						$novo_nome = $conn->quote($_POST["novo_nome"]);
 
						$SQLbusca = "SELECT username FROM usuario WHERE nome_completo = '$nome'";

						$resultado = $conn->query($SQLbusca);
						$linha = $resultado->fetch(PDO::FETCH_ASSOC);

						$comparacao = $linha['username'];

						$SQL = "UPDATE usuario SET nome_completo = $novo_nome WHERE username = '$comparacao'";
						$conn->exec($SQL);

						echo "<p> Alteracao de nome realizada com sucesso! </p>";
					}
					catch(PDOException $e)
					{
						echo "Ocorreu um erro: " . $e->getMessage();
					}	
				} else 
				
				if (isset($_POST["telefone"]) && isset($_POST["novo_telefone"]))
				{
					try
					{
						$conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
						$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

						$telefone = $_POST["telefone"];
						$novo_telefone = $conn->quote($_POST["novo_telefone"]);
 
						$SQLbusca = "SELECT username FROM usuario WHERE telefone = '$telefone'";

						$resultado = $conn->query($SQLbusca);
						$linha = $resultado->fetch(PDO::FETCH_ASSOC);

						$comparacao = $linha['username'];

						$SQL = "UPDATE usuario SET telefone = $novo_telefone WHERE username = '$comparacao'";
						$conn->exec($SQL);

						echo "<p> Alteracao de telefone realizada com sucesso! </p>";
					}
					catch(PDOException $e)
					{
						echo "Ocorreu um erro: " . $e->getMessage();
					}	
				} else 

				if (isset($_POST["email"]) && isset($_POST["novo_email"]))
				{
					try
					{
						$conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
						$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

						$email = $_POST["email"];
						$novo_email = $conn->quote($_POST["novo_email"]);
 
						$SQLbusca = "SELECT username FROM usuario WHERE email = '$email'";

						$resultado = $conn->query($SQLbusca);
						$linha = $resultado->fetch(PDO::FETCH_ASSOC);

						$comparacao = $linha['username'];

						$SQL = "UPDATE usuario SET email = $novo_email WHERE username = '$comparacao'";
						$conn->exec($SQL);

						echo "<p> Alteracao de email realizada com sucesso! </p>";
					}
					catch(PDOException $e)
					{
						echo "Ocorreu um erro: " . $e->getMessage();
					}	
				} else 

				if (isset($_POST["senha"]) && isset($_POST["nova_senha"]))
				{
					try
					{
						$conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
						$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

						$senha = $_POST["senha"];
						$nova_senha = $conn->quote($_POST["nova_senha"]);
 
						$SQLbusca = "SELECT username FROM usuario WHERE password = '$senha'";

						$resultado = $conn->query($SQLbusca);
						$linha = $resultado->fetch(PDO::FETCH_ASSOC);

						$comparacao = $linha['username'];

						$SQL = "UPDATE usuario SET password = $nova_senha WHERE username = '$comparacao'";
						$conn->exec($SQL);

						echo "<p> Alteracao de senha realizada com sucesso! </p>";
					}
					catch(PDOException $e)
					{
						echo "Ocorreu um erro: " . $e->getMessage();
					}	
				}
				else {
					echo $formNome;
					echo $formTelefone;
					echo $formEmail;
					echo $formSenha;
				} 
			?>	
</body>		
</html>
