import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from '@angular/fire/auth';
import { from, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$ = authState(this.auth);

  constructor(private auth: Auth) { }

  // ✅ LOGIN
  signInEmail(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // ✅ CADASTRO
  signUpEmail(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // ✅ GOOGLE
  signInGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // ✅ LOGOUT
  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  isAuthenticated$(): Observable<boolean> {
    return this.user$.pipe(map(u => !!u));
  }

  async getUid(): Promise<string> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');
    return user.uid;
  }
}
