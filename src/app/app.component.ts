import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonImg,
  IonFooter
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import {
  mailOutline,
  mailSharp,
  homeOutline,
  calendarOutline,
  personOutline,
  logOutOutline
} from 'ionicons/icons';
import { AuthService } from './service/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Auth, signOut } from '@angular/fire/auth';

addIcons({
  'home-outline': homeOutline,
  'calendar-outline': calendarOutline,
  'person-outline': personOutline,
  'log-out-outline': logOutOutline
});

@Component({
  selector: 'app-root',
  standalone: true, // 🔥 ISSO FALTAVA
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonImg,
    IonFooter
  ],
})
export class AppComponent implements OnInit {

  fotoUsuario = '';
  nomeUsuario = '';

  constructor(public auth: AuthService, private a: Auth, private firebaseAuth: Auth,
    private firestore: Firestore, private router: Router) {
    addIcons({ mailOutline, mailSharp });
  }

  async ngOnInit() {

    const user = this.firebaseAuth.currentUser;

    if (!user) return;

    const refDoc = doc(this.firestore, 'usuarios', user.uid);

    const snap = await getDoc(refDoc);

    if (snap.exists()) {

      const dados: any = snap.data();

      this.fotoUsuario = dados.foto || '';
      this.nomeUsuario = dados.nome || '';

    }

    console.log(this.fotoUsuario)

    console.log(this.nomeUsuario)

  }

  user = toSignal(this.auth.user$, { initialValue: null });
  isLoggedIn$ = this.auth.user$.pipe(map(u => !!u));


  async logoff() {
    try {
      await signOut(this.a);

      // opcional: limpar storage/local data
      localStorage.clear();

      // redireciona para login
      this.router.navigate(['/login']);

    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  }
}
