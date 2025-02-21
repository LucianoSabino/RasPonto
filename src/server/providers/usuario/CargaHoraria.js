import { Knex } from "../../database/Knex/index.js";

export const cargahoraria = async (data) => {
  try {
    const [result] = await Knex("cargahoraria").insert(data).returning("id");
    if (typeof result === "object" && result.id) {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    throw new Error("Erro ao cadastrar o registro"); // Corrigido o erro de digitação
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar o registro"); // Corrigido para criar o erro corretamente
  }
};
