import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonDatetime,
  IonNote,
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';
import { AgendamentoService } from 'src/app/service/agendamento.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonDatetime,
    IonNote
  ]
})
export class BuscarPage {
  form = this.fb.group({
    clienteNome: ['', [Validators.required, Validators.minLength(3)]],
    clienteTelefone: ['', [Validators.required, Validators.minLength(8)]],
    servico: ['', [Validators.required]],
    profissional: [''],
    dataHora: ['', [Validators.required]],
    observacoes: ['']
  });

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private toast: ToastController,
    private loading: LoadingController
  ) {}

  async salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loader = await this.loading.create({ message: 'Salvando agendamento...' });
    await loader.present();

    this.agendamentoService.criarAgendamento(this.form.getRawValue() as any).subscribe({
      next: async () => {
        await loader.dismiss();
        this.form.reset();
        const t = await this.toast.create({
          message: 'Agendamento criado com sucesso!',
          duration: 2500,
          color: 'success'
        });
        await t.present();
      },
      error: async () => {
        await loader.dismiss();
        const t = await this.toast.create({
          message: 'Erro ao criar agendamento.',
          duration: 2500,
          color: 'danger'
        });
        await t.present();
      }
    });
  }
}
