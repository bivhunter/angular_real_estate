import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeFormComponent } from './components/home-form/home-form.component';
import { HomesComponent } from './components/homes/homes.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
import { HomesResolverService } from './services/homes-resolver.service';
import { HomeDetailsResolverService } from './services/home-details-resolver.service';

const routes: Routes = [
    {
        path: 'adding',
        canDeactivate: [ CanDeactivateGuard ],
        data: {
          mode: 'Adding'
        },
        component: HomeFormComponent
      },
      {
        path: '',
        component: HomesComponent,
        resolve: {
          homes: HomesResolverService
        }
      },
      {
        path: 'details/:id',
        canDeactivate: [ CanDeactivateGuard ],
        component: HomeFormComponent,
        data: {
          mode: 'Editing'
        },
        resolve: {
          home: HomeDetailsResolverService
        }
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomesRoutingModule { }
