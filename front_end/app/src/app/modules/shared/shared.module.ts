import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuicklinkModule } from 'ngx-quicklink';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HomesListSelectorComponent } from './components/homes-list-selector/homes-list-selector.component';
import { PopupQuestionComponent } from './components/popup-question/popup-question.component';
import { ClientsListSelectorComponent } from './components/clients-list-selector/clients-list-selector.component';
import { PopupDeactivateComponent } from 'src/app/modules/shared/components/popup-deactivate/popup-deactivate.component';
import { MaxDateValidatorDirective } from './directives/max-date-validator.directive';
import { ToogleValidatoreDirective } from './directives/toogle-validatore.directive';
import { MinDateValidatorDirective } from './directives/min-date-validator.directive';
import { MaterialModule } from '../material/material.module';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    HomesListSelectorComponent,
    PopupQuestionComponent,
    ClientsListSelectorComponent,
    PopupDeactivateComponent,
    MaxDateValidatorDirective,
    MinDateValidatorDirective,
    ToogleValidatoreDirective,
  ],
  imports: [
    CommonModule,
    QuicklinkModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    QuicklinkModule,
    HomesListSelectorComponent,
    ClientsListSelectorComponent,
    PopupQuestionComponent,
    PopupDeactivateComponent,
    MaxDateValidatorDirective,
    MinDateValidatorDirective,
    ToogleValidatoreDirective,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
  ]
})
export class SharedModule { }
