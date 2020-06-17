import { Observable } from "rxjs";
import { Client } from "src/app/modules/clients/model/client";
import * as clientsSelector from "src/app/store/selectors/clients.selector";

import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent implements OnInit {
  clients$: Observable<Client[]>;
  filteredClients$: Observable<Client[]>; // after sorting and searching

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getFromStore();
  }

  private getFromStore(): void {
    this.clients$ = this.store.select(clientsSelector.getClients);
    this.filteredClients$ = this.store.select(
      clientsSelector.getFilteredClients
    );
  }
}
