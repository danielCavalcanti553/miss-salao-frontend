import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { AuthGuard } from './service/admin.guard';


export const routes: Routes = [

  // 🔐 Login fora das tabs
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },

  // Área protegida com tabs
  {
    path: 'tabs',
    component: TabsPage,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/produto/produto.page').then(m => m.ProdutoPage)
      },
      {
        path: 'buscar',
        loadComponent: () =>
          import('./pages/buscar/buscar.page').then(m => m.BuscarPage)
      },
      {
        path: 'conta',
        loadComponent: () =>
          import('./pages/conta/conta.page').then(m => m.ContaPage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];
