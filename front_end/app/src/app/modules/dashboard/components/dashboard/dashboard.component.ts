import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Router, ActivatedRoute } from '@angular/router';
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

  displayedColumns: string[] = ['surname', 'name', 'email', 'phone', 'date'];

  private routerDataSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy() {
    this.routerDataSubscription.unsubscribe();
  }

  onProfileButton(id: string | number): void {
    this.router.navigateByUrl(`clients/profile/${id}`);
  }

  private filterClients(clients: Client[]) {
    this.clients = [...clients].sort( (clientA, clientB) => {
      return Date.parse(clientB.createdAt).valueOf() - Date.parse(clientA.createdAt).valueOf();
    });
    if (clients.length > 5) {
      this.clients.length = 5;
    }
  }

  private getData(): void {
    this.routerDataSubscription = this.route.data.subscribe(
      data => {
        this.homesTotal = data.homes.length;
        this.dealsTotal = data.deals.length;
        this.clientsTotal = data.clients.length;
        this.filterClients(data.clients);
      }
    );
  }
}
