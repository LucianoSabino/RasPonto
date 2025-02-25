import { Knex } from "../../database/Knex/index.js";

export const updateRole = async (id, role) => {
  try {
    // Valida os valores permitidos para `role`
    const allowedRoles = ["admin", "user"];
    if (!allowedRoles.includes(role)) {
      return new Error(
        `O valor '${newRole}' para o role não é válido. Valores permitidos: ${allowedRoles.join(
          ", "
        )}.`
      );
    }
    // Atualiza o campo `role` no banco de dados
    const updated = await Knex("usuarios")
      .where("id", id) // WHERE primeiro
      .update({ role }); // UPDATE depois, usando um objeto

    // Verifica se o registro foi atualizado
    if (updated === 0) {
      return new Error(
        `Não foi possível atualizar o role. Usuário com ID ${id} não encontrado.`
      );
    }

    return { success: true, message: "Role atualizada com sucesso." };
  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar o role no banco de dados.");
  }
};
