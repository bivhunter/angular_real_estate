import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Home } from 'src/app/modules/homes/model/home';
import { DealsService } from 'src/app/modules/shared/services/deals.service';
import { Deal } from '../../model/deal';
import { CanComponentDeactivate } from 'src/app/modules/shared/guards/can-deactivate.guard';
import { Subscription, of, Observable } from 'rxjs';
import { PopupService } from 'src/app/modules/shared/services/popup.service';
import { tap, timeoutWith } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deal-creator',
  templateUrl: './deal-creator.component.html',
  styleUrls: ['./deal-creator.component.css']
})
export class DealCreatorComponent implements OnInit, CanComponentDeactivate {

  currentFrame = 'clientsSelector';
  selectedClient: Client;
  selectedHome: Home;

  // popup
  isPopupQuestion = false;
  popupTitle: string;
  text: string;

  // for canDiactivate
  isCanDeactivatePopup = false;
  private isSubmit = false;

  constructor(
    private router: Router,
    private dealsService: DealsService,
    private popupService: PopupService,
    private location: Location
  ) { }

  ngOnInit(): void {

  }

  canDeactivate(next: RouterStateSnapshot): Observable<boolean> {
    if (this.isSubmit) {
      return of(true);
    }
    this.isCanDeactivatePopup = true;

    return this.popupService.canDeactivate(next).pipe(
      tap((checking) => {
          this.isCanDeactivatePopup = false;
      })
    );
  }

   // cliensSelector events handlers
  onSelectorCancel(): void {
    this.popupTitle = 'Cancel changes!';
    this.openPopupQuestion();
  }

  onClientsSelectorSubmit(client: Client): void {
    this.selectedClient = client;
    this.currentFrame = 'homesSelector';
  }

  // homesSelector events handlers
  onHomesSelectorBack(): void {
    this.currentFrame = 'clientsSelector';
  }

  // onHomesSelectorCancel(): void {
  //   this.router.navigateByUrl('deals');
  // }

  onHomesSelectorSubmit(home: Home): void {
    this.selectedHome = home;
    this.currentFrame = 'dealsMaker';
  }

   // dealsSelector events handlers
   onDealsSelectorBack(): void {
    this.currentFrame = 'homesSelector';
    this.selectedHome = null;
  }

  // onDealsSelectorCancel(): void {
  //   this.router.navigateByUrl('deals');
  // }

  onDealsSelectorSubmit(): void {
    this.popupTitle = 'Add deal!';
    this.openPopupQuestion();
  }

  // popup question events
  onCancel(): void {
    this.isPopupQuestion = false;
  }

  onSubmit(): void {
    if (this.popupTitle === 'Cancel changes!') {
      this.isSubmit = true;
      this.navigateBack();
    } else if (this.popupTitle === 'Add deal!') {
      this.addDeal();
    }
  }

  private addDeal(): void {
    const newDeal = {
      ... new Deal(),
      price: this.selectedHome.price,
      homeId: this.selectedHome.id,
      clientId: this.selectedClient.id,
    };

    this.dealsService.addDeal(newDeal).subscribe(
      () => {
        this.isSubmit = true;
        this.navigateBack();
      }
    );
  }

  private navigateBack(): void {
    this.location.back();
  }

   private openPopupQuestion(): void {
    this.isPopupQuestion = true;
  }
}
