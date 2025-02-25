import * as create from "./Create.js";
import * as busca from "./Busca.js";
import * as cargahoraria from "./CargaHoraria.js";
import * as calcularhora from "./CalcularCargaHoraria.js";
import * as buscaCargaHorariaData from "./BusacaCargaHorariaData.js";
import * as buscainfo from "./BuscaInfo.js";
import * as membresiaUp from "./UpMembresia.js";

export const UsuarioController = {
  ...create,
  ...busca,
  ...cargahoraria,
  ...calcularhora,
  ...buscaCargaHorariaData,
  ...buscainfo,
  ...membresiaUp,
};
