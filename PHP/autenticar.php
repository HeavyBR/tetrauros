<?php
	session_start();
	$usuario = $_POST['nome'];
	$senha = $_POST['senha'];

	$usuario = stripcslashes($usuario);
	$senha = stripcslashes($senha);

	try
	{
		$connection = new PDO("mysql:host=localhost;dbname=tetrauros", "root", "ftlimeira");
		$connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		$SQL = "SELECT username, password FROM usuario where username = '$usuario' and password = '$senha'";
		$resultado = $connection->query($SQL);

		$resultado = $resultado->fetch(PDO::FETCH_ASSOC);

		if($resultado['username'] == $usuario && $resultado['password'] == $senha)
		{
			echo "Login realizado com sucesso!".$resultado['username'];
		}
		else
		{
			echo "Falha no login!";
		}

		}catch(PDOException $e)
		{
			echo "Ocorreu um erro:  " . $e->getMessage();
		}
?>