import { idNumber, tipoPessoa, documentoCNPJouCPF } from "./common";

export const contatoModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: idNumber,
    tipoPessoa,
    numeroDocumento: documentoCNPJouCPF,
    nome: { type: "string" },
  },
  anyOf: [{ required: ["id"] }, { required: ["numeroDocumento"] }],
} as const;
