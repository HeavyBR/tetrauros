<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8"/>
    <title>Tetrauros - Tela Login</title>
    <!-- Compiled and minified CSS -->
    <!-- link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" -->
    <link rel="stylesheet" href="../styles.css" type="text/css">
    <style>
        @import url('https://fonts.googleapis.com/css?family=Black+Ops+One|Press+Start+2P|Saira+Stencil+One&display=swap');
    </style>
</head>
<body>
	<div class="corpo_menor">
		<h1 id="titulo">Tetrauros - Login</h1>
		<form method = "POST" action = "autenticar.php">
			<p> Usuário: <input type = "text" name = "nome"> </p>
			<p> Senha: <input type = "password" name = "senha"> </p> 
			<input class="grande" type = "submit"> <br/>
			<button class="grande"><a href="cadastro.php">Cadastro</a></button>
		</form>
		
	</div>
</body>
