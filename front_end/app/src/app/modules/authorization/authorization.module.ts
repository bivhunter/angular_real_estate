import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';



@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService
  ]
})
export class AuthorizationModule { }
