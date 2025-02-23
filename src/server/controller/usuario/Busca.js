import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { UsuarioProvider } from "../../providers/usuario/index.js";

export const buscaValidation = validation((getSchema) => ({
  query: getSchema(
    yup.object().shape({
      nome: yup.string().optional(),
      matricula: yup.string().optional(),
      curso: yup.string().optional(),
      id: yup.string().optional(),
    })
  ),
}));

export const busca = async (req, res) => {
  console.log(req.query);
  const { nome, matricula, curso, id } = req.query;

  // Faz a busca no provider
  const parametroBusca = await UsuarioProvider.busca(
    nome,
    matricula,
    curso,
    id
  );
  console.log(parametroBusca);

  if (parametroBusca instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: parametroBusca,
      },
    });
    return;
  }

  res.status(StatusCodes.CREATED).json(parametroBusca);
};
