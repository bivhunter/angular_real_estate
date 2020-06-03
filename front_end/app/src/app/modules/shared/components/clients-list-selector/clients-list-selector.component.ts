import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Home } from 'src/app/modules/homes/model/home';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';
import { filterClients } from 'src/app/store/functions/filtered-functions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPopupClientsSelectorConf } from '../../types/types';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-clients-list-selector',
  templateUrl: './clients-list-selector.component.html',
  styleUrls: ['./clients-list-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsListSelectorComponent implements OnInit {

  home: Home = this.data.home;
  selectedClientId: number | string;

  displayedColumns: string[] = ['surname', 'name'];

  clients$: Observable<Client[]>;

  title: string;
  isAddingMode = false;

  searchControl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<ClientsListSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPopupClientsSelectorConf,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.initSearchControl();
    this.initSubscriptions();
  }

  onClickClient(client: Client): void {
    if (this.isAddingMode) {
      this.selectedClientId = client.id;
    } else {
      this.dialogRef.close();
      this.router.navigateByUrl(`clients/profile/${client.id}`);
    }
  }

  private initSubscriptions(): void {
    const clients$ = this.store.select(clientsSelector.getClients).pipe(
      map((clients) =>  {
        const choseClients = this.chooseClients(clients);
        console.log(choseClients);
        return choseClients;
      })
    );

    const searchString$ = this.searchControl.valueChanges.pipe(
      startWith('')
    );

    this.clients$ = combineLatest([clients$, searchString$]).pipe(
      tap(res => console.log(res)),
      map(([clients, searchingString]) => filterClients(clients, searchingString))
    );
  }

  private chooseClients(clients: Client[]): Client[] {
    if (!clients) {
      return clients;
    }

    if (this.title === 'Add client who viewed home') {
      this.isAddingMode = true;
      return this.cutOwnClients(clients);
    } else if (this.title === 'Look Clients who viewed home') {
      return this.getOwnClients(clients);
    }
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

  private initSearchControl(): void {
    this.searchControl = new FormControl('');
  }
}
