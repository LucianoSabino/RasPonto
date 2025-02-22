import { Router } from "express";
import { UsuarioController } from "../controller/usuario/index.js";
import { LoginSignUpController } from "../controller/login/index.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Api foi");
});

router.post(
  "/usuario",
  UsuarioController.createValidation,
  UsuarioController.createUp
);
router.get(
  "/usuario",
  UsuarioController.buscaValidation,
  UsuarioController.busca
);

router.post(
  "/login",
  LoginSignUpController.loginValidation,
  LoginSignUpController.login
);

router.post(
  "/horario",
  UsuarioController.cargahorariaValidation,
  UsuarioController.cargahoraria
);

router.get(
  "/horario",
  UsuarioController.buscaDataValidation,
  UsuarioController.buscaData
);

router.get(
  "/calcular",
  UsuarioController.CalcularValidation,
  UsuarioController.calcularhora
);

export { router };
