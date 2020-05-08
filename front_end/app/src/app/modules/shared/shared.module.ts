import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuicklinkModule } from 'ngx-quicklink';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HomesListSelectorComponent } from './components/homes-list-selector/homes-list-selector.component';
import { PopupQuestionComponent } from './components/popup-question/popup-question.component';
import { ClientsListSelectorComponent } from './components/clients-list-selector/clients-list-selector.component';
import { PopupDeactivateComponent } from 'src/app/modules/shared/components/popup-deactivate/popup-deactivate.component';
import { MaxDateValidatorDirective } from './directives/max-date-validator.directive';
import { EffectsModule } from '@ngrx/effects';
import { DealsEffects } from 'src/app/store/effects/deals.effects';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    HomesListSelectorComponent,
    PopupQuestionComponent,
    ClientsListSelectorComponent,
    PopupDeactivateComponent,
    MaxDateValidatorDirective
  ],
  imports: [
    CommonModule,
    QuicklinkModule,
    FormsModule,
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
  ],
  providers: [
  ]
})
export class SharedModule { }
