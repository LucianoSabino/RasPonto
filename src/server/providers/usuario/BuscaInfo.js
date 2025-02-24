import { Knex } from "../../database/Knex/index.js";

export const buscainfo = async (usuarioId) => {
  try {
    // Log para verificar os parâmetros
    console.log("Parâmetros recebidos:", { usuarioId });

    // Construção da query
    const query = Knex("cargahoraria")
      .select("*")
      .where("usuarioId", usuarioId);

    // Executando a query
    const result = await query;

    // Verificando o resultado
    if (!result || result.length === 0) {
      throw new Error("Nenhum registro encontrado.");
    }

    console.log("Resultado encontrado:", result);
    return result;
  } catch (error) {
    // Log do erro
    console.error("Erro ao buscar registros:", error.message || error);
    return { error: error.message || "Erro ao buscar registros." };
  }
};
