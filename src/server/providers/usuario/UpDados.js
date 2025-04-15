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
    const dadosAtualizar = {};

    if (membresia !== undefined) dadosAtualizar.membresia = membresia;
    if (nome !== undefined) dadosAtualizar.nome = nome;
    if (curso !== undefined) dadosAtualizar.curso = curso;
    if (telefone !== undefined) dadosAtualizar.telefone = telefone;
    if (email !== undefined) dadosAtualizar.email = email;
    if (senha !== undefined) dadosAtualizar.senha = senha;
    if (robo !== undefined) dadosAtualizar.robo = robo;
    if (sobre !== undefined) dadosAtualizar.sobre = sobre;

    if (Object.keys(dadosAtualizar).length === 0) {
      throw new Error("Nenhum campo enviado para atualização.");
    }

    const updated = await Knex("usuarios")
      .where("id", id)
      .update(dadosAtualizar);

    if (updated === 0) {
      throw new Error(
        `Nenhuma atualização realizada. Usuário ID ${id} não encontrado.`
      );
    }

    return { success: true, message: "Usuário atualizado com sucesso." };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};
