import * as buscaadmin from "./Buscaadmin.js";
import * as uprole from "./UpRole.js";
import * as deleteusuario from "./DeleteUsuario.js";
import * as deletehorario from "./DeleteHorario.js";

export const AdminController = {
  ...buscaadmin,
  ...uprole,
  ...deleteusuario,
  ...deletehorario,
};
