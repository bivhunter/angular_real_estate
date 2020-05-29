import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/user/model/user';
import { CanComponentDeactivate } from '../shared/guards/can-deactivate.guard';
import { RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Location, CurrencyPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as userActions from 'src/app/store/actions/user.actions';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupDeactivateComponent } from '../shared/components/popup-deactivate/popup-deactivate.component';
import { PopupQuestionComponent } from '../shared/components/popup-question/popup-question.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'},
  ]
})
export class UserProfileComponent implements OnInit, CanComponentDeactivate {

  // popup question
  isPopupQuestion = false;
  title: string;
  text: string;
  private isSubmitQuestion: boolean;

  user: User;
  private initUser: User;

  // for canDiactivate
  private isSubmit = false;
  isCanDeactivatePopup = false;

  userForm: FormGroup;
  private currencyPipe: CurrencyPipe = new CurrencyPipe('fr');

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private store: Store,
    private adapter: DateAdapter<any>,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => this.getUser(data.user)
    );
  }

  canDeactivate(next: RouterStateSnapshot): Observable<boolean> {
    if (this.isSubmit || this.compareUser()) {
      return of(true);
    }
    this.isCanDeactivatePopup = true;

    const dialogRef = this.dialog.open(PopupDeactivateComponent);
    return dialogRef.afterClosed();
  }

  onRateChange(value: string): string {
    const newValue = value.replace(/\s/g, '').replace(/\$/g, '');
    return newValue;
  }

  onSave() {
    if (this.compareUser()) {
      this.goBack();
    } else {
      this.openSaveQuestion();
    }
  }

  onCancelButtonClick(): void {
    if (this.compareUser()) {
      this.goBack();
    } else {
      this.openCancelQuestion();
    }
  }

  private openCancelQuestion(): void {
    const cancelDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: `Cancel user's profile changes!`,
        content: 'All changes will be lost'
      }
    });

    cancelDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.goBack();
        }
      }
    );
  }

  private openSaveQuestion(): void {
    const saveDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: `Save user's profile changes!`,
        content: '',
        user: this.user
      }
    });

    saveDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.store.dispatch(userActions.updateUser({user: this.user}));
          this.goBack();
        }
      }
    );
  }

  private getFromForm(): void {
    const fV = this.userForm.value;
    fV.rate = this.onRateChange(fV.rate);
    this.user = Object.assign(this.user, fV);
  }

  private goBack(): void {
    this.isSubmit = true;
    this.location.back();
  }

  private getUser(user: User): void {
    this.user = Object.assign(new User(), user);
    this.initUser = Object.assign(new User(), user);
    this.createForm();
    this.initFormSubscriptions();
  }

  private compareUser(): boolean {
    this.getFromForm();
    for (const prop in this.user) {
      if ((this.initUser[prop] === undefined) || (this.initUser[prop] !== this.user[prop])) {
        return false;
      }
    }
    return true;
  }

  private initFormSubscriptions(): void {
    this.userForm.controls.rate.valueChanges
      .pipe(
        map(rate => this.onRateChange(rate))
      )
      .subscribe(
      value => {
        this.userForm.controls.rate
          .setValue(this.currencyPipe.transform(value, 'CAD', 'symbol-narrow', '1.0-0'), {emitEvent: false});
      }
    );
  }

  private createForm(): void {
    this.adapter.setLocale('uk-UA');
    this.userForm = new FormGroup(
      {
        fullname: new FormControl(this.user.fullname, [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+\s[A-Za-z]+$/),
          Validators.maxLength(30),
        ]),
        email: new FormControl({
          value: this.user.email,
          disabled: true
        }),
        birthday: new FormControl(this.user.birthday, [
          Validators.required,
          dateValidator()
        ]),
        rate: new FormControl(this.currencyPipe
          .transform(this.user.rate, 'CAD', 'symbol-narrow', '1.0-0'), [
          Validators.required,
          Validators.pattern(/[0-9,\s]*[$]{1}/g)
        ]),
        company: new FormControl(this.user.company, [
          Validators.pattern(/^[A-Za-z\d]+[A-Za-z\s\d]+[A-Za-z\d]+$/),
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
