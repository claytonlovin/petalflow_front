import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) 
  },
{
  path: 'register',
  loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
},
  {
    path: '',
    loadComponent: () => import('./layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'cases/:id_product',
        loadComponent: () => import('./pages/cases/cases.component').then(m => m.CasesComponent)
      },
      {
        path: 'products/edit/:id_product',
        loadComponent: () => import('./pages/products/edit-product/edit-product.component').then(m => m.EditProductComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
      }
      
    ]
  },
  { path: '**', redirectTo: '/login' }
];
