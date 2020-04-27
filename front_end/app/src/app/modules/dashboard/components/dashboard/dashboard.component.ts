import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/modules/clients/services/clients.service';
import { Client } from 'src/app/modules/clients/model/client';
import { Router, ActivatedRoute } from '@angular/router';
import { HomesService } from '../../../homes/services/homes.service';
import { DealsService } from 'src/app/modules/deal/services/deals.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

  clients: Client[] = [];

  clientsTotal: number;
  homesTotal: number;
  dealsTotal: number;

  private clientsListChangingSubscription: Subscription;

  constructor(
    private clientsService: ClientService,
    private homesService: HomesService,
    private dealsService: DealsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData();
    this.initSubscription();
  }

  ngOnDestroy(): void {
    this.clientsListChangingSubscription.unsubscribe();
  }

  onProfileButton(id: string | number): void {
    this.router.navigateByUrl(`clients/profile/${id}`);
  }

  private getClients(): void {
    this.clientsService.getClients().subscribe((clients) => {
      this.filterClients(clients);
    });
  }

  private filterClients(clients: Client[]) {
    this.clients = [...clients].sort( (clientA, clientB) => {
      return Date.parse(clientB.createdAt).valueOf() - Date.parse(clientA.createdAt).valueOf();
    });
    this.clientsTotal = clients.length;
    if (clients.length > 5) {
      this.clients.length = 5;
    }
  }

  private getData(): void {
    this.route.data.subscribe(
      data => {
        this.homesTotal = data.homes.length;
        this.dealsTotal = data.deals.length;
        this.filterClients(data.clients);
      }
    );
  }

  private initSubscription(): void {
    this.clientsListChangingSubscription = this.clientsService.getClientsListChangesEvent().subscribe(
      () => this.getClients()
    );
  }

}
