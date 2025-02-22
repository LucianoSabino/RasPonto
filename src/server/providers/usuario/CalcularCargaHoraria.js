import { Knex } from "../../database/Knex/index.js";

export const somarHoras = async (usuarioId) => {
  try {
    // Fazendo a consulta para somar as horas na tabela 'cargahoraria'
    const result = await Knex("cargahoraria")
      .sum("horas as totalHoras") // Soma das horas
      .where("usuarioId", usuarioId); // Condição para filtrar por 'usuarioId'

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
