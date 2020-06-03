import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Client } from 'src/app/modules/clients/model/client';
import { Location } from '@angular/common';
import { ClientsFilteringService } from '../../services/clients-filtering.service';
import { CanComponentDeactivate } from 'src/app/modules/shared/guards/can-deactivate.guard';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as clientsActions from 'src/app/store/actions/clients.action';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupDeactivateComponent } from './../../../shared/components/popup-deactivate/popup-deactivate.component';
import { PopupQuestionComponent } from 'src/app/modules/shared/components/popup-question/popup-question.component';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'},
  ]
})
export class ClientProfileComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  client: Client;
  private initClient: Client;
  profileForm: FormGroup;

  mainTitle: string;
  isAddingMode: boolean;

  // for canDiactivate
  isCanDeactivatePopup = false;
  private isSubmit = false;
  private routeDataSubscription: Subscription;
  private formSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private clientsFilteringService: ClientsFilteringService,
    private store: Store,
    private adapter: DateAdapter<any>,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe(
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

  ngOnDestroy() {
    this.routeDataSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }

  // for can deactivate popup
  canDeactivate(next: RouterStateSnapshot): Observable<boolean> {
    if (this.isSubmit || this.compareClient() ) {
      return of(true);
    }

    const dialogRef = this.dialog.open(PopupDeactivateComponent);
    return dialogRef.afterClosed();
  }


  // buttons click handler
  onSave(): void {
    if (this.compareClient()) {
      this.navigateBack();
      return;
    }

    if (this.isAddingMode) {
      this.openAddQuestion();
    } else {
      this.openSaveQuestion();
    }
  }

  onCancelButtonClick() {
    if (this.compareClient()) {
      this.navigateBack();
    } else {
      this.openCancelQuestion();
    }
  }

  private initFormSubscriptions(): void {
    this.formSubscription = this.profileForm.controls.phone.valueChanges.subscribe(
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

  private updateClient(): void {
    this.store.dispatch(clientsActions.updateClient({client: this.client}));
    this.navigateBack();
  }

  private addClient(): void {
    this.store.dispatch(clientsActions.addClient({client: this.client}));
    this.navigateBack();
  }

  private navigateBack(): void {
    this.isSubmit = true;
    this.location.back();
  }

  private openCancelQuestion(): void {
    const cancelDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: `Cancel client's profile changes!`,
        content: 'All changes will be lost'
      }
    });

    cancelDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.navigateBack();
        }
      }
    );
  }

  private openSaveQuestion(): void {
    const saveDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: `Save client's profile changes!`,
        content: '',
        client: this.client
      }
    });

    saveDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.updateClient();
        }
      }
    );
  }

  private openAddQuestion(): void {
    const saveDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: 'Add new client!',
        content: '',
        client: this.client
      }
    });

    saveDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.addClient();
        }
      }
    );
  }

  // compare for changes
  private compareClient(): boolean {
    this.getFromForm();
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
}

function dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return Date.parse(control.value) ? null : {dateValidator: true};
  };
}
