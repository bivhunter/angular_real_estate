import { Component, OnInit, Input } from '@angular/core';
import { Deal } from '../../model/deal';
import { Client } from 'src/app/modules/clients/model/client';
import { Home } from 'src/app/modules/homes/model/home';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { DealsService } from 'src/app/modules/shared/services/deals.service';
import { Route } from '@angular/compiler/src/core';
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
    private router: Router,
    private dealsService: DealsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDeal();
  }

  onCloseButton() {
    this.location.back();
    // this.router.navigateByUrl('deals');
  }

  private getDeal(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dealsService.getDeal(id).subscribe(
      (deal) => {
        this.deal = deal;
        this.client = deal.client;
        this.home = deal.home;
      }
    );
  }

}
