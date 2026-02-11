// Utilitários e sub-models compartilhados

export const idNumber = {
  type: "integer",
  minimum: 1,
} as const;

export const money = {
  type: "number",
  multipleOf: 0.01,
} as const;

export const percent = {
  type: "number",
} as const;

export const dateISO = {
  type: "string",
  format: "date", // YYYY-MM-DD
} as const;

export const codigoRastreamento = {
  type: "string",
  minLength: 1,
} as const;

export const documentoCNPJouCPF = {
  type: "string",
  pattern: "^[0-9]{11}|[0-9]{14}$",
} as const;

export const tipoPessoa = {
  type: "string",
  enum: ["F", "J"],
} as const;
