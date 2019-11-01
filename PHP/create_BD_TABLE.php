<!DOCTYPE html>
<html>
   <body>
		<?php
			include "valoresServidor.php";

			echo "<h1> Criando BD </h1>";
	        echo "<p>Criando banco de dados... </p>";
			try {
				$conn = new PDO("mysql:host=$sname", $uname, $pwd);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
				$sql = "CREATE DATABASE tetrauros";

				$conn->exec($sql);
				echo "<p>Banco de dados criado com sucesso</p>";

				$conn = null;

				// Try dentro do outro, para evitar que seja criada a BD sem tabela
				echo "<h1> Criando Tabelas </h1>";
		        echo "<p>Criando tabelas no banco de dados... </p>";
				try {
					$conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
					$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		    		$usuario = "CREATE TABLE usuario
		    					(	
		    						nome_completo varchar(100) NOT NULL,
									data_nascimento datetime NOT NULL,
									cpf varchar(15) NOT NULL,
									telefone varchar(15) NOT NULL,
									email varchar(100) NOT NULL,
									username varchar(20) NOT NULL,
									password varchar(50) NOT NULL,

									PRIMARY KEY(username)
								)";
					$conn->exec($usuario);
					echo "<p>Tabela usuario criada com sucesso</p>";

					$partida = "CREATE TABLE partida 
								(
									cod_partida int NOT NULL AUTO_INCREMENT,
		     						username varchar(20) NOT NULL,
		     						pontos int NOT NULL,
		     						nivel int NOT NULL,
		     						duracao int NOT NULL,
		     						linhas int NOT NULL,
		     						data datetime NOT NULL, /* Usar funcao = CURRENT_TIME*/

									FOREIGN KEY(username) REFERENCES usuario(username),
				    				PRIMARY KEY(cod_partida)
			    				)";

					$conn->exec($partida);
					echo "<p>Tabela partida criada com sucesso</p>";

					$conn = null;
				}
				catch(PDOException $e) {
					echo "Ocorreu um erro: " . $e->getMessage();
				}
			}
			catch(PDOException $e) {
				echo "Ocorreu um erro: " . $e->getMessage();
			}
		?>
   </body>
</html>


