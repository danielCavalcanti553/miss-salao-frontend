import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton,
  IonBackButton,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonFab,
  IonFabButton,
  IonModal,
  IonActionSheet
} from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';
import { Auth, authState } from '@angular/fire/auth';

import { AgendaService } from 'src/app/service/agenda.service';
import { ServicosService } from 'src/app/service/servicos.service';
import { addIcons } from 'ionicons';

import {
  calendarOutline,
  timeOutline,
  cutOutline,
  personAddOutline,
  closeCircleOutline
} from 'ionicons/icons';

addIcons({
  'calendar-outline': calendarOutline,
  'time-outline': timeOutline,
  'cut-outline': cutOutline,
  'person-add-outline': personAddOutline,
  'close-circle-outline': closeCircleOutline

});

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
    IonActionSheet,
    IonCardContent,
    IonButton,
    CommonModule,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonBackButton,
    IonIcon,
    IonModal,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonFab,
    IonFabButton
  ]
})
export class MeusAgendamentosPage implements OnInit {

  agendamentos: any[] = [];
  mapaServicos: any = {};
  selectedAgenda: any = null;
  isModalOpen = false;

  constructor(
    private auth: Auth,
    private agendaService: AgendaService,
    private servicosService: ServicosService
  ) { }

  async ngOnInit() {
    const listaServicos = await this.servicosService.listar();

    listaServicos.forEach((s: any) => {
      this.mapaServicos[s.id] = s.descricao;
    });

    authState(this.auth).subscribe(async user => {
      if (!user) return;

      this.agendamentos = await this.agendaService.buscarMeusAgendamentos(user.uid);
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
    //const confirmar = confirm('Deseja cancelar este agendamento?');
    //if (!confirmar) return;

    try {
      await this.agendaService.cancelarAgendamento(a.id);

      if (a.agendaId) {
        await this.agendaService.liberarHorario(a.agendaId);
      }

      a.status = 'CANCELADO';

      this.agendamentos = [...this.agendamentos];

      alert('Agendamento cancelado');
    } catch (e) {
      console.error(e);
      alert('Erro ao cancelar');
    }
  }

  isActionSheetOpen = false;

  public actionSheetButtons = [
    {
      text: 'Excluir',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  logResult(event: CustomEvent<OverlayEventDetail>) {
    console.log(JSON.stringify(event.detail, null, 2));
  }

  setInit(isOpen: boolean, obj: any) {
    console.log(obj);
    this.selectedAgenda = obj;
    this.isActionSheetOpen = isOpen;
  }

  setOpen(isOpen: boolean, event: CustomEvent<OverlayEventDetail>) {

    this.isActionSheetOpen = isOpen;

    try {

      let result: any = JSON.parse(JSON.stringify(event.detail.data, null, 2));
      if (result.action == 'delete') {
        this.cancelar(this.selectedAgenda);
      } else {
        console.log('cancelar')
      }
    } catch (e) {
    }

  }

  fecharModal() {
    this.isModalOpen = false;
  }

  //scroll

}
