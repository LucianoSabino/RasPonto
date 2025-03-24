import { Knex } from "../../database/Knex/index.js";

export const delethorario = async (id) => {
  try {
    const deletando = await Knex("cargahoraria").where("id", id).delete(); // WHERE primeiro

    // Verifica se o registro foi atualizado
    if (deletando === 0) {
      return new Error(
        `Não foi possível deletar a carga horaria com ID ${id} não encontrado.`
      );
    }

    return { success: true, message: "Carga Horaria deletado." };
  } catch (error) {
    console.error(error);
    return new Error("Erro ao deletar no banco de dados.");
  }
};
