import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Observable, Subscription } from 'rxjs';
import { TClientsSortingMethod, TClientsSortingField } from 'src/app/modules/shared/types/types';
import { ClientsSortingService } from './../../services/clients-sorting.service';
import { Router } from '@angular/router';
import { ClientService } from '../../../shared/services/clients.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit, OnDestroy {

  isPopumMenu = false;

  @Input() clients: Client[];

  isPopupListHomes = false;
  isAdding: boolean;
  currentClient: Client;

  sortingMethod: TClientsSortingMethod;
  private changingSortingMethodEvent: Observable<TClientsSortingMethod>;
  private changingSortingMethodSubscription: Subscription;


  constructor(
    private clientsSortingService: ClientsSortingService,
    private clientsService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initSubscribtions();
  }

  ngOnDestroy(): void {
    this.changingSortingMethodSubscription.unsubscribe();
  }

  onDeleteButton(client: Client): void {
    this.currentClient = {...client};
    this.isPopumMenu = true;
  }

  deleteClient(id: number | string): void {
    this.clientsService.deleteClient(id).subscribe(
      () => this.isPopumMenu = false
    );
  }

  onAddHome(client: Client): void {
    this.currentClient = client;
    this.isAdding = true;
    this.isPopupListHomes = true;
  }

  onViewedHome(client: Client): void {
    this.currentClient = client;
    this.isAdding = false;
    this.isPopupListHomes = true;
  }

  onProfileButton(id: number | string): void {
    this.router.navigateByUrl(`clients/profile/${id}`);
  }

  setSortingField(field: TClientsSortingField): void {
    this.clientsSortingService.selectClientsSortingMethod(field);
  }
  private initSubscribtions(): void {
    this.changingSortingMethodEvent = this.clientsSortingService.getChangingSortingMethodEvent();
    this.changingSortingMethodSubscription = this.changingSortingMethodEvent.subscribe(
      (sortMethod) => this.sortingMethod = sortMethod
    );
  }

}
