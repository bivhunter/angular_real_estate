import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Home } from 'src/app/modules/homes/model/home';
import { Client } from 'src/app/modules/clients/model/client';
import { ClientService } from '../../services/clients.service';
import { ClientsFilteringService } from '../../services/clients-filtering.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-list-selector',
  templateUrl: './clients-list-selector.component.html',
  styleUrls: ['./clients-list-selector.component.css']
})
export class ClientsListSelectorComponent implements OnInit {

  @Input() home: Home;

  clients: Client[];
  filteredClients: Client[];

  @Input('adding') isAddingMode: boolean;
  isPopupQuestion = false;
  title: string;
  text: string;
  clientId: string | number;


  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private clientsFilteringService: ClientsFilteringService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title = this.getTitle();
    this.getClients();
  }

  filterClients(searchString: string): void {
    this.filteredClients = this.clientsFilteringService.filterClients(this.clients, searchString);
  }

  closeList(): void {
    this.closeEvent.emit('');
  }

  onClickClient(client: Client): void {
    if (this.isAddingMode) {
      this.openPopupQuestion(client, 'Add client:');
    } else {
      this.router.navigateByUrl(`clients/profile/${client.id}`);
    }
  }

  onClickDelete(client: Client) {
    this.openPopupQuestion(client, 'Remove Client:');
  }

  onCancel(): void {
    this.isPopupQuestion = false;
  }

  onSubmit(): void {
    if (this.isAddingMode) {
      this.addHomeToClient();
    } else {
      this.deleteHomeFromClient();
    }
  }

  addHomeToClient(): void {
    this.clientService.addHomeToClient(this.home.id, this.clientId)
      .subscribe(
        () => this.closeList()
      );
  }

  deleteHomeFromClient(): void {
    this.clientService.deleteHomeFromClient(this.home.id, this.clientId)
      .subscribe(
        () => this.closeList()
      );
  }

  private getTitle(): string {
   return this.isAddingMode ? 'Select Client who viewed Home' : 'Client who viewed Home'
  }

  private openPopupQuestion(client: Client, title: string): void {
    this.clientId = client.id;
    this.title = title;
    this.text = `${client.surname}, ${client.name}, ${client.email}`;
    this.isPopupQuestion = true;
  }

  private getClients(): void {
    this.clientService.getClients().subscribe(
      (clients) => {
        this.clients = this.isAddingMode ? this.cutOwnClients(clients) : this.getOwnClients(clients);
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
