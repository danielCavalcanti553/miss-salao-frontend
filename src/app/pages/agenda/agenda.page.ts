import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonImg, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import {
  chevronBackCircle,
  chevronForwardCircle,
  arrowBackOutline

} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CategoriasService } from 'src/app/service/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';
import { ServicosService } from 'src/app/service/servicos.service';
import { Servico } from 'src/app/models/servico.model';
import { AgendaService } from 'src/app/service/agenda.service';
import { Agenda } from 'src/app/models/agenda.model';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Profissional } from 'src/app/models/profissional.model';
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
  imports: [IonBackButton, IonButtons, IonImg, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonList, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol]
})
export class AgendaPage implements OnInit {

  categorias: Categoria[] = [];
  servicos: Servico[] = [];
  categoriaSelecionada = '';
  servicosSelecionados: string = '';
  dias: any[] = [];
  diaSelecionado: string = '';
  agendaCompleta: any[] = [];


  constructor(private categoriasService: CategoriasService, private servicosService: ServicosService, private agendaService: AgendaService) { }

  async ngOnInit() {
    this.categorias = await this.categoriasService.listar();
    this.gerarSemana();
  }

  selecionarCategoria(categoria: string) {
    this.categoriaSelecionada = categoria;

    this.servicos = [];
    this.servicosService.buscarPorCategoria(categoria).then(resp => {
      this.servicos = resp;
    })

  }

  gerarDias() {

    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    for (let i = 0; i < 7; i++) {

      const data = new Date();
      data.setDate(data.getDate() + i);

      this.dias.push({
        semana: diasSemana[data.getDay()],
        numero: data.getDate(),
        data: data.toISOString()
      });

    }

    this.diaSelecionado = this.dias[0].data;
  }





  inicioSemana: Date = new Date();



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

    if (!this.servicosSelecionados.length) return;

    const dataFormatada = data.split("T")[0];

    const agendas: Agenda[] =
      await this.agendaService.buscarHorariosDisponiveis(
        dataFormatada,
        this.servicosSelecionados
      );

    // agrupa horários
    const mapaHorarios = new Map<string, any>();

    agendas.forEach(a => {

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

    console.log(this.horariosDisponiveis);

  }


  mesAtual: string = '';

  horarios: string[] = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30',
    '15:00', '15:30', '16:00'
  ];

  horarioSelecionado: string = '';


  selecionarHorario(horario: string) {
    this.horarioSelecionado = horario;
  }

  confirmarAgendamento() {

    const agendamento = {
      dia: this.diaSelecionado,
      horario: this.horarioSelecionado
    };

    console.log("Agendamento escolhido:", agendamento);

    alert(`Agendado para ${this.diaSelecionado} às ${this.horarioSelecionado}`);

  }


  horariosDisponiveis: any[] = [];

  profissionais: Profissional[] = [];
  agendamentos: any[] = [];
  horariosPadrao: string[] = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30',
    '15:00', '15:30', '16:00'
  ];

  async buscarHorariosDisponiveis() {

    if (!this.servicosSelecionados || this.servicosSelecionados.length === 0) {
      return;
    }


    alert(this.diaSelecionado)





  }

}
