import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Store } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';
import * as clientsActions from 'src/app/store/actions/clients.action';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-deals-clients-selector',
  templateUrl: './deals-clients-selector.component.html',
  styleUrls: ['./deals-clients-selector.component.css']
})
export class DealsClientsSelectorComponent implements OnInit {

  filteredClients$: Observable<Client[]>;
  @Input() selectedClient: Client;

  @Output() submitEvent: EventEmitter<Client> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.filterClients('');
    this.filteredClients$ = this.store.select(clientsSelector.getFilteredClients);
  }

  filterClients(searchingString: string) {
    this.store.dispatch(clientsActions.setSearchingString({searchingString}));
  }
}
