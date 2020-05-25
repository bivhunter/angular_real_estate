import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { ClientsPopupService } from '../../services/clients-popup.service';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent implements OnInit {

  @Input() client: Client;

  constructor(
    public popup: ClientsPopupService
  ) { }

  ngOnInit(): void {
  }

  onDeleteButton(): void {
    this.popup.openDeleteClient(this.client);
  }

  openBoughtHomes(): void {
    this.popup.openBoughtHomesList(this.client);
  }

  openHomes(): void {
    this.popup.openViewedHomeList(this.client);
  }

  addHome(): void {
   this.popup.openAddingHomeList(this.client);
  }
}
