import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonInput,
  IonSelect,

  IonToggle, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCard, IonCardContent, IonItem, IonSelectOption, IonButton, IonList, IonLabel
} from '@ionic/angular/standalone';
import { Servico } from 'src/app/models/servico.model';
import { ServicosService } from 'src/app/service/servicos.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.page.html',
  styleUrls: ['./servico.page.scss'],
  standalone: true,
  imports: [IonInput,
    IonSelect,
    IonToggle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonCard, IonCardContent, IonItem, IonSelectOption, IonButton, IonList, IonLabel]
})
export class ServicoPage implements OnInit {

  servicos: Servico[] = [];

  servico: Servico = this.novoServico();

  editando = false;

  constructor(private servicosService: ServicosService) { }

  ngOnInit() {
    this.carregarServicos();
  }

  novoServico(): Servico {
    return {
      descricao: '',
      detalhe: '',
      categoria: '',
      preco: 0,
      duracaoMin: 30,
      ativo: true,
      ordem: 0,
      comissaoPercentual: 50
    };
  }

  async carregarServicos() {
    this.servicos = await this.servicosService.listar();
  }

  async salvar() {

    console.log(this.servico)

    if (!this.servico.descricao) {
      alert('Informe a descrição do serviço');
      return;
    }

    if (!this.servico.categoria) {
      alert('Selecione a categoria');
      return;
    }

    if (!this.servico.preco || this.servico.preco <= 0) {
      alert('Informe o preço');
      return;
    }

    if (this.editando && this.servico.id) {

      await this.servicosService.atualizar(
        this.servico.id,
        this.servico
      );

    } else {

      await this.servicosService.criar(this.servico);

    }

    this.cancelar();
    this.carregarServicos();
  }

  editar(servico: Servico) {

    this.servico = { ...servico };

    this.editando = true;

  }

  async excluir(servico: Servico) {

    if (!servico.id) return;

    await this.servicosService.excluir(servico.id);

    this.carregarServicos();

  }

  cancelar() {

    this.servico = this.novoServico();

    this.editando = false;

  }

}
