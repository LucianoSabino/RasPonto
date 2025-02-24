import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { UsuarioProvider } from "../../providers/usuario/index.js";

export const buscaInfoValidation = validation((getSchema) => ({
  query: getSchema(
    yup.object().shape({
      usuarioId: yup.string().optional(),
    })
  ),
}));

export const buscainfo = async (req, res) => {
  console.log(req.query);
  const { usuarioId } = req.query;

  // Faz a busca no provider
  const parametroBusca = await UsuarioProvider.buscainfo(usuarioId);
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
