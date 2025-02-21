import { StatusCodes } from "http-status-codes"; // Importa códigos de status HTTP para facilitar o uso de status apropriados nas respostas
import { ValidationError } from "yup"; // Importa o erro de validação do `yup` para capturar os erros de validação

// Função de middleware de validação
const validation = (getAllSchemas) => async (req, res, next) => {
  // Chama `getAllSchemas` para obter todos os esquemas de validação (presumivelmente definidos em outro lugar)
  const schema = getAllSchemas((schema) => schema);

  // Inicializa um objeto para armazenar os erros encontrados
  const errorsResult = {};

  // Itera sobre os esquemas de validação obtidos, onde cada chave representa um campo de requisição
  Object.entries(schema).forEach(([key, schema]) => {
    try {
      // Valida o valor da requisição para o campo específico (ex: req.body, req.params, etc.) de acordo com o esquema
      schema.validateSync(req[key], {
        abortEarly: false, // Impede que a validação pare na primeira falha
      });
    } catch (error) {
      // Se um erro de validação for lançado, ele é capturado
      const yupError = error; // Captura o erro gerado pelo `yup`
      const validationErrors = {}; // Inicializa um objeto para armazenar os erros específicos do campo

      // Itera sobre os erros internos do `yup`, que podem ser múltiplos
      yupError.inner.forEach((err) => {
        if (!err.path) return; // Se não houver caminho (campo), ignora o erro
        validationErrors[err.path] = err.message; // Armazena a mensagem de erro associada ao campo
      });

      // Adiciona os erros de validação encontrados para o campo específico
      errorsResult[key] = validationErrors;
    }
  });

  // Verifica se há erros de validação
  if (Object.entries(errorsResult).length === 0) {
    return next(); // Se não houver erros, segue para o próximo middleware ou rota
  } else {
    // Se houver erros, responde com um código de status 400 (Bad Request) e os erros encontrados
    res.status(StatusCodes.BAD_REQUEST).json({
      Message: { Error: errorsResult }, // Retorna os erros no formato JSON
    });
  }
};

export { validation }; // Exporta a função de validação
