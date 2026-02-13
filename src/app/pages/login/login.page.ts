import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import {
  IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonItem, IonInput, IonButton, IonIcon, IonNote
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, logoGoogle } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    IonContent,
    RouterLink,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonItem, IonInput, IonButton, IonIcon, IonNote]
})
export class LoginPage {

  pwHidden = signal(true);



  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController,
  ) {
    addIcons({ eyeOutline, logoGoogle });
  }

  async onSubmit() {

    alert('inicio');

    if (this.loginForm.invalid) {
      alert('form inválido');
      return;
    }

    alert('form válido');

    const { email, password } = this.loginForm.getRawValue();

    try {
      const credential = await this.auth.signInEmail(email!, password!);

      alert('Consegui logar');

      // 🔥 UID direto do retorno
      alert('UID direto: ' + credential.user.uid);

      // 🔥 UID usando método do service
      const uid = await this.auth.getUid();
      alert('UID via service: ' + uid);

      // 🔥 Estado do user atual
      const currentUser = credential.user;
      alert('Current user email: ' + currentUser.email);

    } catch (err: any) {
      alert('Não Consegui logar');
      alert('erro: ' + err?.message);
    }
  }






  async onGoogle() {
    const loader = await this.loading.create({ message: 'Autenticando Google...' });
    await loader.present();
    this.auth.signInGoogle().subscribe({
      next: async () => {
        await loader.dismiss();
        this.router.navigateByUrl('/home');
      },
      error: async (err) => {
        await loader.dismiss();
        this.showError(err);
      }
    });
  }

  async onSignUp() {

    if (this.registerForm.invalid) return;
    const { email, password } = this.registerForm.getRawValue();
    const loader = await this.loading.create({ message: 'Criando conta...' });
    await loader.present();


    this.auth.signUpEmail(email!, password!).subscribe({
      next: async () => {
        await loader.dismiss();
        this.router.navigateByUrl('/home');
        this.toggleMode();

        // 🔥 TOAST DE SUCESSO
        const toast = await this.toast.create({
          message: 'Conta criada com sucesso 👑✨',
          duration: 2500,
          color: 'success',
          position: 'top'
        });

        await toast.present();

      },
      error: async (err) => {
        await loader.dismiss();
        this.showError(err);
      }
    });
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  passwordMatchValidator(form: any) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;

    if (!password || !confirm) {
      return null; // ainda não validar enquanto está digitando
    }

    if (password !== confirm) {
      return { mismatch: true };
    }

    return null;
  }


  isLogin = true; // controla qual formulário aparece

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  private async showError(err: any) {
    const msg = (err && err.message) ? err.message : 'Falha ao autenticar';
    const t = await this.toast.create({ message: msg, duration: 2500, color: 'danger' });
    await t.present();
  }
}

