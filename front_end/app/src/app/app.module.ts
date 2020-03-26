import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsListComponent } from './components/clients/clients-list/clients-list.component';
import { ClientCardComponent } from './components/clients/clients-list/client-card/client-card.component';
import { ClientProfileComponent } from './components/clients/client-profile/client-profile.component';
import { PhonePipe } from './pipes/phone.pipe';
import { ClientsTableComponent } from './components/clients/clients-list/clients-table/clients-table.component';
import { ClientsSortPipe } from './pipes/clients-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientCardComponent,
    ClientProfileComponent,
    PhonePipe,
    ClientsTableComponent,
    ClientsSortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
