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
	<title>Tetrauros - Tela de Alteração</title>
    <!-- Compiled and minified CSS -->
    <!-- link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" -->
    <link rel="stylesheet" href="styles.css" type="text/css">
    <style>
        @import url('https://fonts.googleapis.com/css?family=Black+Ops+One|Press+Start+2P|Saira+Stencil+One&display=swap');
    </style>
</head>

<body>
	<div class="corpo">
		<h1 id="titulo">Tetrauros - Alteração de Dados</h1>
		<?php 
			$user = $_SESSION['user'];

			include "valoresServidor.php";

	
			$formNome = "<form action = 'alteracoes.php' method = 'POST'>
							<p>Nome completo: <input type = 'text' name = 'nome_completo'</p>
							<p>Novo nome completo: <input type = 'text' name = 'novo_nome'</p> <br/><br/>
							<input class='grande' type = 'submit' value = 'Alterar Nome'/>
						</form>";
			$formTelefone = "<form action = 'alteracoes.php' method = 'POST'>
								<p>Telefone: <input type = 'text' name = 'telefone'</p>
								<p>Novo telefone: <input type = 'text' name = 'novo_telefone'</p><br/><br/>
								<input class='grande' type = 'submit' value = 'Alterar Telefone'/>
							</form>";
				
			$formEmail = "<form action = 'alteracoes.php' method = 'POST'>
							<p>Email: <input type = 'email' name = 'email'</p>
							<p>Novo email: <input type = 'email' name = 'novo_email'</p><br/><br/>
							<input class='grande' type = 'submit' value = 'Alterar Email'/>
						</form>";
			$formSenha = "<form action = 'alteracoes.php' method = 'POST'>
							<p>Senha: <input type = 'password' name = 'senha'</p>
							<p>Nova senha: <input type = 'password' name = 'nova_senha'</p><br/><br/>
							<input class='grande' type = 'submit' value = 'Alterar Senha'/>
						</form>";


					if (isset($_POST["nome_completo"]) && isset($_POST["novo_nome"]))
					{
						try
						{
							$conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
							$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

							$nome = $_POST["nome"];
							$novo_email = $conn->quote($_POST["nome_completo"]);
							if($_POST["nome_completo"] != ""){
								$SQL = "UPDATE usuario SET nome_completo = $nome_completo WHERE username = '$user'";
								$conn->exec($SQL);

								//echo "<p> Alteracao de senha realizada com sucesso! </p>";
								header("location: index.php");
								die();
							}
							else {
								header("location: alteracoes.php");
							}
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
							$novo_email = $conn->quote($_POST["novo_telefone"]);
							if($_POST["novo_telefone"] != ""){
								$SQL = "UPDATE usuario SET telefone = $novo_telefone WHERE username = '$user'";
								$conn->exec($SQL);

								//echo "<p> Alteracao de senha realizada com sucesso! </p>";
								header("location: index.php");
								die();
							}
							else {
								header("location: alteracoes.php");
							}
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
							if($_POST["novo_email"] != ""){
								$SQL = "UPDATE usuario SET email = $novo_email WHERE username = '$user'";
								$conn->exec($SQL);

								//echo "<p> Alteracao de senha realizada com sucesso! </p>";
								header("location: index.php");
								die();
							}
							else {
								header("location: alteracoes.php");
							}
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
							if($_POST["nova_senha"] != ""){
								$SQL = "UPDATE usuario SET password = $nova_senha WHERE username = '$user'";
								$conn->exec($SQL);

								//echo "<p> Alteracao de senha realizada com sucesso! </p>";
								header("location: index.php");
								die();
							}
							else {
								header("location: alteracoes.php");
							}
						}
						catch(PDOException $e)
						{
							echo "Ocorreu um erro: " . $e->getMessage();
						}	
					}
					else {
					echo 	"<br/><br/>
							<table>
								<tr class='gambiarratable'>
									<td>";
										echo $formNome;
							echo "</td>
									<td>";
										echo $formTelefone;
							echo 	"</td>
								</tr>
								<tr class='gambiarratable'>
									 <td>";
										echo $formEmail;
							echo "</td>
									<td>";
										echo $formSenha;
							echo    "</td>
								</tr>
							</table>
							<br/><br/>";

					} 
				?>	

			<button class="grande" onclick="window.location.href='index.php'">Voltar ao Jogo</button>
	</div>
</body>		
</html>
