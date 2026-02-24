import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonItem,
  IonInput,
  ToastController,
  LoadingController,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, star } from 'ionicons/icons';
import { AgendamentoService } from 'src/app/service/agendamento.service';

interface ServicoUI {
  nome: string;
  minutos: number;
  preco: number;
}

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    ReactiveFormsModule,
    IonCard,
    IonCardContent,
    IonButton,
    IonItem,
    IonInput,
    IonIcon
  ]
})
export class BuscarPage {
  etapa = 1;

  servicos: ServicoUI[] = [
    { nome: 'Manicure', minutos: 40, preco: 28 },
    { nome: 'Pé e Mão', minutos: 60, preco: 40 },
    { nome: 'Acrigel', minutos: 120, preco: 90 },
    { nome: 'Hidratação', minutos: 45, preco: 35 }
  ];

  profissionais = [
    { nome: 'Ana Souza', nota: 4.9, especialidade: 'Unhas' },
    { nome: 'Carla Lima', nota: 4.8, especialidade: 'Cabelos e Hidratação' }
  ];

  horarios = ['09:00', '10:30', '14:00', '15:30'];

  form = this.fb.group({
    clienteNome: [''],
    clienteTelefone: [''],
    observacoes: ['']
  });

  servicoSelecionado?: ServicoUI;
  profissionalSelecionado?: { nome: string };
  horarioSelecionado?: string;

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private toast: ToastController,
    private loading: LoadingController
  ) {
    addIcons({ arrowBackOutline, star });
  }

  selecionarServico(servico: ServicoUI) {
    this.servicoSelecionado = servico;
    this.etapa = 2;
  }

  selecionarProfissional(profissional: any) {
    this.profissionalSelecionado = profissional;
    this.etapa = 3;
  }

  selecionarHorario(h: string) {
    this.horarioSelecionado = h;
  }

  voltar() {
    this.etapa = Math.max(1, this.etapa - 1);
  }

  async confirmar() {
    if (!this.servicoSelecionado || !this.profissionalSelecionado || !this.horarioSelecionado) {
      const t = await this.toast.create({ message: 'Complete todas as etapas.', duration: 1800, color: 'warning' });
      await t.present();
      return;
    }

    const hoje = new Date();
    const [hora, minuto] = this.horarioSelecionado.split(':').map(Number);
    const dataHora = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), hora, minuto).toISOString();

    const payload = {
      clienteNome: this.form.value.clienteNome || 'Cliente',
      clienteTelefone: this.form.value.clienteTelefone || 'Não informado',
      servico: this.servicoSelecionado.nome,
      profissional: this.profissionalSelecionado.nome,
      dataHora,
      observacoes: this.form.value.observacoes || ''
    };

    const loader = await this.loading.create({ message: 'Confirmando...' });
    await loader.present();

    this.agendamentoService.criarAgendamento(payload).subscribe({
      next: async () => {
        await loader.dismiss();
        this.etapa = 1;
        this.servicoSelecionado = undefined;
        this.profissionalSelecionado = undefined;
        this.horarioSelecionado = undefined;
        this.form.reset();
        const t = await this.toast.create({ message: 'Horário confirmado!', duration: 2200, color: 'success' });
        await t.present();
      },
      error: async () => {
        await loader.dismiss();
        const t = await this.toast.create({ message: 'Não foi possível confirmar.', duration: 2200, color: 'danger' });
        await t.present();
      }
    });
  }
}
