import { DocumentReference } from "@angular/fire/firestore";

export interface Agenda {

  id?: string;
  data: string;
  horario: string;
  disponivel: boolean;
  profissionalId: string;
  profissionalFoto: string;
  profissionalNome: string;
  servicos: string[];

}
