## Requisitos para rodar a API

-  Servidor MySQL instalado e rodando;

-  Criar um database local;

-  Dentro da pasta **\teste-hive-labs**, no terminal, digitar o comando `npm install`

-  Configurar um arquivo **.env** na raiz **\teste-hive-labs** com as informações presentes no banco de dados, e a porta onde a API irá rodar;
     - Exemplo:
					
					DB_HOST=localhost
					DB_USER=root
					DB_PASSWORD=1234
					DB_NAME=testeHivelabs
         	
					PORT=8080

- Na pasta **\teste-hive-labs**, digitar o comando `npm start` no terminal para iniciar a aplicação.

- Consultar a documentação da API em: https://documenter.getpostman.com/view/12209055/TzRLmAor
