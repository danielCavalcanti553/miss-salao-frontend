import { money, percent } from "./common";

export const itemModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    codigo: { type: "string" },
    unidade: { type: "string" },
    quantidade: { type: "number", exclusiveMinimum: 0 },
    desconto: { type: "number", minimum: 0 },
    valor: money,
    aliquotaIPI: percent,
    descricao: { type: "string" },
    descricaoDetalhada: { type: "string" },
    produto: {
      type: "object",
      additionalProperties: false,
      properties: { id: { type: "integer", minimum: 1 } },
      required: ["id"],
    },
    comissao: {
      type: "object",
      additionalProperties: false,
      properties: {
        base: money,
        aliquota: percent,
        valor: money,
      },
    },
  },
  required: ["codigo", "unidade", "quantidade", "valor", "produto"],
} as const;
