import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { UsuarioProvider } from "../../providers/usuario/index.js";

export const CalcularValidation = validation((getSchema) => ({
  query: getSchema(
    yup.object().shape({
      usuarioId: yup.number().required(),
    })
  ),
}));

export const calcularhora = async (req, res) => {
  console.log(req.query);
  const { usuarioId } = req.query;

  // Faz a busca no provider
  const calcular = await UsuarioProvider.somarHoras(usuarioId);
  console.log(calcular);

  if (calcular instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: parametroBusca,
      },
    });
    return;
  }

  res.status(StatusCodes.CREATED).json(calcular);
};
