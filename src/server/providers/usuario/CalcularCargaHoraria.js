import { Knex } from "../../database/Knex/index.js";

export const somarHoras = async (usuarioId, dataInicio, dataFim) => {
  try {
    // Fazendo a consulta para somar as horas na tabela 'cargahoraria'
    // const query = Knex("cargahoraria")
    //   .where("usuarioId", usuarioId) // Filtra primeiro pelo ID
    //   .sum("horario as totalHoras"); // Soma o campo "horario"

    // const result = await Knex("cargahoraria")
    //   .sum("horas as totalHoras") // Soma das horas
    //   .where("usuarioId", usuarioId); // Condição para filtrar por 'usuarioId'

    // // Se ambas as datas forem fornecidas, aplica o filtro de intervalo
    // if (dataInicio && dataFim) {
    //   result.whereBetween("data", [dataInicio, dataFim]);
    // }

    // // Verificando se o resultado foi retornado e tem o campo totalHoras
    // if (result && result[0] && result[0].totalHoras != null) {
    //   return result[0].totalHoras; // Retorna o total de horas somadas
    // }

    const query = Knex("cargahoraria").where("usuarioId", usuarioId);

    // Se ambas as datas forem fornecidas, aplica o filtro de intervalo
    if (dataInicio && dataFim) {
      query.whereBetween("data", [dataInicio, dataFim]);
    }

    // Agora executa a consulta e obtém a soma
    const result = await query.sum("horas as totalHoras");

    // Verificando se o resultado foi retornado e tem o campo totalHoras
    if (result && result[0] && result[0].totalHoras != null) {
      return result[0].totalHoras; // Retorna o total de horas somadas
    }

    return new Error("Registro não encontrado!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar o registro");
  }
};
