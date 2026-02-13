import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { from, map, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {

  user$ = authState(this.auth); // emits Firebase User | null

  constructor(private auth: Auth) { }


  async signInEmail(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }


  async signUpEmail(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }


  signInGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }


  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }


  isAuthenticated$(): Observable<boolean> {
    return this.user$.pipe(map(u => !!u));
  }



  /*
    async getIdToken(): Promise<string> {
      const user = this.auth.currentUser;

      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      return await user.getIdToken();
    }*/

  async getUid(): Promise<string> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    return user.uid;
  }

  async getClaims() {
    const user = this.auth.currentUser;

    if (user !== null) {
      console.log((await user.getIdTokenResult(true)).claims);
      console.log((await user.getIdTokenResult(true)).token);

    } else {
      console.log(null)
    }

  }


}
