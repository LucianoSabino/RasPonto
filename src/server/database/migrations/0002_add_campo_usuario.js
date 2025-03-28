/**
 * Função de migração para adicionar campos à tabela 'usuarios'
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.alterTable("usuarios", (table) => {
    table.string("robo").notNullable();
    table.string("sobre").notNullable();
  });

  // 🔥 Atualiza usuários existentes para evitar erro de NOT NULL
  await knex("usuarios").update({
    robo: "Não informado",
    sobre: "Não informado",
  });
};

export const down = async function (knex) {
  return knex.schema.alterTable("usuarios", (table) => {
    table.dropColumn("robo");
    table.dropColumn("sobre");
  });
};
