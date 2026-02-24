import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButton]
})
export class ContaPage {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.signOut().subscribe(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    });
  }
}
