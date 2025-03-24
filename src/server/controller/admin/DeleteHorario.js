import { StatusCodes } from "http-status-codes";
import { AdminProvider } from "../../providers/admin/index.js";

export const deletehorario = async (req, res) => {
  const { id } = req.params;
  // Faz a busca no provider
  const parametroBusca = await AdminProvider.deleteuser(id);
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
