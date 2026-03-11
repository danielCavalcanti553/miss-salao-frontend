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
  },  {
    path: 'servico',
    loadComponent: () => import('./pages/servico/servico.page').then( m => m.ServicoPage)
  },
  {
    path: 'profissionais',
    loadComponent: () => import('./pages/profissionais/profissionais.page').then( m => m.ProfissionaisPage)
  },
  {
    path: 'agenda-profissional',
    loadComponent: () => import('./pages/agenda-profissional/agenda-profissional.page').then( m => m.AgendaProfissionalPage)
  }



];
