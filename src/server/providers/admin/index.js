import * as buscaadmin from "./Buscaadmin.js";
import * as uprole from "./Uprole.js";
import * as deleteusuario from "./DeleteUsuario.js";
import * as delethorario from "./DeleteHorario.js";

export const AdminProvider = {
  ...buscaadmin,
  ...uprole,
  ...deleteusuario,
  ...delethorario,
};
