import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private auth: Auth) { }

  async canActivate(): Promise<boolean> {
    const user = this.auth.currentUser;
    if (!user) return false;

    const token = await user.getIdTokenResult();
    return token.claims['role'] === 'admin';
  }
}
