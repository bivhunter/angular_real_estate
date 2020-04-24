import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Observable, Subscription } from 'rxjs';
import { TClientsSortingMethod, TClientsSortingField } from 'src/app/modules/shared/types/types';
import { ClientsSortingService } from './../../services/clients-sorting.service';
import { Router } from '@angular/router';
import { ClientService } from '../../services/clients.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit, OnDestroy {

  isPopumMenu = false;

  @Input() clients: Client[];
  currentClient: Client;

  // homesList popup
  isPopupListHomes = false;
  isAddingHomesView: boolean;
  isBoughtHomesView: boolean;

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

  setSortingField(field: TClientsSortingField): void {
    this.clientsSortingService.selectClientsSortingMethod(field);
  }

  private initSubscribtions(): void {
    // listen soting mode
    this.changingSortingMethodEvent = this.clientsSortingService.getChangingSortingMethodEvent();
    this.changingSortingMethodSubscription = this.changingSortingMethodEvent.subscribe(
      (sortMethod) => this.sortingMethod = sortMethod
    );
  }

}
