/* ---------------------------------------------------------------------------
 	INSTRUÇÕES TETRAUROS - JavaScript
   --------------------------------------------------------------------------- */

		Para os efeitos de popUp foi utilizado o framework Materialize:

		https://materializecss.com/

		Para as fontes utilizamos a API da Google Fonts:
		https://fonts.google.com/


		TUTORIAL DE PAUSE:
		Quando o jogo for pausado o modo DEBUG será ativado, os controles 
		passarão para as teclas W,A,S,D para movimentos horizontais e verticais, 
		a tecla ESPAÇÔ irá rotacionar


/* ---------------------------------------------------------------------------
 	INSTRUÇÕES TETRAUROS - PHP
   --------------------------------------------------------------------------- */

   		Para utilizar o sistema, deve-se colocar todos os arquivos em uma pasta
   		chamada "tetrauros", pois, é necessário para o envio das informações 
   		do JavaScript para o PHP. 

 /* ---------------------------------------------------------------------------
 	INSTRUÇÕES TETRAUROS - Banco de Dados
   --------------------------------------------------------------------------- */

   		O SGBD utilizado na implementação foi o mySQL (padrão do xampp), para 
   		sua utilização basta acessar, por meio do servidor, o arquivo 
   		"create_BD_TABLE.php". Foram criadas duas tabelas para auxiliar no
   		armazenamento de informações sendo essas as tabelas de partida e usuario.

		A tabela de partida tem a seguinte configuração:
			cod_partida - int - primary key
			data - date
			duracao - int
			linhas - int
			nivel - int
			pontos - int
			username - varchar - foreing key referenciando usuario

		A tabela de usuario tem a seguinte configuração:
			cpf - varchar
			data_nascimento - date
			email - varchar
			nome_completo - varchar
			password - varchar
			telefone - varchar
			username - varchar