import { app } from "./server/server.js";

import { Knex } from "./server/database/Knex/index.js";

console.log("Iniciando migrações...");
await Knex.migrate.latest(); // Executa as migrações mais recentes no banco de dados PostgreSQL na nuvem
console.log("Migrações concluídas. Iniciando o servidor...");

app.listen(process.env.PORT || 8080, () => {
  console.log("Api rodado na porta 8080");
});
