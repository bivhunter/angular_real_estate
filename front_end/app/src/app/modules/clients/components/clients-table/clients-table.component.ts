import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Observable } from 'rxjs';
import { TClientsSortingMethod, TClientsSortingField } from 'src/app/modules/shared/types/types';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';
import * as clientsActions from 'src/app/store/actions/clients.action';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit {

  isPopumMenu = false;

  @Input() clients: Client[];
  currentClient: Client;

  // homesList popup
  isPopupListHomes = false;
  isAddingHomesView: boolean;
  isBoughtHomesView: boolean;

  sortingMethod$: Observable<TClientsSortingMethod>;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  onDeleteButton(client: Client): void {
    this.currentClient = {...client};
    this.isPopumMenu = true;
  }

  deleteClient(id: number | string): void {
    this.store.dispatch(clientsActions.deleteClient({id}));
    this.isPopumMenu = false;
  }

  openBoughtHomes(client: Client): void {
    this.currentClient = client;
    this.isBoughtHomesView = true;
    this.isAddingHomesView = false;
    this.isPopupListHomes = true;
  }

  onAddHome(client: Client): void {
    this.isBoughtHomesView = false;
    this.currentClient = client;
    this.isAddingHomesView = true;
    this.isPopupListHomes = true;
  }

  onViewedHome(client: Client): void {
    this.isBoughtHomesView = false;
    this.currentClient = client;
    this.isAddingHomesView = false;
    this.isPopupListHomes = true;
  }

  onProfileButton(id: number | string): void {
    this.router.navigateByUrl(`clients/profile/${id}`);
  }

  setSortingField(sortingMethodField: TClientsSortingField): void {
    this.store.dispatch(clientsActions.setSortingField({sortingMethodField}));
  }

  private getFromStore(): void {
    this.sortingMethod$ = this.store.select(clientsSelector.getSortingMethod);
  }

}
