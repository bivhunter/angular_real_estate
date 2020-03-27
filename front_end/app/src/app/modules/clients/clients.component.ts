import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/modules/clients/clients.service';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  clients: Client[];
  isViewsMenu = false;
  isSortMenu = false;
  _sortMethod: string ;

  set sortMethod(value: string) {
    this._sortMethod = value;
    this.clientService.setSortClientsMethod(value);
  }

  get sortMethod(): string {
    return this._sortMethod || '';
}

  clientsSortSubject: Observable<string>;
  clientsSortSubscribtion: Subscription;

  set viewMode(value: string) {
    localStorage.setItem('viewMode', value);
  }

  get viewMode(): string {
    const mode = localStorage.getItem('viewMode');
    if (!mode)  {
      return 'cards';
    }
    return mode;
  }

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initSubscriptions();
    this.getClients();
  }

  ngOnDestroy(): void {
    this.clientsSortSubscribtion.unsubscribe();
  }

  onActivateCardView() {
    this.viewMode = 'cards';
    this.isViewsMenu = false;
  }

  onActivateListView() {
    this.viewMode = 'list';
    this.isViewsMenu = false;
  }

  onAddButtonClick(): void {
    this.router.navigateByUrl('clients/adding');
  }

  onClientDeleteEvent(id: number | string): void {
    this.clientService.deleteClient(id).subscribe(
      () => this.getClients(),
      (error) => console.log(error)
    );
  }

  private initSubscriptions() {
    this.sortMethod = 'surname_up';
    this.clientsSortSubject = this.clientService.getClientsSortSubject();
    this.clientsSortSubscribtion = this.clientsSortSubject.subscribe(
      (sortMethod) => {
        this.sortMethod = sortMethod;
      }
    );
  }

  private getClients(): void {
    this.clientService.getClients()
    .subscribe(
      (clientsList) => this.clients = [...clientsList],
      (error) => console.log(error)
    );
  }

}
