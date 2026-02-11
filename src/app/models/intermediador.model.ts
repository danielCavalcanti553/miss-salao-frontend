import { documentoCNPJouCPF } from "./common";

export const intermediadorModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    cnpj: documentoCNPJouCPF,
    nomeUsuario: { type: "string" },
  },
  required: ["cnpj"],
} as const;
