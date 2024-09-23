import { Routes } from '@angular/router';
import { LoginPageComponent } from './modules/login/pages/login-page/login-page.component';
import { TodoDisplayPageComponent } from './modules/todo/pages/todo-display-page/todo-display-page.component';
import { AuthGaurdService } from './modules/login/services/auth-gaurd.service';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'todos',
    component: TodoDisplayPageComponent,
    canActivate: [AuthGaurdService],
  },
  { path: '**', redirectTo: '' },
];
