import { money } from "./common";

export const taxasModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    taxaComissao: { type: "number", minimum: 0 },
    custoFrete: money,
    valorBase: money,
  },
} as const;
