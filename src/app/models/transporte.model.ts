import { idNumber, money, codigoRastreamento } from "./common";
import { contatoModel } from "./contato.model";

export const etiquetaModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    nome: { type: "string" },
    endereco: { type: "string" },
    numero: { type: "string" },
    complemento: { type: "string" },
    municipio: { type: "string" },
    uf: { type: "string", minLength: 2, maxLength: 2 },
    cep: { type: "string" },
    bairro: { type: "string" },
    nomePais: { type: "string" },
  },
} as const;

export const volumeModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: idNumber,
    servico: { type: "string" },
    codigoRastreamento: codigoRastreamento,
  },
} as const;

export const transporteModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    fretePorConta: { type: "integer", minimum: 0 },
    frete: money,
    quantidadeVolumes: { type: "integer", minimum: 0 },
    pesoBruto: { type: "number", minimum: 0 },
    prazoEntrega: { type: "integer", minimum: 0 },
    contato: contatoModel,
    etiqueta: etiquetaModel,
    volumes: { type: "array", items: volumeModel },
  },
} as const;
