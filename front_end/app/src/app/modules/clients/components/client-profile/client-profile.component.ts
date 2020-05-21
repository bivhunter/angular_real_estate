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
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'},
  ]
})
export class ClientProfileComponent implements OnInit, CanComponentDeactivate {

  client: Client;
  private initClient: Client;
  profileForm: FormGroup;

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
    private store: Store,
    private adapter: DateAdapter<any>
  ) { }

  ngOnInit(): void {
    this.adapter.setLocale('uk-UA');

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
        this.createForm();
        this.initFormSubscriptions();
      }
    );
  }

  // for can deactivate popup
  canDeactivate(next: RouterStateSnapshot): Observable<boolean> {
    this.getFromForm();
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

  onSave(): void {
    this.getFromForm();
    if (this.isAddingMode) {
      this.onAddClient();
    } else {
      this.onEditClient();
    }
  }


  onCancelButtonClick() {
    this.getFromForm();
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

  private initFormSubscriptions(): void {
    this.profileForm.controls.phone.valueChanges.subscribe(
      phone => this.profileForm.controls.phone.setValue(
        this.clientsFilteringService.filterPhone(phone),
        {
          onlySelf: true,
          emitEvent: false
        }
      )
    );
  }

  private getFromForm(): void {
    const fV = this.profileForm.value as Client;
    this.client = {
      ...this.client,
      ...fV
    };
  }

  private createForm(): void {
    this.adapter.setLocale('uk-UA');
    this.profileForm = new FormGroup(
      {
        name: new FormControl(this.client.name, [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/),
          Validators.maxLength(20),
        ]),
        surname: new FormControl(this.client.surname, [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/),
          Validators.maxLength(30),
        ]),
        email: new FormControl(this.client.email, [
          Validators.required,
          Validators.email,
        ]),
        address: new FormControl(this.client.address, [
          Validators.required,
          Validators.pattern(/^[A-Za-z\d]+[A-Za-z\s\d]+[A-Za-z\d]+$/),
        ]),
        phone: new FormControl(this.client.phone, [
          Validators.required,
          Validators.pattern(/^[+]{1}[1-9]{1}[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{4}$/)
        ]),
        birthday: new FormControl(this.client.birthday, [
          Validators.required,
          dateValidator()
        ]),
      }
    );
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

function dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return Date.parse(control.value) ? null : {dateValidator: true};
  };
}
