import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { UsuarioProvider } from "../../providers/usuario/index.js";

export const cargahorariaValidation = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      horas: yup.number().required(),
      descricao: yup.string().required(),
      usuarioId: yup.number().required(),
    })
  ),
}));

export const cargahoraria = async (req, res) => {
  const result = await UsuarioProvider.cargahoraria(req.body);
  console.log(result);
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
    return;
  }

  res.status(StatusCodes.CREATED).json(result);
};
