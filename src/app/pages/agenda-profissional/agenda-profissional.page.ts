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
  servicos = ['corte', 'escova'];
  profissional: any = {};

  constructor(
    private agendaService: AgendaService,
    private route: ActivatedRoute,
    private profissionalService: ProfissionalService
  ) { }

  async ngOnInit() {
    const id = 'YP0y5FMaL3gjKsyPC0I7'; // depois trocar pela rota

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
    this.horarios = [];
    this.agenda = [];
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

    for (const horario of this.horarios) {
      await this.agendaService.criarHorario({
        data: this.dataSelecionada,
        horario,
        disponivel: true,
        profissionalId: this.profissional.id,
        profissionalNome: this.profissional.nome,
        profissionalFoto: this.profissional.foto,
        servico: this.servicos
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

    console.log('data selecionada:', this.dataSelecionada);
    console.log('agenda carregada:', this.agenda);
  }

  async removerHorarioCadastrado(h: any) {

    const confirmar = confirm('Deseja remover este horário?');

    if (!confirmar) return;

    await this.agendaService.excluirHorario(h.id);

    this.carregarAgenda();

  }
}
