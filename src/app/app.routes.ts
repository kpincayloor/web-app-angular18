import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', loadComponent: () => import('././components/register/register.component').then(m => m.RegisterComponent) },
  { path: '**', redirectTo: '' }
];
