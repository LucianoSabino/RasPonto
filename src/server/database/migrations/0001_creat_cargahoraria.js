/**
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("cargahoraria", (table) => {
    table.increments("id").primary();
    table.string("horas").unique().notNullable();
    table
      .bigInteger("usuarioId")
      .index()
      .notNullable()
      .references("id")
      .inTable("usuarios")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
    table.date("data").defaultTo(knex.raw("CURRENT_DATE")).notNullable(); // Apenas a data (YYYY-MM-DD)
  });
};

/**
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists("cargahoraria");
};
