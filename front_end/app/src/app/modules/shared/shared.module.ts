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

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToogleValidatoreDirective } from './directives/toogle-validatore.directive';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

registerLocaleData(localeFr);
const materialModules = [
  MatSliderModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  ReactiveFormsModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatGridListModule,
  MatDividerModule,
  MatListModule,
  MatSidenavModule,
  MatMenuModule,
  MatRadioModule,
  MatTableModule,
  MatSortModule
];


@NgModule({
  declarations: [
    HomesListSelectorComponent,
    PopupQuestionComponent,
    ClientsListSelectorComponent,
    PopupDeactivateComponent,
    MaxDateValidatorDirective,
    ToogleValidatoreDirective,
  ],
  imports: [
    CommonModule,
    QuicklinkModule,
    FormsModule,
    materialModules
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
    ToogleValidatoreDirective,
    materialModules
  ],
  providers: [
  ]
})
export class SharedModule { }
