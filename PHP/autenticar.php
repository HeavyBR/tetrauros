<?php
	session_start();
	include "valoresServidor.php";

	$_SESSION['user'] = $_POST['nome'];


	$usuario = $_POST['nome'];
	$senha = $_POST['senha'];

	$usuario = stripcslashes($usuario);
	$senha = stripcslashes($senha);

	try {
		$connection = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
		$connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		$SQL = "SELECT username, password FROM usuario where username = '$usuario' and password = '$senha'";
		$resultado = $connection->query($SQL);

		$resultado = $resultado->fetch(PDO::FETCH_ASSOC);

		if($resultado['username'] == $usuario && $resultado['password'] == $senha)
		{
			echo "Login realizado com sucesso!".$resultado['username'];
			echo "<button><a href='rankingglobal.php'>Ranking</button>";
			header("location: ../index.php");
			die('Não ignore meu cabeçalho...');
		}
		else
		{
			echo "Falha no login!";
			header("location: login.php");
			die('Não ignore meu cabeçalho...');
		}
	}
		catch(PDOException $e) {
			echo "Ocorreu um erro:  " . $e->getMessage();
		}
?>