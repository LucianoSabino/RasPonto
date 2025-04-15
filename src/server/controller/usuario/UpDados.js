import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { UsuarioProvider } from "../../providers/usuario/index.js";

export const upDado = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      nome: yup.string().min(3).max(60),
      matricula: yup.string().min(10).max(10),
      curso: yup.string(),
      telefone: yup.string(),
      email: yup.string().email(),
      senha: yup.string(),
      membresia: yup.string(),
      role: yup.string(),
    })
  ),
}));

export const dadosUp = async (req, res) => {
  const { id, nome, curso, telefone, email, senha, membresia } = req.body;
  const nomeFormatado = nome ? nome.toUpperCase() : ""; // Prevenir erro se nome for undefined
  const cursoFormatado = curso ? curso.toUpperCase() : "";

  const result = await UsuarioProvider.updateMembresia(
    id,
    nomeFormatado,
    cursoFormatado,
    telefone,
    email,
    senha,
    membresia
  );

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
