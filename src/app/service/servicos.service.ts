import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from '@angular/fire/firestore';

import { Servico } from '../models/servico.model';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  constructor(private firestore: Firestore) { }

  private servicosRef = collection(this.firestore, 'servicos');
  private profissionaisRef = collection(this.firestore, 'profissionais');
  private agendamentosRef = collection(this.firestore, 'agendamentos');


  // LISTAR TODOS
  async listar(): Promise<Servico[]> {

    const q = query(
      this.servicosRef,
      where('ativo', '==', true),
      orderBy('ordem')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Servico[];
  }

  // BUSCAR POR ID
  async buscarPorId(id: string): Promise<Servico | null> {

    const docRef = doc(this.firestore, 'servicos', id);

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...snapshot.data()
    } as Servico;
  }

  // BUSCAR POR CATEGORIA
  async buscarPorCategoria(categoria: string): Promise<Servico[]> {

    const q = query(
      this.servicosRef,
      where('categoria', '==', categoria),
      where('ativo', '==', true),
      orderBy('descricao')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Servico[];
  }

  // CRIAR
  async criar(servico: Servico) {

    return await addDoc(this.servicosRef, servico);

  }

  // ATUALIZAR
  async atualizar(id: string, servico: Partial<Servico>) {

    const docRef = doc(this.firestore, 'servicos', id);

    return await updateDoc(docRef, servico);

  }

  // EXCLUIR
  async excluir(id: string) {

    const docRef = doc(this.firestore, 'servicos', id);

    return await deleteDoc(docRef);

  }

  async buscarAgendaProfissional(profissionalId: string, data: string) {

    const docRef = doc(
      this.firestore,
      `profissionais/${profissionalId}/agenda/${data}`
    );

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data();

  }
}
