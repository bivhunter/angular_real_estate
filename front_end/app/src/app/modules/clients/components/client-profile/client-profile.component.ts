import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Client } from 'src/app/modules/clients/model/client';
import { Location } from '@angular/common';
import { ClientsFilteringService } from '../../services/clients-filtering.service';
import { PopupService } from './../../../shared/services/popup.service';
import { CanComponentDeactivate } from 'src/app/modules/shared/guards/can-deactivate.guard';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as clientsActions from 'src/app/store/actions/clients.action';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit, CanComponentDeactivate {

  client: Client;
  private initClient: Client;

  mainTitle: string;
  isAddingMode: boolean;

  // popup
  isPopupQuestion = false;
  popupTitle: string;
  text: string;

  // for canDiactivate
  isCanDeactivatePopup = false;
  private isSubmit = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private popupService: PopupService,
    private clientsFilteringService: ClientsFilteringService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.isAddingMode = (data.mode === 'Adding');
        if (this.isAddingMode) {
          this.mainTitle = 'Add Client';
          this.onGetClient(new Client());
        } else {
          this.mainTitle = `Client's profile`;
          this.onGetClient(data.client);
        }
      }
    );
  }

  // for can deactivate popup
  canDeactivate(next: RouterStateSnapshot): Observable<boolean> {
    if (this.isSubmit || this.compareClient() ) {
      return of(true);
    }
    this.isCanDeactivatePopup = true;

    return this.popupService.canDeactivate(next).pipe(
      tap((checking) => {
          this.isCanDeactivatePopup = false;
      })
    );
  }


  // buttons click handler
  onEditClient(): void {
    if (this.compareClient()) {
      this.navigateBack();
    } else {
    this.popupTitle = 'Save changes!';
    this.openPopupQuestion();
    }
  }

  onAddClient(): void {
    this.popupTitle = 'Add client!';
    this.openPopupQuestion();
  }

  onCancelButtonClick() {
    if (this.compareClient()) {
      this.isSubmit = true;
      this.navigateBack();
    } else {
      this.popupTitle = 'Cancel changes!';
      this.openPopupQuestion();
    }
  }

  // popup question events  handler
  onCancel(): void {
    this.isPopupQuestion = false;
  }

  onSubmit(): void {
    if (this.popupTitle === 'Cancel changes!') {
      this.isSubmit = true;
      this.navigateBack();
    } else if (this.popupTitle === 'Add client!') {
      this.addClient();
    } else if (this.popupTitle === 'Save changes!') {
      this.updateClient();
    }
  }

  // input changes handlers
  onPhoneChange(phone: string): void {
    this.client.phone = this.clientsFilteringService.filterPhone(phone);
  }

  onBirthdayChange(date: string) {
    const newDate = date.slice(-10);
    if (!date) {
      return;
    }
    this.client.birthday = new Date (Date.parse(newDate));
  }

  private updateClient(): void {
    this.store.dispatch(clientsActions.updateClient({client: this.client}));
    this.isSubmit = true;
    this.navigateBack();
  }

  private addClient(): void {
    this.store.dispatch(clientsActions.addClient({client: this.client}));
    this.isSubmit = true;
    this.navigateBack();
  }

  private navigateBack(): void {
    this.isPopupQuestion = false;
    this.location.back();
  }

  private openPopupQuestion(): void {
    this.isPopupQuestion = true;
  }

  // compare for changes
  private compareClient(): boolean {
    for (const prop in this.client) {
      if ((this.initClient[prop] === undefined) || (this.initClient[prop] !== this.client[prop])) {
        return false;
      }
    }
    return true;
  }

  private onGetClient(client: Client): void {
    this.client = {...client};
    this.initClient = {...client};
  }
}
