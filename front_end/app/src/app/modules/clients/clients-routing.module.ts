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
          mode: 'Adding',
          animation: 'Slide'
        },
        component: ClientProfileComponent,
      },
      {
        path: '',
        component: ClientsComponent,
        resolve: {
          clients: ClientsResolverService
        },
        data: {
          animation: 'Clients'
        }
      },
      {
        path: 'profile/:id',
        canDeactivate: [ CanDeactivateGuard ],
        component: ClientProfileComponent,
        data: {
          mode: 'Editing',
          animation: 'Slide'
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
