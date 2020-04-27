import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
import { UserProfileComponent } from './user-profile.component';
import { UserResolverService } from './services/user-resolver.service';


const routes: Routes = [
  {
    path: '',
    canDeactivate: [CanDeactivateGuard],
    component: UserProfileComponent,
    resolve: {
      user: UserResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
