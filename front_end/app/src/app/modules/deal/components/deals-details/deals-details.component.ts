import { Component, OnInit} from '@angular/core';
import { Deal } from '../../model/deal';
import { Client } from 'src/app/modules/clients/model/client';
import { Home } from 'src/app/modules/homes/model/home';
import { ActivatedRoute } from '@angular/router';
import { DealsService } from 'src/app/modules/deal/services/deals.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deals-details',
  templateUrl: './deals-details.component.html',
  styleUrls: ['./deals-details.component.css']
})
export class DealsDetailsComponent implements OnInit {

  deal: Deal;
  client: Client;
  home: Home;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => this.getDeal(data.deal)
    );
  }

  onCloseButton() {
    this.location.back();
  }

  private getDeal(deal: Deal): void {
    this.deal = deal;
    this.client = deal.client;
    this.home = deal.home;
  }

}
