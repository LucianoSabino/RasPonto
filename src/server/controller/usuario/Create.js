import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { UsuarioProvider } from "../../providers/usuario/index.js";

export const createValidation = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      nome: yup.string().required().min(3).max(25),
      matricula: yup.number().required(),
      curso: yup.string().required(),
      telefone: yup.string().required(),
      email: yup.string().required().email(),
      senha: yup.string().required(),
    })
  ),
}));

export const createUp = async (req, res) => {
  const result = await UsuarioProvider.create(req.body);
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
