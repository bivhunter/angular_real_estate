import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeFormComponent } from './components/home-form/home-form.component';
import { HomesComponent } from './components/homes/homes.component';

const routes: Routes = [
    {
        path: 'adding',
        data: {
          mode: 'Adding'
        },
        component: HomeFormComponent
      },
      {
        path: '',
        component: HomesComponent
      },
      {
        path: 'details/:id',
        component: HomeFormComponent,
        data: {
          mode: 'Editing'
        },
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomesRoutingModule { }
