import { Knex } from "../../database/Knex/index.js";
import { CriptografiaSenha } from "../../shared/services/CriptografiaSenha.js";

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
  membresia
) => {
  try {
    const dadosAtualizar = {};

    if (nome != null && nome !== "") dadosAtualizar.nome = nome;
    if (curso != null && curso !== "") dadosAtualizar.curso = curso;
    if (telefone != null && telefone !== "") dadosAtualizar.telefone = telefone;
    if (email != null && email !== "") dadosAtualizar.email = email;
    if (membresia != null && membresia !== "")
      dadosAtualizar.membresia = membresia;

    if (senha != null && senha !== "") {
      const senhaCriptografia = await CriptografiaSenha.gerandoSenha(
        senha.senha
      );
      dadosAtualizar.senha = senhaCriptografia;
    }

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

// /**
//  * Atualiza apenas os campos enviados de um usuário com base no ID.
//  * Ignora campos que sejam undefined, null ou string vazia.
//  *
//  * @param {number} id - ID do usuário a ser atualizado
//  * @param {object} campos - Campos a serem atualizados (parciais)
//  * Ex: { senha: "novaSenha123" }
//  */
// export const updateMembresia = async (id, campos) => {
//   try {
//     const dadosAtualizar = {};

//     // Filtra somente os campos válidos (não null, não undefined, não string vazia)
//     for (const [chave, valor] of Object.entries(campos)) {
//       if (valor !== undefined && valor !== null && valor !== "") {
//         dadosAtualizar[chave] = valor;
//       }
//     }

//     if (Object.keys(dadosAtualizar).length === 0) {
//       throw new Error("Nenhum campo válido enviado para atualização.");
//     }

//     const updated = await Knex("usuarios")
//       .where("id", id)
//       .update(dadosAtualizar);

//     if (updated === 0) {
//       throw new Error(`Usuário com ID ${id} não encontrado.`);
//     }

//     return { success: true, message: "Usuário atualizado com sucesso." };
//   } catch (error) {
//     console.error("Erro ao atualizar usuário:", error);
//     throw error;
//   }
// };
