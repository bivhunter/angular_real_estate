import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientsComponent } from './clients.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
