<?php
	session_start();
	if((!isset($_SESSION['user']) == true) and (!isset($_SESSION['password']) == true))
    {
        unset($_SESSION['user']);
        unset($_SESSION['password']);
        header('location:login.php');
    } 
    $logado = $_SESSION['user'];
	include "valoresServidor.php";
	session_destroy();

	header("location: login.php");
?>