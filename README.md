# API App Ponto Ras

Api que registra carga horaria do voluntarios da Ras.

### Como rodar o projeto

- Na raiz do projeto cria um arquivo `.env`, coloca nesse aquivo tudo que esta em `.env.example`.
- Na variavel `JWT_SECRET` coloque alguam sequcia de letra por exemplo `JWT_SECRET=kdksfksjfkgjgks`.
- Depois rode no terminal os seguintes comando.

      npm instal
      	npm run dev

### Rotas da API

| Método | Rota           | Descrição                                                  |
| ------ | -------------- | ---------------------------------------------------------- |
| GET    | `/`            | Rota de teste.                                             |
| GET    | `/usuario`     | Busca usuario.                                             |
| GET    | `/horario`     | Busca os todas as informações horarios intervalo de tempo. |
| GET    | `/calcular`    | Calcula o horario dos vonlurario.                          |
| GET    | `/buscainfo`   | Busca todas as infomações do usuario.                      |
| GET    | `/admin_busca` | Retorma asinformações da carga horaria do usuario.         |
| POST   | `/usuario`     | Cria um novo usuário.                                      |
| POST   | `/login`       | Faz login.                                                 |
| POST   | `/upmembresia` | Atualiza informação de membresia do voluntario.            |
| POST   | `/admin_role`  | Atualiza nivel de acesso do volutario                      |

- Qual quer duvida [Detales rota](https://lucianosabino.github.io/rotaApiRas/)

### 🛠 Tecnologias BACK-END

As seguintes ferramentas foram usadas na construção do projeto:

- [JavaSccript](https://www.python.org/downloads/)
- [Knex](https://knexjs.org/)
- [PostPostgreSQL](https://www.postgresql.org/)

<h4 align="center"> ✅ Colaboradores ✅ </h4>

- LUCIANO SABINO [GitHub](https://github.com/LucianoSabino)
- Gabriel MarcoSilva [GitHub](https://github.com/Gabriel-MarcoSilva)
<h4 align="center"> 
	🚧 Em construção...  🚧
</h4>
