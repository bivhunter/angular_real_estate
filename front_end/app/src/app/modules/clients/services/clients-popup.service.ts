import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '../model/client';
import { HomesListSelectorComponent } from '../../shared/components/homes-list-selector/homes-list-selector.component';
import { PopupQuestionComponent } from '../../shared/components/popup-question/popup-question.component';
import { Store } from '@ngrx/store';
import * as clientsActions from 'src/app/store/actions/clients.action';

@Injectable({
  providedIn: 'root'
})
export class ClientsPopupService {

  constructor(
    public dialog: MatDialog,
    private store: Store,
  ) { }

  openBoughtHomesList(client: Client): void {
    const listDialog = this.dialog.open(HomesListSelectorComponent, {
      width: '800px',
      data: {
        title: 'Look Bought homes',
        client
      }
    });
  }

  openAddingHomeList(client: Client): void {
    const listDialog = this.dialog.open(HomesListSelectorComponent, {
      width: '800px',
      data: {
        title: 'Add Viewed home',
        client
      }
    });
    listDialog.afterClosed().subscribe(
      homeId => {
        if (homeId) {
          this.addHomeToClient(homeId, client.id);
        }
      }
    );
  }

  openViewedHomeList(client: Client): void {
    const listDialog = this.dialog.open(HomesListSelectorComponent, {
      width: '800px',
      data: {
        title: 'Look Viewed home',
        client
      }
    });
  }

  openDeleteClient(client: Client): void {
    const deleteDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: 'Delete Client!',
        client
      }
    });
    deleteDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.deleteClient(client.id);
        }
      }
    );
  }

  private addHomeToClient(homeId: number | string, clientId: number | string): void {
    this.store.dispatch(clientsActions.addHomeToClient({homeId, clientId}));
  }

  private deleteClient(id: number | string): void {
    this.store.dispatch(clientsActions.deleteClient({id}));
  }

}
