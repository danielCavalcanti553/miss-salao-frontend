import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
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
  IonImg
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
    IonImg
  ]
})
export class HomePage {

  constructor(public auth: AuthService,
    private router: Router) { }
  teste() {
    alert('ok')
  }




}
