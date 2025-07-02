import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MeuperfilComponent } from './pages/meu-perfil/meu-perfil.component';
import { ContaComponent } from './pages/conta/conta.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path:'meuperfil',
    component: MeuperfilComponent
  },
  {
    path: 'conta',
    component: ContaComponent
  },
  {
    path: '**',
    redirectTo: 'login'  // Qualquer rota inválida -> home
  }
];
