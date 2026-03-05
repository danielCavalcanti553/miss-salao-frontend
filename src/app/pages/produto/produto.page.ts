import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  homeOutline,
  searchOutline,
  heartOutline,
  bagOutline,
  personOutline
} from 'ionicons/icons';
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

} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  standalone: true,
  imports: [CommonModule,
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
    IonLabel]
})
export class ProdutoPage implements OnInit {
  ngOnInit(): void {

  }

  teste() {
    console.log('ok')
  }

}
