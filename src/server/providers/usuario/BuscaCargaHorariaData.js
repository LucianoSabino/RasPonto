import { Knex } from "../../database/Knex/index.js";

export const buscaCargaHorariaData = async (dataInicio, dataFinal) => {
  try {
    // Busca todos os registros filtrados pelo intervalo de datas
    const result = await Knex("cargahoraria")
      .select("*") // Seleciona todas as colunas
      .whereBetween("data", [dataInicio, dataFinal]) // Filtra pelo intervalo de datas
      .orderBy("data", "asc"); // Ordena os registros por data, do mais antigo para o mais recente

    console.log(result);
    // Verifica se algum resultado foi encontrado
    if (!result || result.length === 0) {
      return new Error("Nenhum registro encontrado para o intervalo de datas.");
    }

    return result; // Retorna os registros como uma lista de objetos
  } catch (error) {
    console.error(error);
    return new Error("Erro ao buscar os registros para o intervalo de datas.");
  }
};
