<?php
	session_start();
	include "valoresServidor.php";
	session_destroy();

	header("location: login.php");
?>