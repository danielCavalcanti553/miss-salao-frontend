import { money } from "./common";

export const descontoModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    valor: money,
    unidade: { type: "string", enum: ["REAL", "PERCENTUAL"] },
  },
} as const;
