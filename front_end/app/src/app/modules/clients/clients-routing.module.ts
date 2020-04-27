import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
import { ClientsResolverService } from './services/clients-resolver.service';
import { ClientProfileResolverService } from './services/client-profile-resolver.service';

const routes: Routes = [
    {
        path: 'adding',
        canDeactivate: [ CanDeactivateGuard ],
        data: {
          mode: 'Adding'
        },
        component: ClientProfileComponent
      },
      {
        path: '',
        component: ClientsComponent,
        resolve: {
          clients: ClientsResolverService
        }
      },
      {
        path: 'profile/:id',
        canDeactivate: [ CanDeactivateGuard ],
        component: ClientProfileComponent,
        data: {
          mode: 'Editing'
        },
        resolve: {
          client: ClientProfileResolverService
        }
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
