import { Knex } from "../../database/Knex/index.js";

// export const updateMembresia = async (id, membresia) => {
//   try {
//     // Atualiza o campo `role` no banco de dados
//     const updated = await Knex("usuarios")
//       .where("id", id) // WHERE primeiro
//       .update({ membresia }); // UPDATE depois, usando um objeto

//     // Verifica se o registro foi atualizado
//     if (updated === 0) {
//       return new Error(
//         `Não foi possível atualizar o membresia. Usuário com ID ${id} não encontrado.`
//       );
//     }

//     return { success: true, message: "Membresia atualizada com sucesso." };
//   } catch (error) {
//     console.error(error);
//     return new Error("Erro ao atualizar membresia no banco de dados.");
//   }
// };

export const updateMembresia = async (
  id,
  nome,
  curso,
  telefone,
  email,
  senha,
  membresia,
  robo,
  sobre
) => {
  try {
    const query = Knex("usuarios").where("id", id);

    if (membresia !== undefined) {
      query.update({ membresia });
    }
    if (nome !== undefined) {
      query.update({ nome });
    }
    if (curso !== undefined) {
      query.update({ curso });
    }
    if (telefone !== undefined) {
      query.update({ telefone });
    }
    if (email !== undefined) {
      query.update({ email });
    }
    if (senha !== undefined) {
      query.update({ senha });
    }
    if (robo !== undefined) {
      query.update({ robo });
    }
    if (sobre !== undefined) {
      query.update({ sobre });
    }

    // Executa a atualização
    const updated = await query;

    if (updated === 0) {
      throw new Error("Nenhuma atualização realizada. Verifique os dados.");
    }

    return updated;
  } catch (error) {
    console.error("Erro ao atualizar a membresia:", error);
    throw error;
  }
};
