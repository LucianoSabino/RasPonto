import { Knex } from "../../database/Knex/index.js";
import { CriptografiaSenha } from "../../shared/services/CriptografiaSenha.js";

export const create = async (data) => {
  try {
    data.matricula = parseInt(data.matricula, 10); // Converte para número sem alterar os dígitos
    const senhaCriptografia = await CriptografiaSenha.gerandoSenha(data.senha);
    data.senha = senhaCriptografia;
    const [result] = await Knex("usuarios").insert(data).returning("id");
    if (typeof result === "object" && result.id) {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    throw new Error("Erro ao cadastrar o registro!!"); // Corrigido o erro de digitação
  } catch (error) {
    console.log(error);
    return new Error(`Erro ao cadastrar o registro ${error}`); // Corrigido para criar o erro corretamente
  }
};
