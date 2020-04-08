import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { ClientService } from 'src/app/modules/shared/services/clients.service';
import { ClientsFilteringService } from './../../../shared/services/clients-filtering.service';

@Component({
  selector: 'app-deals-clients-selector',
  templateUrl: './deals-clients-selector.component.html',
  styleUrls: ['./deals-clients-selector.component.css']
})
export class DealsClientsSelectorComponent implements OnInit {

  clients: Client[] = [];
  filteredClients: Client[] = [];
  @Input() selectedClient: Client;

  @Output() submitEvent: EventEmitter<Client> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private clientsService: ClientService,
    private clientFilteringService: ClientsFilteringService
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  filterClients(searchString: string) {
    this.filteredClients = this.clientFilteringService.filterClients(this.clients, searchString);
  }

  private getClients(): void {
    this.clientsService.getClients().subscribe(
      (clients) => this.getClientsHandler(clients)
    );
  }

  private getClientsHandler(clients: Client[]): void {
    this.clients = clients;
    this.filterClients('');
  }

}
