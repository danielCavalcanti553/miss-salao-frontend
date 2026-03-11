export interface Agenda {

  id?: string;

  data: string;

  horario: string;

  profissionalId: string;

  profissionalNome: string;

  profissionalFoto?: string;

  servicos?: string[];

  disponivel?: boolean;

}
