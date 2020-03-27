import { NgModule } from '@angular/core';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { UserService } from './user.service';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    SharedModule
  ],
  providers: [
    UserService
  ]
})
export class AuthorizationModule { }
