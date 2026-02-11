import { idNumber, dateISO, money } from "./common";

export const parcelaModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: idNumber,
    dataVencimento: dateISO,
    valor: money,
    observacoes: { type: "string" },
    caut: { type: "string" },
    formaPagamento: {
      type: "object",
      additionalProperties: false,
      properties: { id: idNumber },
      required: ["id"],
    },
  },
  required: ["dataVencimento", "valor"],
} as const;
