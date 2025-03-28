import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { UsuarioProvider } from "../../providers/usuario/index.js";

export const createValidation = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      nome: yup.string().required().min(3).max(60),
      matricula: yup.string().required().min(10).max(10),
      curso: yup.string().required(),
      telefone: yup.string().required(),
      email: yup.string().required().email(),
      senha: yup.string().required(),
      membresia: yup.string().required(),
      role: yup.string().required(),
    })
  ),
}));

export const createUp = async (req, res) => {
  const { nome, matricula, curso, telefone, email, senha, membresia, role } =
    req.body;
  const robo = "NÃO INFORMADO!";
  const sobre = "NÃO INFORMADO!";
  const data = {
    nome: nome ? nome.toUpperCase() : "", // Converte nome para caixa alta
    matricula,
    curso: curso ? curso.toUpperCase() : "", // Converte curso para caixa alta
    telefone,
    email,
    senha,
    membresia,
    role,
    robo: robo ? robo.toUpperCase() : "",
    sobre: sobre ? sobre.toUpperCase() : "",
  };
  const result = await UsuarioProvider.create(data);
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
