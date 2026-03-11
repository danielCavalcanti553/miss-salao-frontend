import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonDatetime,
  IonButton,
  IonList,
  IonLabel,
  IonCard,
  IonCardContent,
  IonAvatar
} from '@ionic/angular/standalone';

import { AgendaService } from 'src/app/service/agenda.service';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { ServicosService } from 'src/app/service/servicos.service';

@Component({
  selector: 'app-agenda-profissional',
  templateUrl: 'agenda-profissional.page.html',
  styleUrls: ['agenda-profissional.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonDatetime,
    IonButton,
    IonList,
    IonLabel,
    IonCard,
    IonCardContent,
    IonAvatar
  ]
})
export class AgendaProfissionalPage implements OnInit {

  dataSelecionada = '';
  horarios: string[] = [];
  agenda: any[] = [];
  profissional: any = {};
  servicosDisponiveis: any[] = [];

  constructor(
    private agendaService: AgendaService,
    private route: ActivatedRoute,
    private profissionalService: ProfissionalService,
    private servicosService: ServicosService
  ) { }

  async ngOnInit() {
    const id = 'YP0y5FMaL3gjKsyPC0I7'; // depois trocar pela rota

    this.servicosDisponiveis = await this.servicosService.listar();

    if (id) {
      const prof = await this.profissionalService.buscarPorId(id);
      if (prof) {
        this.profissional = prof;
      }
    }
  }

  gerarHorarios() {
    this.horarios = [];

    const inicio = 9;
    const fim = 18;

    for (let h = inicio; h <= fim; h++) {
      const hora = h.toString().padStart(2, '0') + ':00';
      this.horarios.push(hora);
    }
  }

  removerHorario(horario: string) {
    this.horarios = this.horarios.filter(h => h !== horario);
  }

  formatarData(valor: string): string {
    if (!valor) return '';
    return valor.substring(0, 10);
  }

  async onDataChange(event: any) {
    const valor = event?.detail?.value;
    this.dataSelecionada = this.formatarData(valor);
    await this.carregarAgenda();
  }

  async salvarAgenda() {
    if (!this.dataSelecionada) {
      alert('Selecione uma data');
      return;
    }

    if (!this.profissional?.id) {
      alert('Profissional não encontrado');
      return;
    }

    if (!this.profissional?.servicos || this.profissional.servicos.length === 0) {
      alert('Este profissional não possui serviços cadastrados');
      return;
    }

    for (const horario of this.horarios) {
      await this.agendaService.criarHorario({
        data: this.dataSelecionada,
        horario,
        disponivel: true,
        profissionalId: this.profissional.id,
        profissionalNome: this.profissional.nome,
        profissionalFoto: this.profissional.foto,
        servicos: this.profissional.servicos
      });
    }

    alert('Agenda criada');

    this.horarios = [];
    await this.carregarAgenda();
  }

  async carregarAgenda() {
    if (!this.dataSelecionada || !this.profissional?.id) return;

    this.agenda = await this.agendaService.buscarAgenda(
      this.profissional.id,
      this.dataSelecionada
    );
  }

  getNomeServico(id: string): string {
    const servico = this.servicosDisponiveis.find(s => s.id === id);
    return servico ? servico.descricao : '';
  }

  async removerHorarioCadastrado(h: any) {
    const confirmar = confirm('Deseja remover este horário?');
    if (!confirmar) return;

    await this.agendaService.excluirHorario(h.id);
    await this.carregarAgenda();
  }
}
