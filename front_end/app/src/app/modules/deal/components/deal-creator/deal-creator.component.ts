import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Home } from 'src/app/modules/homes/model/home';
import { DealsService } from 'src/app/modules/shared/services/deals.service';
import { Deal } from '../../model/deal';

@Component({
  selector: 'app-deal-creator',
  templateUrl: './deal-creator.component.html',
  styleUrls: ['./deal-creator.component.css']
})
export class DealCreatorComponent implements OnInit {

  currentFrame = 'clientsSelector';
  selectedClient: Client;
  selectedHome: Home;

  constructor(
    private router: Router,
    private dealsService: DealsService
  ) { }

  ngOnInit(): void {
  }

   // cliensSelector events handlers
  onClientsSelectorCancel(): void {
    this.router.navigateByUrl('deals');
  }

  onClientsSelectorSubmit(client: Client): void {
    this.selectedClient = client;
    this.currentFrame = 'homesSelector';
  }

  // homesSelector events handlers
  onHomesSelectorBack(): void {
    this.currentFrame = 'clientsSelector';
  }

  onHomesSelectorCancel(): void {
    this.router.navigateByUrl('deals');
  }

  onHomesSelectorSubmit(home: Home): void {
    this.selectedHome = home;
    this.currentFrame = 'dealsMaker';
  }

   // dealsSelector events handlers
   onDealsSelectorBack(): void {
    this.currentFrame = 'homesSelector';
  }

  onDealsSelectorCancel(): void {
    this.router.navigateByUrl('deals');
  }

  onDealsSelectorSubmit(): void {
    const newDeal = {
      ... new Deal(),
      price: this.selectedHome.price,
      homeId: this.selectedHome.id,
      clientId: this.selectedClient.id,
    };

    this.dealsService.addDeal(newDeal).subscribe(
      () => this.router.navigateByUrl('deals')
    );

  }

}
