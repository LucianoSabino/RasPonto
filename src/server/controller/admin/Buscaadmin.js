import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { AdminProvider } from "../../providers/admin/index.js";

export const buscaAdminValidation = validation((getSchema) => ({
  query: getSchema(
    yup.object().shape({
      matricula: yup.string().optional(),
    })
  ),
}));

export const buscaadmin = async (req, res) => {
  console.log(req.query);
  const { matricula } = req.query;

  // Faz a busca no provider
  const parametroBusca = await AdminProvider.buscaadmin(matricula);
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
