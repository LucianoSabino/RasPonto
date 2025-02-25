import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { AdminProvider } from "../../providers/admin/index.js";

export const upRoleValidation = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      id: yup.number().required(),
      role: yup.string().required(),
    })
  ),
}));

export const roleUp = async (req, res) => {
  const { id, role } = req.body;
  const result = await AdminProvider.updateRole(id, role);
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
