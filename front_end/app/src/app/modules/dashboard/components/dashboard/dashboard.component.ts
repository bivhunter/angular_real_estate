import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/modules/shared/services/clients.service';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import { HomesService } from './../../../shared/services/homes.service';
import { DealsService } from 'src/app/modules/shared/services/deals.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {

  clients: Client[] = [];

  clientsTotal: number;
  homesTotal: number;
  dealsTotal: number;

  constructor(
    private clientsService: ClientService,
    private homesService: HomesService,
    private dealsService: DealsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getClients();
    this.getHomes();
    this.getDeals();
  }

  onProfileButton(id: string | number): void {
    this.router.navigateByUrl(`clients/profile/${id}`);
  }

  private getClients(): void {
    this.clientsService.getClients().subscribe((clients) => {
      this.clients = [...clients].sort( (clientA, clientB) => {
        return Date.parse(clientB.createdAt).valueOf() - Date.parse(clientA.createdAt).valueOf();
      });
      this.clientsTotal = clients.length;
      this.clients.length = 5;
    });
  }

  private getHomes(): void {
    this.homesService.getHomes().subscribe(
      homes => this.homesTotal = homes.length
    );
  }

  private getDeals(): void {
    this.dealsService.getDeals().subscribe(
      deals => this.dealsTotal = deals.length
    );
  }

}
