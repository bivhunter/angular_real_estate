import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Home } from '../../model/home';
import { CanComponentDeactivate } from 'src/app/modules/shared/guards/can-deactivate.guard';
import { Location, CurrencyPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as homesActions from 'src/app/store/actions/homes.action';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { PopupDeactivateComponent } from 'src/app/modules/shared/components/popup-deactivate/popup-deactivate.component';
import { PopupQuestionComponent } from 'src/app/modules/shared/components/popup-question/popup-question.component';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'},
  ]
})
export class HomeFormComponent implements OnInit, CanComponentDeactivate {

  private initHome: Home;
  home: Home;

  isAddingMode: boolean;
  title: string;

  isFormDisabled = false;

  homeForm: FormGroup;

  // for canDiactivate
  private isSubmit = false;

  private currencyPipe: CurrencyPipe = new CurrencyPipe('fr');

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store,
    private adapter: DateAdapter<any>,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.isAddingMode = data.mode === 'Adding';
        this.getHome(data.home);
        this.createForm();
        this.initFormSubscriptions();
      }
    );
  }

  canDeactivate(next: RouterStateSnapshot): Observable<boolean> {
    this.getFromForm();
    if (this.isSubmit || this.compareHomes() ) {
      return of(true);
    }

    const dialogRef = this.dialog.open(PopupDeactivateComponent);
    return dialogRef.afterClosed();
  }

  // buttons click handler

  onSave(): void {
    this.getFromForm();
    if (this.compareHomes()) {
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
    this.getFromForm();
    if (this.compareHomes()) {
      this.navigateBack();
    } else {
      this.openCancelQuestion();
    }
  }

  onPriceChange(value: string | number): number {
    const newValue = value.toString().replace(/\s/g, '').replace(/\$/g, '');
    return +newValue;
  }

  private getFromForm(): void {
    const fV = this.homeForm.value as Home;
    fV.price = this.onPriceChange(fV.price);
    this.home = {
      ...this.home,
      ...fV
    };
  }

  private openCancelQuestion(): void {
    const cancelDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: `Cancel home's details changes!`,
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
        title: `Save home's details changes!`,
        content: '',
        home: this.home
      }
    });

    saveDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.updateHome();
        }
      }
    );
  }

  private openAddQuestion(): void {
    const saveDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: 'Add new home!',
        content: '',
        home: this.home
      }
    });

    saveDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.addHome();
        }
      }
    );
  }
  private compareHomes(): boolean {
    for (const prop in this.home) {
      if ((this.initHome[prop] === undefined) || (this.initHome[prop] !== this.home[prop])) {
        return false;
      }
    }
    return true;
  }

  private updateHome(): void {
    this.store.dispatch(homesActions.updateHome({home: this.home}));
    this.navigateBack();
  }

  private addHome(): void {
    this.store.dispatch(homesActions.addHome({home: this.home}));
    this.navigateBack();
  }

  private getHome(home: Home): void {
    if (this.isAddingMode) {
      this.onGetHome(new Home());
      this.title = 'Add Home';
    } else {
      this.title = `Home's details`;
      this.onGetHome(home);
    }
  }

  private navigateBack(): void {
    this.isSubmit = true;
    this.location.back();
  }

  private onGetHome(home: Home): void {
    if (home.clientOwner) {
      this.isFormDisabled = true;
    }
    this.home = {...home};
    this.initHome = {...home};
  }

  private disableFormField() {
    for (const formControl in this.homeForm.controls) {
      if (this.homeForm.controls.hasOwnProperty(formControl)) {
        this.homeForm.controls[formControl].disable();
      }
    }
  }

  private createForm(): void {
    this.adapter.setLocale('uk-UA');
    this.homeForm = new FormGroup(
      {
        home: new FormControl(this.home.home, [
          Validators.required,
          Validators.pattern(/^[1-9]+\w*$/),
          Validators.maxLength(20),
        ]),
        street: new FormControl(this.home.street, [
          Validators.required,
          Validators.pattern(/^[A-Za-z\d]+[A-Za-z\s\d]+[A-Za-z\d]+$/),
          Validators.maxLength(30),
        ]),
        city: new FormControl(this.home.city, [
          Validators.required,
          Validators.pattern(/^[A-Za-z\d]+[A-Za-z\s\d]+[A-Za-z\d]+$/),
        ]),
        state: new FormControl(this.home.state, [
          Validators.required,
          Validators.pattern(/^[A-Za-z\d]+[A-Za-z\s\d]+[A-Za-z\d]+$/),
        ]),
        index: new FormControl(this.home.index, [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ]),
        price: new FormControl(this.currencyPipe
          .transform(this.home.price, 'CAD', 'symbol-narrow', '1.0-0'), [
          Validators.required,
          Validators.pattern(/[0-9,\s]*[$]{1}/g)
        ]),
        start_date: new FormControl(this.home.start_date, [
          Validators.required,
          dateValidator()
        ]),
      }
    );

    if (this.isFormDisabled) {
      this.disableFormField();
    }
  }

  private initFormSubscriptions(): void {
    this.homeForm.controls.price.valueChanges
      .pipe(
        map(price => this.onPriceChange(price))
      )
      .subscribe(

      value => {
        this.homeForm.controls.price
          .setValue(this.currencyPipe.transform(value, 'CAD', 'symbol-narrow', '1.0-0'), {emitEvent: false});
      }
    );
  }
}

function dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return Date.parse(control.value) ? null : {dateValidator: true};
  };
}


