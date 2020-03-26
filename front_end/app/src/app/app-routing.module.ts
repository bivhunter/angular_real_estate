import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientProfileComponent } from './components/clients/client-profile/client-profile.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [ AuthGuard ],
    component: DashboardComponent
  },
  {
    path: 'clients',
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'adding',
        data: {
          mode: 'Adding'
        },
        component: ClientProfileComponent
      },
      {
        path: '',
        component: ClientsComponent
      },
      {
        path: 'profile/:id',
        component: ClientProfileComponent,
        data: {
          mode: 'Editing'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
