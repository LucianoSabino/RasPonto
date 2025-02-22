import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation.js";
import { LoginProvider } from "../../providers/login/index.js";
import { CriptografiaSenha } from "../../shared/services/CriptografiaSenha.js";
import { JWTService } from "../../shared/services/JWT.js";

export const loginValidation = validation((getSchema) => ({
  body: getSchema(
    yup.object().shape({
      matricula: yup.string().required().min(3).max(10),
      senha: yup.string().required(),
    })
  ),
}));

export const login = async (req, res) => {
  console.log(req.body);
  const { matricula, senha } = req.body;

  const result = await LoginProvider.login(matricula);

  try {
    const VerificandoSenha = await CriptografiaSenha.verificandoSenha(
      senha,
      result.senha
    );

    console.log(result);

    if (!VerificandoSenha) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
          default: "usuario ou senha são invalidos",
        },
      });
      return;
    } else {
      console.log(result.usuario);
      // Gerando o token
      const accessToken = JWTService.sign({
        uid: result.id,
        nome: result.nome,
      });

      if (accessToken === "JWT_SECRET_NOT_FOUND") {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: {
            default: "Erro ao gerar o Token de acesso!",
          },
        });
        return;
      }

      res.status(StatusCodes.OK).json({ accessToken });
    }
  } catch (erro) {
    console.log(erro);
    res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        default: "Erro interno!",
      },
    });
  }
};
