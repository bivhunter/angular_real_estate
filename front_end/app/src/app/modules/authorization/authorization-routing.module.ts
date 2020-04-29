import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
      path: 'registration',
      component: RegistrationComponent,
      data: {
        animation: 'Registration'
      }
    },
    {
      path: 'login',
      component: LoginComponent,
      data: {
        animation: 'Login'
      }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
