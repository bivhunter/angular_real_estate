import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './modules/shared/services/auth.guard';
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink';
import { PopupQuestionComponent } from './modules/shared/components/popup-question/popup-question.component';
import { PopupDeactivateComponent } from './modules/shared/components/popup-deactivate/popup-deactivate.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'authorization',
    loadChildren: () => import('./modules/authorization/authorization.module')
      .then(module => module.AuthorizationModule, (error) => console.log(error))
  },
  {
    path: 'dashboard',
    canActivate: [ AuthGuard ],
    component: DashboardComponent
  },
  {
    path: 'clients',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/clients/clients.module')
    .then(module => module.ClientsModule, (error) => console.log(error))
  },
  {
    path: 'homes',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/homes/homes.module')
    .then(module => module.HomesModule, (error) => console.log(error))
  },
  {
    path: 'popup',
    outlet: 'popup',
    component: PopupDeactivateComponent
  },
  {
    path: 'deals',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/deal/deal.module')
    .then(module => module.DealModule, (error) => console.log(error))
  },
 
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
