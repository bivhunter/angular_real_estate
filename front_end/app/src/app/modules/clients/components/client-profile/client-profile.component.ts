import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Client } from 'src/app/modules/clients/model/client';
import { ClientService } from 'src/app/modules/clients/services/clients.service';
import { Location } from '@angular/common';
import { ClientsFilteringService } from '../../services/clients-filtering.service';
import { NgModel } from '@angular/forms';
import { PopupService } from './../../../shared/services/popup.service';
import { CanComponentDeactivate } from 'src/app/modules/shared/guards/can-deactivate.guard';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit, CanComponentDeactivate {

  client: Client;
  private initClient: Client;

  isDataReady = false;

  currentDate: Date = new Date();

  mainTitle: string;
  isAddingMode: boolean;

  // popup
  isPopupQuestion = false;
  popupTitle: string;
  text: string;

  // for canDiactivate
  isCanDeactivatePopup = false;
  private isSubmit = false;

  @ViewChild('birthday') birthdayInput: NgModel;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private popupService: PopupService,
    private clientService: ClientService,
    private clientsFilteringService: ClientsFilteringService,
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
    if (Date.parse(date) > this.currentDate.valueOf()) {
      this.client.birthday = this.currentDate;
      const dateString = this.reformatDate(new Date().toDateString());
      this.birthdayInput.reset(dateString);
      return;
    }
    this.client.birthday = new Date (Date.parse(date));
  }

  reformatDate(dateStr: string): string {
    const date = new Date(Date.parse(dateStr));
    const dateString = date.getFullYear() + '-'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    + ('0' + (date.getDate() )).slice(-2);
    return dateString;
  }

  private updateClient(): void {
    this.clientService.updateClient(this.client).subscribe(
      () => {
        this.isSubmit = true;
        this.navigateBack();
      },
      (error) => console.log(error)
    );
  }

  private addClient(): void {
    this.clientService.addClient(this.client).subscribe(
      () => {
        this.isSubmit = true;
        this.navigateBack();
      },
      (error) => console.log(error)
    );
  }

  private navigateBack(): void {
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
    this.client = client;
    this.initClient = {...client};
  }
}
