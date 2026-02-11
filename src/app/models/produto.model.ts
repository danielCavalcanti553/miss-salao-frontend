import { idNumber, money } from "./common";

export const estoqueModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    saldoVirtualTotal: { type: "number", minimum: 0 },
  },
  required: ["saldoVirtualTotal"],
} as const;

export const produtoModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: idNumber,
    idProdutoPai: idNumber,
    nome: { type: "string" },
    codigo: { type: "string" },
    preco: money,
    precoCusto: money,
    estoque: estoqueModel,
    tipo: { type: "string", enum: ["P", "S", "O"] }, // P=Produto, S=Serviço, O=Outros (ajuste se necessário)
    situacao: { type: "string", enum: ["A", "I"] }, // A=Ativo, I=Inativo
    formato: { type: "string", enum: ["S", "U"] }, // S=Simples, U=Unidade de medida etc.
    descricaoCurta: { type: "string" },
    imagemURL: { type: "string", format: "uri" },
  },
  required: ["id", "nome", "codigo", "preco", "estoque", "tipo", "situacao"],
} as const;

export const produtosResponseModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    data: {
      type: "array",
      minItems: 1,
      items: produtoModel,
    },
  },
  required: ["data"],
} as const;
