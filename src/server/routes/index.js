import { Router } from "express";
import { UsuarioController } from "../controller/usuario/index.js";
import { LoginSignUpController } from "../controller/login/index.js";
import { AdminController } from "../controller/admin/index.js";
import { verificacaoAutenticacao } from "../shared/middlewares/Autenticacao.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("API Ponto da RAS Rodando. Tudo OK");
});

// Cria usuario
router.post(
  "/usuario",
  UsuarioController.createValidation,
  UsuarioController.createUp
);

// Mostra todos os usuarios
router.get(
  "/usuario",
  UsuarioController.buscaValidation,
  UsuarioController.busca
);

// Faz login
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

// Buscando todas as informação de carga horaria do usuario pelo id
router.get(
  "/buscainfo",
  UsuarioController.buscaInfoValidation,
  UsuarioController.buscainfo
);

// Busca detalhada da carga hoararia para o admin
router.get(
  "/admin_busca",
  AdminController.buscaAdminValidation,
  AdminController.buscaadmin
);

// Atualização membresia
router.post(
  "/upmembresia",
  UsuarioController.upMembresiaValidation,
  UsuarioController.membresiaUp
);

// Atualização role
router.post(
  "/admin_role",
  AdminController.upRoleValidation,
  AdminController.roleUp
);

// Deletando usuario
router.delete("/admin_delete/:id", AdminController.deleteusuario);
export { router };
