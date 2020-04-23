import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import { ClientService } from '../../model/clients.service';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent implements OnInit {

  isPopupDeleting = false;
  isPopupListHomes = false;
  isAdding: boolean;
  isViewedHomes: boolean;


  @Input() client: Client;

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
  }

  onDeleteButton(): void {
    this.isPopupDeleting = true;
  }

  deleteClient(id: string | number): void {
    this.clientService.deleteClient(id).subscribe(
      () => this.isPopupDeleting = false
    );
  }

  openBoughtHomes(): void {
    this.isViewedHomes = true;
    this.isAdding = false;
    this.isPopupListHomes = true;
  }

  openHomes(): void {
    this.isViewedHomes = false;
    this.isAdding = false;
    this.isPopupListHomes = true;
  }

  addHome(): void {
    this.isViewedHomes = false;
    this.isAdding = true;
    this.isPopupListHomes = true;
  }

  onProfileButton(): void {
    this.router.navigateByUrl(`clients/profile/${this.client.id}`);
  }

}
