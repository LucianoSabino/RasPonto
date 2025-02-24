import { Knex } from "../../database/Knex/index.js";

export const buscaadmin = async (matricula) => {
  try {
    // Log para verificar os parâmetros
    console.log("Parâmetros recebidos:", { matricula });

    // Construção da query
    const query = Knex("usuarios").select("id").where("matricula", matricula);

    // Executando a query e extraindo o ID corretamente
    const result = await query;
    if (result.length === 0) {
      throw new Error("Usuário não encontrado"); // Se não encontrar um usuário, lança um erro
    }

    const usuarioId = result[0].id; // Pega o ID do primeiro resultado

    // Segunda query
    const quer2 = Knex("cargahoraria")
      .select("*")
      .where("usuarioId", usuarioId);

    const result2 = await quer2;

    console.log("Carga horária encontrada:", result2);

    // Verificando o resultado
    if (!result || result.length === 0) {
      throw new Error("Nenhum registro encontrado.");
    }
    if (!result2 || result2.length === 0) {
      throw new Error("Nenhum registro encontrado.");
    }

    console.log("Resultado encontrado:", result2);
    return result2;
  } catch (error) {
    // Log do erro
    console.error("Erro ao buscar registros:", error.message || error);
    return { error: error.message || "Erro ao buscar registros." };
  }
};
