import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonButton,
  IonList,
  IonLabel,
  IonAvatar
} from '@ionic/angular/standalone';

import { Profissional } from '../../models/profissional.model';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { ServicosService } from 'src/app/service/servicos.service';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.page.html',
  styleUrls: ['./profissionais.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonButton,
    IonList,
    IonLabel,
    IonAvatar
  ]
})
export class ProfissionaisPage implements OnInit {

  profissionais: Profissional[] = [];

  profissional: Profissional = this.novo();

  editando = false;

  fotoSelecionada?: File;

  servicosDisponiveis: any[] = [];

  constructor(
    private service: ProfissionalService,
    private storage: Storage,
    private servicosService: ServicosService
  ) { }

  async ngOnInit() {

    this.servicosDisponiveis = await this.servicosService.listar();

    this.carregar();

  }

  novo(): Profissional {

    return {
      nome: '',
      foto: '',
      ativo: true,
      servicos: []
    }

  }

  async carregar() {

    this.profissionais = await this.service.listar();

  }

  async salvar() {

    if (!this.profissional.nome) {
      alert('Informe o nome');
      return;
    }

    if (this.fotoSelecionada) {

      const url = await this.uploadFoto();

      if (url) {
        this.profissional.foto = url;
      }

    }

    if (this.editando && this.profissional.id) {

      await this.service.atualizar(
        this.profissional.id,
        this.profissional
      );

    } else {

      await this.service.criar(this.profissional);

    }

    this.cancelar();
    this.carregar();

  }

  editar(p: Profissional) {

    this.profissional = { ...p };

    this.editando = true;

  }

  async excluir(p: Profissional) {

    const confirmar = confirm('Excluir profissional?');

    if (!confirmar) return;

    if (!p.id) return;

    await this.service.excluir(p.id);

    this.carregar();

  }

  cancelar() {

    this.profissional = this.novo();

    this.editando = false;

  }

  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    this.fotoSelecionada = file;

  }

  async uploadFoto(): Promise<string | null> {

    if (!this.fotoSelecionada) return null;

    const caminho = `profissionais/${Date.now()}_${this.fotoSelecionada.name}`;

    const referencia = ref(this.storage, caminho);

    await uploadBytes(referencia, this.fotoSelecionada);

    const url = await getDownloadURL(referencia);

    return url;

  }

  getNomeServico(id: string) {

    const serv = this.servicosDisponiveis.find(s => s.id === id);

    return serv ? serv.descricao : '';

  }

}
