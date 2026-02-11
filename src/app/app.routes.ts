import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { AdminGuard } from './service/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'cadastro',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/cadastro/cadastro.page').then(m => m.CadastroPage)
  },
  {
    path: 'admin-produtos',
    loadComponent: () => import('./pages/admin-produtos/admin-produtos.page').then(m => m.AdminProdutosPage),
    canActivate: [AdminGuard]
  }
];
