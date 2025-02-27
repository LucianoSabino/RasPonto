import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { AdminProvider } from "../../providers/admin/index.js";

export const deleteusuario = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  // Faz a busca no provider
  const parametroBusca = await AdminProvider.deleteuser(id);
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
