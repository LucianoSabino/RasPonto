/**
 * Altera o campo 'matricula' na tabela 'usuarios'
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  const { client } = knex.client.config;

  if (client.includes("pg")) {
    // ALTER COLUMN funciona diretamente no PostgreSQL
    await knex.schema.alterTable("usuarios", (table) => {
      table.string("matricula").notNullable().alter();
    });
  } else if (client.includes("sqlite")) {
    // **Desativar FOREIGN KEYs**
    await knex.raw("PRAGMA foreign_keys = OFF;");

    // Criar a nova tabela com o tipo atualizado
    await knex.schema.createTable("usuarios_novo", (table) => {
      table.increments("id").primary();
      table.string("nome").notNullable();
      table.string("matricula").notNullable(); // Alterado para string
      table.string("curso").notNullable();
      table.string("telefone").notNullable();
      table.string("email").unique().notNullable();
      table.string("senha").notNullable();
      table.string("membresia").notNullable();
      table.string("role").notNullable();
      table.date("data").defaultTo(knex.raw("CURRENT_DATE")).notNullable();
    });

    // Copiar os dados convertendo `matricula` para string
    await knex.raw(`
      INSERT INTO usuarios_novo (id, nome, matricula, curso, telefone, email, senha, membresia, role, data)
      SELECT id, nome, CAST(matricula AS TEXT), curso, telefone, email, senha, membresia, role, data FROM usuarios;
    `);

    // Excluir a tabela antiga
    await knex.schema.dropTable("usuarios");

    // Renomear a nova tabela para o nome original
    await knex.schema.renameTable("usuarios_novo", "usuarios");

    // **Reativar FOREIGN KEYs**
    await knex.raw("PRAGMA foreign_keys = ON;");
  }
};

/**
 * Reverte a alteração do campo 'matricula'
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  const { client } = knex.client.config;

  if (client.includes("pg")) {
    // Voltar ao tipo float no PostgreSQL
    await knex.schema.alterTable("usuarios", (table) => {
      table.float("matricula").notNullable().alter();
    });
  } else if (client.includes("sqlite")) {
    // **Desativar FOREIGN KEYs**
    await knex.raw("PRAGMA foreign_keys = OFF;");

    // Criar a tabela original com `matricula` como float
    await knex.schema.createTable("usuarios_antigo", (table) => {
      table.increments("id").primary();
      table.string("nome").notNullable();
      table.float("matricula").notNullable();
      table.string("curso").notNullable();
      table.string("telefone").notNullable();
      table.string("email").unique().notNullable();
      table.string("senha").notNullable();
      table.string("membresia").notNullable();
      table.string("role").notNullable();
      table.date("data").defaultTo(knex.raw("CURRENT_DATE")).notNullable();
    });

    // Copiar os dados convertendo `matricula` de volta para float
    await knex.raw(`
      INSERT INTO usuarios_antigo (id, nome, matricula, curso, telefone, email, senha, membresia, role, data)
      SELECT id, nome, CAST(matricula AS FLOAT), curso, telefone, email, senha, membresia, role, data FROM usuarios;
    `);

    // Excluir a tabela atual
    await knex.schema.dropTable("usuarios");

    // Renomear de volta para o nome original
    await knex.schema.renameTable("usuarios_antigo", "usuarios");

    // **Reativar FOREIGN KEYs**
    await knex.raw("PRAGMA foreign_keys = ON;");
  }
};
