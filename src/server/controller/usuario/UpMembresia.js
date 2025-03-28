import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { UsuarioProvider } from "../../providers/usuario/index.js";

export const upMembresiaValidation = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      id: yup.number().required(),
      nome: yup
        .string()
        .min(3)
        .max(60)
        .transform((value) => (value ? value.toUpperCase() : value)), // Transforma nome para maiúsculo
      curso: yup
        .string()
        .transform((value) => (value ? value.toUpperCase() : value)), // Transforma curso para maiúsculo
      telefone: yup.string(),
      email: yup.string().email(),
      senha: yup.string(),
      membresia: yup.string(),
      robo: yup
        .string()
        .transform((value) => (value ? value.toUpperCase() : value)), // Transforma robo para maiúsculo
      sobre: yup
        .string()
        .max(255)
        .transform((value) => (value ? value.toUpperCase() : value)), // Transforma sobre para maiúsculo
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
