<!DOCTYPE html>
<html>
   <body>
		<?php
			$BD = "tetrauros";
			$sname = "localhost";
			$uname = "root";
			$pwd = "";

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
		     						username varchar(20) NOT NULL,
		     						pontos int not null,
		     						nivel int not null,
		     						duracao int not null,
		     						linhas int not null,
		     						data datetime not null,

									FOREIGN KEY(username) REFERENCES usuario(username),
				    				PRIMARY KEY(username)
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


