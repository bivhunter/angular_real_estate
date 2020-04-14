import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/modules/shared/services/clients.service';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {

  clients: Client[] = [];

  constructor(
    private clientsService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  onProfileButton(id: string | number): void {
    this.router.navigateByUrl(`clients/profile/${id}`);
  }

  private getClients(): void {
    this.clientsService.getClients().subscribe((clients) => {
      this.clients = [...clients].sort( (clientA, clientB) => {
        return Date.parse(clientB.createdAt).valueOf() - Date.parse(clientA.createdAt).valueOf();
      });
      this.clients.length = 5;
    });
  }

}
