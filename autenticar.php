<?php
	session_start();
	include "valoresServidor.php";

	$login = $_POST['nome'];
	$senha = $_POST['senha'];

	if((!isset($login)) or (!isset($senha))){
		header("location: index.php") or die();
	}

	$login = stripcslashes($login);
	$senha = stripcslashes($senha);

	try {
		$connection = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
		$connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		$SQL = "SELECT username, password FROM usuario where username = '$login' and password = '$senha'";
		$resultado = $connection->query($SQL);

		$resultado = $resultado->fetch(PDO::FETCH_ASSOC);

		if($resultado['username'] == $login && $resultado['password'] == $senha)
		{
			$_SESSION['user'] = $login;
			$_SESSION['password'] = $senha;
			header("location: index.php") or die();
		}
		else {
			unset ($_SESSION['user']);
			unset ($_SESSION['password']);
			header("location: login.php") or die();
		}
	}
		catch(PDOException $e) {
			echo "Ocorreu um erro:  " . $e->getMessage();
		}
?>