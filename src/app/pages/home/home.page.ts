import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/service/auth.service';
import { Router, RouterModule } from '@angular/router';

import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

import {
  sparklesOutline,
  brushOutline,
  eyeOutline,
  leafOutline,
  calendarOutline,
  star
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

addIcons({
  'sparkles-outline': sparklesOutline,
  'brush-outline': brushOutline,
  'eye-outline': eyeOutline,
  'leaf-outline': leafOutline,
  'calendar-outline': calendarOutline,
  'star': star
});

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonThumbnail,
  IonSpinner,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRouterOutlet,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonCol,
  IonGrid,
  IonRow,
  IonImg,
  IonAvatar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonTabs,
    IonTitle,
    IonTabBar,
    IonToolbar,
    IonTabButton,
    IonContent,
    IonSpinner,
    IonThumbnail,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonItem,
    IonIcon,
    IonHeader,
    IonLabel,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonCol,
    IonGrid,
    IonRow,
    IonImg,
    IonAvatar
  ]
})
export class HomePage implements OnInit {

  fotoUsuario = '';
  nomeUsuario = '';

  constructor(
    public auth: AuthService,
    private router: Router,
    private firebaseAuth: Auth,
    private firestore: Firestore
  ) { }

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

  }

  teste() {
    alert('ok');
  }

}
