import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton
  ]
})
export class LoginPage {
  pwHidden = signal(true);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController
  ) {}

  async onSubmit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    const loader = await this.loading.create({ message: 'Entrando...' });
    await loader.present();

    this.auth.signInEmail(email!, password!).subscribe({
      next: async () => {
        await loader.dismiss();
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
      },
      error: async (err) => {
        await loader.dismiss();
        this.showError(err);
      }
    });
  }

  async onGoogle() {
    const loader = await this.loading.create({ message: 'Autenticando Google...' });
    await loader.present();
    this.auth.signInGoogle().subscribe({
      next: async () => {
        await loader.dismiss();
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
      },
      error: async (err) => {
        await loader.dismiss();
        this.showError(err);
      }
    });
  }

  async onSignUp() {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    const loader = await this.loading.create({ message: 'Criando conta...' });
    await loader.present();

    this.auth.signUpEmail(email!, password!).subscribe({
      next: async () => {
        await loader.dismiss();
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
      },
      error: async (err) => {
        await loader.dismiss();
        this.showError(err);
      }
    });
  }

  private async showError(err: any) {
    const msg = err?.message || 'Falha ao autenticar';
    const t = await this.toast.create({ message: msg, duration: 2500, color: 'danger' });
    await t.present();
  }
}
