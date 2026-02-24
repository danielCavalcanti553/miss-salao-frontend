import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonInput,
  IonList,
  IonLabel,
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgendamentoService, Servico } from 'src/app/service/agendamento.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonButton,
    IonItem,
    IonInput,
    IonList,
    IonLabel,
    ReactiveFormsModule
  ]
})
export class ContaPage implements OnInit {
  servicos: Servico[] = [];

  servicoForm = this.fb.group({
    nome: ['', [Validators.required]],
    minutos: [40, [Validators.required]],
    preco: [0, [Validators.required]],
    profissionais: ['']
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private toast: ToastController,
    private loading: LoadingController
  ) {}

  ngOnInit(): void {
    this.carregarServicos();
  }

  carregarServicos() {
    this.agendamentoService.listarServicos().subscribe({
      next: (lista) => (this.servicos = lista),
      error: async () => {
        const t = await this.toast.create({ message: 'Não foi possível listar serviços.', duration: 2000, color: 'danger' });
        await t.present();
      }
    });
  }

  async cadastrarServico() {
    if (this.servicoForm.invalid) return;
    const loader = await this.loading.create({ message: 'Salvando serviço...' });
    await loader.present();

    const formValue = this.servicoForm.getRawValue();
    const profissionais = (formValue.profissionais || '')
      .split(',')
      .map((nome) => nome.trim())
      .filter(Boolean)
      .map((nome) => ({ nome }));

    this.agendamentoService
      .cadastrarServico({
        nome: formValue.nome || '',
        minutos: Number(formValue.minutos || 0),
        preco: Number(formValue.preco || 0),
        profissionais
      })
      .subscribe({
        next: async () => {
          await loader.dismiss();
          this.servicoForm.reset({ minutos: 40, preco: 0, profissionais: '' });
          this.carregarServicos();
          const t = await this.toast.create({ message: 'Serviço cadastrado!', duration: 2000, color: 'success' });
          await t.present();
        },
        error: async () => {
          await loader.dismiss();
          const t = await this.toast.create({ message: 'Erro ao cadastrar serviço.', duration: 2000, color: 'danger' });
          await t.present();
        }
      });
  }

  logout() {
    this.auth.signOut().subscribe(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    });
  }
}
