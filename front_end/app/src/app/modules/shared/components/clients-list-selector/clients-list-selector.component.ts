import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Home } from 'src/app/modules/homes/model/home';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';
import * as clientsActions from 'src/app/store/actions/clients.action';
import { filterClients } from 'src/app/store/functions/filtered-functions';

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
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.title = this.getTitle();
    this.getClients();
  }

  filterClients(searchString: string): void {
    this.filteredClients = filterClients(this.clients, searchString);
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

  onCancel(): void {
    this.isPopupQuestion = false;
  }

  onSubmit(): void {
    this.addHomeToClient();
  }

  addHomeToClient(): void {
    this.store.dispatch(clientsActions.addHomeToClient({homeId: this.home.id, clientId: this.clientId}));
    this.closeList();
  }

  private getTitle(): string {
   return this.isAddingMode ? 'Select Client who viewed Home' : 'Client who viewed Home';
  }

  private openPopupQuestion(client: Client, title: string): void {
    this.clientId = client.id;
    this.title = title;
    this.text = `${client.surname}, ${client.name}, ${client.email}`;
    this.isPopupQuestion = true;
  }

  private getClients(): void {
    this.store.select(clientsSelector.getClients).subscribe(
      (clients) => {
        if (!clients) {
          return;
        }

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
