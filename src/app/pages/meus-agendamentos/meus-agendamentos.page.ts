import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';

import { Auth, authState } from '@angular/fire/auth';

import { AgendaService } from 'src/app/service/agenda.service';
import { ServicosService } from 'src/app/service/servicos.service';

@Component({
  selector: 'app-meus-agendamentos',
  templateUrl: './meus-agendamentos.page.html',
  styleUrls: ['./meus-agendamentos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton,
    CommonModule
  ]
})
export class MeusAgendamentosPage implements OnInit {

  agendamentos: any[] = [];
  mapaServicos: any = {};

  constructor(
    private auth: Auth,
    private agendaService: AgendaService,
    private servicosService: ServicosService
  ) { }



  async ngOnInit() {

    // carregar nomes dos serviços
    const listaServicos = await this.servicosService.listar();

    listaServicos.forEach((s: any) => {
      this.mapaServicos[s.id] = s.descricao;
    });

    authState(this.auth).subscribe(async user => {

      if (!user) return;

      this.agendamentos =
        await this.agendaService.buscarMeusAgendamentos(user.uid);

    });

  }



  formatarData(data: string) {

    const d = new Date(data);

    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

  }



  getNomeServico(id: string) {
    return this.mapaServicos[id] || id;
  }



  async cancelar(a: any) {

    const confirmar = confirm(
      "Deseja cancelar este agendamento?"
    );

    if (!confirmar) return;

    try {

      await this.agendaService.cancelarAgendamento(a.id);

      if (a.agendaId) {
        await this.agendaService.liberarHorario(a.agendaId);
      }

      a.status = "CANCELADO";

      alert("Agendamento cancelado");

    } catch (e) {

      console.error(e);
      alert("Erro ao cancelar");

    }

  }

}
