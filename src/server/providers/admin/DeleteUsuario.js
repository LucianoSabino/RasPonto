import { Knex } from "../../database/Knex/index.js";

export const deleteuser = async (id) => {
  try {
    const deletando = await Knex("usuarios").where("id", id).delete(); // WHERE primeiro

    // Verifica se o registro foi atualizado
    if (deletando === 0) {
      return new Error(
        `Não foi possível atualizar o role. Usuário com ID ${id} não encontrado.`
      );
    }

    return { success: true, message: "Usuario deletado." };
  } catch (error) {
    console.error(error);
    return new Error("Erro ao deletar no banco de dados.");
  }
};
