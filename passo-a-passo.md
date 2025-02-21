<h3 align="center"> Inicializando o Node e o Git</h3>

        npm i

        npm init -y

        git init

- Comandos para o git:

      -   `git add .` : seleciona todos os arquivos
      -   `git commit -m "colocar oq esta commitando"` : Vai fazer o commit

<h3 align="center"> Instalando dependencia</h3>

        npm i express

        npm i cors

        npm i -D @types/express @types/node

<h3 align="center"> Configurando package.json</h3>

Por causa da importação

        "type": "module",

<h3 align="center"> Primeiro codigo</h3>

- Para rodar é so colocar _node src/index.js_

        import express from "express";

        const app = express();

        app.get("/usuario", (req, res) => {
        res.send("ok");
        });

        app.listen(8080, () => {
        console.log("Api rodado na porta 8080");
        });

- Para rodar a api no arquivo _package.json_

        "scripts": {
            "dev": "node --watch src/index.js"
        }

<h3 align="center"> Outras configuração</h3>

- Criando variavel de ambiente. Execute esse comando

      npm i -D dotenv

depois crie um arquivo na raiz do projeto `.env`

- inicializando eslint:

        npx eslint --init

- Depois crie um arquivo com o nome:

          .gitignore

e coloque

            /node_modules
            .env_

para o git iginorar esses arquivos.

- Blibioteca para mensagem de erro:

        npm i http-status-codes

<h3 align="center"> Biblioteca de validação YUP</h3>
Yup é um construtor de esquema para análise e validação de valor em tempo de execução.

        npm i yup

<h3 align="center"> Banco de dados</h3>

<h5> Utilizando Knex.js </h5>
Knex.js é uma biblioteca para Node.js que facilita a interação com bancos de dados relacionais. Em outras palavras, ele é um query builder, ou seja, uma ferramenta que constrói consultas SQL de forma mais intuitiva e organizada, eliminando a necessidade de escrever as consultas manualmente.

- Instalando as blibioteca:

        npm i knex

<h5> Utilizando o banco de dados Sqlite </h5>

- Instalando as blibioteca:

        npm i sqlite3

- Tendo dois tipos de conexão: _Produção quando estiver no servidor e Desenvolvimento_

<h5> Fazendo as migrações </h5>

- Execute esse comando para criar um arquivo de migração:

        yarn knex --knexfile ./src/server/database/Knex/knexfile.js migrate:make test

Esse _test_, pode ser qualquer nome.

Deve aparecer um arquivo dentro da pastra de _database/migrations_: Caso não tenha criar uma

Depois so fazer as configurações de tabelas.

Depois no arquivo _package.json_ coloque:

        "knex:migrate": "knex migrate:latest --knexfile ./src/server/database/Knex/knexfile.js"

Depois so rodar o comando e sera criado a tabela com as informações:

        npm run knex:migrate

<h3 align="center"> Cripitografia de Senha</h3>

- Adicionar a biblioteca

        npm i bcryptjs
        npm i @types/bcryptjs -D

<h3 align="center"> TOKEN</h3>

- Adicionar a biblioteca

        npm i jsonwebtoken
        npm i @types/jsonwebtoken -D

# O que vai ser encinado

- o que é node
- o que é npm / diferença de entre npm e yarn
- ORM (Sequelize, TypeORM, Prisma) / Query Builders (Knex.js)
- o que é http e seus metodos
- query params / route params / body params
- status htt
