import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonNote,
  ToastController
} from '@ionic/angular/standalone';
import { Agendamento, AgendamentoService } from 'src/app/service/agendamento.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonRefresher,
    IonRefresherContent,
    IonNote
  ]
})
export class ProdutoPage implements OnInit {
  agendamentos: Agendamento[] = [];
  carregando = false;

  constructor(
    private agendamentoService: AgendamentoService,
    private toast: ToastController
  ) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  carregarAgendamentos(event?: CustomEvent) {
    this.carregando = true;
    this.agendamentoService.listarMeusAgendamentos().subscribe({
      next: async (lista) => {
        this.agendamentos = lista;
        this.carregando = false;
        event?.detail.complete();
      },
      error: async () => {
        this.carregando = false;
        event?.detail.complete();
        const t = await this.toast.create({
          message: 'Não foi possível carregar os agendamentos.',
          duration: 2500,
          color: 'danger'
        });
        await t.present();
      }
    });
  }

  formatarData(dataHora: string): string {
    const data = new Date(dataHora);
    return `${data.toLocaleDateString('pt-BR')} ${data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  }
}
