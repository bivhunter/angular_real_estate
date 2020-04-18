import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Home } from 'src/app/modules/homes/model/home';
import { DealsService } from 'src/app/modules/shared/services/deals.service';
import { Deal } from '../../model/deal';
import { CanComponentDeactivate } from 'src/app/modules/shared/guards/can-deactivate.guard';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/modules/shared/services/popup.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-deal-creator',
  templateUrl: './deal-creator.component.html',
  styleUrls: ['./deal-creator.component.css']
})
export class DealCreatorComponent implements OnInit, CanComponentDeactivate {

  currentFrame = 'clientsSelector';
  selectedClient: Client;
  selectedHome: Home;

  private isSubmit = false;

  constructor(
    private router: Router,
    private dealsService: DealsService,
    private popupService: PopupService,
  ) { }

  ngOnInit(): void {

  }

  async canDeactivate(next: RouterStateSnapshot): Promise<boolean> {
    if (this.isSubmit) {
      return true;
    }
    return this.popupService.canDeactivate(next);
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
    this.isSubmit = true;
    const newDeal = {
      ... new Deal(),
      price: this.selectedHome.price,
      homeId: this.selectedHome.id,
      clientId: this.selectedClient.id,
    };

    this.dealsService.addDeal(newDeal).subscribe(
      () => {
        this.router.navigateByUrl('deals');
      }
    );
  }
}
