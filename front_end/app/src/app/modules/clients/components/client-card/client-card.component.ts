import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import { ClientService } from '../../clients.service';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent implements OnInit {

  isPopupMenu = false;

  @Input() client: Client;

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
  }

  onDeleteButton(): void {
    this.isPopupMenu = true;
  }

  deleteClient(id: string | number): void {
    this.clientService.deleteClient(id).subscribe(
      () => this.isPopupMenu = false
    )
  }

  onProfileButton(): void {
    this.router.navigateByUrl(`clients/profile/${this.client.id}`);
  }

}
