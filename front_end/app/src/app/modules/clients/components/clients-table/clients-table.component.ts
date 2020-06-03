import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Observable, Subscription } from 'rxjs';
import { ISortingConf } from 'src/app/modules/shared/types/types';
import { Store } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';
import * as clientsActions from 'src/app/store/actions/clients.action';
import { MatSort } from '@angular/material/sort';
import { ClientsPopupService } from '../../services/clients-popup.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() clients: Client[];

  displayedColumns: string[] = ['surname', 'name', 'email', 'phone', 'actions'];

  sortingConf$: Observable<ISortingConf>;

  @ViewChild(MatSort) matSort: MatSort;
  private sortingEventSubscription: Subscription;


  constructor(
    private store: Store,
    public popup: ClientsPopupService
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  ngOnDestroy(): void {
    this.sortingEventSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.initSortingSubscription();
  }

  onDeleteButton(client: Client): void {
    this.popup.openDeleteClient(client);
  }

  openBoughtHomes(client: Client): void {
    this.popup.openBoughtHomesList(client);
  }

  onAddHome(client: Client): void {
    this.popup.openAddingHomeList(client);
  }

  openViewedHome(client: Client): void {
    this.popup.openViewedHomeList(client);
  }

  setSortingConf(sortingConf: ISortingConf): void {
    this.store.dispatch(clientsActions.setSortingConf({sortingConf}));
  }

  private initSortingSubscription(): void {
    this.sortingEventSubscription = this.matSort.sortChange.subscribe(
      (event: ISortingConf) => {
        this.setSortingConf(event);
      }
    );
  }

  private getFromStore(): void {
    this.sortingConf$ = this.store.select(clientsSelector.getSortingConf);
  }

}
