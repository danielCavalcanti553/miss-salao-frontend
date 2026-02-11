import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonItem, IonInput, IonButton, IonIcon, IonNote, IonCheckbox, IonText
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth';
import { AuthService } from 'src/app/service/auth.service';

function matchPasswords(ctrl: AbstractControl): ValidationErrors | null {
  const pwd = ctrl.get('password')?.value;
  const rep = ctrl.get('confirmPassword')?.value;
  return pwd && rep && pwd !== rep ? { passwordsDontMatch: true } : null;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonItem, IonInput, IonButton, IonIcon, IonNote, IonCheckbox, IonText]
})
export class CadastroPage implements OnInit {

  pwHidden = signal(true);
  pw2Hidden = signal(true);


  form = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    terms: [false, [Validators.requiredTrue]]
  }, { validators: matchPasswords });

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController,
    private auth: Auth
  ) { }

  ngOnInit() {
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const { displayName, email, password } = this.form.getRawValue();


    const loader = await this.loading.create({ message: 'Criando conta...' });
    await loader.present();


    this.authSvc.signUpEmail(email!, password!).subscribe({
      next: async () => {
        try {
          if (this.auth.currentUser && displayName) {
            await updateProfile(this.auth.currentUser, { displayName });
          }
          await loader.dismiss();
          this.router.navigateByUrl('/home');
        } catch (e) {
          await loader.dismiss();
          this.showError(e);
        }
      },
      error: async (err) => {
        await loader.dismiss();
        this.showError(err);
      }
    });
  }

  private async showError(err: any) {
    const msg = (err && err.message) ? err.message : 'Falha no cadastro';
    const t = await this.toast.create({ message: msg, duration: 2500, color: 'danger' });
    await t.present();
  }

}
