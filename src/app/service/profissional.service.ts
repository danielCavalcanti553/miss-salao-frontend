
import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc
} from '@angular/fire/firestore';
import { Profissional } from '../models/profissional.model';


@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  constructor(private firestore: Firestore) { }

  private profissionaisRef = collection(this.firestore, 'profissionais');

  async buscarFotoProfissional(nomeArquivo: string): Promise<string> {

    const storage = getStorage();

    const caminho = ref(storage, `profile/profissionais/${nomeArquivo}`);

    const url = await getDownloadURL(caminho);

    return url;

  }

  async listar(): Promise<Profissional[]> {

    const snapshot = await getDocs(this.profissionaisRef);

    return snapshot.docs.map(d => ({
      id: d.id,
      ...(d.data() as Profissional)
    }));

  }


  async criar(prof: Profissional) {

    const ref = await addDoc(this.profissionaisRef, prof);

    return ref.id;

  }


  async atualizar(id: string, prof: Partial<Profissional>) {

    const docRef = doc(this.firestore, 'profissionais', id);

    return updateDoc(docRef, prof);

  }


  async excluir(id: string) {

    const docRef = doc(this.firestore, 'profissionais', id);

    return deleteDoc(docRef);

  }

  async buscarPorId(id: string) {

    const docRef = doc(this.firestore, 'profissionais', id);

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...snapshot.data()
    };

  }
}
