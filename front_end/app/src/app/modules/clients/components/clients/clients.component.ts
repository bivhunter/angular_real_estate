import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/modules/clients/services/clients.service';
import { Client } from 'src/app/modules/clients/model/client';
import { Observable, Subscription } from 'rxjs';
import { TClientsSortingMethod } from 'src/app/modules/shared/types/types';
import { ClientsFilteringService } from '../../services/clients-filtering.service';
import { ClientsSortingService } from './../../services/clients-sorting.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  clients: Client[] = [];
  filteredClients: Client[] = []; // after sorting and searching

  // observable and subscription for clientsUpdate
  private updateClientsListEvent: Observable<any>;
  private updateClientsListSubscribtion: Subscription;

  // observable and subscription for sorting
  private changingSortingMethodEvent: Observable<TClientsSortingMethod>;
  private changingSortingMethodSubscription: Subscription;
  sortingMethod: TClientsSortingMethod;

  // observable and subscription for filtering
  private changingFilterEvent: Observable<string>;
  private changingFilterSubscription: Subscription;
  private filterString = '';


  constructor(
    private clientService: ClientService,
    private clientsFilteringService: ClientsFilteringService,
    private clientsSortingService: ClientsSortingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initSubscriptions();
    this.route.data.subscribe(
      data => this.getClientsHandler(data.clients)
    );
  }

  ngOnDestroy(): void {
    this.changingSortingMethodSubscription.unsubscribe();
    this.updateClientsListSubscribtion.unsubscribe();
    this.changingFilterSubscription.unsubscribe();
  }

  private initSubscriptions(): void {
    // updateClients subscribe
    this.updateClientsListEvent = this.clientService.getClientsListChangesEvent();
    this.updateClientsListSubscribtion = this.updateClientsListEvent
      .subscribe(() => this.getClients());

      // sorting subscrib
    this.changingSortingMethodEvent = this.clientsSortingService.getChangingSortingMethodEvent();
    this.changingSortingMethodSubscription = this.changingSortingMethodEvent.subscribe(
        (method) => {
          this.sortingMethod = method;
          this.filteredClients = this.sortClients(this.filteredClients);
        }
      );
    //  filtering subscribe
    this.changingFilterEvent = this.clientsFilteringService.getChangingFilterEvent();
    this.changingFilterSubscription = this.changingFilterEvent.subscribe(
      filterString => {
        this.filterString = filterString;
        this.filteredClients = this.filterClients(this.clients);
      }
    );
  }

  private getClients(): void {
    this.clientService.getClients().subscribe(
      (clientsList) => this.getClientsHandler(clientsList),
      (error) => console.log(error)
    );
  }

  private getClientsHandler(clientsList: Client[]) {
    this.clients = clientsList;
    this.filteredClients = this.filterClients(this.clients);
    this.filteredClients = this.sortClients(this.filteredClients);
  }

  private sortClients(clients: Client[]): Client[] {
    return this.clientsSortingService.sortClients(clients, this.sortingMethod);
  }

  private filterClients(clients: Client[]): Client[] {
    return this.clientsFilteringService.filterClients(this.clients, this.filterString);
  }
}
