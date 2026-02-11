import { idNumber } from "./common";

export const entidadeComId = {
  type: "object",
  additionalProperties: false,
  properties: { id: idNumber },
  required: ["id"],
} as const;

export const situacaoModel = entidadeComId;
export const lojaModel = entidadeComId;
export const categoriaModel = entidadeComId;
export const vendedorModel = entidadeComId;
