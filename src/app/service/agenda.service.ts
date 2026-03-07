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
  DocumentReference
} from '@angular/fire/firestore';

import { Agenda } from '../models/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private firestore: Firestore) { }

  private agendaRef = collection(this.firestore, 'agenda');



  // LISTAR TODAS
  async listar(): Promise<Agenda[]> {

    const snapshot = await getDocs(this.agendaRef);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Agenda[];

  }



  // BUSCAR POR ID
  async buscarPorId(id: string): Promise<Agenda | null> {

    const docRef = doc(this.firestore, 'agenda', id);

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...snapshot.data()
    } as Agenda;

  }



  // BUSCAR POR DATA
  async buscarPorData(data: string): Promise<Agenda[]> {

    const q = query(
      this.agendaRef,
      where('data', '==', data)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Agenda[];

  }



  // BUSCAR POR PROFISSIONAL
  async buscarPorProfissional(profissionalRef: DocumentReference): Promise<Agenda[]> {

    const q = query(
      this.agendaRef,
      where('profissional', '==', profissionalRef)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Agenda[];

  }



  // CRIAR
  async criar(agenda: Agenda) {

    return await addDoc(this.agendaRef, agenda);

  }



  // ATUALIZAR
  async atualizar(id: string, agenda: Partial<Agenda>) {

    const docRef = doc(this.firestore, 'agenda', id);

    return await updateDoc(docRef, agenda);

  }



  // ATUALIZAR HORÁRIO ESPECÍFICO
  async atualizarHorario(id: string, hora: string, status: 'livre' | 'ocupado') {

    const docRef = doc(this.firestore, 'agenda', id);

    return await updateDoc(docRef, {
      [`horario.${hora}`]: status
    });

  }



  // EXCLUIR
  async excluir(id: string) {

    const docRef = doc(this.firestore, 'agenda', id);

    return await deleteDoc(docRef);

  }

  async buscarHorariosDisponiveis(data: string, servico: string): Promise<Agenda[]> {

    const q = query(
      this.agendaRef,
      where('data', '==', data),
      where('servico', 'array-contains', servico)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Agenda[];

  }

}
