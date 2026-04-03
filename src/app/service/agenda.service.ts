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
  DocumentReference,
  orderBy,
  limit,
  startAfter
} from '@angular/fire/firestore';

import { Agenda } from '../models/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  agendamentosRef = collection(this.firestore, 'agendamentos');

  constructor(private firestore: Firestore) { }

  private agendaRef = collection(this.firestore, 'agenda');

  async listar(): Promise<Agenda[]> {

    const snapshot = await getDocs(this.agendaRef);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Agenda[];

  }

  async buscarPorId(id: string): Promise<Agenda | null> {

    const docRef = doc(this.firestore, 'agenda', id);

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...snapshot.data()
    } as Agenda;

  }

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

  async criar(agenda: Agenda) {

    return await addDoc(this.agendaRef, agenda);

  }

  async atualizar(id: string, agenda: Partial<Agenda>) {

    const docRef = doc(this.firestore, 'agenda', id);

    return await updateDoc(docRef, agenda);

  }

  async atualizarHorario(id: string, hora: string, status: 'livre' | 'ocupado') {

    const docRef = doc(this.firestore, 'agenda', id);

    return await updateDoc(docRef, {
      [`horario.${hora}`]: status
    });

  }

  async excluir(id: string) {

    const docRef = doc(this.firestore, 'agenda', id);

    return await deleteDoc(docRef);

  }

  async buscarHorariosDisponiveis(data: string): Promise<Agenda[]> {

    const q = query(
      this.agendaRef,
      where('data', '==', data),
      where('disponivel', '==', true)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Agenda[];

  }

  async buscarHorarios(data: string, servicos: string[]) {

    const q = query(
      collection(this.firestore, "agendas"),
      where("data", "==", data),
      where("disponivel", "==", true),
      where("servicos", "array-contains-any", servicos)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
  }

  async criarHorario(agenda: any) {
    return addDoc(this.agendaRef, agenda);
  }

  async buscarAgenda(profissionalId: string, data: string) {

    const q = query(
      this.agendaRef,
      where('profissionalId', '==', profissionalId),
      where('data', '==', data),
      orderBy('horario')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  }

  async excluirHorario(id: string) {

    const docRef = doc(this.firestore, 'agenda', id);

    await deleteDoc(docRef);

  }

  async bloquearHorario(agendaId: string) {

    const agendaDoc = doc(this.firestore, `agenda/${agendaId}`);

    await updateDoc(agendaDoc, {
      disponivel: false
    });

  }

  async registrarAgendamento(agendamento: any) {

    const agendamentosRef = collection(this.firestore, 'agendamentos');

    const docRef = await addDoc(agendamentosRef, {
      ...agendamento,
      status: "AGENDADO",
      dataCriacao: new Date()
    });

    return docRef.id;

  }



  // BUSCAR AGENDAMENTOS DO CLIENTE
  async buscarMeusAgendamentos(usuarioId: string) {

    const q = query(
      this.agendamentosRef,
      where('usuarioId', '==', usuarioId),
      orderBy('data', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  }

  async buscaMeusAgendamentosInicial(usuarioId: string) {

    const q = query(
      this.agendamentosRef,
      where('usuarioId', '==', usuarioId),
      orderBy('data', 'desc'),
      limit(3)
    );

    const snapshot = await getDocs(q);

    return snapshot;


  }

  async buscaMeusAgendamentosMais(usuarioId: string, lastDoc: any) {

    const q = query(
      this.agendamentosRef,
      where('usuarioId', '==', usuarioId),
      orderBy('data', 'desc'),
      startAfter(lastDoc),
      limit(3)
    );

    return await getDocs(q);


  }

  async buscarPaginado(uid: string, limitNumber: number, lastDoc: any) {

    let q;

    if (lastDoc) {
      q = query(
        collection(this.firestore, 'agendamentos'),
        where('userId', '==', uid),
        orderBy('data', 'desc'),
        startAfter(lastDoc),
        limit(limitNumber)
      );
    } else {
      q = query(
        collection(this.firestore, 'agendamentos'),
        where('userId', '==', uid),
        orderBy('data', 'desc'),
        limit(limitNumber)
      );
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      __doc: doc // 👈 ESSENCIAL para paginação
    }));
  }

  async cancelarAgendamento(agendamentoId: string) {

    console.log(agendamentoId + '  IDDDD')

    const agendamentoDoc = doc(this.firestore, 'agendamentos', agendamentoId);

    await updateDoc(agendamentoDoc, {
      status: "CANCELADO"
    });

  }

  async liberarHorario(agendaId: string) {

    const agendaDoc = doc(this.firestore, 'agenda', agendaId);

    await updateDoc(agendaDoc, {
      disponivel: true
    });

  }

}
