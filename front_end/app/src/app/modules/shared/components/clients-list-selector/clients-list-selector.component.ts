import { Component, OnInit, Inject } from '@angular/core';
import { Home } from 'src/app/modules/homes/model/home';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';
import { filterClients } from 'src/app/store/functions/filtered-functions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPopupClientsSelectorConf } from '../../types/types';

@Component({
  selector: 'app-clients-list-selector',
  templateUrl: './clients-list-selector.component.html',
  styleUrls: ['./clients-list-selector.component.css']
})
export class ClientsListSelectorComponent implements OnInit {

  home: Home = this.data.home;
  selectedClientId: number | string;

  displayedColumns: string[] = ['surname', 'name'];

  clients: Client[];
  filteredClients: Client[];

  title: string;
  isAddingMode = false;

  constructor(
    public dialogRef: MatDialogRef<ClientsListSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPopupClientsSelectorConf,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.getClients();
  }

  filterClients(searchString: string): void {
    this.filteredClients = filterClients(this.clients, searchString);
  }

  onClickClient(client: Client): void {
    if (this.isAddingMode) {
      this.selectedClientId = client.id;
    } else {
      this.dialogRef.close();
      this.router.navigateByUrl(`clients/profile/${client.id}`);
    }
  }

  private getClients(): void {
    this.store.select(clientsSelector.getClients).subscribe(
      (clients) => {
        if (!clients) {
          this.clients = [];
          return;
        }

        switch (this.title) {
          case 'Add client who viewed home': {
            this.isAddingMode = true;
            this.clients = this.cutOwnClients(clients);
            break;
          }

          case 'Look Clients who viewed home': {
            this.clients = this.getOwnClients(clients);
            break;
          }
        }
        this.filterClients('');
      }
    );
  }

  private getOwnClients(clients: Client[]): Client[] {
    return clients.filter(client => {
      const homes = client.homes;
      const coincidenceCount = homes.filter(home => {
        return home.id === this.home.id;
      }).length;
      return coincidenceCount;
    });
  }

  private cutOwnClients(clients: Client[]): Client[] {
    const ownClients = this.getOwnClients(clients);
    return clients.filter(client => {
      for (const ownClient of ownClients) {
        if (ownClient.id === client.id) {
          return false;
        }
      }
      return true;
    });
  }

}
