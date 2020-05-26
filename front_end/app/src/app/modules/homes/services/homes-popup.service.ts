import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as homesActions from 'src/app/store/actions/homes.action';
import { ClientsListSelectorComponent } from '../../shared/components/clients-list-selector/clients-list-selector.component';
import { Home } from '../model/home';
import { PopupQuestionComponent } from '../../shared/components/popup-question/popup-question.component';

@Injectable({
  providedIn: 'root'
})
export class HomesPopupService {

  constructor(
    public dialog: MatDialog,
    private store: Store,
  ) { }

  openClientsWhoViewed(home: Home): void {
    const listDialog = this.dialog.open(ClientsListSelectorComponent, {
      width: '800px',
      data: {
        title: 'Look Clients who viewed home',
        home
      }
    });
  }

  openAddingClientList(home: Home): void {
    const listDialog = this.dialog.open(ClientsListSelectorComponent, {
      width: '800px',
      data: {
        title: 'Add client who viewed home',
        home
      }
    });
    listDialog.afterClosed().subscribe(
      clientId => {
        if (clientId) {
          this.addClientToHome(home.id, clientId);
        }
      }
    );
  }

  openDeleteHome(home: Home): void {
    const deleteDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: 'Delete Client!',
        home
      }
    });
    deleteDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.deleteHome(home.id);
        }
      }
    );
  }

  private addClientToHome(homeId: number | string, clientId: number | string): void {
    this.store.dispatch(homesActions.addClientToHome({homeId, clientId}));
  }

  private deleteHome(id: number | string): void {
    this.store.dispatch(homesActions.deleteHome({id}));
  }
}
