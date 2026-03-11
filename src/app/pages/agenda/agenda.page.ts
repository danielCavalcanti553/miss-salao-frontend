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

  categoriaSelecionada = '';

  servicosSelecionados: string[] = [];

  dias: any[] = [];

  diaSelecionado = '';

  inicioSemana: Date = new Date();

  mesAtual = '';

  horariosDisponiveis: any[] = [];

  horarioSelecionado = '';

  constructor(
    private categoriasService: CategoriasService,
    private servicosService: ServicosService,
    private agendaService: AgendaService
  ) { }

  async ngOnInit() {

    this.categorias = await this.categoriasService.listar();

    this.gerarSemana();

  }

  selecionarCategoria(categoria: string) {

    this.categoriaSelecionada = categoria;

    this.servicosService.buscarPorCategoria(categoria)
      .then(resp => {

        this.servicos = resp.sort((a, b) =>
          a.descricao.localeCompare(b.descricao)
        );

      });

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

    await this.buscarHorariosDisponiveis();

  }

  async buscarHorariosDisponiveis() {

    if (!this.servicosSelecionados.length || !this.diaSelecionado) return;

    const dataFormatada = this.diaSelecionado.split("T")[0];

    const agendas: Agenda[] =
      await this.agendaService.buscarHorariosDisponiveis(dataFormatada);

    const mapaHorarios = new Map<string, any>();

    agendas.forEach(a => {

      const servicos = a.servicos || [];

      const possuiServico = servicos.some((s: string) =>
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
        id: a.profissionalId,
        nome: a.profissionalNome,
        foto: a.profissionalFoto
      });

    });

    this.horariosDisponiveis = Array.from(mapaHorarios.values());

  }

  selecionarHorario(horario: string) {

    this.horarioSelecionado = horario;

  }

  confirmarAgendamento() {

    const agendamento = {
      dia: this.diaSelecionado,
      horario: this.horarioSelecionado,
      servicos: this.servicosSelecionados
    };

    console.log("Agendamento:", agendamento);

    alert(`Agendado para ${this.diaSelecionado} às ${this.horarioSelecionado}`);

  }

}
