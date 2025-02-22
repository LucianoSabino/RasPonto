import { Knex } from "../../database/Knex/index.js";

export const busca = async (nome, matricula, curso, id) => {
  try {
    // Log para verificar os parâmetros
    console.log("Parâmetros recebidos:", { matricula, nome, curso, id });

    // Construção da query
    const query = Knex("usuarios").select("*");

    if (nome) {
      console.log("Adicionando filtro para nome:", nome);
      query.where("nome", "like", `%${nome}%`);
    }
    if (matricula) {
      console.log("Adicionando filtro para matricula:", matricula);
      query.where("matricula", matricula);
    }
    if (curso) {
      console.log("Adicionando filtro para curso:", curso);
      query.where("curso", curso);
    }

    if (id) {
      console.log("Adicionando filtro para curso:", id);
      query.where("id", id);
    }

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
