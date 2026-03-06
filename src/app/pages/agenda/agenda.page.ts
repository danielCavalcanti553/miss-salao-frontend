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
  servicosSelecionados = '';
  dias: any[] = [];
  diaSelecionado: string = '';

  constructor(private categoriasService: CategoriasService, private servicosService: ServicosService) { }

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

  selecionarDia(data: string) {
    this.diaSelecionado = data;
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





}
