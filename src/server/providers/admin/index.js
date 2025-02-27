import * as buscaadmin from "./Buscaadmin.js";
import * as uprole from "./Uprole.js";
import * as deleteusuario from "./DeleteUsuario.js";

export const AdminProvider = {
  ...buscaadmin,
  ...uprole,
  ...deleteusuario,
};
