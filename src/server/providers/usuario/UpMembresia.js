import { Knex } from "../../database/Knex/index.js";

export const updateMembresia = async (id, membresia) => {
  try {
    // Atualiza o campo `role` no banco de dados
    const updated = await Knex("usuarios")
      .where("id", id) // WHERE primeiro
      .update({ membresia }); // UPDATE depois, usando um objeto

    // Verifica se o registro foi atualizado
    if (updated === 0) {
      return new Error(
        `Não foi possível atualizar o membresia. Usuário com ID ${id} não encontrado.`
      );
    }

    return { success: true, message: "Membresia atualizada com sucesso." };
  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar membresia no banco de dados.");
  }
};
