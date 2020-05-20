import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './components/test/test.component';

import { SharedModule } from '../shared/shared.module';
import { MaterialRoutingModule } from './material-routing.module';




@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialRoutingModule,
  ]
})
export class MaterialModule { }
