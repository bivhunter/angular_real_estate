import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomesComponent } from './components/homes/homes.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { HomeFormComponent } from './components/home-form/home-form.component';
import { HomesListComponent } from './components/homes-list/homes-list.component';
import { HomesTableComponent } from './components/homes-table/homes-table.component';
import { HomesControlPanelComponent } from './components/homes-control-panel/homes-control-panel.component';
import { HomesRoutingModule } from './homes-routing.module';

@NgModule({
  declarations: [
    HomesComponent,
    HomeCardComponent,
    HomeFormComponent,
    HomesListComponent,
    HomesTableComponent,
    HomesControlPanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomesRoutingModule,
  ],
  providers: [
  ],

  exports: [
  ]
})
export class HomesModule { }
