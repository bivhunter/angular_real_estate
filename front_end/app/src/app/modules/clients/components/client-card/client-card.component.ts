import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import { ClientService } from '../../services/clients.service';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent implements OnInit {

  isPopupDeleting = false; // for toggle delete popup menu

  isPopupListHomes = false; // for toggle list of homes popup
  isAddingHomesView: boolean; // adding or viewedHomes mode for list of homes popup
  isBoughtHomesView: boolean; // bought mode for list of homes popup

  @Input() client: Client;

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
  }

  deleteClient(id: string | number): void {
    this.clientService.deleteClient(id).subscribe(
      () => this.isPopupDeleting = false
    );
  }

  openBoughtHomes(): void {
    this.isBoughtHomesView = true;
    this.isAddingHomesView = false;
    this.isPopupListHomes = true;
  }

  openHomes(): void {
    this.isBoughtHomesView = false;
    this.isAddingHomesView = false;
    this.isPopupListHomes = true;
  }

  addHome(): void {
    this.isBoughtHomesView = false;
    this.isAddingHomesView = true;
    this.isPopupListHomes = true;
  }

  onProfileButton(): void {
    this.router.navigateByUrl(`clients/profile/${this.client.id}`);
  }

}
