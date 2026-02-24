import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonChip,
  IonLabel,
  IonIcon,
  IonNote,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, chevronForwardOutline } from 'ionicons/icons';
import { Agendamento, AgendamentoService } from 'src/app/service/agendamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonChip,
    IonLabel,
    IonIcon,
    IonNote
  ]
})
export class ProdutoPage implements OnInit {
  agendamentos: Agendamento[] = [];

  categorias = ['Unhas', 'Cabelos', 'Spa', 'Sobrancelha'];

  constructor(
    private agendamentoService: AgendamentoService,
    private toast: ToastController,
    private router: Router
  ) {
    addIcons({ calendarOutline, chevronForwardOutline });
  }

  ngOnInit(): void {
    this.agendamentoService.listarMeusAgendamentos().subscribe({
      next: (lista) => (this.agendamentos = lista),
      error: async () => {
        const t = await this.toast.create({
          message: 'Não foi possível carregar sua agenda.',
          duration: 2200,
          color: 'danger'
        });
        await t.present();
      }
    });
  }

  get proximoAgendamento() {
    return this.agendamentos[0];
  }

  abrirNovoAgendamento() {
    this.router.navigateByUrl('/tabs/buscar');
  }

  formatarData(dataHora?: string): string {
    if (!dataHora) return '';
    const data = new Date(dataHora);
    return `${data.toLocaleDateString('pt-BR')} • ${data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  }
}
