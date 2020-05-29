import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { RouterStateSnapshot } from '@angular/router';
import { Home } from 'src/app/modules/homes/model/home';
import { Deal } from '../../model/deal';
import { CanComponentDeactivate } from 'src/app/modules/shared/guards/can-deactivate.guard';
import { tap, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';
import * as dealsActions from 'src/app/store/actions/deals.action';
import { filterClients, filterHomes } from 'src/app/store/functions/filtered-functions';
import { MatDialog } from '@angular/material/dialog';
import { PopupQuestionComponent } from 'src/app/modules/shared/components/popup-question/popup-question.component';
import { PopupDeactivateComponent } from 'src/app/modules/shared/components/popup-deactivate/popup-deactivate.component';
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-deal-creator',
  templateUrl: './deal-creator.component.html',
  styleUrls: ['./deal-creator.component.css'],
   providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class DealCreatorComponent implements OnInit, CanComponentDeactivate {

  currentFrame = 'clientsSelector';

  // client's step
  clients$: Observable<Client[]>;
  selectedClient: Client;
  filteredClients$: Observable<Client[]>;
  displayedClientColumns: string[] = ['surname', 'name'];

  // home's step
  homes: Home[];
  selectedHome: Home;
  filteredHomes: Home[];
  displayedHomeColumns: string[] = ['home', 'street', 'city', 'state'];

  // for canDiactivate
  private isSubmit = false;


  constructor(
    private location: Location,
    private store: Store,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  canDeactivate(next: RouterStateSnapshot): Observable<boolean> {
    if (this.isSubmit) {
      return of(true);
    }

    const dialogRef = this.dialog.open(PopupDeactivateComponent);
    return dialogRef.afterClosed();
  }

  // popup question events
  onCancel(): void {
    if (!this.selectedClient && !this.selectedHome) {
      this.navigateBack();
      return;
    }
    this.openCancelQuestion();
  }

  filterClients(searchString: string): void {
    this.selectedClient = null;
    this.filteredClients$ = this.clients$.pipe(
      map(
        clients => filterClients(clients, searchString)
      )
    );
  }

  filterHomes(searchString: string): void {
    this.filteredHomes = filterHomes(this.homes, searchString);
  }

  getHomes(): void {
    this.homes = this.selectedClient.homes.filter(home => {
      return !home.clientOwner;
    });
    this.filterHomes('');
  }

  addDeal(): void {
    const deal = {
      ... new Deal(),
      price: this.selectedHome.price,
      homeId: this.selectedHome.id,
      clientId: this.selectedClient.id,
    };

    this.store.dispatch(dealsActions.addDeal({deal}));
    this.navigateBack();
  }


  stepChangeEvent(stepEvent: StepperSelectionEvent): void {
    if (stepEvent.selectedStep.state === 'client') {
      this.selectedHome = null;
    }
  }

  private getClients(): void {
    this.clients$ = this.store.select(clientsSelector.getClients);
    this.filterClients('');
  }

  private navigateBack(): void {
    this.isSubmit = true;
    this.location.back();
  }

  private openCancelQuestion(): void {
    const cancelDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: `Cancel deal's making`,
        content: 'All changes will be lost'
      }
    });

    cancelDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.navigateBack();
        }
      }
    );
  }
}
