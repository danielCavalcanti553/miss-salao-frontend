import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonButton,
  IonAvatar
} from '@ionic/angular/standalone';

import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL
} from '@angular/fire/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonButton,
    IonAvatar,
    CommonModule,
    FormsModule
  ]
})
export class PerfilPage implements OnInit {

  nome = '';
  telefone = '';
  email = '';
  foto = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) { }

  async ngOnInit() {

    const user = this.auth.currentUser;

    if (!user) return;

    this.email = user.email || '';

    const refDoc = doc(this.firestore, 'usuarios', user.uid);

    const snap = await getDoc(refDoc);

    console.log(snap)

    if (snap.exists()) {

      const dados: any = snap.data();

      this.nome = dados.nome || '';
      this.telefone = dados.telefone || '';
      this.foto = dados.foto || '';
      console.log('ok')
    } else {
      console.log('no')
    }

  }

  async selecionarFoto(event: any) {

    const file = event.target.files[0];
    if (!file) return;

    const user = this.auth.currentUser;
    if (!user) return;

    const caminho = `usuarios/${user.uid}.jpg`;

    const storageRef = ref(this.storage, caminho);

    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);

    this.foto = url;

  }

  async salvar() {

    const user = this.auth.currentUser;
    if (!user) return;

    const refDoc = doc(this.firestore, 'usuarios', user.uid);

    await setDoc(refDoc, {
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      foto: this.foto
    }, { merge: true });

    alert("Perfil atualizado");

  }

}
