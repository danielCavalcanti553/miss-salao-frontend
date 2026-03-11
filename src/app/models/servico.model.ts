export interface Servico {

  id?: string;

  descricao: string;

  detalhe: string;

  categoria: string;

  preco: number;

  duracaoMin: number;

  ativo: boolean;

  imagem?: string;

  ordem?: number;

  comissaoPercentual?: number;

}
