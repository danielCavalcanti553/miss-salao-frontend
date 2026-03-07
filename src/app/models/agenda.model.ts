import { DocumentReference } from "@angular/fire/firestore";

export interface Agenda {

  id?: string;
  data: string;
  horario: {
    [hora: string]: 'livre' | 'ocupado';
  };
  profissional: DocumentReference;
  servico: string[];

}
