import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { UsuarioProvider } from "../../providers/usuario/index.js";

export const upMembresiaValidation = validation((getSchema) => ({
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
      robo: yup.string(),
      sobre: yup.string(),
    })
  ),
}));

export const membresiaUp = async (req, res) => {
  const { id, nome, curso, telefone, email, senha, membresia, robo, sobre } =
    req.body;
  const nomeFormatado = nome ? nome.toUpperCase() : ""; // Prevenir erro se nome for undefined
  const cursoFormatado = curso ? curso.toUpperCase() : "";
  const roboFormatado = robo ? robo.toUpperCase() : "";
  const sobreFormatado = sobre ? sobre.toUpperCase() : "";

  const result = await UsuarioProvider.updateMembresia(
    id,
    nomeFormatado,
    cursoFormatado,
    telefone,
    email,
    senha,
    membresia,
    roboFormatado,
    sobreFormatado
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
