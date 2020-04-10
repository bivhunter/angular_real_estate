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
  isCanDeactivate = false;

  private routeDeactivateEventSubscribtion: Subscription;

  constructor(
    private router: Router,
    private dealsService: DealsService,
    private popupService: PopupService,
  ) { }

  ngOnInit(): void {

  }

  canDeactivate(next: RouterStateSnapshot): Promise<boolean> | boolean {
      if (this.isCanDeactivate) {
        return true;
      }

      this.router.navigate([{ outlets: {popup: 'popup'}}]);
      const o = this.popupService.getRouteDeactivateEvent()
        .pipe(
          tap((checking) => {
            if (checking) {
              this.isCanDeactivate = true;
              this.router.navigate([{ outlets: {popup: null}}]).then(
                () => this.router.navigateByUrl(next.url)
              );

            } else {
              this.router.navigate([{ outlets: {popup: null}}]);
            }
          })
        );

      return o.toPromise();
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
      () => {
        this.router.navigateByUrl('deals');
        this.isCanDeactivate = true;
      }
    );
  }
}
