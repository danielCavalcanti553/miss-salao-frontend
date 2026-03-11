import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonBackButton,
  IonButtons,
  IonImg,
  IonButton,
  IonIcon,
  IonContent,
  IonHeader,
  IonToolbar,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

import {
  chevronBackCircle,
  chevronForwardCircle,
  arrowBackOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { CategoriasService } from 'src/app/service/categoria.service';
import { ServicosService } from 'src/app/service/servicos.service';
import { AgendaService } from 'src/app/service/agenda.service';

import { Categoria } from 'src/app/models/categoria.model';
import { Servico } from 'src/app/models/servico.model';
import { Agenda } from 'src/app/models/agenda.model';

addIcons({
  'chevron-back-circle': chevronBackCircle,
  'chevron-forward-circle': chevronForwardCircle,
  'arrow-back-outline': arrowBackOutline
});

type HorarioDisponivel = {
  horario: string;
  profissionais: {
    agendaId: string;
    id: string;
    nome: string;
    foto?: string;
  }[];
};

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonImg,
    IonButton,
    IonIcon,
    IonContent,
    IonHeader,
    IonToolbar,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    FormsModule
  ]
})
export class AgendaPage implements OnInit {
  categorias: Categoria[] = [];
  servicos: Servico[] = [];

  agendasDoDia: Agenda[] = [];
  horariosDisponiveis: HorarioDisponivel[] = [];

  dias: any[] = [];
  inicioSemana: Date = new Date();
  mesAtual = '';

  diaSelecionado = '';
  categoriaSelecionada = '';
  servicosSelecionados: string[] = [];
  horarioSelecionado = '';
  agendaSelecionadaId = '';

  constructor(
    private categoriasService: CategoriasService,
    private servicosService: ServicosService,
    private agendaService: AgendaService
  ) { }

  async ngOnInit() {
    this.categorias = await this.categoriasService.listar();
    this.gerarSemana();
  }

  gerarSemana() {
    this.dias = [];

    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const dataReferencia = new Date(this.inicioSemana);
    this.mesAtual = meses[dataReferencia.getMonth()];

    for (let i = 0; i < 7; i++) {
      const data = new Date(this.inicioSemana);
      data.setDate(this.inicioSemana.getDate() + i);

      this.dias.push({
        semana: diasSemana[data.getDay()],
        numero: data.getDate(),
        data: data.toISOString()
      });
    }
  }

  proximaSemana() {
    this.inicioSemana.setDate(this.inicioSemana.getDate() + 7);
    this.gerarSemana();
  }

  semanaAnterior() {
    this.inicioSemana.setDate(this.inicioSemana.getDate() - 7);
    this.gerarSemana();
  }

  async selecionarDia(data: string) {
    this.diaSelecionado = data;

    // limpa etapas seguintes
    this.categoriaSelecionada = '';

    this.horarioSelecionado = '';
    this.servicos = [];
    this.horariosDisponiveis = [];

    const dataFormatada = data.split('T')[0];
    this.agendasDoDia = await this.agendaService.buscarHorariosDisponiveis(dataFormatada);
  }

  async selecionarCategoria(categoriaId: string) {

    this.categoriaSelecionada = categoriaId;

    // limpar seleções anteriores
    this.servicosSelecionados = [];
    this.horarioSelecionado = '';
    this.agendaSelecionadaId = '';
    this.horariosDisponiveis = [];

    const lista = await this.servicosService.buscarPorCategoria(categoriaId);

    this.servicos = lista.sort((a, b) =>
      (a.descricao || '').localeCompare(b.descricao || '')
    );

  }

  selecionarServico() {

    this.horariosDisponiveis = [];
    this.horarioSelecionado = '';

    if (!this.servicosSelecionados.length || !this.agendasDoDia.length) return;

    const mapaHorarios = new Map<string, any>();

    this.agendasDoDia.forEach(a => {

      const servicosAgenda = a.servicos || [];

      const possuiServico = servicosAgenda.some((s: string) =>
        this.servicosSelecionados.includes(s)
      );

      if (!possuiServico) return;

      if (!mapaHorarios.has(a.horario)) {

        mapaHorarios.set(a.horario, {
          horario: a.horario,
          profissionais: []
        });

      }

      mapaHorarios.get(a.horario).profissionais.push({
        agendaId: a.id,
        id: a.profissionalId,
        nome: a.profissionalNome,
        foto: a.profissionalFoto
      });

    });

    this.horariosDisponiveis = Array.from(mapaHorarios.values());

  }

  selecionarHorario(horario: string, agendaId: string) {

    this.horarioSelecionado = horario;
    this.agendaSelecionadaId = agendaId;

  }

  async confirmarAgendamento() {

    if (!this.agendaSelecionadaId) return;

    await this.agendaService.bloquearHorario(this.agendaSelecionadaId);

    const agendamento = {
      dia: this.diaSelecionado,
      categoria: this.categoriaSelecionada,
      servicos: this.servicosSelecionados,
      horario: this.horarioSelecionado
    };

    console.log("Agendamento:", agendamento);

    alert("Agendamento realizado com sucesso!");

  }
}
