import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { UsuarioProvider } from "../../providers/usuario/index.js";

export const buscaDataValidation = validation((getSchema) => ({
  query: getSchema(
    yup.object().shape({
      dataInicio: yup.string().required(),
      dataFim: yup.string().required(),
    })
  ),
}));

export const buscaData = async (req, res) => {
  const { dataInicio, dataFim } = req.query;

  // Faz a busca no provider
  const parametroBusca = await UsuarioProvider.buscaCargaHorariaData(
    dataInicio,
    dataFim
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
