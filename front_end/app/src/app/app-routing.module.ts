import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/shared/guards/auth.guard';
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink';
import { PopupDeactivateComponent } from './modules/shared/components/popup-deactivate/popup-deactivate.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ComponentTestComponent } from './component-test/component-test.component';


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
  // {
  //   path: 'material',
  //   loadChildren: () => import('./modules/material/material.module')
  //     .then(module => module.MaterialModule, (error) => console.log(error))
  // },
  {
    path: 'test',
    component: ComponentTestComponent
  },
  {
    path: 'dashboard',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/dashboard/dashboard.module')
    .then(module => module.DashboardModule, (error) => console.log(error)),
    data: {
      animation: 'Opacity'
    }
  },
  {
    path: 'clients',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/clients/clients.module')
    .then(module => module.ClientsModule, (error) => console.log(error)),
    data: {
      animation: 'Clients'
    }
  },
  {
    path: 'user',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/user/user.module')
    .then(module => module.UserModule, (error) => console.log(error)),
    data: {
      animation: 'Slide'
    }
  },
  {
    path: 'homes',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/homes/homes.module')
    .then(module => module.HomesModule, (error) => console.log(error)),
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
    .then(module => module.DealModule, (error) => console.log(error)),
  },
  {
    path: '**',
    component: NotFoundComponent
  }
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
