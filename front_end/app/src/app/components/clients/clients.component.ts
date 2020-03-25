import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  isViewsMenu = false;

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
   this.getClients();
  }

  getClients(): void {
    this.clientService.getClients()
    .subscribe(
      (clientsList) => this.clients = [...clientsList],
      (error) => console.log(error)
    );
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


}
