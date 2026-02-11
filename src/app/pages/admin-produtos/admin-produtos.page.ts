import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
  IonLabel, IonButton, IonSpinner
} from '@ionic/angular/standalone';
import { AdminProdutosService } from 'src/app/service/admin-produto.service';

@Component({
  selector: 'app-admin-produtos',
  templateUrl: './admin-produtos.page.html',
  styleUrls: ['./admin-produtos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonSpinner,
    CommonModule,
    FormsModule
  ]
})
export class AdminProdutosPage implements OnInit {


  constructor(private service: AdminProdutosService) { }

  ngOnInit() {

  }

}
