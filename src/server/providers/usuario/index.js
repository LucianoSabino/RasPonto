import * as create from "./Create.js";
import * as busca from "./Busca.js";
import * as cargahoraria from "./CargaHoraria.js";
import * as somarhoras from "./CalcularCargaHoraria.js";
import * as buscaCargaHorariaData from "./BuscaCargaHorariaData.js";
import * as buscainfo from "./BuscaInfo.js";
import * as upmembresia from "./UpMembresia.js";

export const UsuarioProvider = {
  ...create,
  ...busca,
  ...cargahoraria,
  ...somarhoras,
  ...buscaCargaHorariaData,
  ...buscainfo,
  ...upmembresia,
};
