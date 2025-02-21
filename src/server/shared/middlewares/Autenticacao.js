import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services/JWT.js";

// Vai validar se o usuario esta validade
export const verificacaoAutenticacao = async (req, res, next) => {
  // Verifica se o usuario esta com o token
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Não autenticado, sem token" },
    });

    return;
  }

  // O padrão de token que vai ser usado vem com a palavra Bearer na frente, Então esta verificando
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Não autenticado" },
    });

    return;
  }

  const jwtData = JWTService.verify(token);

  if (jwtData === "JWT_SECRET_NOT_FOUND") {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: "Erro ao verificar o token!" },
    });

    return;
  } else if (jwtData === "INVALID_TOKEN") {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Não autenticado!" },
    });

    return;
  }

  req.headers.idUsuario = jwtData.uid.toString();

  return next();
};
