import { dateISO, money } from "./common";
import { contatoModel } from "./contato.model";
import { situacaoModel, lojaModel, categoriaModel, vendedorModel } from "./entidadesBasicas.model";
import { descontoModel } from "./desconto.model";
import { tributacaoModel } from "./tributacao.model";
import { itemModel } from "./item.model";
import { parcelaModel } from "./parcela.model";
import { transporteModel } from "./transporte.model";
import { intermediadorModel } from "./intermediador.model";
import { taxasModel } from "./taxas.model";

export const pedidoVendaModel = {
  $id: "pedidoVenda.model.json",
  type: "object",
  additionalProperties: false,
  properties: {
    numero: { type: "integer", minimum: 1 },
    numeroLoja: { type: "string" },
    data: dateISO,
    dataSaida: dateISO,
    dataPrevista: dateISO,

    contato: contatoModel,
    situacao: situacaoModel,
    loja: lojaModel,

    numeroPedidoCompra: { type: "string" },
    outrasDespesas: money,

    observacoes: { type: "string" },
    observacoesInternas: { type: "string" },

    desconto: descontoModel,
    categoria: categoriaModel,

    tributacao: tributacaoModel,

    itens: {
      type: "array",
      minItems: 1,
      items: itemModel,
    },

    parcelas: {
      type: "array",
      items: parcelaModel,
    },

    transporte: transporteModel,
    vendedor: vendedorModel,
    intermediador: intermediadorModel,
    taxas: taxasModel,
  },
  required: ["data", "contato", "itens"],
} as const;
