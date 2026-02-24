import { Component, OnInit } from '@angular/core';
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
import { AgendamentoService, Profissional, Servico } from 'src/app/service/agendamento.service';

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
export class BuscarPage implements OnInit {
  etapa = 1;
  servicos: Servico[] = [];
  profissionais: Profissional[] = [];
  horarios = ['09:00', '10:30', '14:00', '15:30'];

  form = this.fb.group({
    clienteNome: [''],
    clienteTelefone: [''],
    observacoes: ['']
  });

  servicoSelecionado?: Servico;
  profissionalSelecionado?: Profissional;
  horarioSelecionado?: string;

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private toast: ToastController,
    private loading: LoadingController
  ) {
    addIcons({ arrowBackOutline, star });
  }

  ngOnInit(): void {
    this.carregarServicos();
  }

  carregarServicos() {
    this.agendamentoService.listarServicos().subscribe({
      next: (lista) => {
        this.servicos = lista;
      },
      error: async () => {
        const t = await this.toast.create({
          message: 'Não foi possível carregar os serviços.',
          duration: 2200,
          color: 'danger'
        });
        await t.present();
      }
    });
  }

  selecionarServico(servico: Servico) {
    this.servicoSelecionado = servico;
    this.profissionais = servico.profissionais || [];
    this.profissionalSelecionado = undefined;
    this.etapa = 2;
  }

  selecionarProfissional(profissional: Profissional) {
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
      servicoId: this.servicoSelecionado.id,
      profissional: this.profissionalSelecionado.nome,
      profissionalId: this.profissionalSelecionado.id,
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
        this.profissionais = [];
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
