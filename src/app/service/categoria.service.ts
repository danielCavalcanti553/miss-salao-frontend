import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, orderBy, where } from '@angular/fire/firestore';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private firestore: Firestore) { }

  private categoriasRef = collection(this.firestore, 'categorias');

  // LISTAR TODAS
  async listar(): Promise<Categoria[]> {

    const q = query(this.categoriasRef, where('ativo', '==', true), orderBy('nome'));

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Categoria[];

  }

  // BUSCAR POR ID
  async buscarPorId(id: string): Promise<Categoria | null> {

    const docRef = doc(this.firestore, 'categorias', id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...snapshot.data()
    } as Categoria;

  }

  // CRIAR
  async criar(categoria: Categoria) {

    return await addDoc(this.categoriasRef, categoria);

  }

  // ATUALIZAR
  async atualizar(id: string, categoria: Partial<Categoria>) {

    const docRef = doc(this.firestore, 'categorias', id);

    return await updateDoc(docRef, categoria);

  }

  // EXCLUIR
  async excluir(id: string) {

    const docRef = doc(this.firestore, 'categorias', id);

    return await deleteDoc(docRef);

  }

}
