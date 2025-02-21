import { Knex } from "../../database/Knex/index.js";

export const login = async (data) => {
  try {
    const result = await Knex("usuarios")
      .select("*")
      .where("matricula", "=", data)
      .first();

    if (result) {
      return result;
    }

    return new Error("Registro não encontrado!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar o registro");
  }
};
