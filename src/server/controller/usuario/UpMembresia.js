import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { UsuarioProvider } from "../../providers/usuario/index.js";

export const upMembresiaValidation = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      id: yup.number().required(),
      membresia: yup.string().required(),
    })
  ),
}));

export const membresiaUp = async (req, res) => {
  const { id, membresia } = req.body;
  const result = await UsuarioProvider.updateMembresia(id, membresia);
  //   console.log(result);
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
