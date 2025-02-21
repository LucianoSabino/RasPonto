import * as create from "./Create.js";
import * as busca from "./Busca.js";
import * as cargahoraria from "./CargaHoraria.js";

export const UsuarioProvider = {
  ...create,
  ...busca,
  ...cargahoraria,
};
