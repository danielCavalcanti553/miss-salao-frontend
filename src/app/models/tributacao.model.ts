import { money } from "./common";

export const tributacaoModel = {
  type: "object",
  additionalProperties: false,
  properties: {
    totalICMS: money,
    totalIPI: money,
  },
} as const;
