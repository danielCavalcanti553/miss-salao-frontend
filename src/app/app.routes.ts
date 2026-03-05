import { Routes } from '@angular/router';

import { AuthGuard } from './service/admin.guard';


export const routes: Routes = [

  // 🔐 Login fora das tabs
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage)
  },



  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'agenda',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/agenda/agenda.page').then(m => m.AgendaPage)
  }


];
